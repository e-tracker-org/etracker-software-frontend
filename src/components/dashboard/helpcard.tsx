import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface HelpProps {
    title: string;
    icon: ReactNode; // Change the type to ReactNode to allow for SVG elements
    // href: string;
}

const Help: FC<HelpProps> = ({ title, icon }) => {
    return (
        <div className="border rounded-lg border-gray-300 p-4 w-full">
            {/* <Link href={href}> */}
            <a className="flex gap-5 items-center">
                {icon}
                <p className="text-center">{title}</p>
            </a>
        </div>
    );
};

export default Help;
