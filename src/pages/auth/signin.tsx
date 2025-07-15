import Input from 'components/base/form/Input';
import Button from 'components/base/Button';
import Link from 'next/link';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { ReactElement, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import PasswordRecoveryModal from 'components/PasswordRecoveryModal';
import { AuthService } from 'services';
import HomeLayout from 'layouts/home';
import {
    HiOutlineUser,
    HiOutlineLockClosed,
    HiOutlineEye,
    HiOutlineEyeOff,
} from 'react-icons/hi';
import NavLink from 'components/base/NavLink';
import { useMutation } from 'react-query';
import { useAppStore } from 'hooks/useAppStore';
import { AxiosError } from 'axios';
import { MutationKey } from 'react-query';
import Loader from 'components/base/Loader';
import { KycStatus } from 'interfaces';
import useLandlord from 'hooks/useLandlord';
import Footer from 'layouts/home/Footer';
import { createHistory } from 'services/newServices/history';

const schema = yup.object({
    email: yup
        .string()
        .email()
        .lowercase()
        .trim()
        .required('Enter email address'),
    password: yup.string().min(5).required('Enter password'),
});

function Signin() {
    const [isForgottenPassword, setIsForgottenPassword] = useState(false);
    const [showMessage, setShowMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const mutationKey: MutationKey = 'userLogin';
    const [isError, setIsError] = useState(false);
    const { mutateAsync: loginAsync, isLoading } = useMutation(
        mutationKey,
        AuthService.login
    );

    const states = useAppStore();
    const router = useRouter();
    const { tenantId, propertyId } = router.query;
    const { confirmTenant, isConfirmTenantLoading } = useLandlord();

    // check if user is already logged in
    useEffect(() => {
        if (states?.isAuthenticated) {
            router.push('/dashboard');
        }
    }, [states?.isAuthenticated, router]);

    const {
        mutate,
        isLoading: isVerifyLoading,
        isSuccess,
    } = useMutation({
        mutationFn: AuthService.verifyAccount,
        onSuccess(data: any) {
            setIsError(false);
            setShowMessage(data?.message + '! you can login');
            // toast.error(data?.message, { id: 'info' });
            router.push('/auth/signin');
        },
        onError(error: any) {
            setIsError(true);
            toast.error(error.message, { id: 'error' });
        },
        retry: 2,
    });

    const togglePasswordRecovery = () => {
        setIsForgottenPassword((prev) => !prev);
    };

    const handleMobileForgotPassword = () => {
        router.push('/auth/forgotten-password');
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values: any) => {
        console.log('routeQuery>>>', router.query);

        if (propertyId) {
            values.propertyId = propertyId;
        }

        states?.setActiveKyc(undefined);
        states?.setActiveAccount(undefined);
        loginAsync(values)
            //@ts-ignore
            .then((data: any) => {
                states?.setStartKycScreen('');
                reset();

                if (!!data?.data?.tokens) {
                    //Sets user token in local storage from the zustan state
                    states?.setUser({
                        token: data?.data?.tokens,
                        user: data?.data.user,
                        isAuthenticated: true,
                    });

                    // New user onboarding
                    if (
                        data?.data?.user?.accountTypes?.length === 0 &&
                        !data?.data?.user?.currentKyc
                    ) {
                        // Handle new user onboarding
                        // Code for new user onboarding here
                        window.location.href = '/onboarding';
                        // return router.push('/onboarding');
                    }

                    // ongoing Kyc active
                    if (
                        data?.data?.user?.currentKyc &&
                        data?.data?.user?.currentKyc?.status ===
                            KycStatus.INCOMPLETE
                    ) {
                        // Handle incomplete KYC
                        // Code for incomplete KYC here
                        return router.push('/onboarding/kyc');
                    }

                    // Ongoing KYC but completed and awaiting approval
                    if (
                        data?.data?.user?.currentKyc &&
                        data?.data?.user?.currentKyc?.status ===
                            KycStatus.COMPLETE
                    ) {
                        // Handle completed KYC
                        states?.setActiveKyc(data?.data?.user?.currentKyc);
                        states?.setScreen('');
                        states?.setActiveAccount(
                            data?.data?.user?.currentKyc?.accountType
                        );
                    }

                    if (tenantId && propertyId) {
                        return confirmTenant({
                            tenantId: tenantId.toString(),
                            propertyId: propertyId.toString(),
                        })
                            .then((res) => {
                                console.log('ressssss', res);
                                //@ts-ignore
                                const landlordId = res.data?.current_owner; // Extract landlord ID from response data
                                if (landlordId) {
                                    // After confirming tenant, create history
                                    createHistory(
                                        tenantId.toString(), // Pass user ID
                                        data.data.user.email, // Pass user email
                                        landlordId, // Pass landlord ID
                                        propertyId.toString() // Pass property ID
                                    )
                                        .then((historyRes) => {
                                            console.log(
                                                'History created:',
                                                historyRes
                                            );
                                            router.push(
                                                '/dashboard/properties'
                                            );
                                        })
                                        .catch((historyError) => {
                                            toast.error(historyError.message);
                                        });
                                }
                            })
                            .catch((errors) => {
                                toast.error(errors.message);
                            });
                    } else {
                        setShowMessage(data?.message);
                        setTimeout(() => {
                            router.push('/dashboard/properties');
                        }, 2000);
                    }
                }
                setShowMessage(data?.message);

                // toast.success(data.message ?? 'Login successful');
            })
            .catch((error) => {
                error && toast.error('Something went wrong please try again');
                // toast.error(error?.message);
            });

        // mutate(values);
    };

    useEffect(() => {
        if (router?.query?.token) {
            mutate({ token: router.query.token as string });
        }
    }, [router?.query?.token, mutate]);

    useEffect(() => {
        if (states?.token) {
            if (states?.user?.accountTypes?.includes(states?.activeAccount)) {
                router.push('/dashboard');
            } else {
                router.push('/dashboard/properties');
            }
        }
    }, [
        states?.token,
        states?.user?.accountTypes,
        states?.activeAccount,
        router,
    ]);

    return (
        <>
            {isVerifyLoading ? (
                <Loader loading={isVerifyLoading} />
            ) : (
                <>
                    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                        {/* Hero Banner - Enhanced with overlay */}
                        <div className="relative h-[120px] md:h-[200px] lg:h-[280px] md:ml-[-15%] lg:ml-[-8%] w-[105vw] 4xl:-ml-[25%] bg-[url('/hero-banner.png')] bg-cover bg-center bg-no-repeat">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-indigo-900/20"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>

                        {/* Main Content Container */}
                        <div className="relative -mt-8 md:-mt-12 lg:-mt-16">
                            <div className="max-w-md mx-auto px-6 pb-12">
                                {/* Card Container */}
                                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                                    {/* Header Section */}
                                    <div className="px-8 pt-8 pb-6 text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <HiOutlineLockClosed className="w-8 h-8 text-white" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                            Welcome Back
                                        </h2>
                                        <p className="text-gray-600 text-sm">
                                            Sign in to your{' '}
                                            <span className="font-semibold text-blue-600">
                                                E-tracka
                                            </span>{' '}
                                            account
                                        </p>
                                    </div>

                                    {/* Success/Error Message */}
                                    {!!showMessage && (
                                        <div className="mx-8 mb-6">
                                            <div className="rounded-xl py-4 px-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                                                    <p className="text-emerald-800 text-sm font-medium">
                                                        {showMessage}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        setShowMessage('')
                                                    }
                                                    className="text-emerald-600 hover:text-emerald-800 font-bold text-lg leading-none"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Form Section */}
                                    <div className="px-8 pb-8">
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="space-y-6"
                                        >
                                            {/* Email Input */}
                                            <div className="relative">
                                                <Input
                                                    label="Email Address"
                                                    placeholder="Enter your email address"
                                                    type="email"
                                                    required
                                                    error={errors.email}
                                                    register={{
                                                        ...register('email'),
                                                    }}
                                                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 pl-12 h-14 text-base transition-all duration-200"
                                                    rightElement={
                                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                                            <HiOutlineUser className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                    }
                                                />
                                            </div>

                                            {/* Password Input */}
                                            <div className="relative">
                                                <Input
                                                    label="Password"
                                                    placeholder="Enter your password"
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    required
                                                    error={errors.password}
                                                    register={{
                                                        ...register('password'),
                                                    }}
                                                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 pl-12 pr-12 h-14 text-base transition-all duration-200"
                                                    rightElement={
                                                        <>
                                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                                                <HiOutlineLockClosed className="w-5 h-5 text-gray-400" />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    togglePasswordVisibility
                                                                }
                                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                            >
                                                                {showPassword ? (
                                                                    <HiOutlineEyeOff className="w-5 h-5" />
                                                                ) : (
                                                                    <HiOutlineEye className="w-5 h-5" />
                                                                )}
                                                            </button>
                                                        </>
                                                    }
                                                />
                                            </div>

                                            {/* Forgot Password & Resend Token */}
                                            <div className="flex items-center justify-between text-sm">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (
                                                            typeof window !==
                                                                'undefined' &&
                                                            window.innerWidth >=
                                                                768
                                                        ) {
                                                            togglePasswordRecovery();
                                                        } else {
                                                            handleMobileForgotPassword();
                                                        }
                                                    }}
                                                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                                >
                                                    Forgot Password?
                                                </button>
                                                {isError && (
                                                    <button
                                                        type="button"
                                                        className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                                                    >
                                                        Resend token
                                                    </button>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                                                title="Sign In"
                                                isLoading={isLoading}
                                                disabled={isLoading}
                                            />

                                            {/* Divider */}
                                            <div className="flex items-center my-8">
                                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                                                <span className="px-4 text-gray-500 text-sm font-medium">
                                                    or
                                                </span>
                                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                                            </div>

                                            {/* Google OAuth Button - Commented out */}
                                            {/* <button
                                                onClick={AuthService.OAuthLogin}
                                                type="button"
                                                className="w-full h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors group"
                                            >
                                                <Image
                                                    src="/google.svg"
                                                    alt="Google"
                                                    width={20}
                                                    height={20}
                                                />
                                                <span className="text-gray-700 font-medium">Continue with Google</span>
                                            </button> */}

                                            {/* Sign Up Link */}
                                            <div className="text-center pt-4">
                                                <p className="text-gray-600 text-sm">
                                                    Do not have an account?{' '}
                                                    <Link
                                                        href="/auth/signup"
                                                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                                                    >
                                                        Sign Up
                                                    </Link>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Footer Info */}
                                <div className="text-center mt-8 px-4">
                                    <p className="text-gray-500 text-xs">
                                        Secure property management platform
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <Footer /> */}
                </>
            )}
            {isForgottenPassword && (
                <PasswordRecoveryModal
                    open={isForgottenPassword}
                    onClose={togglePasswordRecovery}
                />
            )}
        </>
    );
}

Signin.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout showFooter={true}>{page}</HomeLayout>;
};

export default Signin;
