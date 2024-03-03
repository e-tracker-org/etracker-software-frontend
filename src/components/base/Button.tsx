import { FC, ReactElement, ReactNode } from 'react';
import Spinner from './Spinner';
import Link from 'next/link';

interface ButtonProps {
    variant?: 'primary' | 'default';
    isLoading?: boolean;
    loadingText?: string;
    title?: string;
    type?: 'submit' | 'button';
    spinnerClassName?: string;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
    onClick?: () => void;
    href?: string;
}

const Button: FC<ButtonProps> = ({
    loadingText,
    isLoading,
    title,
    type = 'submit',
    spinnerClassName,
    disabled,
    className,
    children,
    variant = 'primary',
    onClick,
    href,
}) => {
    const BtnJSX = (
        <button
            onClick={onClick}
            disabled={disabled}
            data-variant={variant}
            type={type}
            className={`active:scale-95 data-[variant="primary"]:text-white data-[variant="primary"]:bg-primary-600 data-[variant="primary"]:hover:bg-primary-700 
        focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:active:scale-100 border
        font-medium rounded-lg text-sm px-6 py-2.5 text-center data-[variant="primary"]:disabled:bg-blue-700 data-[variant="default"]:hover:bg-primary-200 data-[variant="default"]:hover:border-primary-200
        data-[variant="default"]:bg-white data-[variant="default"]:text-primary-600 data-[variant="default"]:border-primary-600 data-[variant="default"]:hover:text-white
        ${className}`}
        >
            {isLoading ? (
                <Spinner className={spinnerClassName} />
            ) : (
                children || title
            )}
        </button>
    );

    return href ? <Link href={href}>{BtnJSX}</Link> : BtnJSX;
};

export default Button;
