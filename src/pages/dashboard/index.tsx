import DashboardLayout from 'layouts/dashboard';
import { ReactElement } from 'react';

export default function Dashboard() {
    return <section>Dashboard!!!</section>;
}

Dashboard.auth = true;
// Dashboard.onboarded = true;

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
