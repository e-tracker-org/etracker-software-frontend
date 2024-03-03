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
        <header className="flex px-[5%] md:px-[8%] lg:px-[6%] 2xl:px-[5%] items-center justify-between  py-4 border-b border-b-[#CCCACA]">
            <Link href="/">
                <Image src="/logo.svg" width={200} height={60} alt="e-tracka" />
            </Link>
            <MobileNav />
            <nav className="xl:flex xl:w-2/3 items-center justify-between gap-10 hidden">
                <div className="flex gap-12">
                    <Link
                        data-active={router.pathname === '/'}
                        href="/"
                        className="text-sm data-[active='true']:border-b-primary-600 border-b-2 border-b-transparent hover:border-b-primary-600 active:border-b-primary-600 text-black font-medium capitalize"
                    >
                        Home
                    </Link>
                    <Link
                        data-active={router.pathname === '/#aboutus'}
                        href="/#aboutus"
                        className="text-sm data-[active='true']:border-b-primary-600 border-b-2 border-b-transparent hover:border-b-primary-600 active:border-b-primary-600 text-black font-medium capitalize"
                    >
                        About Us
                    </Link>
                    <Link
                        data-active={router.pathname === '/#services'}
                        href="/#services"
                        className="text-sm data-[active='true']:border-b-primary-600 border-b-2 border-b-transparent hover:border-b-primary-600 active:border-b-primary-600 text-black font-medium capitalize"
                    >
                        Services
                    </Link>

                    <Link
                        data-active={router.pathname === '/#testimonial'}
                        href="/#testimonial"
                        className="text-sm data-[active='true']:border-b-primary-600 border-b-2 border-b-transparent hover:border-b-primary-600 active:border-b-primary-600 text-black font-medium capitalize"
                    >
                        Testimonial
                    </Link>
                </div>
                {states?.token && (
                    <Dropdown title={states?.user?.firstname} className="">
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
                                onClick={() => {
                                    states?.signout();
                                    states?.resetTenantState();
                                }}
                            >
                                <FiLogOut />
                                <span>Sign Out</span>
                            </a>
                        </li>
                    </Dropdown>
                )}
                {!states?.token && (
                    <div className="flex gap-5">
                        <Link href="/auth/signup">
                            <button className="bg-primary-600 rounded-lg px-8 py-2 text-white font-semibold">
                                Sign up
                            </button>
                        </Link>
                        <Link href="/auth/signin">
                            <button className="border border-primary-600 rounded-lg px-8 py-2 text-black font-semibold">
                                Login
                            </button>
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
