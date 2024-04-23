import Image from 'next/image';
import { DialogModal } from 'components/base/DialogModal';
import { completeTask } from 'services/newServices/tenant';
import Button from 'components/base/Button';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

interface TenantTableProps {
    tenants: { [key: string]: string }[];
    shouldRemount: boolean;
    handleRemount: () => Promise<void>;
    filter: string;
}

const TenantTable = ({
    tenants,
    shouldRemount,
    handleRemount,
    filter,
}: TenantTableProps) => {
    const [selectedTenant, setSelectedTenant] = useState('');
    const [selectedTenantName, setSelectedTenantName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // add below in use effect
    console.log(tenants, 'tenants');
    const filteredTenants = tenants.filter((tenant) => {
        console.log('filter', filter)
        if (filter === 'all') return true;
        // @ts-ignore
        return tenant.status.toLowerCase() === filter.toLowerCase();
    });

    useEffect(() => {
        if (shouldRemount) {
            handleRemount();
        }

    })

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleTenantClick = (tenant: any) => {
        localStorage.setItem('selectedDefaultTenant', JSON.stringify(tenant));

        router.push(`/dashboard/tenants/default/${tenant?.id}`);
    };

    const handleConfirmAction = async () => {
        setIsLoading(true);
        try {
            await completeTask(selectedTenant);
            // Handle success
            console.log('Task completed successfully');
            toast.success('Task completed successfully');
            // Update tenant list to trigger useEffect
            setIsLoading(false);
            setIsModalOpen(false); // Close the modal after completing the action
            handleRemount();
        } catch (error) {
            // Handle error
            console.error('Error completing task:', error);
            toast.error('Failed to complete task');
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{ borderLeftColor: '#1F32EB', borderLeftWidth: 5 }}
            className="p-5 bg-white hidden-x-scrollbar rounded-md"
        >
            <table className="w-full table-auto whitespace-nowrap text-gray-700 border-separate border-spacing-x-5 border-spacing-y-8 font-medium text-center">
                <thead className="text-[#727070] text-xl">
                    <tr>
                        <th className="px-6 text-left">Name</th>
                        <th className="px-6">Email</th>
                        <th className="px-6">Phone Number</th>
                        <th className="px-6">Default Status</th>
                        <th className="px-6">Complaints</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredTenants.map((t: any, i: any) => (
                        <tr
                            key={i}
                            className="cursor-pointer tr-hover"
                            onClick={() => handleTenantClick(t)}
                        >
                            <td className="py-6 pl-6 pr-14 text-left flex gap-x-4 w-max">
                                <span className="inline-block">
                                    {t?.tenantName}{' '}
                                </span>
                            </td>
                            <td className="py-6 px-14">{t?.tenantEmail}</td>
                            <td className="py-6 px-14">{t?.tenantPhone}</td>

                            <td className="py-6 pr-6 pl-14">
                                <span
                                    className={`py-1 px-[10px] rounded-lg capitalize ${
                                        (t?.status ===
                                            'INCOMPLETE' &&
                                            'text-[#FA0F0F] bg-[#FFE9E9]') ||
                                        (t?.status === 'APPROVED' &&
                                            'text-[#31AA06] bg-[#ECFFE9]') ||
                                        (t?.status === 'PENDING-APPROVAL' &&
                                            'text-[#E07D08] bg-[#FFF5E9]')
                                    }`}
                                >
                                    {t?.status}
                                </span>
                            </td>
                            <td className="py-6 px-14">
                                {t?.complaints}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DialogModal
                openModal={isModalOpen}
                closeModal={closeModal}
                title={`Do you want to verify this Tenant: ${selectedTenantName} ?`}
                contentClass="w-full !py-10"
                className="rounded-md sm:ml-[40%] lg:ml-[10%] px-[3%] lg:!top-[10%]"
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
                            onClick={handleConfirmAction}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </DialogModal>
            
        </div>
    );
};

export default TenantTable;
