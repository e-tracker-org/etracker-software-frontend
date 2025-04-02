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
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
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
                .then(response => setSubscriptionStatus(response.data))
                .catch(error => console.error(error));
        }
        // toast.success('Subscription successful!');
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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
                    states?.setActiveAccount(data?.data?.currentKyc?.accountType);
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
            <header className="py-4 px-[5%] border-0 md:border-b z-50 sticky top-0 bg-white min-h-[96px] flex items-center">
                {!loading && !hasActiveSubscription &&  (
                    <div className="absolute bg-red-50 border-b border-red-400 p-2 text-center">
                        <div className="flex items-center justify-center gap-4">
                            <p className="text-yellow-700 font-medium">
                                You do not have an active subscription
                            </p>
                            <Button 
                                variant="primary" 
                                onClick={openSubscriptionModal}

                            >
                                Subscribe Now
                            </Button>
                        </div>
                    </div>
                )}

                <div className="hidden md:flex justify-between items-center w-full mt-4">
                    <div className="relative w-1/2 4xl:h-3/5">
                    </div>
                    <div className="flex items-center gap-6">
                        <Dropdown
                            onClick={toggleOpen}
                            title={
                                <div className="inline-flex items-center gap-6 mr-2">
                                    <div className="w-10 h-10 relative rounded-full overflow-clip">
                                        {uploadedFiles?.data?.data[0]?.urls[0] ? (
                                            loadinguploadFiles ? (
                                                <Spinner className="h-10 w-10 mt-2" />
                                            ) : (
                                                <Image
                                                    src={`${uploadedFiles?.data?.data[0]?.urls[0]}`}
                                                    alt=""
                                                    fill
                                                />
                                            )
                                        ) : (
                                            <label className="pt-10">
                                                <svg
                                                    width="40"
                                                    height="40"
                                                    viewBox="0 0 44 43"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M21.9998 0.166626C24.8288 0.166626 27.5419 1.29043 29.5423 3.29082C31.5427 5.29121 32.6665 8.00432 32.6665 10.8333C32.6665 13.6623 31.5427 16.3754 29.5423 18.3758C27.5419 20.3762 24.8288 21.5 21.9998 21.5C19.1709 21.5 16.4578 20.3762 14.4574 18.3758C12.457 16.3754 11.3332 13.6623 11.3332 10.8333C11.3332 8.00432 12.457 5.29121 14.4574 3.29082C16.4578 1.29043 19.1709 0.166626 21.9998 0.166626ZM21.9998 26.8333C33.7865 26.8333 43.3332 31.6066 43.3332 37.5V42.8333H0.666504V37.5C0.666504 31.6066 10.2132 26.8333 21.9998 26.8333Z"
                                                        fill="#131313"
                                                        fillOpacity="0.65"
                                                    />
                                                </svg>
                                            </label>
                                        )}
                                    </div>
                                    <span>{states?.user?.firstname}</span>
                                </div>
                            }
                            className="text-[#13131399]"
                        >
                            <li className="">
                                <Link
                                    className=" hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap"
                                    href="/dashboard"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li className="">
                                <a
                                    className="hover:bg-gray-200 py-2 px-4 whitespace-no-wrap flex items-center gap-4"
                                    href="#"
                                    onClick={states?.signout}
                                >
                                    <FiLogOut />
                                    <span>Sign Out</span>
                                </a>
                            </li>
                        </Dropdown>
                    </div>
                </div>

                <nav className="w-full flex justify-between items-center md:hidden mt-4">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="e-tracka logo"
                            width={144}
                            height={34}
                        />
                    </Link>

                    <HiOutlineMenuAlt3
                        onClick={toggleSidenav}
                        role="button"
                        title="menu"
                        stroke="currentColor"
                        className="w-8 h-8"
                    />
                </nav>

                {isOpen && (
                    <div ref={modalRef}>
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