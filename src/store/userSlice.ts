import { CurrentKyc, User } from 'interfaces';
import { StateCreator } from 'zustand';

type UserPayload = {
    user?: Partial<User>;
    token?: string;
    isAuthenticated: boolean;
};

export interface UserState {
    token?: string;
    user?: Partial<User> | null;
    isAuthenticated?: boolean;
    activeKyc: CurrentKyc | undefined;
    step: number;
    startKycScreen: string;
    activeAccount: number | undefined;
}

export interface UserAction extends UserState {
    setUser: (payload: Partial<UserPayload>) => void; // set login user
    signout: () => void;
    setActiveKyc: (payload?: CurrentKyc) => void; // set the active account type
    setStep: (payload: number) => void; // set the kyc timeline steps
    goto: (payload: string, count: number) => void; // sidebar menu naviagations
    setStartKycScreen: (payload: string) => void; // set kyc first time new onboarding screen
    setActiveAccount: (payload: number | undefined) => void; // Set active account
}

const initialState: UserState = {
    token: '',
    user: null,
    isAuthenticated: false,
    activeKyc: undefined,
    step: 1,
    startKycScreen: '',
    activeAccount: undefined,
};

export const userSlice: StateCreator<UserState, [], [], UserAction> = (
    set,
    get
) => ({
    ...initialState,
    setUser: (payload) => {
        // Check if this is actually a change
        const currentState = get();
        const isNewUser =
            JSON.stringify(currentState.user) !== JSON.stringify(payload.user);
        const isNewToken = currentState.token !== payload.token;

        if (isNewUser || isNewToken) {
            set((state) => ({
                ...state,
                ...payload,
                isAuthenticated: !!payload.token,
            }));
        }
    },

    setActiveKyc: (payload?: CurrentKyc | undefined) => {
        const currentState = get();
        if (
            JSON.stringify(currentState.activeKyc) !== JSON.stringify(payload)
        ) {
            set((state) => ({
                ...state,
                activeKyc: payload,
            }));
        }
    },

    setStep: (payload: number) => {
        const currentState = get();
        if (currentState.step !== payload) {
            set((state) => ({
                ...state,
                step: payload,
            }));
        }
    },

    goto: (title: string, count: number) => {
        const currentKycStage = get()?.activeKyc?.nextStage ?? 1;
        if (
            (title === 'Profile' ||
                title === 'Upload document' ||
                title === 'Add Property') &&
            count <= +currentKycStage &&
            !get()?.startKycScreen
        ) {
            set((state) => ({ ...state, step: count }));
        }
    },

    setStartKycScreen: (payload: string) => {
        set((state) => ({
            ...state,
            startKycScreen: payload,
        }));
    },

    setActiveAccount: (payload: number | undefined) => {
        const currentState = get();
        if (currentState.activeAccount !== payload) {
            set((state) => ({
                ...state,
                activeAccount: payload,
            }));
        }
    },

    signout: () => {
        localStorage.clear();
        localStorage.removeItem('bound-store');
        set(initialState);
    },
});
