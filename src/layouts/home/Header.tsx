import Link from 'next/link';
import MobileNav from './mobile-nav';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Dropdown from 'components/base/Dropdown';
import { FiLogOut } from 'react-icons/fi';
import { useAppStore } from 'hooks/useAppStore';

const Header = () => {
    const router = useRouter();
    const states = useAppStore();

    return (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="flex px-[5%] md:px-[8%] lg:px-[6%] 2xl:px-[5%] items-center justify-between py-4 max-w-7xl mx-auto">
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src="/logo.svg"
                        width={200}
                        height={60}
                        alt="e-tracka"
                        className="h-12 w-auto"
                    />
                </Link>

                <MobileNav />

                <nav className="xl:flex xl:w-2/3 items-center justify-between gap-10 hidden">
                    <div className="flex items-center gap-8">
                        <Link
                            data-active={router.pathname === '/'}
                            href="/"
                            className="relative text-sm font-medium text-black hover:text-primary-600 transition-colors duration-200 py-2 data-[active='true']:text-primary-600"
                        >
                            Home
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform scale-x-0 data-[active='true']:scale-x-100 hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                        </Link>
                        <Link
                            data-active={router.pathname === '/#aboutus'}
                            href="/#aboutus"
                            className="relative text-sm font-medium text-black hover:text-primary-600 transition-colors duration-200 py-2 data-[active='true']:text-primary-600"
                        >
                            About Us
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform scale-x-0 data-[active='true']:scale-x-100 hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                        </Link>
                        <Link
                            data-active={router.pathname === '/#services'}
                            href="/#services"
                            className="relative text-sm font-medium text-black hover:text-primary-600 transition-colors duration-200 py-2 data-[active='true']:text-primary-600"
                        >
                            Services
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform scale-x-0 data-[active='true']:scale-x-100 hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                        </Link>
                        <Link
                            data-active={router.pathname === '/#testimonial'}
                            href="/#testimonial"
                            className="relative text-sm font-medium text-black hover:text-primary-600 transition-colors duration-200 py-2 data-[active='true']:text-primary-600"
                        >
                            Testimonial
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform scale-x-0 data-[active='true']:scale-x-100 hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                        </Link>
                    </div>

                    {states?.token && (
                        <Dropdown
                            title={
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                        <span className="text-primary-600 font-semibold text-sm">
                                            {states?.user?.firstname
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="font-medium">
                                        {states?.user?.firstname}
                                    </span>
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
                                    className="hover:bg-gray-50 py-3 px-4 block whitespace-nowrap transition-colors duration-200 rounded-lg mx-2"
                                    href="/dashboard"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <a
                                    className="hover:bg-gray-50 py-3 px-4 whitespace-nowrap flex items-center gap-3 transition-colors duration-200 rounded-lg mx-2 text-red-600"
                                    href="#"
                                    onClick={() => {
                                        states?.signout();
                                        states?.resetTenantState();
                                    }}
                                >
                                    <FiLogOut className="w-4 h-4" />
                                    <span>Sign Out</span>
                                </a>
                            </li>
                        </Dropdown>
                    )}

                    {!states?.token && (
                        <div className="flex items-center gap-4">
                            <Link href="/auth/signin">
                                <button className="text-black font-semibold px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                    Login
                                </button>
                            </Link>
                            <Link href="/auth/signup">
                                <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 shadow-sm">
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
