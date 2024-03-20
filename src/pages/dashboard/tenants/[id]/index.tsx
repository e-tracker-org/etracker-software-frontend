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
import { getTenantTransactions } from 'services/newServices/tenant';
import { useAppStore } from 'hooks/useAppStore';
import { getFormattedDate } from 'services/config/config';
import TenantRating from './rating';
import { extractAndCapitalizeWords } from 'utils/helper';

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

export default function TenantDetails() {
    const { query } = useRouter();
    const states = useAppStore();

    const id = query?.id as string | undefined;
    const [tenant, setTenant] = useState({} as User);
    const { getTenants, getTenantLoading } = useTenant();
    const { tenantTransactions, setTenantTransaction } = useState([]) as any;

    const { uploadedFiles, loadinguploadFiles } = useFileUploadHandler(
        'PROFILE',
        'profile_image'
    );

    useEffect(() => {
        const storedTenant = localStorage.getItem('selectedTenant');
        // const tenants = getTenants?.data;
        const tenant = JSON.parse(storedTenant as any);

        setTenant(tenant?.userData);
        // console.log('tenants', tenants)
        // Array.isArray(tenants) &&
        //     tenants.filter((tenant: User) => {
        //         tenant?.id === id && setTenant(tenant);
        //     });
        // eslint-disable-next-line
    }, [id]);

    return (
        <div>
            <header className="flex justify-between items-center mb-5">
                <div className="flex items-center">
                    <BackButton />
                    {/* <h3 className="ml-5">Ref ID-#1FA09123GH</h3> */}
                </div>
                <div className="flex">
                    <Button
                        title="End Agreement"
                        onClick={() => {
                            console.log('end agreement modal');
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

                <DetailsRowCard title="Tenant Rating">
                    <TenantRating tenant={tenant} />
                </DetailsRowCard>

                <DetailsRowCard title="Transaction History">
                    <TransactionHistory />
                </DetailsRowCard>
            </section>
        </div>
    );
}

TenantDetails.auth = true;
TenantDetails.getLayout = Dashboard.getLayout;
