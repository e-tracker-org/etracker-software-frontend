import Loader from 'components/base/Loader';
import DashboardHeader from 'components/dashboard/Header';
import PropertyListing from 'components/dashboard/properties/property-listing';
import useAccountType from 'hooks/useAccountType';
import { useAppStore } from 'hooks/useAppStore';
import useProperty from 'hooks/useProperty';
// import { Property } from 'interfaces';
import React from 'react';
import Dashboard from '..';

export default function Properties() {
    // const states = useAppStore();
    const { acctType } = useAccountType();

    const {
        getMyProperties,
        getMyPropertiesLoading,
        getProperties,
        getPropertiesLoading,
    } = useProperty();

    const properties =
        Number(acctType?.typeID) === 1
            ? getProperties?.data?.data
            : getMyProperties?.data?.data;
    const propertiesLoading =
        Number(acctType?.typeID) === 1
            ? getPropertiesLoading
            : getMyPropertiesLoading;

    return (
        <div>
            <DashboardHeader title="Properties" />

            {propertiesLoading ? (
                <Loader loading={propertiesLoading} />
            ) : (
                <PropertyListing properties={properties} />
            )}
        </div>
    );
}

Properties.auth = true;
// Dashboard.onboarded = true;

Properties.getLayout = Dashboard.getLayout;
