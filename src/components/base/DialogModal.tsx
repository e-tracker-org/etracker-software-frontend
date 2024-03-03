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
}) => {
    return openModal ? (
        <div
            id="defaultModal"
            aria-hidden="true"
            className={`w-screen h-screen flex flex-col items-center  bg-white md:bg-black/40 fixed z-[1000000000] inset-x-0 top-0 shadow-2xl  transition-all duration-300 ease-in-out px-5 md:px-0 overflow-y-scroll`}
            onClick={() => {}}
        >
            <div
                className={`relative p-2 w-full sm:w-2/5 h-[auto] bg-white z-50 rounded-lg  md:top-[20px] lg:top-[200px] ${className}`}
            >
                {/* <!-- Modal content --> */}
                <div className="relative">
                    <div className="flex flex-col items-center px-2 md:mb-0">
                        {/* <!-- Modal header --> */}

                        <div className="flex flex-end w-full">
                            {showClose ? (
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  ml-auto  inline-flex items-center "
                                    onClick={(e) => {}}
                                >
                                    <Image
                                        src="/close.svg"
                                        alt="Modal Close"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            ) : null}
                        </div>

                        {/* <!-- Modal body --> */}
                        <div
                            className={`flex flex-col m-auto py-14 ${contentClass}`}
                        >
                            {title ? title : ''}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};
