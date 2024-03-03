import { AccountType, CurrentKyc, User } from 'interfaces';
import { StateCreator } from 'zustand';

export interface TenantState {
    propertyId: string;
    searchParam: string;
    selectMultiple: boolean;
    selectMultipleAction: 'notify' | 'receipt' | '';
    selectedTenants: string[];
}

export interface TenantAction extends TenantState {
    setPropertyId: (id: string) => void;
    setSearchParam: (text: string) => void;
    setSelectedTenants: (id: string, type?: string) => void;
    clearSelectedTenants: () => void;
    setSelectMultiple: (arg: boolean) => void;
    setSelectMultipleAction: (
        action: TenantState['selectMultipleAction']
    ) => void;
    resetTenantState: () => void;
}

// const resetters: (() => void)[] = [];

const initialState: TenantState = {
    propertyId: '',
    searchParam: '',
    selectedTenants: [],
    selectMultiple: false,
    selectMultipleAction: '',
};

export const tenantSlice: StateCreator<TenantState, [], [], TenantAction> = (
    set,
    get
) => ({
    ...initialState,
    setSearchParam: (text) => {
        set((state) => ({
            ...state,
            searchParam: text,
        }));
    },
    setPropertyId: (id) => {
        set((state) => ({
            ...state,
            propertyId: id,
        }));
    },
    setSelectMultiple: (arg) => {
        set((state) => ({
            ...state,
            selectMultiple: arg,
        }));
    },
    setSelectedTenants: (tenantId, type = 'single') => {
        set((state) => ({
            ...state,
            selectedTenants:
                (type === 'all' &&
                    Array.from(
                        new Set([...state.selectedTenants, tenantId])
                    )) ||
                (type === 'single' && state.selectedTenants.includes(tenantId)
                    ? state.selectedTenants.filter((id) => id !== tenantId)
                    : [...state.selectedTenants, tenantId]),
        }));
    },
    clearSelectedTenants: () => {
        set((state) => ({
            ...state,
            selectedTenants: [] as TenantState['selectedTenants'],
        }));
    },
    setSelectMultipleAction: (action) => {
        set((state) => ({
            ...state,
            selectMultipleAction: action,
        }));
    },
    resetTenantState: () => {
        // Clear local storage
        // localStorage.clear();
        set(initialState);
    },
});
