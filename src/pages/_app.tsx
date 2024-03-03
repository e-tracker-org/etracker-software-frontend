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

export default function App({ Component, pageProps }: AppWithSessionProps) {
    const [queryClient] = useState(() => new QueryClient());
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

function Auth({
    children,
    onboarded,
}: {
    children: ReactNode;
    onboarded?: boolean;
}) {
    const states = useAppStore();
    const router = useRouter();
    const { asPath } = router;
    //Checks if there is an active or on going kyc and redirect to the appropriate route
    // useEffect(() => {
    //     if (states?.user?.currentKyc) {
    //         const screen = urlSegment(asPath);
    //         goBackToKyc(screen, states, router);
    //     }
    // }, [states?.user?.currentKyc]);

    if (!states?.token) {
        return <NavLink href="/auth/signin" />;
    }

    return (
        <>
            <IdleTimeout timeoutSeconds={20} />
            {children}
        </>
    );
}
