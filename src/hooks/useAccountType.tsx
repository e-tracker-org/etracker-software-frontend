import { AccountType } from 'interfaces';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { UserService } from 'services';
import { useAppStore } from './useAppStore';

const useAccountType = () => {
    const [acctType, setAcctType] = useState<AccountType>();
    const { data: accountTypes, isLoading: isTypeLoading } = useQuery(
        'getAccountTypes',
        UserService.getAccountTypes
    );
    const states = useAppStore();
    useEffect(() => {
        if (states?.activeAccount && Array.isArray(accountTypes?.data)) {
            const acctType = accountTypes?.data.find(
                (accountype: AccountType) => {
                    const typeID = states?.activeAccount;
                    return Number(accountype?.typeID) === Number(typeID);
                }
            );
            setAcctType(acctType);
        }
    }, [states?.activeAccount, accountTypes?.data]);

    return {
        acctType,
    };
};

export default useAccountType;
