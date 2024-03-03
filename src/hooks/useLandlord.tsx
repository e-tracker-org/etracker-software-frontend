import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TenantService } from 'services';
import { LandlordService } from 'services/landlord';
import { PropertyService } from 'services/property';

const useLandlord = (id?: string | undefined) => {
    const queryClient = useQueryClient();
    // const { data: getTenants, isLoading: getTenantLoading } = useQuery(
    //     'getTenants',
    //     LandlordService.getAllTenants
    // );

    const { mutateAsync: getLandlordTenants, isLoading } = useMutation({
        mutationFn: LandlordService.searchLandlordTenant,
        // onSuccess: () => {},
    });

    const { mutateAsync: addLandlordTenant, isLoading: isAddTenantLoading } =
        useMutation({
            mutationFn: LandlordService.createLandlordTenant,
            // onSuccess: () => {},
        });

    const { mutateAsync: confirmTenant, isLoading: isConfirmTenantLoading } =
        useMutation({
            mutationFn: LandlordService.confirmTenant,
            // onSuccess: () => {},
        });

    return {
        getLandlordTenants,
        isLoading,
        addLandlordTenant,
        isAddTenantLoading,
        confirmTenant,
        isConfirmTenantLoading,
    };
};

export default useLandlord;
