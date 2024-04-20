import { ReactNode, ChangeEvent, useId } from 'react';

interface Props {
    children: ReactNode;
    register?: Record<string, string | any>;
    label?: string | null;
    value?: string;
    error?: any;
    required?: boolean;
    className?: string;
    selectDivClassName?: string;
    selectClassName?: string;
    labelClassName?: string;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void; // Add onChange prop
}

export default function Select({
    register,
    value,
    children,
    error,
    required,
    label,
    className,
    selectDivClassName,
    selectClassName,
    labelClassName,
    placeholder,
    onChange, // Destructure onChange from props
}: Props) {
    const id = useId();
    return (
        <div className={`mb-3 ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    aria-invalid={error}
                    aria-required={required}
                    className={`text-sm text-black 
					backdrop-opacity-60
					aria-[required="true"]:after:content-["*"]
					aria-[required="true"]:after:text-red-600
					aria-[required="true"]:after:m-1 ${labelClassName}`}
                >
                    {label}
                </label>
            )}
            <div
                className={`mt-3 px-3 py-2 border rounded-[3px]  bg-[#D9D9D929] data-[invalid='true']:border-red-500 border-gray-300 focus:border-primary-600 ${selectDivClassName}`}
            >
                <select
                    placeholder={placeholder}
                    id={id}
                    {...register}
                    value={value} // Include value prop here
                    onChange={onChange} // Pass onChange handler to the select element
                    className={`block px-3 py-2 w-full text-sm text-black 
					 focus:outline-none autofill:bg-gray-200 bg-transparent bg-opacity-0
					 focus:ring-0 focus:border-none peer ${selectClassName}`}
                >
                    {children}
                </select>
            </div>
            {error && (
                <p id={`${id}_help`} className="mt-1 mb-2 text-xs text-red-600">
                    {error?.message}
                </p>
            )}
        </div>
    );
}
