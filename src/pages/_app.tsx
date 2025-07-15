import type { AppProps } from 'next/app';
import { DM_Sans } from 'next/font/google';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import 'styles/globals.css';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';
import NavLink from 'components/base/NavLink';
import 'animate.css';
import { useAppStore } from 'hooks/useAppStore';
import BannersContainer from 'components/BannersContainer';
import { useRouter } from 'next/router';
import { goBackToKyc, urlSegment } from 'utils/helper';
import IdleTimeout from 'components/base/IdleTimeOut';
import Loader from 'components/base/Loader';

const DMSans = DM_Sans({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    variable: '--font-dm-sans',
    weight: ['400', '500', '700'],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
    auth: boolean;
    onboarded?: boolean;
};

type AppWithSessionProps = AppProps & {
    Component: NextPageWithLayout;
};

function Auth({
    children,
    onboarded,
}: {
    children: ReactNode;
    onboarded?: boolean;
}) {
    const states = useAppStore();
    const router = useRouter();
    const [isRouting, setIsRouting] = useState(false);

    useEffect(() => {
        let mounted = true;

        const checkAuth = async () => {
            // Only handle redirect if we're not already routing and not on signin page
            if (
                !states?.token &&
                !isRouting &&
                router.pathname !== '/auth/signin'
            ) {
                setIsRouting(true);
                await router.replace('/auth/signin');
                if (mounted) {
                    setIsRouting(false);
                }
            }
        };

        checkAuth();

        return () => {
            mounted = false;
        };
    }, [states?.token, router.pathname, isRouting]);

    // Show loading state while routing
    if (isRouting) {
        return <Loader loading={true} />;
    }

    // If we're not authenticated and not on signin page, don't render children
    if (!states?.token && router.pathname !== '/auth/signin') {
        return null;
    }

    return (
        <>
            <IdleTimeout timeoutSeconds={20} />
            {children}
        </>
    );
}

export default function App({ Component, pageProps }: AppWithSessionProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: 1,
                        staleTime: 5000, // Add a small stale time to prevent immediate refetches
                    },
                },
            })
    );
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <main className={`${DMSans.variable} font-sans`}>
                    {Component.auth ? (
                        <Auth onboarded={Component?.onboarded}>
                            {getLayout(<Component {...pageProps} />)}
                        </Auth>
                    ) : (
                        getLayout(<Component {...pageProps} />)
                    )}
                    <BannersContainer />
                    <Toaster toastOptions={{ position: 'top-right' }} />
                </main>
            </Hydrate>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
