import { FC, ReactNode, HTMLAttributes } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

interface BaseModalProps {
    open: boolean;
    onCancel: () => void;
    className?: string;
    title?: string;
    children: ReactNode;
    showClose?: boolean;
    contentStyle?: HTMLAttributes<HTMLDivElement>['style'];
    overlayStyles?: HTMLAttributes<HTMLDivElement>['style'];
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

export const BaseModal: FC<BaseModalProps> = ({
    className,
    open,
    onCancel,
    title,
    children,
    showClose = true,
    contentStyle,
    overlayStyles,
}) => {
    return (
        <>
            {open && (
                <Modal
                    style={{
                        //@ts-ignore
                        content: { ...customStyles, ...contentStyle },
                        overlay: {
                            backgroundColor: '#ffffffde',
                            fontFamily:
                                "'__DM_Sans_b05326', '__DM_Sans_Fallback_b05326'",
                            ...overlayStyles,
                        },
                    }}
                    isOpen={open}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={onCancel}
                    className={`min-w-[600px] max-sm:w-[90%] shadow-2xl rounded-lg p-10  bg-white ${className}`}
                    contentLabel={title}
                >
                    {showClose && (
                        <div className="relative w-full mb-2 font-sans">
                            <button
                                className="absolute right-0 -top-1 text-black text-md"
                                onClick={onCancel}
                            >
                                &#x2715;
                            </button>
                        </div>
                    )}
                    {children}
                </Modal>
            )}
        </>
    );
};
