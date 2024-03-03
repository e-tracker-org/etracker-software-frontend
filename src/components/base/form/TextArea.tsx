import { FC, HTMLAttributes, ReactElement, useId } from 'react';

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
    register?: Record<string, string | any>;
    label?: string | null;
    error?: any;
    required?: boolean;
    rightElement?: ReactElement;
    leftElement?: ReactElement;
    className?: string;
    asterisk?: boolean;
    TextAreaClassName?: string;
}

const TextArea: FC<TextAreaProps> = ({
    placeholder = '',
    register,
    label,
    error,
    required,
    rightElement,
    leftElement,
    className,
    asterisk = false,
    TextAreaClassName,
    ...props
}) => {
    const id = useId();

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
                    <textarea
                        {...props}
                        {...register}
                        placeholder={placeholder}
                        id={id}
                        data-invalid={!!error}
                        className={`block px-3 py-4 w-full text-sm text-black 
					 rounded-[3px] border border-gray-300
					 appearance-none data-[invalid='true']:border-red-500
					 focus:outline-none autofill:bg-gray-200
					 focus:ring-0 focus:border-primary-600 peer ${TextAreaClassName}`}
                    ></textarea>
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

export default TextArea;
