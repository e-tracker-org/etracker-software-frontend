import Dashboard from '..';
import DashboardHeader from 'components/dashboard/Header';
import Default from 'components/dashboard/tenants/default/AddDefaultTenantForm';

export default function VerifyTenantForm() {
    return (
        <section>
            <DashboardHeader title="Default Tenants" backButton={true}>
                <p>
                    Please enter details about your tenant below so we can help
                    you update details about them
                </p>
            </DashboardHeader>
            <Default />;
        </section>
    );
}

VerifyTenantForm.auth = true;
// Dashboard.onboarded = true;

VerifyTenantForm.getLayout = Dashboard.getLayout;
