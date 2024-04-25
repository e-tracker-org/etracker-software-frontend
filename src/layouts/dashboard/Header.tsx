import Link from 'next/link';
import Button from 'components/base/Button';
import Image from 'next/image';
import { useAppStore } from 'hooks/useAppStore';
import Dropdown from 'components/base/Dropdown';
import { FiLogOut } from 'react-icons/fi';
import IdleTimeout from 'components/base/IdleTimeOut';
import SwitchAccountCard from 'components/dashboard/SwitchAccountCard';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { UserService } from 'services';
import { useRouter } from 'next/router';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import useFileUploadHandler from 'hooks/useFileUploadHandler';
import Spinner from 'components/base/Spinner';

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
    const states = useAppStore();
    const modalRef = useRef<any>(null);
    const route = useRouter();
    const { uploadedFiles, loadinguploadFiles } = useFileUploadHandler(
        'PROFILE',
        'profile_image'
    );

    const queryClient = useQueryClient();
    const switchAccountMutateKey = 'SWITCHACCOUNT';

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
                    // states?.setKycStage(newKycStage);
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

    if (variant === 'onboarding')
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

    return (
        <>
            <header className="py-4 px-[5%] border-0 md:border-b z-50 sticky top-0 bg-white min-h-[96px] flex items-center">
                <div className="hidden md:flex justify-between items-center w-full">
                    <div className="relative w-1/2 4xl:h-3/5">
                        {/* <svg
                            className="absolute top-[25%] left-5"
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M22.2314 21.1895L16.5674 15.5255C17.9285 13.8914 18.6072 11.7956 18.4624 9.67389C18.3176 7.55219 17.3603 5.56801 15.7898 4.1341C14.2193 2.7002 12.1565 1.92697 10.0304 1.97528C7.90429 2.02359 5.87867 2.88971 4.37492 4.39347C2.87116 5.89723 2.00503 7.92284 1.95672 10.0489C1.90842 12.175 2.68164 14.2379 4.11555 15.8084C5.54945 17.3789 7.53364 18.3361 9.65534 18.481C11.777 18.6258 13.8729 17.9471 15.5069 16.586L21.1709 22.25L22.2314 21.1895ZM3.48141 10.25C3.48141 8.91494 3.87729 7.6099 4.61899 6.49987C5.36069 5.38983 6.4149 4.52467 7.6483 4.01378C8.8817 3.50289 10.2389 3.36921 11.5483 3.62966C12.8576 3.89011 14.0604 4.53299 15.0044 5.47699C15.9484 6.421 16.5913 7.62373 16.8517 8.9331C17.1122 10.2425 16.9785 11.5997 16.4676 12.8331C15.9567 14.0665 15.0915 15.1207 13.9815 15.8624C12.8715 16.6041 11.5664 17 10.2314 17C8.44181 16.998 6.72607 16.2862 5.46063 15.0207C4.19519 13.7553 3.4834 12.0396 3.48141 10.25Z"
                                fill="#131313"
                                fillOpacity="0.45"
                            />
                        </svg>

                        <input
                            type="search"
                            placeholder="Search properties, tenants..."
                            className="rounded-xl bg-[#EEEEEE] placeholder:text-[#13131373] w-full pl-16 pr-4 py-3 focus:border-primary-600"
                        /> */}
                    </div>
                    <div className="flex items-center gap-6">
                        {/* <span role="button">
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.5015 3.41003C9.19153 3.41003 6.50153 6.10003 6.50153 9.41003V12.3C6.50153 12.91 6.24153 13.84 5.93153 14.36L4.78153 16.27C4.07153 17.45 4.56153 18.76 5.86153 19.2C10.1715 20.64 14.8215 20.64 19.1315 19.2C20.3415 18.8 20.8715 17.37 20.2115 16.27L19.0615 14.36C18.7615 13.84 18.5015 12.91 18.5015 12.3V9.41003C18.5015 6.11003 15.8015 3.41003 12.5015 3.41003Z"
                                    stroke="#9C9EA0"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M14.3514 3.69994C14.0414 3.60994 13.7214 3.53994 13.3914 3.49994C12.4314 3.37994 11.5114 3.44994 10.6514 3.69994C10.9414 2.95994 11.6614 2.43994 12.5014 2.43994C13.3414 2.43994 14.0614 2.95994 14.3514 3.69994Z"
                                    stroke="#9C9EA0"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M15.5015 19.5601C15.5015 21.2101 14.1515 22.5601 12.5015 22.5601C11.6815 22.5601 10.9215 22.2201 10.3815 21.6801C9.84146 21.1401 9.50146 20.3801 9.50146 19.5601"
                                    stroke="#9C9EA0"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                />
                            </svg>
                        </span> */}
                        {/* <span role="button">
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.23145 4.49998C1.23145 3.86346 1.4685 3.25301 1.89046 2.80292C2.31241 2.35283 2.88471 2.09998 3.48145 2.09998H21.4814C22.0782 2.09998 22.6505 2.35283 23.0724 2.80292C23.4944 3.25301 23.7314 3.86346 23.7314 4.49998V6.43278L12.4814 13.1816L1.23145 6.43278V4.49998Z"
                                    fill="#9C9EA0"
                                />
                                <path
                                    d="M1.23145 8.26796V20.5C1.23145 21.1365 1.4685 21.7469 1.89046 22.197C2.31241 22.6471 2.88471 22.9 3.48145 22.9H21.4814C22.0782 22.9 22.6505 22.6471 23.0724 22.197C23.4944 21.7469 23.7314 21.1365 23.7314 20.5V8.26796L12.4814 15.0184L1.23145 8.26796Z"
                                    fill="#9C9EA0"
                                />
                            </svg>
                        </span> */}
                        <Dropdown
                            onClick={toggleOpen}
                            title={
                                <div className="inline-flex items-center gap-6 mr-2">
                                    <div className="w-10 h-10 relative rounded-full overflow-clip">
                                        {uploadedFiles?.data?.data[0]
                                            ?.urls[0] ? (
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
                {/* <div> */}
                <nav className="w-full flex justify-between items-center md:hidden">
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
                {/* </div> */}

                {isOpen ? (
                    <div ref={modalRef}>
                        <SwitchAccountCard
                            handleSwitchAccount={handleSwitchAccount}
                        />
                    </div>
                ) : null}
            </header>
            {/* <section>
                <button
                    id="dropdownHoverButton"
                    data-dropdown-toggle="dropdownHover"
                    data-dropdown-trigger="hover"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                >
                    Dropdown hover{' '}
                    <svg
                        className="w-4 h-4 ml-2"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </button>

                <div
                    id="dropdownHover"
                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownHoverButton"
                    >
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Earnings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            </section> */}
        </>
    );
}
