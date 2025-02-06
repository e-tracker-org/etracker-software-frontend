import Image from 'next/image';
import { DialogModal } from 'components/base/DialogModal';
import { completeTask } from 'services/newServices/tenant';
import Button from 'components/base/Button';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import renderEmptyState from 'pages/elements/EmptyState';

const FindTenantDefault = ({ tenants }: { tenants: any }) => {
    const [selectedTenant, setSelectedTenant] = useState('');
    const [selectedTenantName, setSelectedTenantName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    // console.log('tenants:', tenants);

    // add below in use effect
    if (!tenants) return renderEmptyState();
    return (
        <div
            // style={{ borderLeftColor: '#1F32EB', borderLeftWidth: 5 }}
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
                    {tenants.map((t: any, i: any) => (
                        <tr
                            key={i}
                            className="cursor-pointer tr-hover"
                            // onClick={() => handleTenantClick(t)}
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
                                        (t?.status === 'INCOMPLETE' &&
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
                            <td className="py-6 px-14">{t?.complaints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DialogModal
                openModal={isModalOpen}
                // closeModal={closeModal}
                title={`Do you want to verify this Tenant: ${selectedTenantName} ?`}
                contentClass="w-full !py-10"
                className="rounded-md sm:ml-[40%] lg:ml-[10%] px-[3%] lg:!top-[10%]"
            >
                <div>
                    <div className="flex w-4/6 gap-5 col-span-2 mx-auto mt-16 mb-2">
                        <Button
                            type="button"
                            onClick={() => {
                                // closeModal();
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
                            // onClick={handleConfirmAction}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </DialogModal>
        </div>
    );
};

export default FindTenantDefault;
