import React from 'react';

import { FC, ReactNode, HTMLAttributes } from 'react';
import Image from 'next/image';
import Button from './Button';

interface DialogModalProps {
    openModal: boolean | undefined;
    closeModal?: () => void;
    className?: string;
    title?: string;
    children?: ReactNode;
    showClose?: boolean;
    contentClass?: string;
    subTitle?: string;
    icon?: string;
    alternative?: string | undefined;
}

const customStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    zIndex: 10000,
};

export const DialogModal: FC<DialogModalProps> = ({
    openModal,
    closeModal,
    className,
    title,
    children,
    showClose,
    contentClass,
    subTitle,
    icon,
    alternative,
}) => {
    return openModal ? (
        <div
            id="defaultModal"
            aria-hidden="true"
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 touch-none`}
            onClick={closeModal}
        >
            <div
                className={`bg-white  rounded-lg overflow-hidden ${className} max-h-screen overflow-y-auto w-full sm:w-auto`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal content */}
                <div className="p-4">
                    {/* Modal header */}
                    {showClose && (
                        <button
                            type="button"
                            className="absolute top-[20%] lg:top-[15%] lg:right-[10%] right-2 text-black-400 hover:bg-gray-200 hover:text-gray-900 rounded-full p-1"
                            onClick={closeModal}
                        >
                            <Image
                                src="/close.svg"
                                alt="Modal Close"
                                width={20}
                                height={20}
                            />
                        </button>
                    )}
                    {/* Modal body */}
                    <div
                        className={`py-4 ${contentClass}`}
                        style={{ textAlign: 'center' }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {icon && (
                                <Image
                                    src={icon}
                                    alt={alternative ?? ''}
                                    width={200}
                                    height={200}
                                />
                            )}
                            {title && (
                                <h2 className="text-lg  font-bold mb-4">
                                    {title}
                                </h2>
                            )}
                            {subTitle && (
                                <h3 className="text-sm  mb-4 w-[120px]">
                                    {subTitle}
                                </h3>
                            )}
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};
