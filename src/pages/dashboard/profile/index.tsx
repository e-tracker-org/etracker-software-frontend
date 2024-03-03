import DashboardHeader from 'components/dashboard/Header';
import ProfileForm from 'components/onboarding/ProfileForm';
import useAccountType from 'hooks/useAccountType';
import React, { ReactElement } from 'react';
import Dashboard from '..';

export default function Profile() {
    const { acctType } = useAccountType();
    return (
        <section className="py-5 px-[5%]">
            <DashboardHeader title="Account Profile" acctType={acctType} />
            <ProfileForm />;
        </section>
    );
}

Profile.auth = true;
// Dashboard.onboarded = true;

Profile.getLayout = Dashboard.getLayout;
