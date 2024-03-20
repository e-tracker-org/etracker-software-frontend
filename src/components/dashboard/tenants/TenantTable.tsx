import Button from 'components/base/Button';
import { DialogModal } from 'components/base/DialogModal';
import { useAppStore } from 'hooks/useAppStore';
import { User } from 'interfaces';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import SendReceipt from './SendReceipt';
import { getFormattedDate } from 'services/config/config';

const TenantTable = ({ tenants }: { tenants: any }) => {
    const states = useAppStore();
    const router = useRouter();
    const modalRef = useRef<any>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
        ) {
            setOpenModal(false);
            states?.resetTenantState();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id as string;
        const isChecked = e.currentTarget.checked;

        if (id === '') {
            if (isChecked) {
                tenants.forEach((tenant: any) => {
                    states?.setSelectedTenants(tenant.id, 'all');
                });
            } else {
                states?.clearSelectedTenants();
            }
        } else {
            if (isChecked) {
                states?.setSelectedTenants(id, 'single');
            } else {
                states?.setSelectedTenants(id, 'none');
            }
        }
    };

    const handleCallToAction = () => {
        if (states?.selectedTenants.length === 0) {
            toast.error('Select at least one tenant to proceed');
            return;
        }
        if (states?.selectMultipleAction === 'notify') {
            router.push(`/dashboard/tenants/notify`);
        } else if (states?.selectMultipleAction === 'receipt') {
            setOpenModal(true);
        }
    };

    const handleTenantClick = (tenant: any) => {
        localStorage.setItem('selectedTenant', JSON.stringify(tenant));

        router.push(`/dashboard/tenants/${tenant?.userData?.id}`);
    };

    console.log('tenant', tenants)

    return (
        <div className="relative">
            {states?.selectMultiple && (
                <Button
                    variant="default"
                    onClick={() => states?.resetTenantState()}
                    className="absolute flex !p-1 flex-row text-center align-middle gap-1 -top-10"
                >
                    Reset
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 24 25"
                        fill="none"
                    >
                        <path
                            d="M6.77148 17.2431L12.0145 12.0001L17.2575 17.2431M17.2575 6.75708L12.0135 12.0001L6.77148 6.75708"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </Button>
            )}

            <div className="p-5 bg-white hidden-x-scrollbar rounded-md">
                {tenants?.length === 0 ? (
                    <p className="text-center">
                        Add a tenant to your existing property
                    </p>
                ) : (
                    <>
                        <table className="w-full table-auto whitespace-nowrap text-gray-700 border-separate border-spacing-x-5 border-spacing-y-8 font-medium  text-center">
                            <thead className="text-[#727070] text-xl ">
                                <tr>
                                    {states?.selectMultiple && (
                                        <th
                                            className="pl-6 cursor-default"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <input
                                                className="cursor-pointer"
                                                type="checkbox"
                                                checked={
                                                    tenants?.length ===
                                                    states?.selectedTenants
                                                        .length
                                                }
                                                data-id=""
                                                onChange={(e) =>
                                                    handleChange(e)
                                                }
                                            ></input>
                                        </th>
                                    )}

                                    <th className="px-6 text-left ">Name</th>
                                    <th className="px-6 ">Date Created</th>
                                    <th className="px-6 ">Email</th>
                                    <th className="px-6 ">Phone Number</th>
                                    {/* <th className="px-6 ">
                                        Agreement Start Date
                                    </th>
                                    <th className="px-6 ">
                                        Agreement End Date
                                    </th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {tenants?.map(
                                    (tenant: any) =>
                                        tenant?.userData?.email &&
                                        tenant?.userData?.firstname &&
                                        tenant?.userData?.phone && (
                                            <tr
                                                key={tenant?.userData?.id}
                                                className="cursor-pointer tr-hover"
                                                onClick={() => {
                                                    handleTenantClick(tenant);
                                                    // router.push(`/dashboard/tenants/${tenant?.userData?.id}`);
                                                }}
                                            >
                                                {states?.selectMultiple && (
                                                    <td
                                                        className="pl-6 cursor-default"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="cursor-pointer"
                                                            data-id={
                                                                tenant?.userData
                                                                    ?.id
                                                            }
                                                            checked={states?.selectedTenants.includes(
                                                                tenant?.userData
                                                                    ?.id
                                                            )}
                                                            onChange={(e) =>
                                                                handleChange(e)
                                                            }
                                                        ></input>
                                                    </td>
                                                )}

                                                <td className="py-6 pl-6 pr-14 text-left flex gap-x-4 w-max ">
                                                    {/* <Image
                                        src="https://i.pravatar.cc/300"
                                        alt="user avatar"
                                        width={30}
                                        height={30}
                                        className="rounded-full inline-block"
                                    /> */}
                                                    <span className="inline-block">
                                                        {
                                                            tenant?.userData
                                                                ?.firstname
                                                        }{' '}
                                                        {
                                                            tenant?.userData
                                                                ?.lastname
                                                        }
                                                    </span>

                                                    {tenant?.userData?.isUserVerified && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                    <path fill="#1DA1F2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 15.06l-4.24-4.24 1.41-1.41 2.83 2.83 7.07-7.07 1.41 1.41-8.48 8.48z"/>
                                                    </svg>
                                                    )}

                                                </td>
                                                <td className="py-6 px-14 ">
                                                    {getFormattedDate(
                                                        tenant?.tenantData
                                                            ?.createdAt
                                                    )}
                                                </td>
                                                <td className="py-6 px-14  ">
                                                    {tenant?.userData?.email}
                                                </td>
                                                <td className="py-6 px-14 ">
                                                    {tenant?.userData?.phone}
                                                </td>
                                                {/* Add more columns as needed */}
                                            </tr>
                                        )
                                )}
                            </tbody>
                        </table>
                        {states?.selectMultiple && (
                            <div className="text-center">
                                <Button
                                    className="w-1/5"
                                    onClick={handleCallToAction}
                                >
                                    Continue
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <DialogModal
                openModal={openModal}
                contentClass="w-full !py-10"
                className="rounded-md sm:ml-[40%] lg:ml-[10%] px-[3%] lg:!top-[10%]"
            >
                <div ref={modalRef}>
                    <SendReceipt
                        setOpenModal={setOpenModal}
                        selectedTenants={states?.selectedTenants}
                    />
                </div>
            </DialogModal>
        </div>
    );
};

export default TenantTable;
