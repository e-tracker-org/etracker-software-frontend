import { BaseModal } from 'components/base/Modal';
import { useEffect, useState } from 'react';

export interface BannerProps {
    open: boolean;
    onClose: () => void;
    duration?: number;
}

export default function LogoutBanner({ open, onClose }: BannerProps) {
    const [countDown, setCountDown] = useState(20);

    useEffect(() => {
        let timerID: NodeJS.Timeout;

        if (countDown > 0) {
            timerID = setTimeout(() => {
                setCountDown((prev) => prev - 1);
            }, 1000);
        } else {
            onClose();
        }

        return () => clearTimeout(timerID);
    }, [countDown]);

    return (
        <BaseModal open={open} onCancel={onClose}>
            <div className="w-full">
                <p>
                    <span className="text-[30px]">⚠️</span> Your session has
                    expired.
                </p>
                <p>
                    System logging you out...{' '}
                    <span className="text-red-500 font-semibold">{`${countDown}s`}</span>
                </p>
            </div>
        </BaseModal>
    );
}
