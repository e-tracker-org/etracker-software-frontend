import Link from 'next/link';
import Button from 'components/base/Button';
import Image from 'next/image';
import { useAppStore } from 'hooks/useAppStore';
import Dropdown from 'components/base/Dropdown';
import { FiLogOut } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { UserService } from 'services';
import { useRouter } from 'next/router';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import useFileUploadHandler from 'hooks/useFileUploadHandler';
import Spinner from 'components/base/Spinner';
import { DialogModal } from 'components/base/DialogModal';
import Subscription from 'components/Subscription';
import { checkSubscription } from 'services/newServices/user';
import { toast } from 'react-hot-toast';
import SwitchAccountCard from 'components/dashboard/SwitchAccountCard';
import { getSubscriptionStatus } from 'utils/subscriptionUtils';

type HeaderProps = {
    variant?: 'onboarding' | 'default';
    isSidenavOpen?: boolean;
    toggleSidenav?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
};

export default function Header({
    variant = 'default',
    isSidenavOpen,
    toggleSidenav,
}: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] =
        useState(false);
    const states = useAppStore();
    const modalRef = useRef<any>(null);
    const route = useRouter();
    const { uploadedFiles, loadinguploadFiles } = useFileUploadHandler(
        'PROFILE',
        'profile_image'
    );

    const queryClient = useQueryClient();
    const switchAccountMutateKey = 'SWITCHACCOUNT';

    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            if (states?.user?.email) {
                setLoading(true);
                const status = await getSubscriptionStatus(states.user.email);
                setSubscriptionStatus(status);
                setLoading(false);
            }
        };

        fetchSubscriptionStatus();
    }, [states?.user?.email]);

    const { mutateAsync: switchAccountAsync, isLoading } = useMutation(
        switchAccountMutateKey,
        UserService.switchAccountService,
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['getUserProfile']);
            },
        }
    );

    const toggleOpen = () => {
        setIsOpen((isOpen) => !isOpen);
    };

    const openSubscriptionModal = () => {
        setIsSubscriptionModalOpen(true);
    };

    const closeSubscriptionModal = () => {
        setIsSubscriptionModalOpen(false);
        if (states?.user?.email) {
            checkSubscription(states?.user?.email)
                .then((response) => setSubscriptionStatus(response.data))
                .catch((error) => console.error(error));
        }
        // toast.success('Subscription successful!');
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSwitchAccount = (accountId: number | undefined) => {
        if (accountId) {
            switchAccountAsync(accountId)
                .then((data) => {
                    states?.setActiveAccount(
                        data?.data?.currentKyc?.accountType
                    );
                    states?.setActiveKyc(data?.data?.currentKyc);
                    const newKycStage = data?.data?.currentKyc?.nextStage;
                    states?.setStep(newKycStage);
                    states?.setStartKycScreen('');
                    states?.setScreen('');
                    return route.push(`/onboarding/kyc`);
                })
                .catch((error) => {
                    console.log('switchAccounError', error);
                });
        }
    };

    const hasActiveSubscription = subscriptionStatus == 'active';

    if (variant === 'onboarding') {
        return (
            <header className="py-4 px-[5%] border-b flex justify-between items-center bg-white min-h-[96px]">
                <Link href="/">
                    <Image src="/logo.svg" alt="logo" width={120} height={80} />
                </Link>
                <Button
                    onClick={() => {
                        states?.signout();
                        states?.resetTenantState();
                    }}
                >
                    Sign Out
                </Button>
            </header>
        );
    }

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
                {!loading && !hasActiveSubscription && (
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200 px-4 py-3">
                        <div className="max-w-7xl mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <p className="text-red-700 font-medium text-sm">
                                    You do not have an active subscription
                                </p>
                            </div>
                            <Button
                                variant="primary"
                                onClick={openSubscriptionModal}
                                className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                            >
                                Subscribe Now
                            </Button>
                        </div>
                    </div>
                )}

                <div className="px-[5%] py-4 max-w-7xl mx-auto">
                    <div className="hidden md:flex justify-between items-center w-full">
                        <div className="flex-1"></div>
                        <div className="flex items-center gap-6">
                            <Dropdown
                                onClick={toggleOpen}
                                title={
                                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                        <div className="w-10 h-10 relative rounded-full overflow-hidden ring-2 ring-gray-100">
                                            {uploadedFiles?.data?.data[0]
                                                ?.urls[0] ? (
                                                loadinguploadFiles ? (
                                                    <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
                                                        <Spinner className="h-6 w-6" />
                                                    </div>
                                                ) : (
                                                    <Image
                                                        src={`${uploadedFiles?.data?.data[0]?.urls[0]}`}
                                                        alt="Profile"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )
                                            ) : (
                                                <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                                                    <span className="text-primary-600 font-semibold text-lg">
                                                        {states?.user?.firstname
                                                            ?.charAt(0)
                                                            ?.toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-900">
                                                {states?.user?.firstname}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                View Profile
                                            </span>
                                        </div>
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                }
                                className="border-0"
                            >
                                <li>
                                    <Link
                                        className="hover:bg-gray-50 py-3 px-4 block whitespace-nowrap transition-colors duration-200 rounded-lg mx-2 flex items-center gap-3"
                                        href="/dashboard"
                                    >
                                        <svg
                                            className="w-4 h-4 text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0H8v0z"
                                            />
                                        </svg>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        className="hover:bg-red-50 py-3 px-4 whitespace-nowrap flex items-center gap-3 transition-colors duration-200 rounded-lg mx-2 text-red-600"
                                        href="#"
                                        onClick={states?.signout}
                                    >
                                        <FiLogOut className="w-4 h-4" />
                                        <span>Sign Out</span>
                                    </a>
                                </li>
                            </Dropdown>
                        </div>
                    </div>

                    <nav className="flex justify-between items-center md:hidden">
                        <Link href="/" className="flex-shrink-0">
                            <Image
                                src="/logo.svg"
                                alt="e-tracka logo"
                                width={144}
                                height={34}
                                className="h-8 w-auto"
                            />
                        </Link>

                        <button
                            onClick={toggleSidenav}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            title="Open menu"
                        >
                            <HiOutlineMenuAlt3 className="w-8 h-8 text-gray-700" />
                        </button>
                    </nav>
                </div>

                {isOpen && (
                    <div
                        ref={modalRef}
                        className="absolute top-full right-4 z-50"
                    >
                        <SwitchAccountCard
                            handleSwitchAccount={handleSwitchAccount}
                        />
                    </div>
                )}

                <DialogModal
                    openModal={isSubscriptionModalOpen}
                    closeModal={closeSubscriptionModal}
                    title="Subscribe to Etracka"
                    contentClass="w-full !py-10"
                    className="rounded-md sm:ml-[40%] lg:ml-[10%] px-[3%] lg:!top-[10%]"
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <Subscription
                            userEmail={states?.user?.email || ''}
                            onSuccess={closeSubscriptionModal}
                        />
                    </div>
                </DialogModal>
            </header>
        </>
    );
}
