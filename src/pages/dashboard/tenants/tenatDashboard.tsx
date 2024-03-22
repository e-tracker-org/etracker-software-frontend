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

interface DetailsRowProps {
    children?: ReactNode;
    title?: string | undefined;
    subheader?: string;
    linkHref?: string;
    linkText?: string;
}

const DetailsRowCard: FC<DetailsRowProps> = ({
    title,
    subheader,
    linkHref,
    linkText,
    children,
}) => {
    return (
        <div className="flex flex-col mb-8">
            <div className="flex justify-between mb-2">
                <div>
                    <h3 className="font-bold text-xl">{title}</h3>
                    {subheader && <p className="text-sm">{subheader}</p>}{' '}
                </div>
                {linkHref && (
                    <Link href={linkHref}>
                        <a className="text-blue-500">{linkText}</a>
                    </Link>
                )}
            </div>
            <div className="flex gap-4 my-5 w-full overflow-x-auto">
                {children}
            </div>
        </div>
    );
};

const TenantDash: FC = () => {
    const { acctType } = useAccountType();

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
                            <div className="px-8  bg-white rounded-md">
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
                        </div>
                        <div className="lg:w-1/2 lg:ml-5">
                            <div className="px-8  bg-white rounded-md">
                                <DetailsRowCard title="Help Center">
                                    <div className="flex flex-col gap-8">
                                        <Help
                                            title="Read Our FAQs"
                                            icon={<FaqSvg />}
                                        />
                                        <Help
                                            title="Contract E-tracka Support"
                                            icon={<SupportSvg />}
                                        />
                                    </div>
                                </DetailsRowCard>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 bg-white rounded-md">
                        <DetailsRowCard
                            title="Explore Listing"
                            subheader="Search for properties and spaces you may like"
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
        </div>
    );
};

TenantDash.auth = true;
TenantDash.getLayout = Dashboard.getLayout;

export default TenantDash;
