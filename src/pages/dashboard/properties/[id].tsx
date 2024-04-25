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
import DropdownDialog from 'components/base/DropdownDialog';
import { DialogModal } from 'components/base/DialogModal';
import { PropertyService } from 'services';
import toast from 'react-hot-toast';
import Input from 'components/base/form/Input';
import Select from 'components/base/form/Select';
import nigeriaStates from 'nigeria-states-lgas';
import { useForm } from 'react-hook-form';
import TextArea from 'components/base/form/TextArea';

interface DetailsProps {
    label?: string;
    content?: any;
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
    const {
        getProperty,
        getPropertyLoading,
        updateProperty,
        updatePropertyLoading,
    } = useProperty(id);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const property = getProperty?.data;
    const [editable, setEditable] = useState(false);
    const { register, handleSubmit, watch } = useForm();
    const [formData, setFormData] = useState({
        name: property?.name,
        price: property?.price,
        number_of_bedrooms: property?.number_of_bedrooms,
        number_of_bath: property?.number_of_bath,
        address: property?.address,
        status: property?.status as 'RENT' | 'BUY' | 'SELL' | undefined,
        description: property?.description,
        location: {
            city: property?.location?.city,
            state: property?.location?.state,
        },
        year_built: property?.year_built,
        apartmentType: property?.apartmentType,
        is_active: property?.is_active,
    });

    const handleEditable = (state: boolean) => {
        setEditable(state);

        setFormData({
            name: property?.name,
            price: property?.price,
            number_of_bedrooms: property?.number_of_bedrooms,
            number_of_bath: property?.number_of_bath,
            address: property?.address,
            status: property?.status as 'RENT' | 'BUY' | 'SELL' | undefined,
            description: property?.description,
            location: {
                city: property?.location?.city,
                state: property?.location?.state,
            },
            year_built: property?.year_built,
            apartmentType: property?.apartmentType,
            is_active: property?.is_active,
        })
    }


    const NigeriaState = formData?.location?.state;

    console.log(property, 'formData');

    // @ts-ignore
    const openModal = (index) => {
        setSelectedImageIndex(index);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openDialogModal = () => {
        setIsModalOpen(true);
    };

    const closeDialogModal = () => {
        setIsModalOpen(false);
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

    const handleChange = (fieldName: string, value: any) => {
        let updatedValue = value;
        // Convert 'Active' or 'Off Market' to boolean true or false
        if (fieldName === 'is_active') {
            updatedValue = value === 'Active' ? true : false;
        }
        // Update formData with the converted value
        setFormData({
            ...formData,
            [fieldName]: updatedValue,
        });
    };

    const deleteProperty = async () => {
        if (!id) {
            console.error('Property ID is undefined.');
            return;
        }

        try {
            setIsLoading(true);
            await PropertyService.deletePropertyById(id);
            toast.success('Property deleted successfully');
            setIsLoading(false);
            setIsModalOpen(false);
            router.push('/dashboard/properties');
        } catch (error) {
            console.error('Error deleting property:', error);
            setIsLoading(false);
            toast.error('Error deleting property. Please try again later.');
        }
    };

    const editProperty = async () => {
        if (!id) {
            console.error('Property ID is undefined.');
            return;
        }

        try {
            setIsLoading(true);

            if (
                !formData.location ||
                !formData.location.city ||
                !formData.location.state
            ) {
                toast.error('City and state of property are required.');
                return;
            }

            const partialProperty = {
                id: id,
                name: formData.name,
                price: formData.price,
                number_of_bedrooms: formData.number_of_bedrooms,
                number_of_bath: formData.number_of_bath,
                address: formData.address,
                status: formData.status,
                description: formData.description,

                city: formData.location.city,

                state: formData.location.state,

                year_built: formData.year_built,
                apartmentType: formData.apartmentType,
                is_active: formData.is_active,
            };

            //@ts-ignore
            await PropertyService.updatePropertyById(partialProperty);

            // set state
            setFormData({
                ...formData,
                location: {
                    city: formData.location.city,
                    state: formData.location.state,
                },
            })
            toast.success('Property updated successfully');
            setIsLoading(false);
            setEditable(false);
            // reload page
            router.reload();
        } catch (error) {
            console.error('Error updating property:', error);
            setIsLoading(false);
            toast.error('Error updating property. Please try again later.');
        }
    };

    return (
        <div className="h-auto">
            <header className="lg:flex lg:justify-between flex flex-col lg:flex-row gap-8">
                <div className="flex gap-4 items-center">
                    <BackButton />
                    <h3 className="text-xl lg:text-2xl font-medium text-black">
                        Property details
                    </h3>
                </div>
                {acctType?.typeID === 2 && (
                    <div className="flex justify-center lg:justify-end gap-4 items-center">
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
                        <DropdownDialog title="More">
                            <li className="py-2 text-black border-b border-[#E7E5E5] last:border:0">
                                <button
                                    className="w-full px-3 py-2 text-left hover:bg-slate-50 font-medium"
                                    data-action="notify"
                                    onClick={() => handleEditable(true)}
                                >
                                    Edit Property
                                </button>
                            </li>
                            <li className="py-2 text-[#DA0202] border-b border-[#E7E5E5] last:border:0">
                                <button
                                    className="w-full px-3 py-2 text-left  hover:bg-slate-50 font-medium"
                                    data-action="receipt"
                                    onClick={() => {
                                        openDialogModal();
                                    }}
                                >
                                    Delete Property
                                </button>
                            </li>
                        </DropdownDialog>
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
                                    className="absolute top-0 right-0 m-4 text-black cursor-pointer"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    )}
                    <DetailsRowCard>
                        <div className="w-full">
                            <div className="lg:flex gap-4 mb-6">
                                <DetailsCard
                                    label="Property name"
                                    content={
                                        editable ? (
                                            <Input
                                                type="text"
                                                value={property?.name}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'name',
                                                        e.target.value
                                                    )
                                                }
                                                inputClassName="bg-white"
                                            />
                                        ) : (
                                            property?.name
                                        )
                                    }
                                />
                                <DetailsCard
                                    label="Year build"
                                    content={
                                        editable ? (
                                            <Input
                                                type="text"
                                                value={property?.year_built}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'year_built',
                                                        e.target.value
                                                    )
                                                }
                                                inputClassName="bg-white"
                                            />
                                        ) : (
                                            property?.year_built
                                        )
                                    }
                                />
                            </div>
                            <div className="lg:flex gap-4">
                                <DetailsCard
                                    label="Property status"
                                    content={
                                        editable ? (
                                            <Select
                                                value={
                                                    formData.is_active
                                                        ? 'Active'
                                                        : 'Off Market'
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        'is_active',
                                                        e.target.value
                                                    )
                                                }
                                                selectDivClassName="bg-white"
                                            >
                                                <option value="Active">
                                                    Active
                                                </option>
                                                <option value="Off Market">
                                                    Off Market
                                                </option>
                                            </Select>
                                        ) : property?.is_active ? (
                                            'Active'
                                        ) : (
                                            'Off Market'
                                        )
                                    }
                                />
                                <DetailsCard
                                    label="Price"
                                    content={
                                        editable ? (
                                            <Input
                                                type="text"
                                                value={formData.price}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'price',
                                                        e.target.value
                                                    )
                                                }
                                                inputClassName="bg-white"
                                            />
                                        ) : (
                                            'N' + property?.price.toFixed(2)
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </DetailsRowCard>

                    <DetailsRowCard title="Address Information">
                        <div className="w-full">
                            <div className="lg:flex gap-4 mb-6">
                                <DetailsCard
                                    label="Property address"
                                    content={
                                        editable ? (
                                            <Input
                                                type="text"
                                                value={formData.address}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'address',
                                                        e.target.value
                                                    )
                                                }
                                                inputClassName="bg-white"
                                            />
                                        ) : (
                                            property?.address
                                        )
                                    }
                                />
                                <DetailsCard
                                    label="City"
                                    content={
                                        editable ? (
                                            <Select
                                                value={formData?.location?.city}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'city',
                                                        e.target.value
                                                    )
                                                }
                                                selectDivClassName="bg-white"
                                            >
                                                <option disabled value="">
                                                    {formData?.location?.city}
                                                </option>
                                                {NigeriaState &&
                                                    nigeriaStates
                                                        .lgas(NigeriaState)
                                                        ?.map(
                                                            (
                                                                lga: string,
                                                                i: number
                                                            ) => (
                                                                <option
                                                                    key={i}
                                                                    value={lga}
                                                                >
                                                                    {lga}
                                                                </option>
                                                            )
                                                        )}{' '}
                                            </Select>
                                        ) : (
                                            property?.location?.city
                                        )
                                    }
                                />
                            </div>
                            <div className="flex gap-4 lg:w-1/2">
                                <DetailsCard
                                    label="State"
                                    content={
                                        editable ? (
                                            <Select
                                                value={
                                                    formData?.location?.state
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        'state',
                                                        e.target.value
                                                    )
                                                }
                                                selectDivClassName="bg-white"
                                            >
                                                <option disabled value="">
                                                    State
                                                </option>
                                                {nigeriaStates
                                                    .states()
                                                    .map(
                                                        (
                                                            state: string,
                                                            i: number
                                                        ) => (
                                                            <option
                                                                key={i}
                                                                value={state}
                                                            >
                                                                {state}
                                                            </option>
                                                        )
                                                    )}
                                            </Select>
                                        ) : (
                                            property?.location?.state
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </DetailsRowCard>
                    <DetailsRowCard title="Property Information">
                        <div className="w-full">
                            <div className="lg:flex gap-4 mb-6">
                                <DetailsCard
                                    label="Bedroom space"
                                    content={
                                        editable ? (
                                            <Input
                                                type="number"
                                                min={1}
                                                value={
                                                    formData?.number_of_bedrooms
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        'number_of_bedrooms',
                                                        e.target.value
                                                    )
                                                }
                                                inputClassName="bg-white"
                                            />
                                        ) : (
                                            property?.number_of_bedrooms
                                        )
                                    }
                                />
                                <DetailsCard
                                    label="Bathrooms"
                                    content={
                                        editable ? (
                                            <Input
                                                type="number"
                                                min={1}
                                                value={formData?.number_of_bath}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'number_of_bath',
                                                        e.target.value
                                                    )
                                                }
                                                inputClassName="bg-white"
                                            />
                                        ) : (
                                            property?.number_of_bath
                                        )
                                    }
                                />
                            </div>
                            <div className="lg:flex gap-4 mb-6">
                                <DetailsCard
                                    label="No of rooms"
                                    content={property?.number_of_bedrooms}
                                />
                                <DetailsCard
                                    label="No of baths"
                                    content={property?.number_of_bath}
                                />
                            </div>
                            <div className="lg:flex gap-4 mb-6">
                                <DetailsCard
                                    label="Apartment type"
                                    content={
                                        editable ? (
                                            <Select
                                                value={formData?.apartmentType}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'apartmentType',
                                                        e.target.value
                                                    )
                                                }
                                                selectDivClassName="bg-white"
                                            >
                                                <option value="Flat">
                                                    Flat
                                                </option>
                                                <option value="Duplex">
                                                    Duplex
                                                </option>
                                            </Select>
                                        ) : (
                                            property?.apartmentType
                                        )
                                    }
                                />
                                <DetailsCard
                                    label="Property type"
                                    content={property?.status}
                                />
                            </div>
                            <div className="lg:flex gap-4 h-auto">
                                <DetailsCard
                                    className="min-h-[200px]"
                                    label="Description"
                                    content={
                                        editable ? (
                                            <TextArea
                                                //@ts-ignore
                                                value={formData?.description}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'description',
                                                        //@ts-ignore
                                                        e.target.value
                                                    )
                                                }
                                                TextAreaClassName="bg-white min-h-[150px]"
                                            />
                                        ) : (
                                            property?.description
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </DetailsRowCard>
                    {editable ? (
                        <div className="flex w-4/6 gap-5 col-span-2 mx-auto mt-16 mb-2">
                            <Button
                                type="button"
                                onClick={() => setEditable(false)}
                                variant="default"
                                className="w-full py-4"
                            >
                                Cancel
                            </Button>

                            <Button
                                className="w-full py-4"
                                type="submit"
                                isLoading={isLoading}
                                onClick={() => editProperty()}
                            >
                                Confirm
                            </Button>
                        </div>
                    ) : null}
                </section>
            )}
            <DialogModal
                openModal={isModalOpen}
                closeModal={closeModal}
                icon="/image1.svg"
                alternative="Trash Can"
                title={`Are you sure you want to delete this property?`}
                contentClass="w-full !py-10"
                className="rounded-md sm:ml-[40%] lg:ml-[10%] px-[10%]  lg:!top-[10%]"
            >
                <div>
                    <div className="flex w-4/6 gap-5 col-span-2 mx-auto mt-16 mb-2">
                        <Button
                            type="button"
                            onClick={() => {
                                closeDialogModal();
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
                            backgroundColor="bg-red-600"
                            onClick={() => deleteProperty()}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </DialogModal>
        </div>
    );
}

PropertyDetails.auth = true;
PropertyDetails.getLayout = Dashboard.getLayout;
