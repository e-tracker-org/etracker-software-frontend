import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { useAppStore } from 'hooks/useAppStore';

export default function MobileNav() {
    const [open, setOpen] = useState(false);

    // const toggleMenu = () => setOpen(false);

    useEffect(() => {
        let navLinks: NodeListOf<HTMLAnchorElement>;
        const turnOfScroll = () => {
            const body = document.querySelector('body') as HTMLBodyElement;
            if (open) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        };

        if (window !== undefined) {
            turnOfScroll();
            navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach((el) =>
                el.addEventListener('click', (e) => {
                    setOpen(false);
                })
            );
        }
        return () => {
            navLinks &&
                navLinks.forEach((el) =>
                    el.removeEventListener('click', (e) => {
                        setOpen(false);
                    })
                );
        };
    }, [open]);

    return (
        <>
            <nav
                onClick={() => setOpen((o) => !o)}
                className={`fixed inset-0 xl:hidden z-50 transition-all duration-300 ${
                    open ? 'opacity-100 visible' : 'opacity-0 invisible'
                } bg-black`}
            >
                <div
                    className={`bg-white h-full w-80 max-w-[85vw] ml-auto shadow-2xl transform transition-transform duration-300 ease-out ${
                        open ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Menu
                        </h2>
                        <button
                            onClick={() => setOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        >
                            <svg
                                className="w-6 h-6 text-gray-500"
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

                    {/* Navigation Links */}
                    <nav className="flex flex-col p-6 space-y-1">
                        <Link
                            href="/"
                            className="text-black font-medium capitalize nav-link px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            href="/#aboutus"
                            className="text-black font-medium capitalize nav-link px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/#service"
                            className="text-black font-medium capitalize nav-link px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                        >
                            Services
                        </Link>
                        <Link
                            href="/#testimonial"
                            className="text-black font-medium capitalize nav-link px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                        >
                            Testimonial
                        </Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="px-6 py-4 border-t border-gray-100 mt-auto">
                        <div className="flex flex-col gap-3 mb-6">
                            <Link href="/auth/signup" className="nav-link">
                                <button className="bg-primary-600 hover:bg-primary-700 rounded-xl px-6 py-3 text-white font-semibold w-full transition-colors duration-200">
                                    Sign up
                                </button>
                            </Link>
                            <Link href="/auth/signin" className="nav-link">
                                <button className="border border-primary-600 hover:bg-primary-50 rounded-xl px-6 py-3 text-black font-semibold w-full transition-colors duration-200">
                                    Login
                                </button>
                            </Link>
                        </div>

                        {/* Account Links */}
                        <div className="space-y-3">
                            <Link
                                href="/dashboard"
                                className="block text-decoration-none font-medium nav-link bg-primary-100 hover:bg-primary-200 py-3 px-4 rounded-xl transition-colors duration-200"
                            >
                                My Account
                            </Link>
                            <a
                                href="#"
                                className="block text-red-600 font-semibold py-3 px-4 rounded-xl hover:bg-red-50 transition-colors duration-200"
                            >
                                Sign Out
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <button
                onClick={() => setOpen(true)}
                className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                title="Open menu"
            >
                <HiOutlineMenuAlt3 className="w-8 h-8" />
            </button>
        </>
    );
}
