import { DialogModal } from 'components/base/DialogModal';
import { completeTask } from 'services/newServices/tenant';
import Button from 'components/base/Button';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAppStore } from 'hooks/useAppStore';
import { getVerificationRequests } from 'services/newServices/user';

interface VerificationRequest {
    _id: string;
    userEmail: string;
    firstName: string;
    lastName: string;
    nin: string;
    email: string;
    tenantId: string;
    phoneNumber: string;
    status: string;
    paymentReference: string;
    paymentVerified: boolean;
    createdAt: string;
    __v: number;
}

interface TenantData {
    userId: string;
    propertyId: string;
    landlordId: string;
    status: 'INCOMPLETE' | 'COMPLETE' | 'PENDING';
    createdAt: string;
    updatedAt: string;
    id: string;
}

interface UserData {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    [key: string]: any;
}

interface Tenant {
    tenantData: TenantData;
    userData: UserData;
    paymentData?: {
        status: string;
        verifiedAt: string;
    };
}

interface TenantTableProps {
    tenants: Tenant[];
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
    const [filteredTenants, setFilteredTenants] = useState<Tenant[]>([]);
    const router = useRouter();
    const states = useAppStore();

    useEffect(() => {
        // Initial filter based on status
        const initialFiltered = tenants.filter((tenant) => {
            if (filter === 'all') return true;
            return tenant.tenantData?.status.toLowerCase() === filter.toLowerCase();
        });
        setFilteredTenants(initialFiltered);
    }, [tenants, filter]);

    useEffect(() => {
        const fetchVerificationRequests = async () => {
            if (states?.user?.id) {
                setIsLoading(true);
                try {
                    const verificationRequests: VerificationRequest[] = await getVerificationRequests(states.user.id);

                    const updatedTenants = tenants.map((tenant) => {
                        const matchingRequest = verificationRequests.find(
                            (request) => request.tenantId === tenant.tenantData?.id
                        );
                        console.log("tenant", tenant.tenantData?.id);
                        console.log("verificationRequests", verificationRequests);
                        if (matchingRequest) {
                            return {
                                ...tenant,
                                paymentData: {
                                    status: matchingRequest.status || 'Not Verified',
                                    verifiedAt: matchingRequest.createdAt || 'N/A',
                                },
                            };
                        }
                        return tenant;
                    });

                    // Apply both filters
                    const filtered = updatedTenants.filter((tenant) => {
                        if (filter === 'all') return true;
                        return tenant.tenantData?.status.toLowerCase() === filter.toLowerCase();
                    });

                    setFilteredTenants(filtered);
                } catch (error) {
                    console.error('Error fetching verification requests:', error);
                    toast.error('Failed to load verification data');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchVerificationRequests();
    }, [states?.user?.id, tenants, filter]);

    const openModal = (tenantId: string, tenantName: string) => {
        setSelectedTenant(tenantId);
        setSelectedTenantName(tenantName);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleTenantClick = (tenant: Tenant) => {
        localStorage.setItem('selectedTenant', JSON.stringify(tenant));
        router.push('/verify/request');
    };

    const handlePaymentClick = (tenant: Tenant, e: React.MouseEvent) => {
        e.stopPropagation();
        localStorage.setItem('selectedTenant', JSON.stringify(tenant));
        router.push('/dashboard/tenants/verify/request');
    };

    const handleConfirmAction = async () => {
        setIsLoading(true);
        try {
            await completeTask(selectedTenant);
            toast.success('Task completed successfully');
            await handleRemount();
        } catch (error) {
            console.error('Error completing task:', error);
            toast.error('Failed to complete task');
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
    };

    if (isLoading && filteredTenants.length === 0) {
        return <div className="p-5 text-center">Loading tenants...</div>;
    }

    if (filteredTenants.length === 0) {
        return <div className="p-5 text-center">No tenants found</div>;
    }

    return (
        <div
            style={{ borderLeftColor: '#1F32EB', borderLeftWidth: 5 }}
            className="p-5 bg-white hidden-x-scrollbar rounded-md"
        >
            <table className="w-full table-auto whitespace-nowrap text-gray-700 border-separate border-spacing-x-2 border-spacing-y-8 font-medium text-center">
                <thead className="text-[#727070] text-xl">
                    <tr>
                        <th className="px-4 text-left">Name</th>
                        <th className="px-4">Email</th>
                        <th className="px-4">Phone</th>
                        <th className="px-4">Tenant Status</th>
                        <th className="px-4">Payment Status</th>
                        <th className="px-4">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredTenants.map((tenant, index) => (
                        <tr
                            key={index}
                            className="cursor-pointer tr-hover"
                            onClick={() => handleTenantClick(tenant)}
                        >
                            <td className="py-10 pl-6 pr-10 text-left flex gap-x-4 w-max">
                                <span className="inline-block">
                                    {tenant.userData.firstname}{' '}
                                    {tenant.userData.lastname}
                                </span>
                            </td>
                            <td className="py-6 px-6">{tenant.userData.email}</td>
                            <td className="py-6 px-6">{tenant.userData.phone}</td>
                            <td className="py-6 pr-2 pl-14">
                                <span
                                    className={`py-1 px-[10px] rounded-lg capitalize ${
                                        (tenant.tenantData.status === 'INCOMPLETE' &&
                                            'text-[#FA0F0F] bg-[#FFE9E9]') ||
                                        (tenant.tenantData.status === 'COMPLETE' &&
                                            'text-[#31AA06] bg-[#ECFFE9]') ||
                                        (tenant.tenantData.status === 'PENDING' &&
                                            'text-[#E07D08] bg-[#FFF5E9]')
                                    }`}
                                >
                                    {tenant.tenantData.status}
                                </span>
                            </td>

                            <td className="py-6 pr-2 pl-8">
                                <span className={`py-1 px-[4px] rounded-lg capitalize ${
                                    (tenant.paymentData?.status === 'paid' && 'text-[#31AA06] bg-[#ECFFE9]') ||
                                    (tenant.paymentData?.status === 'pending' && 'text-[#E07D08] bg-[#FFF5E9]') ||
                                    (!tenant.paymentData?.status && 'text-[#FA0F0F] bg-[#FFE9E9]')
                                }`}>
                                    {tenant.paymentData?.status || 'Not Paid'}
                                </span>
                            </td>
                            <td className="py-6 pr-6 pl-4">
                                <Button 
                                    variant="primary"
                                    // @ts-ignore
                                    onClick={(e) => handlePaymentClick(tenant, e)}
                                    className="py-2 px-4"
                                >
                                    Verify Tenant
                                </Button>
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
                            onClick={closeModal}
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