import { AccountType } from 'interfaces';
import { useEffect, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { UserService } from 'services';
import { useAppStore } from './useAppStore';

const useAccountType = () => {
    const [acctType, setAcctType] = useState<AccountType>();
    const states = useAppStore();

    const { data: accountTypes, isLoading: isTypeLoading } = useQuery(
        'getAccountTypes',
        UserService.getAccountTypes,
        {
            // Don't refetch on window focus to prevent unnecessary updates
            refetchOnWindowFocus: false,
            // Only refetch if actively using the component
            enabled: !!states?.activeAccount,
        }
    );

    const updateAccountType = useCallback(() => {
        if (states?.activeAccount && Array.isArray(accountTypes?.data)) {
            const foundAcctType = accountTypes?.data.find(
                (accountType: AccountType) =>
                    Number(accountType?.typeID) ===
                    Number(states?.activeAccount)
            );

            if (
                foundAcctType &&
                JSON.stringify(foundAcctType) !== JSON.stringify(acctType)
            ) {
                setAcctType(foundAcctType);
            }
        }
    }, [states?.activeAccount, accountTypes?.data, acctType]);

    useEffect(() => {
        updateAccountType();
    }, [updateAccountType]);

    return {
        acctType,
        isLoading: isTypeLoading,
    };
};

export default useAccountType;
