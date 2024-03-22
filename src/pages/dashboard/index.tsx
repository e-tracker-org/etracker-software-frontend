import DashboardLayout from 'layouts/dashboard';
import { ReactElement } from 'react';
import useAccountType from 'hooks/useAccountType';
import TenantDash from './tenants/tenatDashboard';
import LandlordDash from './landlordDashboard';
import useProperty from 'hooks/useProperty';

export default function Dashboard() {
    const { acctType } = useAccountType();

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
