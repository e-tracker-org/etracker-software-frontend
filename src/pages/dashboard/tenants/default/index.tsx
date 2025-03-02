import Dashboard from '..';
import { useEffect, useState } from 'react';
import Button from 'components/base/Button';
import { useRouter } from 'next/router';
import Dropdown from 'components/base/Dropdown';
import TenantTable from 'components/dashboard/tenants/default/TenantTable';
import DashboardHeader from 'components/dashboard/Header';
import { useAppStore } from 'hooks/useAppStore';
import useTenant from 'hooks/useTenant';
import { getDefaultTenant } from '../../../../services/newServices/tenant';
import { completeTask } from '../../../../services/newServices/tenant';

export default function VeriifyTenants() {
    const router = useRouter();

    const states = useAppStore();

    const [tenants, setTenants] = useState([]);
    const [shouldRemount, setShouldRemount] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');

    const fetchData = async () => {
        setLoading(true);
        try {
            const tenantData = await getDefaultTenant(states?.user?.id);
            setTenants(tenantData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [states, loading, filter]);

    const handleRemount = async () => {
        setShouldRemount((prevState) => !prevState);
        fetchData(); // Call fetchData again to refresh data
    };

    // console.log(tenants, 'tenants');

    return (
        <div className="">
            <DashboardHeader title="Default Tenants">
                <div className="flex justify-between">
                    <p className="pt-4 w-2/5 text-[18px] font-medium">
                        Review all default tenants
                    </p>

                    <div className="flex justify-end items-center gap-x-8">
                        <Dropdown
                            title="All Request"
                            className="bg-white"
                            ulClassName="bg-white rounded-lg dropdown-shadow min-w-[220px] text-gray-700 font-medium"
                        >
                            <li
                                className="py-5 px-5 border-b border-b-[#E7E5E5] cursor-pointer"
                                onClick={() => setFilter('all')}
                            >
                                All Request
                            </li>
                            <li
                                className="py-5 px-5 border-b border-b-[#E7E5E5] cursor-pointer"
                                onClick={() => setFilter('approved')}
                            >
                                Complete Request
                            </li>
                            <li
                                className="py-5 px-5 border-b border-b-[#E7E5E5] cursor-pointer"
                                onClick={() => setFilter('pending-approval')}
                            >
                                Pending Request
                            </li>

                        </Dropdown>

                        <Button
                            className="flex items-center max-h-[47px] !text-base !font-bold px-8 py-3"
                            onClick={() => {
                                router.push(
                                    '/dashboard/tenants/default/request'
                                );
                            }}
                        >
                            Add Default
                        </Button>
                    </div>
                </div>
            </DashboardHeader>

            <TenantTable
                tenants={tenants}
                shouldRemount={shouldRemount}
                handleRemount={handleRemount}
                filter={filter}
            />
        </div>
    );
}

VeriifyTenants.auth = true;
VeriifyTenants.getLayout = Dashboard.getLayout;
