import { FC, ReactNode, useEffect, useState } from 'react';
import Dashboard from '..';
import useProperty from 'hooks/useProperty';
import useAccountType from 'hooks/useAccountType';
import PropertyListing from 'components/dashboard/properties/property-listing';
import PropertyListingCard from 'components/dashboard/properties/property-listing/PropertyListingCard';
import DashboardHeader from 'components/dashboard/Header';
import Loader from 'components/base/Loader';
import Link from 'next/link';
import Help from 'components/dashboard/helpcard';
import { SupportSvg, FaqSvg } from 'assets/svgIcons/svgIcons';
import { useRouter } from 'next/router';
import { DialogModal } from 'components/base/DialogModal';
import Button from 'components/base/Button';
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

interface DetailsRowProps {
    children?: ReactNode;
    title?: string | undefined;
    subheader?: string;
    linkHref?: string;
    linkText?: string;
    Route?: string;
}

const DetailsRowCard: FC<DetailsRowProps> = ({
    title,
    subheader,
    linkHref,
    linkText,
    children,
    Route,
}) => {
    const router = useRouter();
    const handleNavigate = (route: string) => {
        router.push(route);
    };
    return (
        <div className="flex flex-col mb-8">
            <div className="flex justify-between mb-2">
                <div>
                    <h3 className="font-bold text-xl">{title}</h3>
                    {subheader && <p className="text-sm">{subheader}</p>}{' '}
                </div>

                <a
                    style={{ cursor: 'pointer' }}
                    className="text-blue-500"
                    // @ts-ignore
                    onClick={() => handleNavigate(Route)}
                >
                    {linkText}
                </a>
            </div>
            <div className="flex gap-4 my-5 w-full overflow-x-auto">
                {children}
            </div>
        </div>
    );
};

const TenantDash: FC = () => {
    const { acctType } = useAccountType();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const {
        getMyProperties,
        getMyPropertiesLoading,
        getProperties,
        getPropertiesLoading,
    } = useProperty();

    const properties =
        Number(acctType?.typeID) === 2
            ? getMyProperties?.data?.data
            : 'No property record found';
    const propertiesLoading =
        Number(acctType?.typeID) === 2
            ? getPropertiesLoading
            : getMyPropertiesLoading;

    const allProperties = getProperties?.data.data;

    const faqs = [
        {
            question: 'Can I buy properties on E-Tracka?',
            answer: 'No, currently, E-Tracka focuses solely on rental properties. We provide a comprehensive platform for tenants to search for rental properties, check landlord backgrounds, and access property history.',
        },
        {
            question: 'Do you offer services for property buyers or sellers?',
            answer: 'At the moment, E-Tracka specializes in rental property services. We do not facilitate property buying or selling transactions. However, we provide valuable tools and resources for tenants to find their ideal rental home.',
        },
        {
            question: 'Can landlords list properties for sale on E-Tracka?',
            answer: "E-Tracka's platform is designed exclusively for rental property listings. Landlords can list their rental properties to attract potential tenants, but we do not support property sales at this time.",
        },
        {
            question: 'How can I search for rental properties on E-Tracka?',
            answer: 'You can easily search for rental properties on E-Tracka by selecting your preferred location, property type, price range, and other filters. Our platform offers a user-friendly interface to help you find your next rental home efficiently.',
        },
        {
            question:
                'Do you provide assistance with property management for landlords?',
            answer: 'Yes, E-Tracka offers tools and resources for landlords to manage their rental properties effectively. From tenant screening to rent collection, our platform supports various aspects of property management.',
        },
        {
            question:
                'Can tenants communicate directly with landlords through E-Tracka?',
            answer: 'Yes, tenants can communicate directly with landlords and property managers through our platform. We provide messaging features to facilitate seamless communication between tenants and landlords.',
        },
        {
            question: 'Is E-Tracka available in all locations?',
            answer: 'E-Tracka aims to cover a wide range of locations to serve tenants and landlords effectively. While we may not be available in every area, we strive to expand our coverage based on demand and user feedback.',
        },
        {
            question:
                'How can I report issues with a rental property listed on E-Tracka?',
            answer: 'If you encounter any issues with a rental property listed on E-Tracka, please contact our support team. We take tenant feedback seriously and will address any concerns promptly.',
        },
        {
            question:
                "Are there any fees for using E-Tracka's rental services?",
            answer: "E-Tracka's rental services are free for tenants. There are no subscription fees or hidden charges. However, landlords may incur fees for premium features or additional services.",
        },
    ];

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCopy = async () => {
        const email = 'etracka.tech@gmail.com';
        try {
            await navigator.clipboard.writeText(email);
            toast.success('Email copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
            toast.error('Failed to copy email to clipboard');
        }
    };

    const router = useRouter();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <header className="flex justify-between items-center mb-8">
                <DashboardHeader title="Dashboard Overview" />
            </header>
            {propertiesLoading ? (
                <Loader loading={propertiesLoading} />
            ) : (
                <section className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* My Units Section */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md">
                                <div className="p-6 sm:p-8 border-l-4 border-blue-600">
                                    <h2 className="text-2xl font-semibold mb-6">
                                        My Units
                                    </h2>
                                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                                        {Array.isArray(properties) &&
                                        properties.length ? (
                                            properties.map((property) => (
                                                <div
                                                    key={property?.id}
                                                    className="flex-none w-[280px] sm:w-[320px]"
                                                >
                                                    <PropertyListingCard
                                                        property={property}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center py-8 w-full">
                                                No property record found
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md">
                                <div className="p-6 sm:p-8">
                                    <Image
                                        src="/house.png"
                                        width={579}
                                        height={350}
                                        alt="e-tracka"
                                        className="w-full h-auto rounded-xl object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Help Center Section */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md">
                            <div className="p-6 sm:p-8">
                                <h2 className="text-2xl font-semibold mb-8">
                                    Help Center
                                </h2>
                                <div className="space-y-6">
                                    <button
                                        onClick={openModal}
                                        className="w-full group focus:outline-none"
                                    >
                                        <Help
                                            title="Read Our FAQs"
                                            icon={<FaqSvg />}
                                            bgColor="#DBFFCE"
                                            className="transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-md rounded-xl"
                                        />
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        className="w-full group focus:outline-none"
                                    >
                                        <Help
                                            title="Contact E-tracka Support"
                                            icon={<SupportSvg />}
                                            bgColor="#FFF4CE"
                                            className="transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-md rounded-xl"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Explore Listings Section */}
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md">
                        <div className="p-4 sm:p-6 lg:p-8 border-l-4 border-blue-600">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
                                <div className="mb-4 sm:mb-0">
                                    <h2 className="text-2xl font-semibold mb-2">
                                        Explore Listings
                                    </h2>
                                    <p className="text-gray-600 text-sm sm:text-base">
                                        Search for properties and spaces you may
                                        like
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        router.push('/dashboard/properties')
                                    }
                                    className="inline-flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-all duration-300 border border-blue-200 hover:border-blue-300 shadow-sm hover:shadow w-full sm:w-auto"
                                >
                                    <span>View All Properties</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 ml-2"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="relative">
                                <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                                    {Array.isArray(allProperties) &&
                                    allProperties.length ? (
                                        allProperties.map((property) => (
                                            <div
                                                key={property?.id}
                                                className="flex-none w-[280px] sm:w-[300px] snap-start first:pl-0 last:pr-4"
                                            >
                                                <div className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                                                    <PropertyListingCard
                                                        property={property}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center w-full py-12 px-4">
                                            <div className="text-gray-400 mb-4">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-16 w-16"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-gray-500 text-center text-lg font-medium mb-2">
                                                No Properties Available
                                            </p>
                                            <p className="text-gray-400 text-center text-sm">
                                                Check back later for new
                                                listings
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {Array.isArray(allProperties) &&
                                    allProperties.length > 0 && (
                                        <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-75"></div>
                                    )}
                            </div>

                            {Array.isArray(allProperties) &&
                                allProperties.length > 0 && (
                                    <div className="mt-4 text-sm text-gray-500 text-center hidden sm:block">
                                        <span>
                                            Scroll horizontally to see more
                                            properties
                                        </span>
                                    </div>
                                )}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Modal */}
            <DialogModal
                openModal={isModalOpen}
                closeModal={closeModal}
                title="Frequently Asked Questions"
                contentClass="w-full max-w-3xl mx-auto"
                className="rounded-2xl shadow-xl"
            >
                <div className="px-6 sm:px-8 divide-y divide-gray-100">
                    {faqs.map((faq, index) => (
                        <div key={index} className="py-6">
                            <h3 className="text-lg font-semibold mb-3">
                                {faq.question}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8 pb-8">
                    <Button
                        type="button"
                        onClick={closeModal}
                        variant="default"
                        className="px-8 py-2.5 rounded-xl hover:shadow-md transition-all duration-300"
                    >
                        Close
                    </Button>
                </div>
            </DialogModal>
        </div>
    );
};

// @ts-ignore
TenantDash.auth = true;
// @ts-ignore
TenantDash.getLayout = Dashboard.getLayout;

export default TenantDash;
