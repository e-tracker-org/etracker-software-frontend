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
import { ReceiptSvg, MoneySvg, VerifySvg } from 'assets/svgIcons/svgIcons';
import { useRouter } from 'next/router';
import Dropdown from 'components/base/Dropdown';
import Image from 'next/image';

interface DetailsRowProps {
    children?: ReactNode;
    title?: string | undefined;
    subheader?: string;
    linkHref?: string;
    linkText?: string;
    Route?: string;
    dropdown?: ReactNode;
    titleColor?: string;
}

const DetailsRowCard: FC<DetailsRowProps> = ({
    title,
    subheader,
    linkHref,
    linkText,
    children,
    Route,
    dropdown,
    titleColor = 'white',
}) => {
    const router = useRouter();
    const handleNavigate = (route: string) => {
        router.push(route);
    };
    return (
        <div className="flex flex-col mb-8 p-8">
            <div className="flex justify-between mb-2">
                <div>
                    <h3
                        style={{ color: titleColor }}
                        className="font-bold text-xl"
                    >
                        {title}
                    </h3>
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
                {dropdown}
            </div>
            <div className="flex gap-2 my-5 w-full  overflow-x-auto">
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
        const allProperties = getMyProperties?.data.data;

        let occupied = 0;
        let vacant = 0;

        if (allProperties) {
            allProperties.forEach((property) => {
                // @ts-ignore
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

    const propertie = getMyProperties?.data.data.map((property) => ({
        value: property.id,
        label: property.name,
    }));

    const getPropertyName = (id: string) => {
        const property = propertie?.find((p) => p.value === id);
        return property?.label;
    };
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
                <section className="py-10 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:mb-5">
                        <div className="lg:w-1/2 lg:mr-5 mb-5 lg:mb-0">
                            <div
                                style={{ backgroundColor: '#1F32EB' }}
                                className=" rounded-md pt-5 "
                            >
                                <DetailsRowCard title="Property Management">
                                    <div className="flex gap-3">
                                        <Box
                                            onClick={handleNavigate}
                                            route="dashboard/tenants"
                                            title="Issue Recipt"
                                            icon={<ReceiptSvg />}
                                        />
                                        {/* <Box
                                            onClick={handleNavigate}
                                            route="dashboard/tenants"
                                            title="Utility Bill"
                                            icon={<MoneySvg />}
                                        /> */}
                                        <Box
                                            onClick={handleNavigate}
                                            route="dashboard/tenants/verify"
                                            title="Verify Tenant"
                                            icon={<VerifySvg />}
                                        />
                                    </div>
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
                            <div className="lg:px-8 bg-white rounded-md pt-5">
                                <DetailsRowCard
                                    title="Properties"
                                    linkText="View Properties"
                                    Route="/dashboard/properties"
                                    titleColor="black"
                                >
                                    {/* <div className="flex flex-col lg:flex-row justify-between lg:mb-5"> */}
                                    {/* <div className="flex items-center"> */}
                                    <CircularProgressbar
                                        value={occupiedPercentage}
                                        // @ts-ignore
                                        text={totalProperties}
                                        className="mb-4 lg:mb-0"
                                        styles={buildStyles({
                                            rotation: 0.25,
                                            // strokeLinecap: 'butt',
                                            textSize: '14px',
                                            pathTransitionDuration: 0.5,
                                            pathColor: `rgba(222, 80, 0, 1), ${
                                                occupiedPercentage / 100
                                            })`,

                                            trailColor: '#8D03CE',
                                        })}
                                    />
                                    {/* </div> */}
                                    <div className="flex flex-col justify-center mt-2">
                                        <div className="mb-4 lg:mb-0 flex gap-2 ">
                                            <div
                                                className="w-4 h-4"
                                                style={{
                                                    backgroundColor: '#8D03CE',
                                                }}
                                            ></div>
                                            <p className="text-sm">
                                                {vacantCount} Vacant
                                            </p>
                                        </div>
                                        <div className="mb-4 lg:mb-0 flex gap-2 ">
                                            <div
                                                className="w-4 h-4"
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
                                    {/* </div> */}
                                </DetailsRowCard>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            borderLeftColor: '#1F32EB',
                            borderLeftWidth: 5,
                        }}
                        className="mt-5 bg-white rounded-md pt-5 lg:px-8"
                    >
                        <DetailsRowCard
                            title="Tenants"
                            subheader="List of your tenants"
                            titleColor="black"
                            dropdown={
                                <Dropdown
                                    title={
                                        getPropertyName(
                                            states?.propertyId as string
                                        ) || 'All Properties'
                                    }
                                    className="border border-[#BEBCBC] rounded-lg text-[18px] text-black"
                                    ulClassName="bg-white drop-shadow-t-xs"
                                    btnClasssName="py-4 px-3"
                                >
                                    <li
                                        key="all"
                                        className={`py-4 px-3 text-black border-b border-[#E7E5E5] last:border:0 cursor-pointer hover:bg-slate-50 ${
                                            states?.propertyId === '' &&
                                            'bg-slate-50'
                                        }`}
                                    >
                                        <button
                                            onClick={(e) => {
                                                states?.setPropertyId('');
                                            }}
                                        >
                                            All Properties
                                        </button>
                                    </li>
                                    {propertie?.map((property) => (
                                        <li
                                            key={property.value}
                                            className={`py-4 px-3 text-black border-b border-[#E7E5E5] last:border:0 cursor-pointer hover:bg-slate-50 ${
                                                states?.propertyId ===
                                                    property.value &&
                                                'bg-slate-50'
                                            }`}
                                        >
                                            <button
                                                data-id={property.value}
                                                onClick={(e) => {
                                                    states?.setPropertyId(
                                                        e.currentTarget.dataset
                                                            .id as string
                                                    );
                                                }}
                                                className="whitespace-nowrap"
                                            >
                                                {property.label}
                                            </button>
                                        </li>
                                    ))}
                                </Dropdown>
                            }
                        >
                            <TenantTable tenants={tenants} />
                        </DetailsRowCard>
                    </div>
                    <div
                        style={{
                            borderLeftColor: '#1F32EB',
                            borderLeftWidth: 5,
                        }}
                        className="mt-5 bg-white rounded-md pt-5 lg:px-8"
                    >
                        <DetailsRowCard title="My Units" titleColor="black">
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
// @ts-ignore
LandlordDash.auth = true;
// @ts-ignore
LandlordDash.getLayout = Dashboard.getLayout;

export default LandlordDash;
