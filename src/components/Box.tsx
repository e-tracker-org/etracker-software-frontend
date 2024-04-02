import { FC, ReactNode } from 'react';

interface BoxProps {
    title: string;
    icon: ReactNode;
    onClick: (route: string) => void;
    route: string;
}

const Box: FC<BoxProps> = ({ title, icon, onClick, route }) => {
    const handleClick = () => {
        onClick(route);
    };

    return (
        <div
            style={{ cursor: 'pointer', minWidth: 130 }}
            className="bg-[#F3F4FD] rounded-lg p-4"
        >
            <a className="flex flex-col items-center" onClick={handleClick}>
                {/* Render the icon directly */}
                {icon}
                <p className="text-center">{title}</p>
            </a>
        </div>
    );
};

export default Box;
