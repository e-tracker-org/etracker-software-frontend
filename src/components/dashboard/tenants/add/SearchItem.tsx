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
                <div className="min-w-[60px] min-h-[60px] relative rounded-full overflow-clip">
                    <Image src="https://i.pravatar.cc/300" alt="" fill />
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
