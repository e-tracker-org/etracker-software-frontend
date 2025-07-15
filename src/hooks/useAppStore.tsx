import { useState, useEffect, useMemo } from 'react';
import { useBoundStore } from 'store';
import { UserAction } from '../store/userSlice';
import { OnboardingAction } from '../store/onboardingSlice';
import { DashboardAction } from '../store/dashboardSlice';
import { TenantAction } from '../store/tenantSlice';

type StoreState = UserAction &
    OnboardingAction &
    DashboardAction &
    TenantAction;

export const useAppSelector = <T extends StoreState, F>(
    store: (callback: (state: T) => F) => F,
    callback: (state: T) => F
) => {
    const result = store(callback);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsInitialized(true);
        }
    }, []);

    const memoizedResult = useMemo(() => {
        if (!isInitialized) {
            return undefined;
        }
        return result;
    }, [isInitialized, result]);

    return memoizedResult;
};

export const useAppStore = <T = StoreState,>(
    selector?: (state: StoreState) => T
): T => {
    return useBoundStore(selector || ((state) => state as T));
};
