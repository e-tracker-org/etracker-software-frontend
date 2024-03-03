import { ReactNode } from 'react';

export default function DropdownDialog({
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
        <>
            <div className="inline-block relative group">
                <button
                    className={`py-2 px-3 bg-white flex justify-between items-center gap-1 text-lg font-medium rounded-[4px] btn-shadow ${btnClasssName}`}
                    onClick={onClick}
                >
                    <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 10.5C4.9 10.5 4 11.4 4 12.5C4 13.6 4.9 14.5 6 14.5C7.1 14.5 8 13.6 8 12.5C8 11.4 7.1 10.5 6 10.5ZM18 10.5C16.9 10.5 16 11.4 16 12.5C16 13.6 16.9 14.5 18 14.5C19.1 14.5 20 13.6 20 12.5C20 11.4 19.1 10.5 18 10.5ZM12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z"
                            fill="black"
                        />
                    </svg>
                    <span>{title}</span>
                </button>
                <div className="group-hover:block absolute hidden text-black z-40 right-2 rounded-lg drop-shadow-t-xs overflow-hidden min-w-[160px]">
                    <div className="w-4 h-4 ml-auto mr-[20%] mt-1 rotate-45 bg-white"></div>
                    <ul className={`bg-white -mt-[8px] ${ulClassName}`}>
                        {children}
                    </ul>
                </div>
            </div>
        </>
    );
}
