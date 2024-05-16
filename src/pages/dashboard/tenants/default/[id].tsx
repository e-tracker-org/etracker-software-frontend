import { useRouter } from 'next/router';
import Dashboard from '..';
import BackButton from 'components/base/BackButton';
import Button from 'components/base/Button';
import { FC, ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import TransactionHistory from '../[id]/transaction';
import useTenant from 'hooks/useTenant';
import { Transaction, User } from 'interfaces';
import useFileUploadHandler from 'hooks/useFileUploadHandler';
import Spinner from 'components/base/Spinner';
import {
    getTenantFiles,
    getTenantTransactions,
} from 'services/newServices/tenant';
import { useAppStore } from 'hooks/useAppStore';
import { getFormattedDate } from 'services/config/config';
import TenantRating from '../[id]/rating';
import { extractAndCapitalizeWords } from 'utils/helper';
import useLandlord from 'hooks/useLandlord';
import toast from 'react-hot-toast';
import useProperty from 'hooks/useProperty';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Slider from 'react-slick';

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

export default function VerifyTenantDetails() {
    const { query } = useRouter();
    const id = query?.id as string | undefined;
    const [tenant, setTenant] = useState({} as any);
    const [imageList, setImageList] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const storedTenant = localStorage.getItem(
                    'selectedDefaultTenant'
                );

                const tenant = JSON.parse(storedTenant || '');

                if (tenant) {
                    setTenant(tenant);
                    // Assuming tenant.images is an array of image URLs
                    setImageList(tenant.image_list || []);
                }
            } catch (error) {
                console.error('Error fetching tenant transactions:', error);
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="relative min-h-screen">
            <header className="flex justify-between items-center mb-5">
                <div className="flex items-center">
                    <BackButton />
                </div>
            </header>

            <section className="py-5 px-8 bg-white rounded-md">
                <DetailsRowCard title="Default Tenant Information">
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
                                        tenant.tenantName
                                    )}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="w-4/5">
                        <div className="flex flex-col gap-4 sm:flex-row mb-4">
                            <DetailsCard
                                label="First Name"
                                content={tenant.tenantName}
                                className="w-full sm:w-auto"
                            />
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row mb-4">
                            <DetailsCard
                                label="Complaint"
                                content={tenant.complaints}
                                className="w-full sm:w-auto" // Adjust width for small screens
                            />
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row mb-4">
                            <DetailsCard
                                label="Phone Number"
                                content={tenant.tenantPhone}
                                className="w-full sm:w-auto" // Adjust width for small screens
                            />
                            <DetailsCard
                                label="Tenant Email Address"
                                content={tenant.tenantEmail}
                                className="w-full sm:w-auto" // Adjust width for small screens
                            />
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row mb-4">
                            <DetailsCard
                                label="Tenant NIN"
                                content={tenant.tenantNIN}
                                className="w-full sm:w-auto" // Adjust width for small screens
                            />
                            <DetailsCard
                                label="Landlord NIN"
                                content={tenant.landlordNIN}
                                className="w-full sm:w-auto" // Adjust width for small screens
                            />
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row mb-4">
                            <DetailsCard
                                label="Property Address"
                                content={tenant.propertyAddress}
                                className="w-full sm:w-auto" // Adjust width for small screens
                            />
                            <DetailsCard
                                label="Complaint Status"
                                content={tenant.status}
                                className="w-full bg-green-200 sm:w-auto" // Adjust width for small screens
                            />
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row mb-4">
                            <DetailsCard
                                label="Date Submitted"
                                // format date
                                content={getFormattedDate(tenant.createdAt)}
                                className="w-full bg-green-200 sm:w-auto" // Adjust width for small screens
                            />
                            <DetailsCard
                                label="Tenant Gender"
                                content={tenant.tenantGender}
                                className="w-full sm:w-auto"
                            />
                        </div>
                    </div>
                </DetailsRowCard>
                {imageList.length > 0 && (
                    <div className="">
                        {/* <Slider {...settings}> */}
                        {imageList.map((image, index) => (
                            <div
                                key={index}
                                className="flex overflow-x-auto justify-center"
                            >
                                <Image
                                    src={image}
                                    className=" rounded-lg"
                                    alt={`Tenant image ${index + 1}`}
                                    width={300}
                                    height={200}
                                    objectFit="cover"
                                />
                            </div>
                        ))}
                        {/* </Slider> */}
                    </div>
                )}
            </section>
        </div>
    );
}

VerifyTenantDetails.auth = true;
VerifyTenantDetails.getLayout = Dashboard.getLayout;
