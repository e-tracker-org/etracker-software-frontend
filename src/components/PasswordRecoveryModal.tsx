import { BaseModal } from './base/Modal';
import Input from './base/form/Input';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { AuthService } from 'services';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from './base/Button';
import { OTPRequestProp, ResetPasswordProp } from 'interfaces';

const schema1 = yup.object({
    email: yup
        .string()
        .email()
        .lowercase()
        .required('Enter your email address'),
});

const schema2 = yup.object({
    password: yup.string().required('Enter your password'),
    confirmPassword: yup
        .string()
        .equals([yup.ref('password')], 'Both password must be the same'),
    otp: yup.string().required('Enter your code'),
});

export default function PasswordRecoveryModal({
    open,
    onClose,
    mode = 'otp',
}: {
    open: boolean;
    onClose: () => void;
    mode?: 'password' | 'otp';
}) {
    const [currentMode, setCurrentMode] = useState(mode);
    const [email, setEmail] = useState('');
    const [counter, setCounter] = useState(60);

    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(currentMode === 'password' ? schema2 : schema1),
    });

    const { isLoading, mutate } = useMutation<
        unknown,
        any,
        OTPRequestProp | ResetPasswordProp
    >({
        mutationFn:
            currentMode === 'password'
                ? AuthService.resetPassword
                : AuthService.requestPasswordReset,
        onSuccess(data: any) {
            toast.success(data?.message);
            if (currentMode === 'password') {
                onClose();
            } else {
                setCurrentMode('password');
            }
        },
        onError(data: AxiosError<any>) {
            toast.error(data.message);
        },
    });

    const onSubmitEmail = (value: any) => {
        mutate(value);
        setEmail(value.email);
    };

    const onPasswordReset = (values: any) => {
        mutate({
            email,
            otp: values.otp,
            password: values.password,
            confirmPassword: values.confirmPassword,
        });
    };

    const onResend = async () => {
        try {
            const resp = await AuthService.requestPasswordReset({ email });
            toast.success(resp.data.message);
            setCounter(60);
        } catch (error: any) {
            toast.error(error.response?.data?.message);
        }
    };

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (counter >= 1 && currentMode === 'password') {
            timerId = setTimeout(() => {
                setCounter((prev) => prev - 1);
            }, 1000);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [counter, currentMode]);

    return (
        <BaseModal open={open} onCancel={onClose}>
            {currentMode === 'otp' ? (
                <form
                    className="px-10 py-8 max-w-lg"
                    onSubmit={handleSubmit(onSubmitEmail)}
                >
                    <h2 className="text-3xl text-black  mb-5 font-bold text-center">
                        Forgot your password?
                    </h2>
                    <p className="font-normal text-md text-center my-5">
                        Enter your email address associated with your{' '}
                        <span className="text-primary-600 font-bold">
                            E-tracka
                        </span>{' '}
                        account and we will send a link to reset your password
                    </p>
                    <Input
                        error={errors.email}
                        register={{ ...register('email') }}
                        type="email"
                        required
                        label="Enter your email"
                        placeholder="Enter email address"
                    />
                    {false && (
                        <div className="bg-[#FEF9E9] px-6 py-4 flex gap-5 justify-between items-center text-sm text-gray-500">
                            <MdOutlineErrorOutline />
                            <p>
                                Oops! We couldn&apos;t find your email. Resend
                                email that you&apos;ve registered.
                            </p>
                        </div>
                    )}

                    <Button
                        isLoading={isLoading}
                        title="Send Reset Link"
                        className="block w-full py-4 !text-lg"
                    />
                </form>
            ) : (
                <form
                    className="px-10 py-8 max-w-lg"
                    onSubmit={handleSubmit(onPasswordReset)}
                >
                    <h2 className="text-3xl text-black  mb-5 font-bold text-center">
                        Update password
                    </h2>
                    <p className="font-normal text-md text-center my-5">
                        We&apos;ve sent a verification code to your email. Enter
                        the code here, with your new password details.
                    </p>
                    <Input
                        label="Code"
                        error={errors.code}
                        register={{ ...register('otp') }}
                        required
                        placeholder="Enter code"
                        autoFocus
                        type="number"
                        className="appearance-none"
                    />
                    <Input
                        label="New password"
                        error={errors.password}
                        register={{ ...register('password') }}
                        required
                        placeholder="Enter new password"
                        type="password"
                    />
                    <Input
                        label="Confirm password"
                        error={errors.confirmPassword}
                        register={{ ...register('confirmPassword') }}
                        required
                        placeholder="confirm password"
                        type="password"
                    />

                    <Button
                        isLoading={isLoading}
                        title="Change password"
                        className="block w-full py-4 !text-lg"
                    />

                    <p className="mt-5 text-center text-gray-400">
                        You didn&apos;t receive the OTP?{' '}
                        <span
                            onClick={onResend}
                            role="button"
                            className="text-primary-600 font-bold ml-5"
                        >
                            {counter <= 0 ? 'Resend OTP' : `${counter}s`}
                        </span>
                    </p>
                </form>
            )}
        </BaseModal>
    );
}
