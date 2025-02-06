import Image from 'next/image';
import {
    Fragment,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { useAppStore } from 'hooks/useAppStore';
import {
    HiChevronDoubleLeft,
    HiChevronDoubleRight,
    HiOutlineMenuAlt3,
} from 'react-icons/hi';
import { useRouter } from 'next/router';
import { urlSegment, roleMenus, goBackToKyc, goBackToKyc2 } from 'utils/helper';
import { Role } from 'utils/enums';
import SideBarIcon from './SideBarIcon';
import Link from 'next/link';
import Dropdown from 'components/base/Dropdown';
import { KycStatus } from 'interfaces';

interface SidebarProps {
    role: Role;
    isSidenavOpen?: boolean;
    setSidenavOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
    role,
    isSidenavOpen,
    setSidenavOpen,
}) => {
    const [open, setOpen] = useState(true);
    const [tenantTabOpen, setTenantTabOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [urlParam, setUrlParam] = useState<string | undefined>();
    const states = useAppStore();
    const router = useRouter();
    const { asPath } = router;
    const menus = roleMenus[role];

    const toggleSideBar = () => setOpen((prev) => !prev);

    useEffect(() => {
        setUrlParam(urlSegment(asPath));
    }, [asPath]);

    // useEffect(() => {
    //     console.log(!activeMenu, 'jhdhhwe', activeMenu);
    //     !activeMenu && setActiveMenu('dashboard/properties');
    // }, [activeMenu]);

    useEffect(() => {
        if (urlParam !== undefined) {
            // console.log(urlParam.toLowerCase(), 'pafgfsghhsdj');
            setActiveMenu(urlParam.toLowerCase());
        }
    }, [urlParam]);

    // console.log('states', states);

    return (
        <aside
            className={`${
                isSidenavOpen ? 'translate-x-0' : '-translate-x-[234px]'
            } md:translate-x-0  min-w-100% md:min-w-[234px] pl-3 pr-1 h-screen border-r-[2px] border-[#E9E4E4] pt-[24px] pb-[44px] md:py-[44px] hidden-scrollbar fixed bg-white transition-all duration-500 ease-in-out z-[100]`}
        >
            <div className="mb-6">
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="e-tracka logo"
                        width={144}
                        height={34}
                        // className={`${open ? 'block' : 'hidden'}`}
                    />
                </Link>

                {/* <button onClick={toggleSideBar}>
                    {!open ? (
                        <HiChevronDoubleRight className="w-5 h-5" />
                    ) : (
                        <HiChevronDoubleLeft className="w-5 h-5" />
                    )}
                </button> */}
            </div>

            <ul className="grid gap-y-[60px] mt-[60px] ">
                {states?.activeKyc?.status === KycStatus.INCOMPLETE &&
                urlParam !== 'kyc' ? (
                    // states?.activeKyc?.status === KycStatus.INCOMPLETE
                    <li className="mb-[-15px] mt-[-36px]">
                        <ActiveLink
                            href="/onboarding/kyc"
                            Classname="!bg-primary-100 text-white rounded-lg !text-blue-600"
                            onClick={() => goBackToKyc('kyc', states, router)}
                        >
                            Continue KYC
                        </ActiveLink>
                    </li>
                ) : null}
                {menus.map((menu) => (
                    <li key={menu}>
                        <ActiveLink
                            onClick={() => {
                                setActiveMenu(menu.toLowerCase());
                                if (menu.toLowerCase() === 'dashboard') {
                                    router.replace(`/dashboard`);
                                } else {
                                    menu.toLowerCase() === 'tenants' &&
                                        states?.resetTenantState();
                                    router.replace(
                                        `/dashboard/${menu.toLowerCase()}`
                                    );
                                }

                                setSidenavOpen(false);
                            }}
                            Classname={`${
                                activeMenu === menu.toLowerCase()
                                    ? 'bg-primary-600 text-white rounded-lg'
                                    : ''
                            }`}
                        >
                            <SideBarIcon screen={menu?.toLowerCase()} />

                            <span>{menu}</span>

                            {menu?.toLowerCase() === 'tenants' && (
                                <span
                                    role="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTenantTabOpen((prev) => !prev);
                                    }}
                                    className={`${
                                        tenantTabOpen ? '-rotate-180' : ''
                                    } transition-all`}
                                >
                                    <svg
                                        className="fill-current h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </span>
                            )}
                        </ActiveLink>
                        {menu?.toLowerCase() === 'tenants' && (
                            <ul
                                className={`${
                                    tenantTabOpen ? 'block' : 'hidden'
                                }`}
                            >
                                <li className="w-full text-brand-inactive hover:text-black text-center text-lg font-semibold px-8 py-3">
                                    <button
                                        onClick={(
                                            e: React.MouseEvent<
                                                HTMLButtonElement,
                                                MouseEvent
                                            >
                                        ) => {
                                            e.preventDefault();
                                            setTenantTabOpen(false);
                                            states?.resetTenantState();
                                            router.push('/dashboard/tenants');
                                        }}
                                    >
                                        View Tenants
                                    </button>
                                </li>
                                <li className="w-full text-center text-brand-inactive hover:text-black  text-lg font-semibold px-8 py-3">
                                    <button
                                        onClick={(
                                            e: React.MouseEvent<
                                                HTMLButtonElement,
                                                MouseEvent
                                            >
                                        ) => {
                                            e.preventDefault();
                                            setTenantTabOpen(false);
                                            router.push(
                                                '/dashboard/tenants/find'
                                            );
                                        }}
                                    >
                                        Find Tenant
                                    </button>
                                </li>
                                <li className="w-full text-center text-brand-inactive hover:text-black  text-lg font-semibold px-8 py-3">
                                    <button
                                        onClick={(
                                            e: React.MouseEvent<
                                                HTMLButtonElement,
                                                MouseEvent
                                            >
                                        ) => {
                                            e.preventDefault();
                                            setTenantTabOpen(false);
                                            router.push(
                                                '/dashboard/tenants/verify'
                                            );
                                        }}
                                    >
                                        Verify Tenants
                                    </button>
                                </li>
                                <li className="w-full text-center text-brand-inactive hover:text-black  text-lg font-semibold px-8 py-3">
                                    <button
                                        onClick={(
                                            e: React.MouseEvent<
                                                HTMLButtonElement,
                                                MouseEvent
                                            >
                                        ) => {
                                            e.preventDefault();
                                            setTenantTabOpen(false);
                                            router.push(
                                                '/dashboard/tenants/default'
                                            );
                                        }}
                                    >
                                        Default Tenants
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                ))}
                {/* <li className="pb-10">
              
                </li> */}
            </ul>
            <button
                onClick={() => {
                    states?.signout();
                    states?.resetTenantState();
                    // router.push('/');
                }}
                className="text-brand-red px-8 w-full text-lg flex font-semibold items-center gap-[15px] mt-[130px] mb-[90px]"
            >
                <svg
                    className="w-5 h-5"
                    viewBox="0 0 26 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.00012 9.13636H17.0003V1.36364C17.0003 1.13459 16.8949 0.914917 16.7074 0.752953C16.5199 0.59099 16.2655 0.5 16.0003 0.5H1.00002C0.734797 0.5 0.480438 0.59099 0.292898 0.752953C0.105359 0.914917 0 1.13459 0 1.36364V18.6364C0 18.8654 0.105359 19.0851 0.292898 19.247C0.480438 19.409 0.734797 19.5 1.00002 19.5H16.0003C16.2655 19.5 16.5199 19.409 16.7074 19.247C16.8949 19.0851 17.0003 18.8654 17.0003 18.6364V10.8636H7.00012V9.13636ZM25.7073 9.38952L20.0004 4.46031L18.586 5.68182L22.586 9.13636H17.0003V10.8636H22.586L18.586 14.3182L20.0004 15.5397L25.7073 10.6105C25.8947 10.4485 26 10.229 26 10C26 9.77105 25.8947 9.55146 25.7073 9.38952Z"
                        fill="#E80404"
                        fillOpacity="0.75"
                    />
                </svg>
                <span>Log out</span>
            </button>
        </aside>
    );
};

const ActiveLink = ({
    children,
    href,
    onClick,
    Classname,
}: {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    Classname?: string;
}) => {
    const router = useRouter();

    return (
        <button
            className={`flex gap-[15px] text-lg font-semibold px-8 py-3 w-full items-center text-brand-inactive ${Classname}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Sidebar;
