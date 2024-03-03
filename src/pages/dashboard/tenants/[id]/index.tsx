import { useRouter } from 'next/router';
import Dashboard from '..';
import BackButton from 'components/base/BackButton';
import Button from 'components/base/Button';
import { FC, ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import TransactionHistory from './transaction';
import useTenant from 'hooks/useTenant';
import { User } from 'interfaces';

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
    const id = query?.id as string | undefined;
    const [tenant, setTenant] = useState({} as User);
    const { getTenants, getTenantLoading } = useTenant();

    useEffect(() => {
        const tenants = getTenants?.data;
        Array.isArray(tenants) &&
            tenants.filter((tenant: User) => {
                tenant?.id === id && setTenant(tenant);
            });
        // eslint-disable-next-line
    }, [id]);

    return (
        <div>
            <header className="flex justify-between items-center mb-5">
                <div className="flex items-center">
                    <BackButton />
                    <h3 className="ml-5">Ref ID-#1FA09123GH</h3>
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
                        <Image
                            src="https://i.pravatar.cc/300"
                            alt="image placeholder"
                            width={146}
                            height={146}
                            className="rounded-full mr-4"
                        />
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
                            <DetailsCard label="Gender" content="Male" />
                            <DetailsCard
                                label="Date of Birth"
                                content={tenant.dob}
                            />
                        </div>
                        <div className="flex gap-4">
                            <DetailsCard
                                label="Phone Mumber"
                                content={tenant.phone}
                            />
                            <DetailsCard
                                label="Email Adress"
                                content={tenant.email}
                            />
                        </div>
                    </div>
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
