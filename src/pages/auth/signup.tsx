import Checkbox from 'components/base/form/Checkbox';
import Link from 'next/link';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { AuthService } from 'services';
import { ReactElement, useState, useEffect } from 'react';
import HomeLayout from 'layouts/home';
import { MutationKey } from 'react-query';
import { useRouter } from 'next/router';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useAppStore } from 'hooks/useAppStore';
import {
    HiOutlineUser,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLockClosed,
    HiOutlineEye,
    HiOutlineEyeOff,
} from 'react-icons/hi';
import Image from 'next/image';

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
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const mutationKey: MutationKey = 'register';
    const queryClient = useQueryClient();
    const { mutateAsync: registerAsync, isLoading } = useMutation(
        mutationKey,
        AuthService.signup,
        { onSuccess: () => queryClient.invalidateQueries('getUserData') }
    );
    const states = useAppStore();
    const router = useRouter();
    const {
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (states?.user) {
            toast.success(`Welcome back, ${states?.user?.firstname}!`);
            router.push('/dashboard');
        }
    });

    const onSubmit = async (values: any) => {
        // Clear previous error message
        setErrorMessage('');

        const userObj = {
            firstname: values.firstName,
            lastname: values.lastName,
            confirmPassword: values.confirmPassword,
            phone: values.phone,
            email: values.email,
            password: values.password,
        };
        registerAsync(userObj)
            .then((data: any) => {
                if (data.success) {
                    setShowMessage(data?.message);
                    reset({});
                    setTimeout(() => {
                        router.push('/auth/signin');
                    }, 3000);
                }
            })
            .catch((error) => {
                console.log('Registration error:', error);
                // Show the specific error message on the form
                const errorMsg =
                    error?.response?.data?.message ||
                    error?.message ||
                    'Something went wrong, please try again';
                setErrorMessage(errorMsg);
            });
    };

    return (
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
                            Welcome to E-tracka
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            The most trusted property management platform for
                            landlords, tenants, and real estate professionals.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                                <span className="text-blue-100">
                                    Secure tenant management
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                                <span className="text-blue-100">
                                    Real-time property tracking
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                                <span className="text-blue-100">
                                    Automated rent collection
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
                            <HiOutlineUser className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Create Your Account
                        </h1>
                        <p className="text-gray-600">
                            Join thousands of property managers using{' '}
                            <span className="font-semibold text-blue-600">
                                E-tracka
                            </span>
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
                                        onClick={() => setShowMessage('')}
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
                                        onClick={() => setErrorMessage('')}
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
                            {/* Name Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <HiOutlineUser className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter your first name"
                                            {...register('firstName')}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                    {errors.firstName && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {String(errors.firstName.message)}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <HiOutlineUser className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter your last name"
                                            {...register('lastName')}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                    {errors.lastName && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {String(errors.lastName.message)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
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

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <HiOutlinePhone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        {...register('phone')}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {String(errors.phone.message)}
                                    </p>
                                )}
                            </div>

                            {/* Password Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            placeholder="Create a password"
                                            {...register('password')}
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
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
                                            {String(errors.password.message)}
                                        </p>
                                    )}
                                    {/* Password Strength Bar */}
                                    <div className="mt-2">
                                        <PasswordStrengthBar
                                            password={watch('password')}
                                            scoreWords={['', '', '', '', '']}
                                            shortScoreWord=""
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Confirm your password"
                                            {...register('confirmPassword')}
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showConfirmPassword ? (
                                                <HiOutlineEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <HiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {String(
                                                errors.confirmPassword.message
                                            )}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    {...register('agreed')}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-700">
                                    I agree to the{' '}
                                    <Link
                                        href="/terms"
                                        className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Terms and Conditions
                                    </Link>
                                </label>
                            </div>
                            {errors.agreed && (
                                <p className="text-sm text-red-600">
                                    {String(errors.agreed.message)}
                                </p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {isLoading
                                    ? 'Creating Account...'
                                    : 'Create Account'}
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

                            {/* Sign In Link */}
                            <div className="text-center">
                                <span className="text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link
                                        href="/auth/signin"
                                        className="font-medium text-blue-600 hover:text-blue-700"
                                    >
                                        Sign In
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
    );
}

SignUp.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout showFooter={true}>{page}</HomeLayout>;
};

export default SignUp;
