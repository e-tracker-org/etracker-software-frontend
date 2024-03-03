import { useAppStore } from 'hooks/useAppStore';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const IdleTimeout = ({ timeoutSeconds }: { timeoutSeconds: number }) => {
    const logoutTimer = useRef<NodeJS.Timeout | null>(null);
    const states = useAppStore();
    const router = useRouter();

    const startLogoutTimer = () => {
        logoutTimer.current = setTimeout(logout, timeoutSeconds * 1000);
    };

    const resetLogoutTimer = () => {
        if (logoutTimer.current) {
            clearTimeout(logoutTimer.current);
            startLogoutTimer();
        }
    };

    const logout = () => {
        // Perform the logout action here
        // e.g., clear session data, redirect to login page, etc.
        states?.signout();
    };

    useEffect(() => {
        startLogoutTimer();

        const handleUserActivity = () => {
            resetLogoutTimer();
        };

        // Attach event listeners for user activity
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        return () => {
            // Clean up event listeners when the component unmounts
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
            if (logoutTimer.current) {
                clearTimeout(logoutTimer.current);
            }
        };
    }, []);

    return <></>; // Placeholder component, can be omitted
};

export default IdleTimeout;
