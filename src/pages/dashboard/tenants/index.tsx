import DashboardHeader from 'components/dashboard/Header';
import Dashboard from '..';
import TenantsList from 'components/dashboard/tenants';
import useTenant from 'hooks/useTenant';
import Loader from 'components/base/Loader';
import { User } from 'interfaces';
import { useEffect, useState } from 'react';
import { useAppStore } from 'hooks/useAppStore';
import { getLandlordTenant } from 'services/newServices/tenant';
import toast from 'react-hot-toast';
// import { GenericResponse } from 'services';

export default function Tenants() {
    const states = useAppStore();
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            try {
                const tenantData = await getLandlordTenant(states?.user?.id);
                setTenants(tenantData);
                setLoading(false);
            } catch (error) {
                // Check if the error is a 404 response
                //@ts-ignore
                if (error.response && error.response.status === 404) {
                    toast.error('No tenant found for the specified landlordId');
                } else {
                    toast.error('An error occurred while fetching data.');
                }
                setLoading(false);
            }
        }

        if (states?.user?.id) {
            fetchData();
        }
    }, [states]);

    return (
        <div className="">
            <DashboardHeader title="Tenants" />

            {loading ? (
                <Loader loading={loading} />
            ) : (
                <TenantsList tenants={tenants} />
            )}
        </div>
    );
}

Tenants.auth = true;
Tenants.getLayout = Dashboard.getLayout;
