import Button from 'components/base/Button';
import { DialogModal } from 'components/base/DialogModal';
import { useAppStore } from 'hooks/useAppStore';
import { User } from 'interfaces';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import SendReceipt from './SendReceipt';

const TenantTable = ({ tenants }: { tenants: User[] }) => {
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
        if (id === '' && tenants.length !== states?.selectedTenants.length) {
            tenants.map((tenant) =>
                states?.setSelectedTenants(tenant.id, 'all')
            );
        } else if (
            id === '' &&
            tenants.length === states?.selectedTenants.length
        ) {
            states?.clearSelectedTenants();
        } else {
            states?.setSelectedTenants(id, 'single');
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
                                                    tenants.length ===
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
                                    <th className="px-6 ">
                                        Agreement Start Date
                                    </th>
                                    <th className="px-6 ">
                                        Agreement End Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {tenants?.map((tenant) => (
                                    <tr
                                        key={tenant.id}
                                        className="cursor-pointer tr-hover "
                                        onClick={() => {
                                            router.push(
                                                `/dashboard/tenants/${tenant.id}`
                                            );
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
                                                    data-id={tenant.id}
                                                    checked={states?.selectedTenants.includes(
                                                        tenant.id
                                                    )}
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                ></input>
                                            </td>
                                        )}

                                        <td className="py-6 pl-6 pr-14 text-left flex gap-x-4 w-max ">
                                            <Image
                                                src="https://i.pravatar.cc/300"
                                                alt="user avatar"
                                                width={30}
                                                height={30}
                                                className="rounded-full inline-block"
                                            />

                                            <span className="inline-block">
                                                {tenant.firstname}{' '}
                                                {tenant.lastname}
                                            </span>
                                        </td>
                                        <td className="py-6 px-14 ">
                                            {tenant.createdAt}
                                        </td>
                                        <td className="py-6 px-14  ">
                                            {tenant.email}
                                        </td>
                                        <td className="py-6 px-14 ">
                                            {tenant.phone}
                                        </td>
                                        <td className="py-6 px-14 ">
                                            {tenant.createdAt}
                                        </td>
                                        <td className="py-6 pr-6 pl-14  ">
                                            {tenant.createdAt}
                                        </td>
                                    </tr>
                                ))}
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
                    <SendReceipt setOpenModal={setOpenModal} />
                </div>
            </DialogModal>
        </div>
    );
};

export default TenantTable;
