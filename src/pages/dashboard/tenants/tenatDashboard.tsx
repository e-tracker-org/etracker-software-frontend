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

    return (
        <div>
            <header className="flex justify-between items-center mb-5">
                <DashboardHeader title="Overview" />
            </header>
            {propertiesLoading ? (
                <Loader loading={propertiesLoading} />
            ) : (
                <section className="py-10 px-8">
                    <div className="flex flex-col lg:flex-row justify-between lg:mb-5">
                        <div className="lg:w-1/2 lg:mr-5 mb-5 lg:mb-0">
                            <div
                                style={{
                                    borderLeftColor: '#1F32EB',
                                    borderLeftWidth: 5,
                                }}
                                className=" px-8  bg-white rounded-md pt-5"
                            >
                                <DetailsRowCard title="My Units">
                                    {Array.isArray(properties) &&
                                    properties.length ? (
                                        properties.map((property) => (
                                            <div
                                                key={property?.id}
                                                className="flex-none"
                                            >
                                                <PropertyListingCard
                                                    property={property}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="flex justify-center items-center text-center text-xl w-full">
                                            No property record found
                                        </p>
                                    )}
                                </DetailsRowCard>
                            </div>
                            <div className="px-8 bg-white rounded-md pt-4">
                                <Image
                                    src="/house.png"
                                    width={579}
                                    height={350}
                                    alt="e-tracka"
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2 lg:ml-5">
                            <div className="px-8  bg-white rounded-md pt-5">
                                <DetailsRowCard title="Help Center">
                                    <div className="flex flex-col gap-8 w-full">
                                        <div
                                            onClick={() => {
                                                openModal();
                                            }}
                                        >
                                            <Help
                                                title="Read Our FAQs"
                                                icon={<FaqSvg />}
                                                bgColor="#DBFFCE"
                                            />
                                        </div>
                                        <div
                                            onClick={() => {
                                                handleCopy();
                                            }}
                                        >
                                            <Help
                                                title="Contact E-tracka Support"
                                                icon={<SupportSvg />}
                                                bgColor="#FFF4CE"
                                            />
                                        </div>
                                    </div>
                                </DetailsRowCard>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            borderLeftColor: '#1F32EB',
                            borderLeftWidth: 5,
                        }}
                        className="mt-5 px-8 bg-white rounded-md pt-5"
                    >
                        <DetailsRowCard
                            title="Explore Listing"
                            subheader="Search for properties and spaces you may like"
                            linkText="View All"
                            Route="/dashboard/properties"
                            // linkHref="/"
                        >
                            {Array.isArray(allProperties) &&
                            allProperties.length ? (
                                allProperties.map((property) => (
                                    <div
                                        key={property?.id}
                                        className=" flex-none"
                                    >
                                        <PropertyListingCard
                                            property={property}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="flex justify-center items-center text-center text-xl w-full">
                                    No property record found
                                </p>
                            )}
                        </DetailsRowCard>
                    </div>
                    {/* Long Container at the bottom */}
                </section>
            )}
            <DialogModal
                openModal={isModalOpen}
                closeModal={closeModal}
                title="Frequently Asked Questions"
                contentClass="w-full !py-10"
                className="rounded-md sm:ml-[40%] lg:ml-[10%] px-[3%] lg:!top-[10%]"
            >
                <div className="px-8">
                    {faqs.map((faq, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="text-xl font-bold mb-4">
                                {faq.question}
                            </h3>
                            <p>{faq.answer}</p>
                        </div>
                    ))}
                </div>
                <div className="flex w-full justify-center mt-8">
                    <Button
                        type="button"
                        onClick={closeModal}
                        variant="default"
                        className="w-40"
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
