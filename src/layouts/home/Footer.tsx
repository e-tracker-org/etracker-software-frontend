import Image from 'next/image';
import Link from 'next/link';
import {
    FaFacebook,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaYoutube,
} from 'react-icons/fa';

const Footer = () => {
    const date = new Date().getFullYear();

    const socialLinks = [
        { href: '#', icon: <FaFacebook className="text-[#66ACFF]" /> },
        { href: '#', icon: <FaLinkedin className="text-[#4AC1F3]" /> },
        { href: '#', icon: <FaTwitter className="text-[#6D7CFF]" /> },
        { href: '#', icon: <FaInstagram className="text-[#FF6363]" /> },
        { href: '#', icon: <FaYoutube className="text-[#F45252]" /> },
    ];

    const footerSections = [
        {
            title: 'Landlord',
            links: [
                { href: '/#', text: 'Manage Tenant' },
                { href: '/#', text: "Check Client's Score" },
                { href: '/default/register', text: 'Check Default Tenants' },
                { href: '/#', text: 'List Property' },
            ],
        },
        {
            title: 'Tenant',
            links: [
                { href: '/#', text: 'Check Landlord' },
                { href: '/#', text: 'Search Property' },
                { href: '/#', text: 'Check Property History' },
            ],
        },
        {
            title: 'Resources',
            links: [
                { href: '/#', text: 'About Us' },
                { href: '/#', text: 'Services' },
                { href: '/#', text: 'Help Centre' },
            ],
        },
    ];

    return (
        <footer className="bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Socials */}
                    <div className="md:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/logo.svg"
                                alt="e-tracka logo"
                                width={150}
                                height={40}
                            />
                        </Link>
                        <p className="text-sm text-gray-600 mb-4">
                            Your partner for real estate data and property
                            management.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl hover:opacity-80 transition-opacity"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <h4 className="font-semibold text-black mb-4">
                                    {section.title}
                                </h4>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.text}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                                            >
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-600 order-2 md:order-1">
                            &copy; {date} E-Tracka Limited. All rights reserved.
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 order-1 md:order-2">
                            <Link
                                className="text-sm text-gray-600 hover:text-primary-600"
                                href="/"
                            >
                                Privacy
                            </Link>
                            <Link
                                className="text-sm text-gray-600 hover:text-primary-600"
                                href="/"
                            >
                                Cookies
                            </Link>
                            <Link
                                className="text-sm text-gray-600 hover:text-primary-600"
                                href="/"
                            >
                                Contact us
                            </Link>
                            <Link
                                className="text-sm text-gray-600 hover:text-primary-600"
                                href="/"
                            >
                                Careers
                            </Link>
                            <Link
                                className="text-sm text-gray-600 hover:text-primary-600"
                                href="/"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-8 text-center md:text-left">
                        E-Tracka is committed to ensuring digital accessibility
                        for individuals with disabilities. We are continuously
                        working to improve the accessibility of our web
                        experience for everyone, and we welcome feedback and
                        accommodation requests. If you wish to report an issue
                        or seek an accommodation, please{' '}
                        <a
                            href="#"
                            className="text-primary-600 hover:underline"
                        >
                            let us know.
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
