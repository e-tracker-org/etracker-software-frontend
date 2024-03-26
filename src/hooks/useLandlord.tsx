import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TenantService } from 'services';
import { LandlordService, endAgreementTenantProp } from 'services/landlord';
import { PropertyService } from 'services/property';

const useLandlord = (id?: string | undefined) => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: getLandlordTenants,
        isLoading: getLandlordTenantsLoading,
    } = useMutation({
        mutationFn: LandlordService.searchLandlordTenant,
    });

    const { mutateAsync: addLandlordTenant, isLoading: isAddTenantLoading } =
        useMutation({
            mutationFn: LandlordService.createLandlordTenant,
        });

    const { mutateAsync: confirmTenant, isLoading: isConfirmTenantLoading } =
        useMutation({
            mutationFn: LandlordService.confirmTenant,
        });

    const {
        mutateAsync: endTenantAgreement,
        isLoading: isEndTenantAgreementLoading,
    } = useMutation<unknown, unknown, endAgreementTenantProp>(
        (props: endAgreementTenantProp) =>
            LandlordService.endTenantAgreement(props)
    );

    return {
        getLandlordTenants,
        getLandlordTenantsLoading,
        addLandlordTenant,
        isAddTenantLoading,
        confirmTenant,
        isConfirmTenantLoading,
        endTenantAgreement,
        isEndTenantAgreementLoading,
    };
};

export default useLandlord;
