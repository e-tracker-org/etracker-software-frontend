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
import { getAllTenants } from 'services/newServices/tenant';
import { fetchAndFilterUsersByAccountType } from 'services/newServices/user';
import Image from 'next/image';
import { extractAndCapitalizeWords } from 'utils/helper';
import { API_URL, getFormattedDate } from 'services/config/config';
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
import TransactionHistory from '../[id]/transaction';
import { getSubscriptionStatus } from 'utils/subscriptionUtils';
import axios from 'axios';

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
    const [searchedTenant, setSearchedTenant] = useState<User[] | null>(null);
    const [generalProperty, setGeneralProperty] = useState([]);
    const [tenantProperty, setTenantProperty] = useState([]);
    const [tenantHistory, setTenantHistory] = useState([]);
    const [tenantDefault, setTenantDefault] = useState([]);
    const [allDefault, setAllDefault] = useState([]);
    const [paystackLoaded, setPaystackLoaded] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const tenantData = await fetchAndFilterUsersByAccountType();
            const general = await getAllGeneralProperties();
            const allTenantDefault = await getAllTenantDefault();
            setTenants(tenantData);
            setGeneralProperty(general);
            setAllDefault(allTenantDefault);
            setLoading(false);
        }

        fetchData();
    }, []);

    // Function to fetch tenant history
    const fetchTenantHistory = async (email: string) => {
        try {
            const tenant = tenants.find((t: any) => t.email === email);
            if (!tenant) {
                toast.success('No tenant found');
                return;
            }

            // @ts-ignore
            const tenantId = tenant.id;
            const filteredProperties = generalProperty.filter((property: any) => 
                property.tenant.some((t: any) => t.tenantId === tenantId)
            );

            setTenantProperty(filteredProperties);
    
        } catch (error) {
            console.error('Error retrieving tenant details:', error);
            toast.error('Error fetching tenant details');
        }
    };

    // Function to fetch tenant default data
    const fetchTenantDefault = async (email: string) => {
        try {
            const filteredDefaultTenants = allDefault.filter(
                (defaultTenant: any) =>
                    defaultTenant.tenantEmail === email
            );
            setTenantDefault(filteredDefaultTenants);
        } catch (error) {
            console.error('Error fetching default data:', error);
            toast.error('Error retrieving default data');
        }
    };

    const searchTenant = async (searchTerm: string) => {
        const subscriptionStatus = await getSubscriptionStatus(states?.user?.email || '');
        
        if (subscriptionStatus == 'active') {
            // If not subscribed, show payment option
            const userEmail = states?.user?.email;
    
            try {
                const response = await axios.post<{
                    authorization_url: string;
                    reference: string;
                    access_code: string;
                }>(`${API_URL}/payment/search-tenant`, {
                    userId: states?.user?.id,
                    searchTerm,
                    email: userEmail,
                    amount: 1000 * 100,
                });
                
                // console.log('Payment response:', response.data);
                const { authorization_url, reference } = response.data;
    
                if (paystackLoaded && authorization_url) {
                    // Store search term for use after payment
                    const paymentSuccessHandler = (response: any) => {
                        if (response.reference !== reference) {
                            toast.error('Payment failed. Please try again.');
                            return;
                        }
    
                        toast.success('Payment successful! Below is the tenant information.');
                        
                        // Use setTimeout to avoid making callback async
                        setTimeout(() => {
                            performTenantSearch(searchTerm)
                                .catch(error => {
                                    console.error('Search failed after payment:', error);
                                    toast.error('Search failed after payment');
                                });
                        }, 0);
                    };
    
                    const paystackOptions = {
                        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
                        email: userEmail,
                        amount: 1000 * 100,
                        ref: reference,
                        callback: paymentSuccessHandler,
                        onClose: () => {
                            alert('Payment window closed');
                        },
                    };
            
                    const handler = (window as any).PaystackPop.setup(paystackOptions);
                    handler.openIframe();
                } else {
                    toast.error('Payment processor is not ready. Please try again.');
                }
            } catch (error: any) {
                console.error('Error initializing payment:', error);
                toast.error('Payment initialization failed');
            }
            
            return;
        }
    
        // If already subscribed, perform search directly
        await performTenantSearch(searchTerm);
    };
    
    // Helper function to perform the actual search
    const performTenantSearch = async (searchTerm: string) => {
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
            setTenantHistory(tenantHist);
    
            if (tenantHist?.propertyId?.length > 0) {
                const filteredProperties = generalProperty.filter((property: any) =>
                    tenantHist.propertyId.includes(property.id)
                );
                setTenantProperty(filteredProperties);
            }
    
            if (tenantHist?.tenantEmail) {
                const filteredDefaultTenants = allDefault.filter(
                    (defaultTenant: any) =>
                        defaultTenant.tenantEmail === tenantHist.tenantEmail
                );
                setTenantDefault(filteredDefaultTenants);
            }
        } catch (error) {
            console.error('Error retrieving history:', error);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            states?.setSearchParam(searchTerm?.trim());
            searchTenant(searchTerm);
        }
    };

    const handleSearch = () => {
        setLoading(true);
        setTenantDefault([]);
        setTenantProperty([]);
        setTenantHistory([]);
        setTimeout(() => {
            setLoading(false);
            states?.setSearchParam(searchTerm?.trim());
            searchTenant(searchTerm);
        }, 1000);
    };

    const handleClose = () => {
        setSearchedTenant(null);
    };

    useEffect(() => {
        if (typeof window.PaystackPop !== 'undefined') {
          setPaystackLoaded(true);
          return;
        }
    
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        script.onload = () => {
          setPaystackLoaded(true);
        };
        script.onerror = () => {
          console.error('Failed to load Paystack script');
          setPaystackLoaded(false);
        };
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);

    return (
        <div className="min-h-screen">
        {/* Header */}
        <DashboardHeader title="Find Tenant" />
    
        {/* Main Content */}
        <main className="w-full max-w-7xl mx-auto bg-white my-10 rounded-lg shadow-sm p-6 md:p-10">
            {/* Search Section */}
            <section className="mb-10">
                <h3 className="font-bold text-2xl text-gray-900 mb-2">
                    Tenant Information
                </h3>
                <p className="text-gray-500">
                    Search for a tenant by their email address.
                </p>
    
                {/* Search Input */}
                <div className="mt-6 w-full md:w-3/5">
                    <label htmlFor="tenant-search" className="block text-sm font-medium text-gray-700 mb-2">
                        Tenant Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="tenant-search"
                            type="search"
                            placeholder="Enter tenant email..."
                            className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute inset-y-0 right-0 px-4 flex items-center bg-blue-500 rounded-r-lg hover:bg-blue-600 transition-colors duration-200"
                            aria-label="Search tenant"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.2314 21.1895L16.5674 15.5255C17.9285 13.8914 18.6072 11.7956 18.4624 9.67389C18.3176 7.55219 17.3603 5.56801 15.7898 4.1341C14.2193 2.7002 12.1565 1.92697 10.0304 1.97528C7.90429 2.02359 5.87867 2.88971 4.37492 4.39347C2.87116 5.89723 2.00503 7.92284 1.95672 10.0489C1.90842 12.175 2.68164 14.2379 4.11555 15.8084C5.54945 17.3789 7.53364 18.3361 9.65534 18.481C11.777 18.6258 13.8729 17.9471 15.5069 16.586L21.1709 22.25L22.2314 21.1895ZM3.48141 10.25C3.48141 8.91494 3.87729 7.6099 4.61899 6.49987C5.36069 5.38983 6.4149 4.52467 7.6483 4.01378C8.8817 3.50289 10.2389 3.36921 11.5483 3.62966C12.8576 3.89011 14.0604 4.53299 15.0044 5.47699C15.9484 6.421 16.5913 7.62373 16.8517 8.9331C17.1122 10.2425 16.9785 11.5997 16.4676 12.8331C15.9567 14.0665 15.0915 15.1207 13.9815 15.8624C12.8715 16.6041 11.5664 17 10.2314 17C8.44181 16.998 6.72607 16.2862 5.46063 15.0207C4.19519 13.7553 3.4834 12.0396 3.48141 10.25Z"
                                    fill="#FFFFFF"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
    
            {/* Tenant Details Section */}
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <Loader loading={loading} />
                </div>
            ) : searchedTenant !== null ? (
                <section className="space-y-6">
                    {searchedTenant.map((tenant: User) => (
                        <div key={tenant.id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                            {/* Personal Information */}
                            <DetailsRowCard title="Personal Information">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    {tenant.profileImage ? (
                                        <Image
                                            src={tenant.profileImage}
                                            alt="Profile"
                                            width={120}
                                            height={120}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <div className="flex justify-center items-center bg-blue-500 rounded-full w-24 h-24 text-white text-2xl font-semibold">
                                            {extractAndCapitalizeWords(tenant.firstname + ' ' + tenant.lastname)}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                        <DetailsCard label="First Name" content={tenant.firstname} />
                                        <DetailsCard label="Last Name" content={tenant.lastname} />
                                        <DetailsCard label="Gender" content="Male" />
                                        <DetailsCard label="Date of Birth" content={getFormattedDate(tenant.dob)} />
                                        <DetailsCard label="Phone Number" content={tenant.phone} />
                                        <DetailsCard label="Email Address" content={tenant.email} />
                                        <DetailsCard label="Address" content={tenant.fullAddress} className="col-span-2" />
                                        <DetailsCard label="Closest Landmark" content={tenant.landmark} className="col-span-2" />
                                    </div>
                                </div>
                            </DetailsRowCard>
    
                            {/* Tenant Rating */}
                            <DetailsRowCard title="Tenant Rating">
                                <TenantRating tenant={tenant} show={true} />
                            </DetailsRowCard>
    
                            {/* Transaction History */}
                            <DetailsRowCard title="Transaction History">
                                <TransactionHistory tenantId={tenant.id as string} />
                            </DetailsRowCard>
    
                            {/* Property History */}
                            <DetailsRowCard title="Property History">
                                {tenantProperty ? (
                                    <PropertyHistory property={tenantProperty} />
                                ) : (
                                    <p className="text-gray-500">No property history found.</p>
                                )}
                            </DetailsRowCard>
    
                            {/* Default History */}
                            <DetailsRowCard title="Previous Default">
                                {tenantDefault && tenantDefault.length > 0 ? (
                                    <FindTenantDefault tenants={tenantDefault} />
                                ) : (
                                    <p className="text-gray-500">No default history found.</p>
                                )}
                            </DetailsRowCard>
    
                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-6">
                                <Button
                                    className="bg-blue-500 hover:bg-blue-600 text-white"
                                    onClick={() => fetchTenantHistory(tenant.email)}
                                >
                                    Get Tenant History
                                </Button>
                                <Button
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => fetchTenantDefault(tenant.email)}
                                >
                                    Check Default History
                                </Button>
                            </div>
                        </div>
                    ))}
                </section>
            ) : (
                <div className="text-center text-gray-500 py-10">
                    No tenant found. Try searching by email.
                </div>
            )}
        </main>
    </div>
    );
}

FindTenants.auth = true;
FindTenants.getLayout = Dashboard.getLayout;