import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { UserAction, userSlice } from './userSlice';
import { OnboardingAction, onboardingSlice } from './onboardingSlice';
import { DashboardAction, dashboardSlice } from './dashboardSlice';
import { TenantAction, tenantSlice } from './tenantSlice';

export const useBoundStore = create<
    UserAction & OnboardingAction & DashboardAction & TenantAction,
    [
        ['zustand/devtools', never],
        [
            'zustand/persist',
            UserAction & OnboardingAction & DashboardAction & TenantAction
        ]
    ]
>(
    devtools(
        persist(
            (...a) => ({
                ...userSlice(...a),
                ...onboardingSlice(...a),
                ...dashboardSlice(...a),
                ...tenantSlice(...a),
            }),
            { name: 'bound-store' }
        )
    )
);
