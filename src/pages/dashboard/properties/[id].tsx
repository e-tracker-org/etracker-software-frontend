import Button from 'components/base/Button';
import { BiArrowBack } from 'react-icons/bi';
import useAccountType from 'hooks/useAccountType';
import { useAppStore } from 'hooks/useAppStore';
import Dashboard from '..';
import Image from 'next/image';
import { FC, ReactFragment, ReactNode, useEffect, useState } from 'react';
import BackButton from 'components/base/BackButton';
import useProperty from 'hooks/useProperty';
import { useRouter } from 'next/router';
import { Property } from 'interfaces';
import { goBackToKyc2 } from 'utils/helper';
import { getSidedProp } from '@tanstack/react-query-devtools/build/lib/utils';
import Loader from 'components/base/Loader';

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

export default function PropertyDetails() {
    const states = useAppStore();
    const { acctType } = useAccountType();
    const { query } = useRouter();
    const router = useRouter();
    const id = query?.id as string | undefined;
    const { getProperty, getPropertyLoading } = useProperty(id);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const property = getProperty?.data;
    console.log(property);

    // @ts-ignore
    const openModal = (index) => {
        setSelectedImageIndex(index);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const nextImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === property?.image_list.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? property?.image_list.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="h-auto">
            <header className="flex justify-between">
                <div className="flex gap-4 items-center">
                    <BackButton />
                    <h3 className="text-xl lg:text-2xl font-medium text-black">
                        Property details
                    </h3>
                </div>
                {acctType?.typeID === 2 && (
                    <div className="flex gap-4 items-center">
                        <Button
                            title="List"
                            href="/dashboard/properties"
                            variant="default"
                        />
                        <Button
                            title="Add Tenant"
                            onClick={() => {
                                const isUserVerify = goBackToKyc2(
                                    states,
                                    router
                                );

                                if (isUserVerify) {
                                    router.push(
                                        `/dashboard/tenants/add?q=${id}`
                                    );
                                }
                            }}
                        />
                        <Button
                            title="... More"
                            variant="default"
                            className="border-0"
                        />
                    </div>
                )}
            </header>
            {getPropertyLoading ? (
                <Loader loading={getPropertyLoading} />
            ) : (
                <section className="w-full bg-white my-10 p-5 rounded-md">
                    <DetailsRowCard title="General Information">
                        <div className="flex flex-row gap-4">
                            <div className="w-4/5">
                                <div onClick={() => openModal(0)}>
                                    <Image
                                        src={property?.image_list[0]?.urls[0]}
                                        alt="property placeholder 0"
                                        className="rounded-md"
                                        width={700}
                                        height={600}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-2/5">
                                <div onClick={() => openModal(1)}>
                                    <Image
                                        src={property?.image_list[1]?.urls[0]}
                                        alt="property placeholder 1"
                                        className="rounded-md"
                                        width={400}
                                        height={180}
                                    />
                                </div>
                                <div onClick={() => openModal(2)}>
                                    <Image
                                        src={property?.image_list[2]?.urls[0]}
                                        alt="property placeholder 2"
                                        className="rounded-md"
                                        width={400}
                                        height={200}
                                    />
                                </div>
                            </div>
                        </div>
                    </DetailsRowCard>

                    {showModal && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                            <div className="relative">
                                <button
                                    onClick={prevImage}
                                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2"
                                >
                                    &lt;
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2"
                                >
                                    &gt;
                                </button>
                                <Image
                                    src={
                                        property?.image_list[selectedImageIndex]
                                            ?.urls[0]
                                    }
                                    alt={`Image ${selectedImageIndex}`}
                                    className="rounded-md transition-opacity duration-300"
                                    width={500}
                                    height={400}
                                />

                                <button
                                    onClick={closeModal}
                                    className="absolute top-0 right-0 m-4 text-white cursor-pointer"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    )}
                    <DetailsRowCard>
                        <div className="w-full">
                            <div className="flex gap-4 mb-6">
                                <DetailsCard
                                    label="Property name"
                                    content={property?.name}
                                />
                                <DetailsCard
                                    label="Year build"
                                    content={property?.year_built}
                                />
                            </div>
                            <div className="flex gap-4">
                                <DetailsCard
                                    label="Property status"
                                    content={
                                        property?.is_active
                                            ? 'Active'
                                            : 'Off Market'
                                    }
                                />
                                <DetailsCard
                                    label="Price"
                                    content={'N' + property?.price.toFixed(2)}
                                />
                            </div>
                        </div>
                    </DetailsRowCard>

                    <DetailsRowCard title="Address Information">
                        <div className="w-full">
                            <div className="flex gap-4 mb-6">
                                <DetailsCard
                                    label="Property address"
                                    content={property?.address}
                                />
                                <DetailsCard
                                    label="City"
                                    content={property?.location?.city}
                                />
                            </div>
                            <div className="flex gap-4 w-1/2">
                                <DetailsCard
                                    label="State"
                                    content={property?.location?.state}
                                />
                            </div>
                        </div>
                    </DetailsRowCard>
                    <DetailsRowCard title="Property Information">
                        <div className="w-full">
                            <div className="flex gap-4 mb-6">
                                <DetailsCard
                                    label="Bedroom space"
                                    content={property?.number_of_bedrooms}
                                />
                                <DetailsCard
                                    label="Bathrooms"
                                    content={property?.number_of_bath}
                                />
                            </div>
                            <div className="flex gap-4 mb-6">
                                <DetailsCard
                                    label="No of rooms"
                                    content={property?.number_of_bedrooms}
                                />
                                <DetailsCard
                                    label="No of baths"
                                    content={property?.number_of_bath}
                                />
                            </div>
                            <div className="flex gap-4 mb-6">
                                <DetailsCard
                                    label="Apartment type"
                                    content="Flat"
                                />
                                <DetailsCard
                                    label="Property type"
                                    content={property?.status}
                                />
                            </div>
                            <div className="flex gap-4 h-auto">
                                <DetailsCard
                                    className="min-h-[200px]"
                                    label="Description"
                                    content={property?.description}
                                />
                            </div>
                        </div>
                    </DetailsRowCard>
                </section>
            )}
        </div>
    );
}

PropertyDetails.auth = true;
PropertyDetails.getLayout = Dashboard.getLayout;
