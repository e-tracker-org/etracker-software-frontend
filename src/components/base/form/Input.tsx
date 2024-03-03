import { FC, InputHTMLAttributes, ReactElement, useId, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    register?: Record<string, string | any>;
    label?: string | null;
    error?: any;
    required?: boolean;
    rightElement?: ReactElement;
    leftElement?: ReactElement;
    className?: string;
    asterisk?: boolean;
    inputClassName?: string;
}

const Input: FC<InputProps> = ({
    type = 'text',
    placeholder = '',
    register,
    label,
    error,
    required,
    rightElement,
    leftElement,
    className,
    asterisk = false,
    inputClassName,
    ...props
}) => {
    const [show, setShow] = useState(false);
    const id = useId();

    const toggleShow = () => setShow((prev) => !prev);
    const showPasswordEl = () => (
        <>
            {!show ? (
                <BsEye onClick={toggleShow} />
            ) : (
                <BsEyeSlash onClick={toggleShow} />
            )}
        </>
    );
    return (
        <div className={`mb-4 ${className}`}>
            <div>
                {label && (
                    <label
                        aria-invalid={error}
                        aria-required={required && asterisk}
                        htmlFor={id}
                        className='text-sm text-black 
					backdrop-opacity-60
					aria-[required="true"]:after:content-["*"]
					aria-[required="true"]:after:text-red-600
					aria-[required="true"]:after:m-1
					'
                    >
                        {label}
                    </label>
                )}
                <div className="flex relative mt-3">
                    <input
                        {...props}
                        autoComplete="none"
                        {...register}
                        type={show ? 'text' : type}
                        placeholder={placeholder}
                        id={id}
                        data-invalid={!!error}
                        className={`block px-3 py-4 w-full text-sm text-black 
					 rounded-[3px] border border-gray-300
					 appearance-none bg-[#D9D9D929] data-[invalid='true']:border-red-500
					 focus:outline-none autofill:bg-gray-200
					 focus:ring-0 focus:border-primary-600 peer ${inputClassName}`}
                    />
                    <span className="absolute top-5 right-4 text-gray-400">
                        {rightElement && type !== 'password' && rightElement}
                        {type === 'password' && showPasswordEl()}
                    </span>
                </div>
            </div>

            {error && (
                <p id={`${id}_help`} className="mt-1 mb-2 text-xs text-red-600">
                    {error?.message}
                </p>
            )}
        </div>
    );
};

export default Input;
