import DashboardHeader from 'components/dashboard/Header';
import Dashboard from '..';
import TenantsList from 'components/dashboard/tenants';
import useTenant from 'hooks/useTenant';
import Loader from 'components/base/Loader';
import { User } from 'interfaces';
import { useState } from 'react';
import { useAppStore } from 'hooks/useAppStore';
// import { GenericResponse } from 'services';

export default function Tenants() {
    const states = useAppStore();

    const { getTenantsByProperty, getTenantsByPropertyLoading } = useTenant({
        propertyId: states?.propertyId,
        searchParam: states?.searchParam,
    });

    const tenants = getTenantsByProperty?.data;

    return (
        <div className="">
            <DashboardHeader title="Tenants" />

            {getTenantsByPropertyLoading ? (
                <Loader loading={getTenantsByPropertyLoading} />
            ) : (
                <TenantsList tenants={tenants} />
            )}
        </div>
    );
}

Tenants.auth = true;
Tenants.getLayout = Dashboard.getLayout;
