import React from 'react';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const RatingModal: React.FC<RatingModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
}) => {
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center ${
                isOpen ? 'visible' : 'hidden'
            }`}
        >
            <div
                className="fixed inset-0 bg-gray-300 bg-opacity-50"
                onClick={onClose}
            ></div>
            <div className="bg-white p-6 rounded-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none p-2"
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-center">{children}</div>
            </div>
        </div>
    );
};

export default RatingModal;
