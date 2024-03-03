import { create } from 'zustand';

export interface BannersState {
    current: 'logout' | 'network' | null;
    duration?: number;
    callback?: () => void;
}

export interface BannersAction extends BannersState {
    toggleBanner: (state: BannersState) => void;
}

const initialState: BannersState = {
    current: null,
    duration: 3000,
};

export const useBanners = create<BannersAction>((set, get) => ({
    ...initialState,
    toggleBanner(values) {
        set((state) => ({ ...state, ...values }));
    },
}));
