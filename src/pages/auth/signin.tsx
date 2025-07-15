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
    HiOutlineMail,
} from 'react-icons/hi';
import { useMutation } from 'react-query';
import { useAppStore } from 'hooks/useAppStore';
import { MutationKey } from 'react-query';
import Loader from 'components/base/Loader';
import { KycStatus } from 'interfaces';
import useLandlord from 'hooks/useLandlord';
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
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
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
        if (states?.isAuthenticated && !isNavigating) {
            setIsNavigating(true);
            router.push('/dashboard');
        }
    }, [states?.isAuthenticated, router, isNavigating]);

    const {
        mutate,
        isLoading: isVerifyLoading,
        isSuccess,
    } = useMutation({
        mutationFn: AuthService.verifyAccount,
        onSuccess(data: any) {
            setIsError(false);
            setShowMessage(data?.message + '! you can login');
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

        // Prevent multiple submissions
        if (isLoading || isNavigating) return;

        // Clear previous error message
        setErrorMessage('');

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
                        setIsNavigating(true);
                        window.location.href = '/onboarding';
                        return;
                    }

                    // ongoing Kyc active
                    if (
                        data?.data?.user?.currentKyc &&
                        data?.data?.user?.currentKyc?.status ===
                            KycStatus.INCOMPLETE
                    ) {
                        // Handle incomplete KYC
                        setIsNavigating(true);
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
                        setIsNavigating(true);
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
                                    return createHistory(
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
                                            return router.push(
                                                '/dashboard/properties'
                                            );
                                        })
                                        .catch((historyError) => {
                                            setIsNavigating(false);
                                            toast.error(historyError.message);
                                            throw historyError;
                                        });
                                }
                            })
                            .catch((errors) => {
                                setIsNavigating(false);
                                toast.error(errors.message);
                                throw errors;
                            });
                    } else {
                        // Don't set showMessage if we're about to navigate
                        setIsNavigating(true);
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                router
                                    .push('/dashboard/properties')
                                    .then(resolve);
                            }, 100);
                        });
                    }
                }
                // Remove duplicate setShowMessage - it's already set above when needed
            })
            .catch((error) => {
                console.log('Login error:', error);
                setIsNavigating(false);
                // Show the specific error message on the form
                const errorMsg =
                    error?.response?.data?.message ||
                    error?.message ||
                    'Something went wrong please try again';
                setErrorMessage(errorMsg);
            });
    };

    useEffect(() => {
        if (router?.query?.token) {
            mutate({ token: router.query.token as string });
        }
    }, [router?.query?.token, mutate]);

    useEffect(() => {
        if (states?.token && !router.asPath.includes('?') && !isNavigating) {
            setIsNavigating(true);
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
        isNavigating,
    ]);

    return (
        <>
            {isVerifyLoading ? (
                <Loader loading={isVerifyLoading} />
            ) : (
                <div className="min-h-screen flex">
                    {/* Left Side - Image Panel */}
                    <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-900 to-indigo-900">
                        <div className="absolute inset-0">
                            <Image
                                src="https://images.pexels.com/photos/1446378/pexels-photo-1446378.jpeg"
                                alt="Modern building architecture"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-indigo-900/30"></div>
                        </div>

                        {/* Content Overlay */}
                        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                            <div className="max-w-md">
                                <h2 className="text-4xl font-bold mb-6">
                                    Welcome Back
                                </h2>
                                <p className="text-xl text-blue-100 mb-8">
                                    Access your property management dashboard
                                    and continue managing your real estate
                                    portfolio.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                                        <span className="text-blue-100">
                                            Quick property insights
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                                        <span className="text-blue-100">
                                            Tenant communication tools
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                                        <span className="text-blue-100">
                                            Financial reporting
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form Panel */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center p-4 bg-gray-50">
                        <div className="w-full max-w-md">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <HiOutlineLockClosed className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Welcome Back
                                </h1>
                                <p className="text-gray-600">
                                    Sign in to your{' '}
                                    <span className="font-semibold text-blue-600">
                                        E-tracka
                                    </span>{' '}
                                    account
                                </p>
                            </div>

                            {/* Card */}
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                                {/* Success Message */}
                                {!!showMessage && (
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                            <p className="text-green-800 text-sm font-medium">
                                                {showMessage}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    setShowMessage('')
                                                }
                                                className="ml-auto text-green-600 hover:text-green-800"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Error Message */}
                                {!!errorMessage && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                            <p className="text-red-800 text-sm font-medium">
                                                {errorMessage}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    setErrorMessage('')
                                                }
                                                className="ml-auto text-red-600 hover:text-red-800"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Form */}
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-6"
                                >
                                    {/* Email Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <HiOutlineMail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="Enter your email address"
                                                {...register('email')}
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {String(errors.email.message)}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder="Enter your password"
                                                {...register('password')}
                                                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            />
                                            <button
                                                type="button"
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                {showPassword ? (
                                                    <HiOutlineEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                ) : (
                                                    <HiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {String(
                                                    errors.password.message
                                                )}
                                            </p>
                                        )}
                                    </div>

                                    {/* Forgot Password Link */}
                                    <div className="flex items-center justify-between">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (
                                                    typeof window !==
                                                        'undefined' &&
                                                    window.innerWidth >= 768
                                                ) {
                                                    togglePasswordRecovery();
                                                } else {
                                                    handleMobileForgotPassword();
                                                }
                                            }}
                                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            Forgot Password?
                                        </button>
                                        {isError && (
                                            <button
                                                type="button"
                                                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                                            >
                                                Resend token
                                            </button>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading || isNavigating}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {isLoading
                                            ? 'Signing in...'
                                            : isNavigating
                                            ? 'Redirecting...'
                                            : 'Sign In'}
                                    </button>

                                    {/* Divider */}
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300" />
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">
                                                or
                                            </span>
                                        </div>
                                    </div>

                                    {/* Sign Up Link */}
                                    <div className="text-center">
                                        <span className="text-sm text-gray-600">
                                            Don't have an account?{' '}
                                            <Link
                                                href="/auth/signup"
                                                className="font-medium text-blue-600 hover:text-blue-700"
                                            >
                                                Sign Up
                                            </Link>
                                        </span>
                                    </div>
                                </form>
                            </div>

                            {/* Footer */}
                            <div className="text-center mt-8">
                                <p className="text-xs text-gray-500">
                                    Secure property management platform
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
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
