import DashboardLayout from 'layouts/dashboard';
import { ReactElement } from 'react';
import useAccountType from 'hooks/useAccountType';
import TenantDash from './tenants/tenatDashboard';
import LandlordDash from './landlordDashboard';
import useProperty from 'hooks/useProperty';
import { useAppStore } from 'hooks/useAppStore';

export default function Dashboard() {
    const { acctType } = useAccountType(); // we can revert this when we figure out why it isnt working.
    const states = useAppStore();
    // @ts-ignore
    // const accountType = states?.user?.currentKyc?.accountType;

    if (acctType) {
        return (
            <section>
                {acctType.typeID === 1 ? <TenantDash /> : <LandlordDash />}
            </section>
        );
    } else {
        return <div>Loading...</div>;
    }
}

Dashboard.auth = true;
// Dashboard.onboarded = true;

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
