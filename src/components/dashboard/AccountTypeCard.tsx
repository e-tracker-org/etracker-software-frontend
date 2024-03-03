import { useAppStore } from 'hooks/useAppStore';
import { KycStatus } from 'interfaces';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

interface AccountTypeProps {
    accountType?: string;
    status?: string;
    onClick?: () => void;
}

const AccountTypeCard: FC<AccountTypeProps> = ({ accountType, onClick }) => {
    const [accountStatus, setAccountStatus] = useState<boolean>(false);
    const router = useRouter();
    const states = useAppStore();

    return (
        <button
            className={`flex border border-[#D9D9D9] p-3 rounded-md justify-between items-center w-full mb-3`}
            onClick={onClick}
        >
            <span className="text-gray-700 font-bold text-[18px]">
                {accountType}
            </span>
            <svg
                width="9"
                height="15"
                viewBox="0 0 9 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1.01953 1.5L7.01953 7.5L1.01953 13.5"
                    stroke="black"
                />
            </svg>
        </button>
    );
};

export default AccountTypeCard;
