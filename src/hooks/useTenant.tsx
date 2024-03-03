import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TenantService } from 'services';
import { PropertyService } from 'services/property';

const useTenant = (
    reqObj?: {
        propertyId?: string | undefined;
        searchParam?: string | undefined;
    },
    id?: string | undefined
) => {
    const [searchTerm, setSearchTerm] = useState<string | undefined>('');

    const queryClient = useQueryClient();

    const { data: getTenants, isLoading: getTenantLoading } = useQuery(
        'getTenants',
        TenantService.getAllTenants
    );

    const { mutateAsync: getLandlordTenants, isLoading } = useMutation({
        mutationFn: TenantService.searchLandlordTenant,
        // onSuccess: () => {},
    });

    const {
        data: getTenantsByProperty,
        isLoading: getTenantsByPropertyLoading,
    } = useQuery(
        ['getTenantByProperty', reqObj],
        TenantService.searchTenantByProperty
    );

    const { mutateAsync: notifyTenant, isLoading: isNotifyTenantLoading } =
        useMutation({
            mutationFn: TenantService.notifyTenants,
            // onSuccess: () => {},
        });

    const {
        data: getReceiptCategories,
        isLoading: getReceiptCategoriesLoading,
    } = useQuery('getReceiptCategories', TenantService.getReceiptCategories);

    const {
        mutateAsync: createTransaction,
        isLoading: createTransactionLoading,
    } = useMutation({
        mutationFn: TenantService.createTransaction,
        // onSuccess: () => {},
    });

    return {
        getTenants,
        getTenantLoading,
        getLandlordTenants,
        isLoading,
        getTenantsByProperty,
        getTenantsByPropertyLoading,
        setSearchTerm,
        searchTerm,
        notifyTenant,
        isNotifyTenantLoading,
        getReceiptCategories,
        getReceiptCategoriesLoading,
        createTransaction,
        createTransactionLoading,
    };
};

export default useTenant;
