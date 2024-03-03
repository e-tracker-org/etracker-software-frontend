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
                className={`absolute ${
                    open ? 'block' : 'hidden'
                } top-0 right-0   xl:hidden z-30  h-screen w-screen bg-[#535764b5] `}
            >
                <div
                    className=" bg-white mt-10 mr-3 px-6 py-5 w-4/5 ml-auto transition-all delay-150"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex relative items-center justify-between">
                        <span
                            className="text-gray-500 text-2xl absolute top-2 right-5"
                            onClick={() => setOpen((o) => !o)}
                        >
                            &#10005;
                        </span>
                    </div>
                    <nav className="gap-10 flex flex-col mt-10 pt-10">
                        <Link
                            href="/"
                            className="text-black font-medium capitalize nav-link"
                        >
                            Home
                        </Link>
                        <Link
                            href="/#aboutus"
                            className="text-black font-medium capitalize nav-link"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/#service"
                            className="text-black font-medium capitalize nav-link"
                        >
                            Services
                        </Link>

                        <Link
                            href="/#testimonial"
                            className="text-black font-medium capitalize nav-link"
                        >
                            Testimonial
                        </Link>
                        <div className="flex gap-10 justify-between items-center mt-16">
                            <Link
                                href="/auth/signup"
                                className="flex-1 nav-link"
                            >
                                <button className="bg-primary-600 rounded-lg px-6 py-3 md:py-4 text-white font-semibold w-full">
                                    Sign up
                                </button>
                            </Link>
                            <Link
                                href="/auth/signin"
                                className="flex-1 nav-link"
                            >
                                <button className="border border-primary-600 rounded-lg px-6 py-3 md:py-4 text-black font-semibold w-full">
                                    Login
                                </button>
                            </Link>
                        </div>
                        <div className="my-10">
                            <p className="mb-6">
                                <Link
                                    href="/dashboard"
                                    className="text-decoration-none font-medium nav-link
									active:text-primary-600 bg-primary-100 py-2 rounded-lg"
                                >
                                    My Account
                                </Link>
                            </p>
                            <p className="mb-6">
                                <a
                                    href="#"
                                    className="text-red-600 font-semibold"
                                >
                                    Sign Out
                                </a>
                            </p>
                        </div>
                    </nav>
                </div>
            </nav>

            <nav className="xl:hidden">
                <HiOutlineMenuAlt3
                    onClick={() => setOpen((o) => !o)}
                    role="button"
                    title="menu"
                    stroke="currentColor"
                    className="w-8 h-8"
                />
            </nav>
        </>
    );
}
