import { StateCreator } from 'zustand';

export interface DashboardState {
    screen?: string;
    isLoading: boolean;
}

export interface DashboardAction extends DashboardState {
    setScreen: (payload: Partial<string | undefined>) => void;
    setLoading: (isLoading: boolean) => void;
}

const initialState: DashboardState = {
    screen: '',
    isLoading: false,
};

export const dashboardSlice: StateCreator<
    DashboardState,
    [],
    [],
    DashboardAction
> = (set, get) => ({
    ...initialState,
    setScreen: async (payload) => {
        set((state) => ({ ...state, screen: payload }));
    },
    setLoading: (isLoading) => set({ isLoading }),
});
