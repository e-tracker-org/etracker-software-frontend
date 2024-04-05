import DashboardHeader from 'components/dashboard/Header';
import Dashboard from '..';
import { useState } from 'react';
import Button from 'components/base/Button';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import useTenant from 'hooks/useTenant';
import jsPDF from 'jspdf';

export default function RentReceiptPage() {
    const router = useRouter();
    const { notifyTenant } = useTenant();
    const [tenantName, setTenantName] = useState('');
    const [propertyName, setPropertyName] = useState('');
    const [landlordName, setLandlordName] = useState('');
    const [rentAmount, setRentAmount] = useState('');

    const handleGenerateReceipt = async () => {
        try {
            if (
                !tenantName.trim() ||
                !propertyName.trim() ||
                !landlordName.trim() ||
                !rentAmount.trim()
            ) {
                throw new Error('Please fill in all required fields');
            }

            const pdfBlob = generatePDFReceipt();

            if (pdfBlob) {
                const requestObj = {
                    tenantId: router.query.id as string,
                    notifyMsg: pdfBlob,
                };
                // @ts-ignore
                await notifyTenant(requestObj);
                toast.success('Email Notification sent successfully');
            } else {
                throw new Error('Failed to generate PDF blob');
            }
        } catch (error) {
            // @ts-ignore
            toast.error(error.message);
        }
    };

    const generatePDFReceipt = () => {
        const doc = new jsPDF();
        doc.text(`Tenant Name: ${tenantName}`, 10, 10);
        doc.text(`Property Name: ${propertyName}`, 10, 20);
        doc.text(`Landlord Name: ${landlordName}`, 10, 30);
        doc.text(`Rent Amount: ${rentAmount}`, 10, 40);
        return doc.output('blob');
    };

    return (
        <div>
            <DashboardHeader
                backButton={true}
                title="Generate Rent Receipt"
                titleClassName="text-[18px]"
            />
            <section className="mt-8">
                <div className="max-w-[800px] mx-auto">
                    <div className="mb-4">
                        <label htmlFor="tenantName" className="block mb-1">
                            Tenant Name
                        </label>
                        <input
                            type="text"
                            id="tenantName"
                            value={tenantName}
                            onChange={(e) => setTenantName(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="propertyName" className="block mb-1">
                            Property Name
                        </label>
                        <input
                            type="text"
                            id="propertyName"
                            value={propertyName}
                            onChange={(e) => setPropertyName(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="landlordName" className="block mb-1">
                            Landlord Name
                        </label>
                        <input
                            type="text"
                            id="landlordName"
                            value={landlordName}
                            onChange={(e) => setLandlordName(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rentAmount" className="block mb-1">
                            Rent Amount
                        </label>
                        <input
                            type="text"
                            id="rentAmount"
                            value={rentAmount}
                            onChange={(e) => setRentAmount(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="text-center">
                        <Button onClick={handleGenerateReceipt}>
                            Generate Receipt
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

RentReceiptPage.auth = true;
RentReceiptPage.getLayout = Dashboard.getLayout;
