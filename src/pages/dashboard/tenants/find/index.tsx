import DashboardHeader from 'components/dashboard/Header';
import Dashboard from '..';
import TenantsList from 'components/dashboard/tenants';
import useTenant from 'hooks/useTenant';
import Loader from 'components/base/Loader';
import { User } from 'interfaces';
import { useEffect, useState, ReactNode, FC } from 'react';
import { useAppStore } from 'hooks/useAppStore';
import {
    getAllTenantDefault,
    getDefaultTenant,
    getLandlordTenant,
} from 'services/newServices/tenant';
// import { GenericResponse } from 'services';
import { getAllTenants } from 'services/newServices/tenant';
import { fetchAndFilterUsersByAccountType } from 'services/newServices/user';
import Image from 'next/image';
import { extractAndCapitalizeWords } from 'utils/helper';
import { getFormattedDate } from 'services/config/config';
import TenantRating from '../[id]/rating';
import toast from 'react-hot-toast';
import Button from 'components/base/Button';
import PropertyHistory from '../verify/tenantProperty';
import {
    getPropertyTenant,
    getPropertyByTenantId,
} from 'services/newServices/tenant';
import { getAllGeneralProperties } from 'services/newServices/properties';
import { findOneHistoryByEmail } from 'services/newServices/history';
import FindTenantDefault from 'components/dashboard/tenants/default/FindTenantDefault';

interface DetailsProps {
    label?: string;
    content?: string | number;
    className?: string | number | undefined;
}

interface DetailsRowProps {
    children?: ReactNode;
    title?: string | undefined;
}

const DetailsCard: FC<DetailsProps> = ({ label, className, content }) => {
    return (
        <div className="flex flex-col w-full">
            <label className="pb-2">{label}</label>
            <div
                className={`transparent-bg p-3 flex-1 rounded-md text-base ${className}`}
            >
                {content}
            </div>
        </div>
    );
};

const DetailsRowCard: FC<DetailsRowProps> = ({ title, children }) => {
    return (
        <div className="flex flex-col mb-8">
            <h3 className="font-bold text-xl">{title}</h3>
            <div className="flex gap-4 my-5 w-full">{children}</div>
        </div>
    );
};

export default function FindTenants() {
    const states = useAppStore();
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchedTenant, setSearchedTenant] = useState<User[] | null>(null); // Initialize with null
    const [generalProperty, setGeneralProperty] = useState([]);
    const [tenantProperty, setTenantlProperty] = useState([]);
    const [tenantHistory, setTenantHistory] = useState([]);
    const [tenantDefault, setTenantDefault] = useState([]);
    const [allDefault, setAllDefault] = useState([]);
    console.log(tenantHistory, 'tenantHistory');

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const tenantData = await fetchAndFilterUsersByAccountType();
            const general = await getAllGeneralProperties();
            const allTenantDefault = await getAllTenantDefault();

            console.log(allTenantDefault, 'allTenantDefault');

            setTenants(tenantData);
            setGeneralProperty(general);
            setAllDefault(allTenantDefault);
            setLoading(false);
        }

        fetchData();
    }, []);

    const searchTenant = async (searchTerm: string) => {
        const filteredTenant = tenants.filter((tenant: User) =>
            tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredTenant.length === 0) {
            toast.error('Email does not belong to a tenant');
            return;
        } else {
            setSearchedTenant(filteredTenant);
        }

        try {
            const tenantHist = await findOneHistoryByEmail(searchTerm);
            if (!tenantHist) {
                toast.success('No tenant history found');
                return;
            }
            setTenantHistory(tenantHist);

            // Filter out the properties from the general property list
            if (
                tenantHist &&
                tenantHist.propertyId &&
                tenantHist.propertyId.length > 0
            ) {
                const filteredProperties = generalProperty.filter(
                    (property: any) =>
                        tenantHist.propertyId.includes(property.id)
                );
                console.log(filteredProperties, 'filteredProperties');
                // Set the filtered properties to state
                setTenantlProperty(filteredProperties);
            }

            // Filter out the default tenants based on userId from tenantHistory
            if (tenantHist && tenantHist.userId) {
                const filteredDefaultTenants = allDefault.filter(
                    (defaultTenant: any) =>
                        defaultTenant.userId === tenantHist.userId
                );
                console.log(filteredDefaultTenants, 'filteredDefaultTenants');
                setTenantDefault(filteredDefaultTenants);
            }
        } catch (error) {
            console.error('Error retrieving history:', error);
            toast.error('Error retrieving history');
        }
    };

    // useEffect(() => {
    //     const fetchProperty = async () => {
    //         try {
    //             if (searchedTenant) {
    //                 const property = searchedTenant[0].id;

    //                 const propertyDetails = await getPropertyByTenantId(
    //                     property
    //                 );
    //                 console.log(propertyDetails, 'propertyDetails');

    //                 setTenantProperty(propertyDetails);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching property:', error);
    //             toast.error('Error retrieving property details');
    //         }
    //     };

    //     fetchProperty();
    // }, [searchedTenant]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            states?.setSearchParam(searchTerm?.trim());
            searchTenant(searchTerm);
        }
    };

    const handleSearch = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            states?.setSearchParam(searchTerm?.trim());
            searchTenant(searchTerm);
        }, 1000);
    };

    const handleClose = () => {
        setSearchedTenant(null);
    };

    return (
        <div className="">
            <DashboardHeader title="Find Tenant" />
            <main className="w-full bg-white my-10 rounded-md p-10">
                <section className="flex flex-col w-3/5">
                    <h3 className="font-bold text-xl py-3 text-[#131313]">
                        Tenant Information
                    </h3>
                    <p className=" text-[rgba(19,19,19,0.5)]">
                        Search for tenant by email.
                    </p>
                </section>
                <section className="w-full">
                    <div className="w-3/5 m-auto my-[50px]">
                        <section>
                            <div>
                                <label className="text-base text-[#131313]">
                                    Tenants
                                    <span className="text-red-300">*</span>
                                </label>
                                <div className="relative w-full 4xl:h-3/5 mt-3 flex">
                                    <input
                                        type="search"
                                        placeholder="Search Tenant By Email."
                                        className="rounded-xl bg-[#FFFFFF] placeholder:text-[#13131373] w-full pl-6 pr-8 py-3 focus:border-primary-600 border border-[#B9B9B9]"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                        }}
                                        onKeyDown={handleKeyDown}
                                    />

                                    <div
                                        onClick={() => {
                                            handleSearch();
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <svg
                                            className="absolute top-[25%] right-1"
                                            width="25"
                                            height="25"
                                            viewBox="0 0 25 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M22.2314 21.1895L16.5674 15.5255C17.9285 13.8914 18.6072 11.7956 18.4624 9.67389C18.3176 7.55219 17.3603 5.56801 15.7898 4.1341C14.2193 2.7002 12.1565 1.92697 10.0304 1.97528C7.90429 2.02359 5.87867 2.88971 4.37492 4.39347C2.87116 5.89723 2.00503 7.92284 1.95672 10.0489C1.90842 12.175 2.68164 14.2379 4.11555 15.8084C5.54945 17.3789 7.53364 18.3361 9.65534 18.481C11.777 18.6258 13.8729 17.9471 15.5069 16.586L21.1709 22.25L22.2314 21.1895ZM3.48141 10.25C3.48141 8.91494 3.87729 7.6099 4.61899 6.49987C5.36069 5.38983 6.4149 4.52467 7.6483 4.01378C8.8817 3.50289 10.2389 3.36921 11.5483 3.62966C12.8576 3.89011 14.0604 4.53299 15.0044 5.47699C15.9484 6.421 16.5913 7.62373 16.8517 8.9331C17.1122 10.2425 16.9785 11.5997 16.4676 12.8331C15.9567 14.0665 15.0915 15.1207 13.9815 15.8624C12.8715 16.6041 11.5664 17 10.2314 17C8.44181 16.998 6.72607 16.2862 5.46063 15.0207C4.19519 13.7553 3.4834 12.0396 3.48141 10.25Z"
                                                fill="#131313"
                                                fillOpacity="0.45"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </main>

            <section className="py-5 px-8 bg-white rounded-md flex flex-col relative">
                <Loader loading={loading} />
                {searchedTenant !== null ? (
                    searchedTenant.map((tenant: User) => (
                        <div key={tenant.id}>
                            <DetailsRowCard title="Personal Information">
                                <div className="">
                                    {tenant.profileImage ? (
                                        <Image
                                            src={tenant.profileImage}
                                            alt="image placeholder"
                                            width={146}
                                            height={146}
                                            className="rounded-full mr-4"
                                        />
                                    ) : (
                                        <div className="flex justify-center items-center bg-primary-600 py-7 px-8 rounded-full text-white w-[80px] h-[80px]">
                                            <span className="text-xl font-semibold">
                                                {extractAndCapitalizeWords(
                                                    tenant.firstname +
                                                        ' ' +
                                                        tenant.lastname
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="w-4/5">
                                    <div className="flex gap-4 mb-6">
                                        <DetailsCard
                                            label="First Name"
                                            content={tenant.firstname}
                                        />
                                        <DetailsCard
                                            label="Last Name"
                                            content={tenant.lastname}
                                        />
                                    </div>
                                    <div className="flex gap-4 mb-6">
                                        <DetailsCard
                                            label="Gender"
                                            content="Male"
                                        />
                                        {/* Assuming getFormattedDate is defined */}
                                        <DetailsCard
                                            label="Date of Birth"
                                            content={getFormattedDate(
                                                tenant.dob
                                            )}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <DetailsCard
                                            label="Phone Number"
                                            content={tenant.phone}
                                        />
                                        <DetailsCard
                                            label="Email Adress"
                                            content={tenant.email}
                                        />
                                    </div>
                                </div>
                            </DetailsRowCard>
                            <DetailsRowCard title="Property History">
                                {tenantProperty ? (
                                    <PropertyHistory
                                        property={tenantProperty}
                                    />
                                ) : (
                                    'No property history found'
                                )}
                            </DetailsRowCard>
                            <DetailsRowCard title="Previous Default">
                                {tenantDefault && tenantDefault.length > 0 ? (
                                    <FindTenantDefault
                                        tenants={tenantDefault}
                                    />
                                ) : (
                                    'No default found'
                                )}
                            </DetailsRowCard>
                            <div className="flex items-center justify-center ">
                                <DetailsRowCard title="Tenant Rating">
                                    <TenantRating tenant={tenant} />
                                </DetailsRowCard>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center">Search for tenant</div>
                )}
                <div className="absolute top-0 right-0 mt-2 mr-2">
                    {searchedTenant ? (
                        <Button
                            className=" py-4"
                            type="submit"
                            onClick={() => handleClose()}
                        >
                            Close
                        </Button>
                    ) : null}
                </div>
            </section>
        </div>
    );
}

FindTenants.auth = true;
FindTenants.getLayout = Dashboard.getLayout;
