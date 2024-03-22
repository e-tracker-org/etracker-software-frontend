import { FC, ReactNode, useEffect, useState } from 'react';
import Dashboard from '..';
import useProperty from 'hooks/useProperty';
import useAccountType from 'hooks/useAccountType';
import PropertyListing from 'components/dashboard/properties/property-listing';
import PropertyListingCard from 'components/dashboard/properties/property-listing/PropertyListingCard';
import DashboardHeader from 'components/dashboard/Header';
import Loader from 'components/base/Loader';
import Box from 'components/Box';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import TenantTable from 'components/dashboard/tenants/TenantTable';
import { useAppStore } from 'hooks/useAppStore';
import { getLandlordTenant } from 'services/newServices/tenant';
import Link from 'next/link';
import { ReceiptSvg, MoneySvg, VerifySvg } from 'assets/svgIcons/svgIcons';
import { useRouter } from 'next/router';

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

const LandlordDash: FC = () => {
    const { acctType } = useAccountType();
    const router = useRouter();
    const states = useAppStore();
    const [tenants, setTenants] = useState([]);
    const [occupiedCount, setOccupiedCount] = useState(0);
    const [vacantCount, setVacantCount] = useState(0);

    const {
        getMyProperties,
        getMyPropertiesLoading,
        getProperties,
        getPropertiesLoading,
    } = useProperty();

    const properties =
        Number(acctType?.typeID) === 1
            ? getMyProperties?.data?.data
            : 'No property record found';
    const propertiesLoading =
        Number(acctType?.typeID) === 1
            ? getPropertiesLoading
            : getMyPropertiesLoading;

    useEffect(() => {
        const allProperties = getProperties?.data.data;

        let occupied = 0;
        let vacant = 0;

        if (allProperties) {
            allProperties.forEach((property) => {
                if (property.tenant && property.tenant.length > 0) {
                    occupied++;
                } else {
                    vacant++;
                }
            });
        }

        setOccupiedCount(occupied);
        setVacantCount(vacant);
    }, [getProperties]);

    const totalProperties = occupiedCount + vacantCount;
    const occupiedPercentage = (occupiedCount / totalProperties) * 100;

    console.log(occupiedPercentage, 'percentage');
    console.log(occupiedCount, 'count');

    useEffect(() => {
        async function fetchData() {
            const tenantData = await getLandlordTenant(states?.user?.id);
            setTenants(tenantData);
        }
        if (states?.user?.id) {
            fetchData();
        }
    }, [states]);

    const handleNavigate = (route: string) => {
        router.push(route);
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
                            <div className="px-8 bg-white rounded-md">
                                <DetailsRowCard title="Property Management">
                                    <div className="flex ml-3 gap-5">
                                        <Box
                                            onClick={handleNavigate}
                                            route="dashboard/tenants"
                                            title="Issue Recipt"
                                            icon={<ReceiptSvg />}
                                        />
                                        <Box
                                            onClick={handleNavigate}
                                            route="dashboard/tenants"
                                            title="Utility Bill"
                                            icon={<MoneySvg />}
                                        />
                                        <Box
                                            onClick={handleNavigate}
                                            route="dashboard/tenants/verify"
                                            title="Verify Tenant"
                                            icon={<VerifySvg />}
                                        />
                                    </div>
                                </DetailsRowCard>
                            </div>
                        </div>
                        <div className="lg:w-1/2 lg:ml-5">
                            <div className="px-8 bg-white rounded-md ">
                                <DetailsRowCard title="Properties">
                                    <div className="flex flex-col lg:flex-row justify-between lg:mb-5">
                                        <div className="flex items-center">
                                            <CircularProgressbar
                                                value={occupiedPercentage}
                                                text={totalProperties}
                                                className="mb-4 lg:mb-0"
                                                styles={buildStyles({
                                                    rotation: 0.25,
                                                    // strokeLinecap: 'butt',
                                                    textSize: '16px',
                                                    pathTransitionDuration: 0.5,
                                                    pathColor: `rgba(222, 80, 0, 1), ${
                                                        occupiedPercentage / 100
                                                    })`,
                                                    trailColor: '#8D03CE',
                                                })}
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center mt-2 ml-2">
                                            {' '}
                                            <div className="mb-4 lg:mb-0 flex gap-2 ">
                                                <div
                                                    className="w-4 h-4"
                                                    style={{
                                                        backgroundColor:
                                                            '#8D03CE',
                                                    }}
                                                ></div>
                                                <p className="text-sm">
                                                    {vacantCount} Vacant
                                                </p>
                                            </div>
                                            <div className="mb-4 lg:mb-0 flex gap-1 ">
                                                <div
                                                    className="w-4 h-4  mr-2"
                                                    style={{
                                                        backgroundColor:
                                                            'rgba(222, 80, 0, 1)',
                                                    }}
                                                ></div>
                                                <p className="text-sm">
                                                    {occupiedCount} Occupied
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </DetailsRowCard>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 bg-white rounded-md">
                        <DetailsRowCard
                            title="Tenants"
                            subheader="List of your tenants"
                        >
                            <TenantTable tenants={tenants} />
                        </DetailsRowCard>
                    </div>
                    <div className="mt-5 bg-white rounded-md">
                        <DetailsRowCard title="My Units">
                            {Array.isArray(properties) && properties.length ? (
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
                </section>
            )}
        </div>
    );
};

LandlordDash.auth = true;
LandlordDash.getLayout = Dashboard.getLayout;

export default LandlordDash;
