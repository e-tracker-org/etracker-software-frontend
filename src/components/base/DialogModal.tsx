import React, { FC, ReactNode, useEffect, useRef } from 'react';
import Image from 'next/image';

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

export const DialogModal: FC<DialogModalProps> = ({
    openModal,
    closeModal,
    className = '',
    title,
    children,
    showClose = true,
    contentClass = '',
    subTitle,
    icon,
    alternative,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Trap focus inside modal and allow Escape to close
    useEffect(() => {
        if (!openModal) return;
        const focusableEls = modalRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableEls?.[0];
        const lastEl = focusableEls?.[focusableEls.length - 1];

        function handleTab(e: KeyboardEvent) {
            if (!focusableEls || focusableEls.length === 0) return;
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstEl) {
                        e.preventDefault();
                        lastEl?.focus();
                    }
                } else {
                    if (document.activeElement === lastEl) {
                        e.preventDefault();
                        firstEl?.focus();
                    }
                }
            }
            if (e.key === 'Escape' && closeModal) {
                closeModal();
            }
        }

        document.addEventListener('keydown', handleTab);
        return () => document.removeEventListener('keydown', handleTab);
    }, [openModal, closeModal]);

    if (!openModal) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onClick={closeModal}
        >
            <div
                ref={modalRef}
                className={`relative bg-white rounded-2xl shadow-xl w-[95%] sm:w-full max-w-[500px] transform transition-all duration-300 ease-in-out ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {showClose && (
                    <button
                        type="button"
                        className="absolute top-4 right-4 text-black-400 hover:bg-gray-200 hover:text-gray-900 rounded-full p-1 z-10"
                        onClick={closeModal}
                        aria-label="Close modal"
                    >
                        <Image
                            src="/close.svg"
                            alt="Modal Close"
                            width={20}
                            height={20}
                        />
                    </button>
                )}
                <div className={`p-8 ${contentClass}`}>
                    {icon && (
                        <div className="flex justify-center mb-6">
                            <Image
                                src={icon}
                                alt={alternative ?? ''}
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                    )}
                    {title && (
                        <h2 className="text-2xl font-bold mb-3 text-center text-gray-900">
                            {title}
                        </h2>
                    )}
                    {subTitle && (
                        <h3 className="text-sm mb-6 text-center text-gray-600">
                            {subTitle}
                        </h3>
                    )}
                    <div className="space-y-4">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default DialogModal;
