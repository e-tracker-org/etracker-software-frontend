import { useAppStore } from 'hooks/useAppStore';
import { User } from 'interfaces';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { goBackToKyc2 } from 'utils/helper';

interface TenantSearchProps {
    tenant: User;
    removeTenant: (item: User) => void;
}

interface AddTenantReqProp {
    email: string;
    propertyId: string;
}

const TenantSearchItem: FC<TenantSearchProps> = ({ tenant, removeTenant }) => {
    const router = useRouter();
    const states = useAppStore();

    return (
        <li className="flex justify-between">
            <div className="my-3 flex items-center gap-6">
                <div className="inline-flex items-center gap-6 mr-2">
                    <div className="w-[60px] h-[60px] relative rounded-full overflow-clip">
                        {tenant?.profileImage ? (
                            <Image src={`${tenant.profileImage}`} alt="" fill />
                        ) : (
                            <label className="pt-10">
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 44 43"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21.9998 0.166626C24.8288 0.166626 27.5419 1.29043 29.5423 3.29082C31.5427 5.29121 32.6665 8.00432 32.6665 10.8333C32.6665 13.6623 31.5427 16.3754 29.5423 18.3758C27.5419 20.3762 24.8288 21.5 21.9998 21.5C19.1709 21.5 16.4578 20.3762 14.4574 18.3758C12.457 16.3754 11.3332 13.6623 11.3332 10.8333C11.3332 8.00432 12.457 5.29121 14.4574 3.29082C16.4578 1.29043 19.1709 0.166626 21.9998 0.166626ZM21.9998 26.8333C33.7865 26.8333 43.3332 31.6066 43.3332 37.5V42.8333H0.666504V37.5C0.666504 31.6066 10.2132 26.8333 21.9998 26.8333Z"
                                        fill="#131313"
                                        fillOpacity="0.65"
                                    />
                                </svg>
                            </label>
                        )}
                    </div>
                </div>
                <label>{`${tenant?.firstname} ${tenant?.lastname}`} </label>
            </div>
            <div className="flex gap-6 items-center">
                <button
                    className="cursor-pointer text-[#2F42ED] font-bold"
                    onClick={() => {
                        const isUserVerify = goBackToKyc2(states, router);
                        //this requires a cleanup. state management to be moved to zustand to ensure data persisitence
                        if (isUserVerify) {
                            router.push(`/dashboard/tenants/${tenant.id}`);
                        }
                    }}
                >
                    View
                </button>
                <button
                    className="cursor-pointer text-red-300 font-bold"
                    onClick={() => {
                        const isUserVerify = goBackToKyc2(states, router);
                        if (isUserVerify) {
                            removeTenant(tenant);
                        }
                    }}
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TenantSearchItem;
