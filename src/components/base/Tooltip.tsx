import { ReactNode } from 'react';

export default function ToolTip({
    icon,
    content,
    className,
}: {
    icon: ReactNode;
    content: string;
    className?: string;
}) {
    return (
        <div
            className={`relative flex flex-col items-center group ${className}`}
        >
            <span className="peer">{icon}</span>
            <div className="absolute min-w-[220px] -translate-x-32 md:translate-x-0 bottom-10 w-fit flex-col items-center hidden mb-6 peer-hover:flex">
                <span className=" block rounded-md relative z-10 py-2 px-4 text-xs text-white bg-gray-600 shadow-lg">
                    {content}
                </span>
                <div className="w-3 h-3 ml-auto -mr-1.5 md:mx-0 -mt-[30%] md:-mt-2 rotate-45 bg-gray-600"></div>
            </div>
        </div>
    );
}
