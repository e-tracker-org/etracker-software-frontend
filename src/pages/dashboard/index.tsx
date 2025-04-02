import DashboardLayout from 'layouts/dashboard';
import { ReactElement } from 'react';
import useAccountType from 'hooks/useAccountType';
import TenantDash from './tenants/tenatDashboard';
import LandlordDash from './landlordDashboard';
import { useAppStore } from 'hooks/useAppStore';

export default function Dashboard() {
    const { acctType } = useAccountType();
    const states = useAppStore();
    // @ts-ignore
    const accountType = states?.user?.currentKyc?.accountType;

    if (!acctType) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            {accountType === 1 ? <TenantDash /> : <LandlordDash />}
        </section>
    );
}

Dashboard.auth = true;
Dashboard.getLayout = function getLayout(page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};