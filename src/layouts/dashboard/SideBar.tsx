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
        const param = urlSegment(asPath);
        setUrlParam(param);
        const menuName = param?.toLowerCase() || 'dashboard';
        setActiveMenu(menuName);
    }, [asPath]);

    const handleNavigation = async (path: string, menu: string) => {
        setActiveMenu(menu.toLowerCase());
        if (menu.toLowerCase() === 'tenants') {
            states?.resetTenantState();
        }

        setSidenavOpen(false);

        try {
            // Use only router.push for navigation
            await router.push(path, undefined, { shallow: false });
        } catch (error) {
            console.error('Navigation error:', error);
            // Fallback to window.location if router navigation fails
            window.location.href = path;
        }
    };

    return (
        <aside
            className={`${
                isSidenavOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 w-80 md:min-w-[234px] md:w-[234px] h-screen border-r border-gray-200 bg-white transition-all duration-300 ease-in-out fixed z-[100] shadow-xl md:shadow-none flex flex-col`}
        >
            {/* Mobile header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 md:hidden">
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="e-tracka logo"
                        width={120}
                        height={28}
                    />
                </Link>
                <button
                    onClick={() => setSidenavOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            {/* Desktop header */}
            <div className="hidden md:block p-6 pb-4">
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="e-tracka logo"
                        width={144}
                        height={34}
                    />
                </Link>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-2">
                <nav className="space-y-2">
                    {states?.activeKyc?.status === KycStatus.INCOMPLETE &&
                    urlParam !== 'kyc' ? (
                        <div className="mb-4">
                            <ActiveLink
                                href="/onboarding/kyc"
                                Classname="!bg-blue-50 !text-blue-600 border border-blue-200 rounded-lg"
                                onClick={() =>
                                    goBackToKyc('kyc', states, router)
                                }
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="font-medium">
                                        Continue KYC
                                    </span>
                                </div>
                            </ActiveLink>
                        </div>
                    ) : null}

                    {menus.map((menu) => (
                        <div key={menu} className="space-y-1">
                            <ActiveLink
                                onClick={() => {
                                    if (menu.toLowerCase() === 'dashboard') {
                                        handleNavigation('/dashboard', menu);
                                    } else {
                                        handleNavigation(
                                            `/dashboard/${menu.toLowerCase()}`,
                                            menu
                                        );
                                    }
                                }}
                                Classname={`${
                                    activeMenu === menu.toLowerCase()
                                        ? 'bg-primary-600 text-white shadow-sm'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                } transition-colors duration-200 rounded-lg`}
                            >
                                <SideBarIcon screen={menu?.toLowerCase()} />
                                <span className="font-medium">{menu}</span>

                                {menu?.toLowerCase() === 'tenants' && (
                                    <span
                                        role="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setTenantTabOpen((prev) => !prev);
                                        }}
                                        className={`${
                                            tenantTabOpen ? 'rotate-180' : ''
                                        } transition-transform duration-200 ml-auto`}
                                    >
                                        <svg
                                            className="w-4 h-4"
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
                                    </span>
                                )}
                            </ActiveLink>

                            {menu?.toLowerCase() === 'tenants' && (
                                <div
                                    className={`${
                                        tenantTabOpen ? 'block' : 'hidden'
                                    } ml-6 space-y-1 border-l-2 border-gray-100 pl-4`}
                                >
                                    <SubMenuItem
                                        onClick={() => {
                                            setTenantTabOpen(false);
                                            states?.resetTenantState();
                                            handleNavigation(
                                                '/dashboard/tenants',
                                                'tenants'
                                            );
                                        }}
                                    >
                                        View Tenants
                                    </SubMenuItem>
                                    <SubMenuItem
                                        onClick={() => {
                                            setTenantTabOpen(false);
                                            handleNavigation(
                                                '/dashboard/tenants/find',
                                                'tenants'
                                            );
                                        }}
                                    >
                                        Tenant Credit Check
                                    </SubMenuItem>
                                    <SubMenuItem
                                        onClick={() => {
                                            setTenantTabOpen(false);
                                            handleNavigation(
                                                '/dashboard/tenants/default',
                                                'tenants'
                                            );
                                        }}
                                    >
                                        Default Tenants
                                    </SubMenuItem>
                                    <SubMenuItem
                                        onClick={() => {
                                            setTenantTabOpen(false);
                                            handleNavigation(
                                                '/dashboard/tenants/registered-default',
                                                'tenants'
                                            );
                                        }}
                                    >
                                        Registered Defaults
                                    </SubMenuItem>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Logout button */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <button
                        onClick={() => {
                            states?.signout();
                            states?.resetTenantState();
                            setSidenavOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        <span>Log out</span>
                    </button>
                </div>
            </div>
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

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (onClick) {
            onClick();
        } else if (href) {
            // If no onClick provided but href exists, navigate directly
            try {
                await router.push(href, undefined, { shallow: false });
            } catch (error) {
                console.error('Navigation error:', error);
                window.location.href = href;
            }
        }
    };

    return (
        <button
            type="button"
            className={`flex items-center gap-3 text-sm md:text-base font-medium px-4 py-3 w-full transition-colors duration-200 ${Classname}`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

const SubMenuItem = ({
    children,
    onClick,
}: {
    children: ReactNode;
    onClick?: () => void;
}) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            type="button"
            className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 w-full rounded-md transition-colors duration-200"
            onClick={handleClick}
        >
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <span>{children}</span>
        </button>
    );
};

export default Sidebar;
