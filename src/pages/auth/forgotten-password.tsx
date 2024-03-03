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
import { HiOutlineUser } from 'react-icons/hi';
import { ReactElement } from 'react';
import HomeLayout from 'layouts/home';

const schema = yup.object({
    email: yup
        .string()
        .email()
        .lowercase()
        .trim()
        .required('Enter email address'),
});

export default function ForgottenPassword() {
    const router = useRouter();
    const { width } = useMediaQuery();

    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { isLoading, mutate } = useMutation({
        mutationFn: AuthService.requestPasswordReset,
        onSuccess(data, variables, context) {
            toast.success(data?.data?.message);
            router.push(`/auth/reset-password?email=${watch('email')}`);
        },
        onError(data: AxiosError<any>) {
            toast.error(data?.response?.data?.message);
        },
    });

    const onSubmit = (values: any) => {
        mutate(values);
    };

    if (width > 786) {
        router.replace('/auth/signin');
    }

    return (
        <div className="py-3 md:px-10 xl:px-32 2xl:px-60 md:py-10 lg:w-[90%] 2xl:w-5/6 mx-auto">
            <h2 className="text-xl text-center md:text-2xl text-3.5xl font-bold my-4">
                Forgot password
            </h2>

            <p className="">
                Enter your email address associated with your{' '}
                <span className="text-primary-600 font-semibold">E-tracka</span>{' '}
                account and we will send a link to reset your password.
            </p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="md:px-5 lg:px-40 py-10 md:py-10"
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
                {/* <Input
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    required
                    error={errors.password}
                    register={{ ...register('password') }}
                /> */}

                <Button
                    className="w-[80%] py-4 mx-auto block mt-40"
                    title="Send reset link"
                    isLoading={isLoading}
                    disabled={isLoading}
                />
            </form>
        </div>
    );
}

ForgottenPassword.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout showFooter={false}>{page}</HomeLayout>;
};
