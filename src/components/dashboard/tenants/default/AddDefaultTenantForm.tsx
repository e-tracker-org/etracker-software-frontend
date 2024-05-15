import TextArea from 'antd/es/input/TextArea';
import Button from 'components/base/Button';
import ToolTip from 'components/base/Tooltip';
import Checkbox from 'components/base/form/Checkbox';
import Input from 'components/base/form/Input';
import Select from 'components/base/form/Select';
import { useAppStore } from 'hooks/useAppStore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createDefaultTenant } from 'services/newServices/tenant';
import Image from 'next/image';
import Dropzone from 'react-dropzone';
import { MdOutlineCancel } from 'react-icons/md';
import { getBase64Async } from 'libs/files';
type ImageList = Array<{ id: number; base64: string; preview: string }>;

export default function VerifyForm() {
    const [images, setImages] = useState<ImageList>([]);
    const states = useAppStore();
    const landlordId = states?.user?.id;
    const [formState, setFormState] = useState({
        propertyAddress: '',
        complaints: '',
        landlordNIN: '',
        tenantNIN: '',
        proof: '',
        tenantEmail: '',
        tenantGender: '',
        tenantPhone: '',
        tenantName: '',
        agreed: false,
        image_list: [] as { id: number }[],
    });

    // function to update the form state
    const updateFormState = (key: string, value: any) => {
        setFormState({ ...formState, [key]: value });
    };

    // function to submit the form
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formState.agreed) {
            toast.error('Please agree to the terms and conditions');
            return;
        }

        if (
            !formState.tenantName ||
            !formState.tenantPhone ||
            !formState.tenantEmail
        ) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (formState.tenantPhone.length < 11) {
            toast.error('Invalid phone number');
            return;
        }

        if (!formState.tenantEmail.includes('@')) {
            toast.error('Invalid email address');
            return;
        }

        if (formState.tenantNIN.length < 11) {
            toast.error('Invalid NIN number');
            return;
        }

        if (formState.landlordNIN.length < 11) {
            toast.error('Invalid NIN number');
            return;
        }

        if (formState.image_list.length < 1) {
            toast.error('Upload atleast one image');
            return;
        }

        const data = {
            ...formState,
            landlordId,
        };

        const addDefault = await createDefaultTenant(data);

        if (addDefault) {
            toast.success('Tenant added successfully');
            setFormState({
                propertyAddress: '',
                complaints: '',
                landlordNIN: '',
                tenantNIN: '',
                proof: '',
                tenantGender: '',
                tenantEmail: '',
                tenantPhone: '',
                tenantName: '',
                agreed: false,
                image_list: [],
            });
        }
    };

    const handleDrop = async (dropped: File[], id?: string | null) => {
        const ls = dropped.map(async (el) => {
            const imageId: any = {};
            if (id) {
                imageId.id = id; // Assign the ID if provided
            }
            return {
                ...imageId,
                base64: await getBase64Async(el),
                preview: URL.createObjectURL(el),
                // blobURL: URL.createObjectURL(el), // Use blobURL instead of blob
            };
        });

        const imgPromises = (await Promise.all(ls)).filter(
            (el) => el.base64
        ) as ImageList;

        // Set images
        setImages((prev) => [...prev, ...imgPromises]);

        // Update form state with the new images including their IDs
        setFormState((prevState) => {
            return {
                ...prevState,
                image_list: [
                    ...prevState.image_list,
                    ...imgPromises, // Remove the map function here
                ],
            };
        });
    };

    const removeImage = (i: number) => {
        const updatedImages = [...images];
        updatedImages.splice(i, 1);
        setImages(updatedImages);
    };
    console.log(formState);
    return (
        <form className="bg-white p-10">
            <section className="grid grid-cols-2 gap-6">
                <Input
                    label="Tenant Name"
                    required
                    placeholder="Enter name "
                    asterisk
                    value={formState.tenantName}
                    onChange={(e) =>
                        updateFormState('tenantName', e.target.value)
                    }
                    // register={{ ...register('name') }}
                    // error={errors.name}
                    inputClassName="bg-white"
                />

                <Input
                    label="Tenant Phone number"
                    type="number"
                    required
                    placeholder="Enter phone number"
                    asterisk
                    value={formState.tenantPhone}
                    minLength={11}
                    onChange={(e) =>
                        updateFormState('tenantPhone', e.target.value)
                    }
                    // register={{ ...register('numberOfBath') }}
                    // error={errors.numberOfBath}
                    inputClassName="bg-white"
                />
                <Input
                    label="Your National identificaton number"
                    type="number"
                    required
                    minLength={11}
                    placeholder="Enter NIN number"
                    asterisk
                    value={formState.landlordNIN}
                    onChange={(e) =>
                        updateFormState('landlordNIN', e.target.value)
                    }
                    // register={{ ...register('numberOfRooms') }}
                    // error={errors.numberOfRooms}
                    inputClassName="bg-white"
                />

                <Input
                    label="Tenant National identificaton number"
                    type="number"
                    required
                    minLength={11}
                    placeholder="Enter NIN number"
                    asterisk
                    value={formState.tenantNIN}
                    onChange={(e) =>
                        updateFormState('tenantNIN', e.target.value)
                    }
                    // register={{ ...register('numberOfRooms') }}
                    // error={errors.numberOfRooms}
                    inputClassName="bg-white"
                />
                <Input
                    label="Tenant Email address"
                    type="email"
                    required
                    placeholder="Enter email address"
                    asterisk
                    value={formState.tenantEmail}
                    onChange={(e) =>
                        updateFormState('tenantEmail', e.target.value)
                    }
                    // register={{ ...register('numberOfBath') }}
                    // error={errors.numberOfBath}
                    inputClassName="bg-white"
                />

                {/* gender */}
                <Select
                    label="Gender"
                    required
                    value={formState.tenantGender}
                    onChange={(e) =>
                        updateFormState('tenantGender', e.target.value)
                    }
                    // register={{ ...register('gender') }}
                    // error={errors.gender}
                    className="bg-white"
                >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Select>

                <Input
                    label="Property Address"
                    type="text"
                    required
                    placeholder="Enter property address"
                    asterisk
                    value={formState.propertyAddress}
                    onChange={(e) =>
                        updateFormState('propertyAddress', e.target.value)
                    }
                    // register={{ ...register('numberOfBath') }}
                    // error={errors.numberOfBath}
                    inputClassName="bg-white col-span-2"
                />

                <textarea
                    className="bg-white border border-gray-300 rounded-md p-2 col-span-2"
                    required
                    value={formState.complaints}
                    placeholder="Enter your complaints"
                    onChange={(e) =>
                        updateFormState('complaints', e.target.value)
                    }
                />
            </section>

            <div className="mt-20 mb-28">
                <div className="border border-dashed bg-white border-gray-400 text-gray-500 rounded-lg lg:w-7/12 h-[230px]">
                    <Dropzone
                        onDrop={(dropped) => handleDrop(dropped)}
                        noKeyboard
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div
                                {...getRootProps()}
                                className="grid gap-4 justify-items-center py-6 px-5 h-full w-full"
                            >
                                {!images.length && images.length === 1 && (
                                    <Image
                                        alt=""
                                        width={200}
                                        height={200}
                                        src={images[0].preview}
                                    />
                                )}

                                <input {...getInputProps()} multiple />

                                <svg
                                    width="40"
                                    height="41"
                                    viewBox="0 0 40 41"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18.3337 33.8333H10.8337C8.30588 33.8333 6.14588 32.9583 4.35366 31.2083C2.56144 29.4583 1.66588 27.3194 1.66699 24.7916C1.66699 22.625 2.31977 20.6944 3.62533 19C4.93088 17.3055 6.63922 16.2222 8.75033 15.75C9.44477 13.1944 10.8337 11.125 12.917 9.54163C15.0003 7.95829 17.3614 7.16663 20.0003 7.16663C23.2503 7.16663 26.0075 8.29885 28.272 10.5633C30.5364 12.8277 31.6681 15.5844 31.667 18.8333C33.5837 19.0555 35.1742 19.8822 36.4387 21.3133C37.7031 22.7444 38.3348 24.4177 38.3337 26.3333C38.3337 28.4166 37.6042 30.1877 36.1453 31.6466C34.6864 33.1055 32.9159 33.8344 30.8337 33.8333H21.667V21.9166L24.3337 24.5L26.667 22.1666L20.0003 15.5L13.3337 22.1666L15.667 24.5L18.3337 21.9166V33.8333Z"
                                        fill="#9A9999"
                                    />
                                </svg>
                                <h3>Accepts .gif, .jpg, and .png</h3>
                                <p className="text-sm">
                                    Upload a minimum of 1 photo, Each photo must
                                    not exceed 5mb.
                                </p>
                            </div>
                        )}
                    </Dropzone>
                </div>

                {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-5 mt-10">
                        {images.map((img, i) => (
                            <div
                                key={i}
                                className="relative flex justify-center border-2 border-white h-72 rounded-3xl"
                            >
                                <Image
                                    alt=""
                                    fill
                                    className="inline-block object-cover rounded-3xl"
                                    src={img.base64}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(i)}
                                    className="absolute p-1 bg-white top-[-4px] right-[-7px] rounded-full text-xl"
                                >
                                    <MdOutlineCancel />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Checkbox
                className="mt-8"
                label={
                    <p>
                        By submitting this tenant default request, You agree
                        with our{' '}
                        <span className="text-[#2F42EDD9] text-xs md:text-sm">
                            Terms and Conditions.
                        </span>
                    </p>
                }
                checked={formState.agreed}
                onChange={() => updateFormState('agreed', !formState.agreed)}
                // register={{ ...register('agreed') }}
                // error={errors.agreed}
            />

            <div className="w-1/2  mx-auto mb-10 mt-16">
                {/* @ts-ignore */}
                <Button onClick={onSubmit} className="w-full py-4">
                    Submit Request
                </Button>
            </div>
        </form>
    );
}
