import useMediaQuery from 'hooks/useMediaQuery';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { AuthService } from 'services';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import Button from 'components/base/Button';
import Input from 'components/base/form/Input';
import { ReactElement, useState } from 'react';
import HomeLayout from 'layouts/home';
import { BaseModal } from 'components/base/Modal';

const schema = yup.object({
    password: yup.string().required('Enter your password'),
    confirmPassword: yup
        .string()
        .equals([yup.ref('password')], 'Both password must be the same'),
    otp: yup.string().required('Enter your code'),
});

export default function ForgottenPassword() {
    const [success, setSuccess] = useState(false);

    const router = useRouter();
    const { width } = useMediaQuery();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { isLoading, mutate } = useMutation({
        mutationFn: AuthService.resetPassword,
        onSuccess(data, variables, context) {
            toast.success(data?.data?.message);
            setSuccess(true);
        },
        onError(data: AxiosError<any>) {
            toast.error(data?.response?.data?.message);
        },
    });

    const onSubmit = (values: any) => {
        mutate({ ...values, email: router.query?.email });
    };

    if (width > 786) {
        router.replace('/auth/signin');
    }

    return (
        <div className="py-3 md:px-10 xl:px-32 2xl:px-60 md:py-10 lg:w-[90%] 2xl:w-5/6 mx-auto">
            <h2 className="text-xl text-center md:text-2xl text-3.5xl font-bold my-4">
                Update password
            </h2>

            <p className="">
                We&apos;ve sent a verification code to your email. Enter the
                code here, with your new password details.
            </p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="md:px-5 lg:px-40 py-10 md:py-10"
            >
                <Input
                    label="Code"
                    error={errors.code}
                    register={{ ...register('otp') }}
                    required
                    placeholder="Enter code"
                />
                <Input
                    label="New password"
                    error={errors.password}
                    register={{ ...register('password') }}
                    required
                    placeholder="Enter new password"
                />
                <Input
                    label="Confirm password"
                    error={errors.confirmPassword}
                    register={{ ...register('confirmPassword') }}
                    required
                    placeholder="confirm password"
                />

                <Button
                    className="w-[80%] py-4 mx-auto block mt-20"
                    title="Reset Password"
                    isLoading={isLoading}
                    disabled={isLoading}
                />
            </form>

            {success && (
                <BaseModal open={success} onCancel={() => {}} showClose={false}>
                    <div className="flex flex-col gap-5 items-center">
                        <svg
                            width="71"
                            height="70"
                            viewBox="0 0 71 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M35.5 65.4767C35.5 65.4767 61.4647 56.7466 61.4647 34.9212"
                                stroke="#2F42ED"
                                strokeWidth="4.21522"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M61.4647 34.9212V8.7307C61.4647 8.7307 52.8098 4.36562 35.5 4.36562"
                                stroke="#2F42ED"
                                strokeWidth="4.21522"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M35.4999 65.4767C35.4999 65.4767 9.53516 56.7466 9.53516 34.9212"
                                stroke="#2F42ED"
                                strokeWidth="4.21522"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9.53516 34.9212V8.73069C9.53516 8.73069 18.1901 4.36561 35.4999 4.36561"
                                stroke="#2F42ED"
                                strokeWidth="4.21522"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M52.8107 17.4608C35.5009 30.5561 31.1735 48.0164 31.1735 48.0164C31.1735 48.0164 26.846 42.8062 22.5186 39.2862"
                                stroke="#2F42ED"
                                strokeWidth="4.21522"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <h3 className="text-2xl font-bold">
                            Succesfully updated
                        </h3>
                        <p className="font-light font-base text-center">
                            Your password has been successfully updated, you can
                            now use your new password to login at your
                            convenience.
                        </p>
                        <Button
                            className="w-full py-4 mx-auto block"
                            title="Log in"
                            onClick={() => router.push('/auth/signin')}
                        />
                    </div>
                </BaseModal>
            )}
        </div>
    );
}

ForgottenPassword.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout showFooter={false}>{page}</HomeLayout>;
};
