import Dashboard from '..';
import DashboardHeader from 'components/dashboard/Header';
import VerifyForm from 'components/dashboard/tenants/verify/VerifyTenantForm';

export default function VerifyTenantForm() {
    return (
        <section>
            <DashboardHeader title="Verify Tenants" backButton={true}>
                <p>
                    Please enter details about your tenant below so we can help
                    you verify details about them
                </p>
            </DashboardHeader>
            <VerifyForm />;
        </section>
    );
}

VerifyTenantForm.auth = true;
// Dashboard.onboarded = true;

VerifyTenantForm.getLayout = Dashboard.getLayout;
