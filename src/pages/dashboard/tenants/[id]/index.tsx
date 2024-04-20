import { useRouter } from 'next/router';
import Dashboard from '..';
import BackButton from 'components/base/BackButton';
import Button from 'components/base/Button';
import { FC, ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import TransactionHistory from './transaction';
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
import TenantRating from './rating';
import { extractAndCapitalizeWords } from 'utils/helper';
import useLandlord from 'hooks/useLandlord';
import toast from 'react-hot-toast';
import { string } from 'yup';
import { getLandlordTenant } from 'services/newServices/tenant';
import { deleteTask } from 'services/newServices/tenant';
import useProperty from 'hooks/useProperty';
import { DialogModal } from 'components/base/DialogModal';
import SuccessPage from 'components/onboarding/SuccessPage';

interface DetailsProps {
    label?: string;
    content?: string | number;
    className?: string | number | undefined;
}

interface DetailsRowProps {
    children?: ReactNode;
    title?: string | undefined;
}

interface TenantProperty {
    userId: string;
    propertyId: string;
    landlordId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
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

export default function TenantDetails() {
    // @ts-ignore
    const { query, router } = useRouter();
    const states = useAppStore();
    const { endTenantAgreement, isEndTenantAgreementLoading } = useLandlord();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const id = query?.id as string | undefined;
    // const propertyId = states?.propertyId as string;
    const [tenant, setTenant] = useState({} as User);
    const [tenantProperty, setTenantProperty] = useState<TenantProperty | null>(
        null
    );
    const { getProperty, getPropertyLoading } = useProperty(
        // @ts-ignore
        tenantProperty?.propertyId
    );

    const property = getProperty?.data;

    const { uploadedFiles, loadinguploadFiles } = useFileUploadHandler(
        'PROFILE',
        'profile_image'
    );

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const storedTenant = localStorage.getItem('selectedTenant');
                const tenant = JSON.parse(storedTenant || '');
                console.log(tenant, 'Tenant stored');

                if (tenant) {
                    setTenant(tenant.userData);
                    setTenantProperty(tenant.tenantData);
                }

                const tenantFilesCount = await getTenantFiles(id);

                localStorage.setItem(
                    'selectedTenantFilesCount',
                    tenantFilesCount.length || 0
                );

                // if (tenantFilesCount.length > 0) {
                //     setFiles(10);
                // } else {
                //     setFiles(0); // Set files to 0 if tenantFilesCount is empty
                // }
            } catch (error) {
                console.error('Error fetching tenant transactions:', error);
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    const handleEndAgreement = async (tenantId: string) => {
        const body = {
            property: property,
            name: tenant.firstname,
            email: tenant.email,
            tenantId: tenantProperty?.userId,
        };
        try {
            setIsLoading(true);
            const deleteTenant = await deleteTask(tenantId, body);
            console.log(deleteTenant);
            toast.success('Tenant agreement successfully ended');
            setIsLoading(false);
            setIsModalOpen(false);
            router.push('/dashboard/tenants');
            // router.back();
        } catch (error) {
            console.error('Error ending tenant agreement:', error);
            toast.error('Failed to end tenant agreement');
        }
    };

    return (
        <div>
            <header className="flex justify-between items-center mb-5">
                <div className="flex items-center">
                    <BackButton />
                    {/* <h3 className="ml-5">Ref ID-#1FA09123GH</h3> */}
                </div>
                {tenant?.isUserVerified && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="50"
                        height="50"
                    >
                        <path
                            fill="#1DA1F2"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 15.06l-4.24-4.24 1.41-1.41 2.83 2.83 7.07-7.07 1.41 1.41-8.48 8.48z"
                        />
                    </svg>
                )}
                <div className="flex">
                    <Button
                        title="End Agreement"
                        isLoading={isEndTenantAgreementLoading}
                        onClick={() => {
                            openModal();
                        }}
                    />
                </div>
            </header>

            <section className="py-5 px-8 bg-white rounded-md">
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
                                        tenant.firstname + ' ' + tenant.lastname
                                    )}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* {uploadedFiles?.data?.data[0]
                        ?.urls[0] ? (
                        loadinguploadFiles ? (
                            <Spinner className="h-10 w-10 mt-2" />
                        ) : (
                            <Image
                                src={`${uploadedFiles?.data?.data[0]?.urls[0]}`}
                                alt=""
                                width={100}
                                height={100}
                            />
                        )
                    ) : (
                        <label className="pt-10">
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 44 43"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21.9998 0.166626C24.8288 0.166626 27.5419 1.29043 29.5423 3.29082C31.5427 5.29121 32.6665 8.00432 32.6665 10.8333C32.6665 13.6623 31.5427 16.3754 29.5423 18.3758C27.5419 20.3762 24.8288 21.5 21.9998 21.5C19.1709 21.5 16.4578 20.3762 14.4574 18.3758C12.457 16.3754 11.3332 13.6623 11.3332 10.8333C11.3332 8.00432 12.457 5.29121 14.4574 3.29082C16.4578 1.29043 19.1709 0.166626 21.9998 0.166626ZM21.9998 26.8333C33.7865 26.8333 43.3332 31.6066 43.3332 37.5V42.8333H0.666504V37.5C0.666504 31.6066 10.2132 26.8333 21.9998 26.8333Z"
                                    fill="#131313"
                                    fillOpacity="0.65"
                                />
                            </svg>
                        </label>
                    )} */}
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
                            <DetailsCard label="Gender" content="Male" />
                            <DetailsCard
                                label="Date of Birth"
                                content={getFormattedDate(tenant.dob)}
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

                <div className="flex items-center justify-center ">
                    <DetailsRowCard title="Tenant Rating">
                        <TenantRating tenant={tenant} show={true} />
                    </DetailsRowCard>
                </div>

                <DetailsRowCard title="Transaction History">
                    <TransactionHistory />
                </DetailsRowCard>

                <DialogModal
                    openModal={isModalOpen}
                    closeModal={closeModal}
                    title={`Do you want to end  agreement with your tenant?`}
                    subTitle="Ending a tenancy early can lead to legal and financial repercussions for landlords, including compensation to the tenant and legal action. Seek legal advice before taking action."
                    contentClass="w-full !py-10"
                    className="rounded-md sm:ml-[40%] lg:ml-[10%] px-[10%]  lg:!top-[10%]"
                >
                    <div>
                        <div className="flex w-4/6 gap-5 col-span-2 mx-auto mt-16 mb-2">
                            <Button
                                type="button"
                                onClick={() => {
                                    closeModal();
                                }}
                                variant="default"
                                className="w-full py-4"
                            >
                                Cancel
                            </Button>

                            <Button
                                className="w-full py-4"
                                type="submit"
                                isLoading={isLoading}
                                // @ts-ignore
                                onClick={() =>
                                    handleEndAgreement(tenantProperty?.id)
                                }
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </DialogModal>
            </section>
        </div>
    );
}

TenantDetails.auth = true;
TenantDetails.getLayout = Dashboard.getLayout;
