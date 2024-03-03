import { DetailedHTMLProps, FC, HTMLAttributes, ReactElement } from 'react';

type Props = {
    label?: string | ReactElement;
    register?: Record<string, string | any>;
    error?: any;
    circular?: boolean;
    className?: string;
    labelClassName?: string;
    checked?: boolean;
    readOnly?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Checkbox: FC<Props> = ({
    label,
    register,
    error,
    circular,
    className,
    labelClassName,
    checked = false,
    ...props
}) => {
    if (circular) {
        return (
            <>
                <style jsx>{`
                    .round {
                        position: relative;
                    }

                    .round label {
                        background-color: #fff;
                        border: 1px solid #ccc;
                        border-radius: 50%;
                        cursor: pointer;
                        height: 28px;
                        left: 0;
                        position: absolute;
                        top: 0;
                        width: 28px;
                    }

                    .round label:after {
                        border: 2px solid #fff;
                        border-top: none;
                        border-right: none;
                        content: '';
                        height: 6px;
                        left: 7px;
                        opacity: 0;
                        position: absolute;
                        top: 8px;
                        transform: rotate(-45deg);
                        width: 12px;
                    }

                    .round input[type='checkbox'] {
                        visibility: hidden;
                    }

                    .round input[type='checkbox']:checked + label {
                        background-color: #2f42ed;
                        border-color: #2f42ed;
                    }

                    .round input[type='checkbox']:checked + label:after {
                        opacity: 1;
                    }
                `}</style>
                <div className="round">
                    <input
                        type="checkbox"
                        id="checkbox"
                        {...register}
                        {...props}
                        checked={checked}
                    />
                    <label
                        htmlFor="checkbox"
                        className={`${labelClassName}`}
                    ></label>
                </div>
            </>
        );
    }

    return (
        <div>
            <div className={`flex items-start mb-4 ${className}`}>
                <input
                    {...register}
                    {...props}
                    id="checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 bg-[#D9D9D929]
				 border-gray-100 rounded-[3px] focus:ring-primary-200 
				 "
                />
                <label
                    htmlFor="checkbox"
                    className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-500"
                >
                    {label}
                </label>
            </div>
            {error && (
                <p className="mt-1 mb-2 text-xs text-red-600">
                    {error?.message}
                </p>
            )}
        </div>
    );
};

export default Checkbox;
