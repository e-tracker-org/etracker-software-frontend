import DashboardHeader from 'components/dashboard/Header';
import PropertyForm from 'components/onboarding/PropertyForm';
import useAccountType from 'hooks/useAccountType';
import React, { ReactElement } from 'react';
import Dashboard from '..';

export default function Property() {
    const { acctType } = useAccountType();
    return (
        <section className="py-5 px-[5%]">
            <DashboardHeader title="Create Property" acctType={acctType} />
            <PropertyForm />;
        </section>
    );
}

Property.auth = true;
// Dashboard.onboarded = true;

Property.getLayout = Dashboard.getLayout;
