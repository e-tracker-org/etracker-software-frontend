import { AccountType, CurrentKyc } from 'interfaces';
import { StateCreator } from 'zustand';

export interface OnboardingState {
    isCompleted: boolean;
    accounttype?: Partial<AccountType>;
    kycStage?: number;
    status: string;
}

export interface OnboardingAction extends OnboardingState {
    goNext: () => void;
    goBack: () => void;
    toggleCompleted: () => void;
    gotokyc: (payload: Partial<AccountType>) => void; // Take you to account first page
    setKycStage: (payload: number) => void;
}

const initialState: OnboardingState = {
    isCompleted: false,
    kycStage: 1,
    status: 'INCOMPLETE',
};

export const onboardingSlice: StateCreator<
    OnboardingState,
    [],
    [],
    OnboardingAction
> = (set, get) => ({
    ...initialState,
    goNext: () => {
        set((state) => ({
            // step: state.step + 1,
        }));
    },

    goBack: () => {
        set((state) => ({
            // step: Math.max(state.step - 1, 1),
        }));
    },

    toggleCompleted: () => {
        set((state) => ({
            isCompleted: !state.isCompleted,
            // step: 1,
        }));
    },

    gotokyc: (payload: Partial<AccountType>) => {
        set((state) => ({
            ...state,
            accounttype: payload,
        }));
    },

    setKycStage: (payload: number) => {
        set((state) => ({
            ...state,
            kycStage: payload,
        }));
    },
});
