import { ReactNode } from 'react';

export default function Dropdown({
    children,
    title,
    className,
    ulClassName,
    btnClasssName,
    onClick,
}: {
    children: ReactNode;
    title?: ReactNode;
    className?: string;
    btnClasssName?: string;
    ulClassName?: string;
    onClick?: () => void;
}) {
    return (
        <div className={`${className}`}>
            <div className="inline-block relative group">
                <button
                    className={`bg-transparent text-inherit font-semibold py-2 px-4 rounded inline-flex items-center ${btnClasssName}`}
                    onClick={onClick}
                >
                    <span className="mr-1 min-w-[100px] inline-flex items-center">
                        {title}
                    </span>
                    <svg
                        className="fill-current h-6 w-6 group-hover:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </button>
                <ul
                    className={`group-hover:block absolute hidden text-gray-500 z-40 bg-gray-100 rounded-lg overflow-hidden min-w-[160px] ${ulClassName}`}
                >
                    {children}
                </ul>
            </div>
        </div>
    );
}
