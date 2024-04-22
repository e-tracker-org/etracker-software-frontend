import Checkbox from 'components/base/form/Checkbox';
import Input from 'components/base/form/Input';
import Button from 'components/base/Button';
import Link from 'next/link';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthService } from 'services';
import { AxiosError } from 'axios';
import { ReactElement, useState, useRef, useEffect } from 'react';
import HomeLayout from 'layouts/home';
import { MutationKey } from 'react-query';
import { useRouter } from 'next/router';
import useLandlord from 'hooks/useLandlord';
import { UserService } from 'services';
import { GET_ACCOUNT_TYPES_QUERY_KEY } from 'utils/constants';
import { useAppStore } from 'hooks/useAppStore';

const schema = yup.object({
    email: yup
        .string()
        .email()
        .lowercase()
        .trim()
        .required('Enter email address'),
    password: yup.string().min(5).required('Enter password'),
    confirmPassword: yup
        .string()
        .equals([yup.ref('password')], 'Both passwords must match'),
    agreed: yup
        .boolean()
        .equals([true], 'Agree with the terms and conditions to continue'),
    firstName: yup.string().required('Enter your first name'),
    lastName: yup.string().required('Enter your last name'),
    phone: yup.string().required('Enter your phone number'),
});

function SignUp() {
    const [showMessage, setShowMessage] = useState('');
    const mutationKey: MutationKey = 'register';
    const queryClient = useQueryClient();
    const { mutateAsync: registerAsync, isLoading } = useMutation(
        mutationKey,
        AuthService.signup,
        { onSuccess: () => queryClient.invalidateQueries('getUserData') }
    );
    const states = useAppStore();
    const router = useRouter();
    const [invitedByName, setInvitedByName] = useState('');
    const [propertyId, setPropertyId] = useState('');

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { addLandlordTenant } = useLandlord();

    const onSubmit = async (values: any) => {
        const defaultAccountType = [1];

        const userObj = {
            firstname: values.firstName,
            lastname: values.lastName,
            confirmPassword: values.confirmPassword,
            phone: values.phone,
            email: values.email,
            password: values.password,
            propertyId: propertyId,
            accountTypes: defaultAccountType,
        };

        registerAsync(userObj)
            .then((data: any) => {
                if (data.success) {
                    setShowMessage(data?.message);
                    reset({});
                    states?.setStartKycScreen('onboarding');
                    states?.setActiveKyc({
                        accountType: 1,
                        kycStage: 1,
                        nextStage: 2,
                        status: 'INCOMPLETE',
                    });
                    states?.setActiveAccount(1);
                    setTimeout(() => {
                        router.push('/auth/signin');
                    }, 3000);
                }
            })
            .catch((error) => {
                toast.error(error?.message);
            });
    };

    useEffect(() => {
        const { invitedBy, propertyId } = router.query;
        console.log(invitedBy, propertyId);
        if (invitedBy) {
            setInvitedByName(decodeURIComponent(invitedBy as string));
        }
        if (propertyId) {
            setPropertyId(propertyId as string);
        }
    }, [router.query]);

    return (
        <section className="">
            <div className="h-[96px] md:h-[196px] lg:h-[296px] md:ml-[-17%] lg:ml-[-8%] w-[105vw] 4xl:-ml-[25%] bg-[url('/hero-banner.png')] bg-cover bg-center bg-no-repeat" />

            <div className="py-3 md:px-[15%] lg:px-[25%]  xl:px-[30%] md:py-10 mx-auto">
                <h2 className="text-xl md:text-2xl lg:text-3.5xl font-bold">
                    Create an account
                </h2>

                {!!showMessage && (
                    <div className="rounded-md py-4 px-6 bg-green-300 mt-5 flex justify-between">
                        <p className="flex-1">{showMessage}</p>
                        <span role="button" onClick={() => setShowMessage('')}>
                            &#x2715;
                        </span>
                    </div>
                )}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="py-4 md:py-10"
                >
                    <div className="flex gap-4">
                        <Input
                            className="flex-1"
                            placeholder="First Name"
                            required
                            error={errors.firstName}
                            register={{ ...register('firstName') }}
                        />
                        <Input
                            className="flex-1"
                            placeholder="Last Name"
                            required
                            error={errors.lastName}
                            register={{ ...register('lastName') }}
                        />
                    </div>
                    <Input
                        className="flex-1"
                        placeholder="Email Address"
                        type="email"
                        required
                        error={errors.email}
                        register={{ ...register('email') }}
                    />
                    <div className="flex items-start gap-4">
                        <Input
                            className="flex-1"
                            placeholder="Phone Number"
                            type="tel"
                            required
                            error={errors.phone}
                            register={{ ...register('phone') }}
                        />
                    </div>
                    <div className="flex items-start gap-4">
                        <Input
                            className="flex-1"
                            required
                            label={'Landlord:'}
                            register={{ ...register('invitedby') }}
                            value={invitedByName}
                            disabled={true}
                        />
                    </div>
                    <div className="flex gap-4 mb-10">
                        <Input
                            className="flex-1"
                            placeholder="Password"
                            type="password"
                            required
                            error={errors.password}
                            register={{ ...register('password') }}
                        />
                        <Input
                            className="flex-1"
                            placeholder="Confirm Password"
                            type="password"
                            required
                            error={errors.confirmPassword}
                            register={{ ...register('confirmPassword') }}
                        />
                    </div>

                    <div>
                        <Checkbox
                            label={
                                <p>
                                    By clicking register, you agreed to the{' '}
                                    <span className="text-[#2F42EDD9] text-xs md:text-sm">
                                        Terms and Conditions.
                                    </span>
                                </p>
                            }
                            register={{ ...register('agreed') }}
                            error={errors.agreed}
                        />
                    </div>
                    <Button
                        className="w-[80%] py-4 mx-auto block my-10"
                        title="Sign Up"
                        isLoading={isLoading}
                        disabled={isLoading}
                    />
                </form>
            </div>
        </section>
    );
}

SignUp.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout showFooter={false}>{page}</HomeLayout>;
};

export default SignUp;
