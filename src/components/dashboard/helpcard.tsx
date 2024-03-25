import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface HelpProps {
    title: string;
    icon: ReactNode; // Change the type to ReactNode to allow for SVG elements
    // href: string;
    bgColor: string;
}

const Help: FC<HelpProps> = ({ title, icon, bgColor }) => {
    return (
        <div
            className="border rounded-lg border-gray-300 p-4 w-full"
            style={{ cursor: 'pointer' }}
        >
            <a className="flex gap-5 items-center">
                <div
                    className="flex justify-center items-center w-10 h-10 rounded-full"
                    style={{
                        backgroundColor: bgColor,
                    }}
                >
                    {icon}
                </div>

                <p className="text-center">{title}</p>
            </a>
        </div>
    );
};

export default Help;
