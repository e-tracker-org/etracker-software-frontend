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
import { HiOutlineUser } from 'react-icons/hi';
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
    }, [states]);

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
                console.log('user', data.data.user);

                console.log("account type", data.data.user.accountTypes.length)

                if (!!data?.data?.tokens) {
                    //Sets user token in local storage from the zustan state
                    states?.setUser({
                        token: data?.data?.tokens,
                        user: data?.data.user,
                        isAuthenticated: true,
                    });

                     // New user onboarding
                    if (
                        data.data.user.accountTypes.length  === 0 &&
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
            })
            .catch((error) => {
                error && toast.error(error?.message);
            });

        // mutate(values);
    };

    useEffect(() => {
        if (router?.query?.token) {
            mutate({ token: router.query.token as string });
        }
    }, [router?.query]);

    useEffect(() => {
        if (states?.token) {
            if (states?.user?.accountTypes?.includes(states?.activeAccount)) {
                <NavLink href="/dashboard" />;
            } else {
                <NavLink href="/dashboard/properties" />;
            }
        }
    }, [states?.token]);

    return (
        <>
            {isVerifyLoading ? (
                <Loader loading={isVerifyLoading} />
            ) : (
                <>
                    <section className="">
                        <div className="h-[96px] md:h-[196px] lg:h-[296px] md:ml-[-15%] lg:ml-[-8%] w-[105vw] 4xl:-ml-[25%] bg-[url('/hero-banner.png')] bg-cover bg-center bg-no-repeat" />

                        <div className="py-3 md:px-[15%] lg:px-[25%]  xl:px-[30%] md:py-10 mx-auto">
                            <h2 className="text-xl md:text-2xl text-3.5xl font-bold">
                                Log in to{' '}
                                <span className="text-primary-600">
                                    E-tracka
                                </span>
                            </h2>

                            {!!showMessage && (
                                <div className="rounded-md py-4 px-6 bg-green-300 mt-5 flex justify-between">
                                    <p className="flex-1">{showMessage}</p>
                                    <span
                                        role="button"
                                        onClick={() => setShowMessage('')}
                                    >
                                        &#x2715;
                                    </span>
                                </div>
                            )}
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="py-4 md:py-10"
                            >
                                <Input
                                    label="Email Address"
                                    placeholder="Enter email address"
                                    type="email"
                                    required
                                    error={errors.email}
                                    register={{ ...register('email') }}
                                    className="mb-12"
                                    rightElement={<HiOutlineUser />}
                                />
                                <Input
                                    label="Password"
                                    placeholder="Enter password"
                                    type="password"
                                    required
                                    error={errors.password}
                                    register={{ ...register('password') }}
                                />

                                <p className="text-left text-link block mt-5 mb-10 flex justify-between">
                                    <a
                                        href="#"
                                        className="hidden md:block"
                                        onClick={togglePasswordRecovery}
                                    >
                                        Forgotten Password?
                                    </a>
                                    <a
                                        href="#"
                                        className="md:hidden"
                                        onClick={handleMobileForgotPassword}
                                    >
                                        Forgotten Password?
                                    </a>
                                    {isError && (
                                        <button className="md:block">
                                            Resend token
                                        </button>
                                    )}
                                </p>

                                <Button
                                    className="w-[80%] py-4 mx-auto block"
                                    title="Log In"
                                    isLoading={isLoading}
                                    disabled={isLoading}
                                />

                                <div className="flex items-center my-12 gap-3 px-6">
                                    <hr className="w-full border border-gray-300" />
                                    <span className="text-gray-400">Or</span>
                                    <hr className="w-full border border-gray-300" />
                                </div>

                                {/* <button
        onClick={AuthService.OAuthLogin}
        type="button"
        className="my-5 rounded-md border border-gray-300
    flex justify-between items-center px-6 mx-auto"
    >
        <Image
            src="/google.svg"
            alt="google auth"
            width={50}
            height={50}
        />
        <span>Continue with Google</span>
    </button> */}

                                <p className="text-center text-lg font-medium">
                                    Don&apos;t have an account?{' '}
                                    <Link
                                        href="/auth/signup"
                                        className="text-link"
                                    >
                                        Sign Up
                                    </Link>
                                </p>
                            </form>
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
