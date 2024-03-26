import Dashboard from '..';
import { useEffect, useState } from 'react';
import Button from 'components/base/Button';
import { useRouter } from 'next/router';
import Dropdown from 'components/base/Dropdown';
import TenantTable from 'components/dashboard/tenants/verify/TenantTable';
import DashboardHeader from 'components/dashboard/Header';
import { useAppStore } from 'hooks/useAppStore';
import useTenant from 'hooks/useTenant';
import { getLandlordTenant } from '../../../../services/newServices/tenant';

export default function VeriifyTenants() {
    const router = useRouter();

    const states = useAppStore();

    const [tenants, setTenants] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            const tenantData = await getLandlordTenant(states?.user?.id);
            setTenants(tenantData);
            setLoading(false);
        }
        if (states?.user?.id) {
            fetchData();
        }
    }, [states]);

    return (
        <div className="">
            <DashboardHeader title="Verify Tenants">
                <div className="flex justify-between">
                    <p className="pt-4 w-2/5 text-[18px] font-medium">
                        Review tenants profile before lease approval.
                    </p>

                    <div className="flex justify-end items-center gap-x-8">
                        <Dropdown
                            title="All Request"
                            className="bg-white"
                            ulClassName="bg-white rounded-lg dropdown-shadow min-w-[220px] text-gray-700 font-medium"
                        >
                            <li className="py-5 px-5 border-b border-b-[#E7E5E5] cursor-pointer">
                                All Request
                            </li>
                            <li className="py-5 px-5 border-b border-b-[#E7E5E5] cursor-pointer">
                                Complete Request
                            </li>
                            <li className="py-5 px-5 border-b border-b-[#E7E5E5] cursor-pointer">
                                Pending Request
                            </li>
                            <li className="py-5 px-5 border-b border-b-[#E7E5E5] cursor-pointer">
                                Incomplete Request
                            </li>
                        </Dropdown>

                        <Button
                            className="flex items-center max-h-[47px] !text-base !font-bold px-8 py-3"
                            onClick={() => {
                                router.push(
                                    '/dashboard/tenants/verify/request'
                                );
                            }}
                        >
                            Verify Tenants
                        </Button>
                    </div>
                </div>
            </DashboardHeader>

            <TenantTable tenants={tenants} />
        </div>
    );
}

VeriifyTenants.auth = true;
VeriifyTenants.getLayout = Dashboard.getLayout;
