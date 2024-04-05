import DashboardHeader from 'components/dashboard/Header';
import Dashboard from '..';
import { useState } from 'react';
import Button from 'components/base/Button';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';
import { useRouter } from 'next/router';
import useTenant from 'hooks/useTenant';

export default function ReceiptPage() {
    const router = useRouter();
    const { notifyTenant } = useTenant();
    const [bills, setBills] = useState([{ billName: '', billAmount: '' }]);
    const [paymentDate, setPaymentDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const { id, name } = router.query;

    const handleAddBill = () => {
        setBills([...bills, { billName: '', billAmount: '' }]);
    };

    // @ts-ignore
    const handleRemoveBill = (index) => {
        const updatedBills = [...bills];
        updatedBills.splice(index, 1);
        setBills(updatedBills);
    };

    // @ts-ignore
    const handleBillChange = (index, key, value) => {
        const updatedBills = [...bills];
        // @ts-ignore
        updatedBills[index][key] = value;
        setBills(updatedBills);
    };

    const generatePDFReceipt = () => {
        const doc = new jsPDF();
        doc.text(`Tenant Name: ${name}`, 10, 10);
        doc.text(`Payment Date: ${paymentDate}`, 10, 20);
        doc.text(`Payment Method: ${paymentMethod}`, 10, 30);
        bills.forEach((bill, index) => {
            doc.text(
                `${bill.billName}: ${bill.billAmount}`,
                10,
                40 + index * 10
            );
        });
        return doc.output('blob');
    };

    const handleGenerateReceipt = async () => {
        try {
            if (!paymentDate.trim() || !paymentMethod.trim()) {
                throw new Error('Please fill in all required fields');
            }

            const blob = generatePDFReceipt();

            if (blob) {
                const requestObj = {
                    tenantId: id as string,
                    notifyMsg: blob,
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

    return (
        <div>
            <DashboardHeader
                backButton={true}
                title="Generate Receipt"
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
                            value={name}
                            disabled
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="paymentDate" className="block mb-1">
                            Payment Date
                        </label>
                        <input
                            type="date"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="paymentMethod" className="block mb-1">
                            Payment Method
                        </label>
                        <input
                            type="text"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    {bills.map((bill, index) => (
                        <div key={index} className="mb-4">
                            <label
                                htmlFor={`billName${index}`}
                                className="block mb-1"
                            >
                                Bill Name
                            </label>
                            <input
                                type="text"
                                id={`billName${index}`}
                                value={bill.billName}
                                onChange={(e) =>
                                    handleBillChange(
                                        index,
                                        'billName',
                                        e.target.value
                                    )
                                }
                                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                            />
                            <label
                                htmlFor={`billAmount${index}`}
                                className="block mt-2 mb-1"
                            >
                                Bill Amount
                            </label>
                            <input
                                type="text"
                                id={`billAmount${index}`}
                                value={bill.billAmount}
                                onChange={(e) =>
                                    handleBillChange(
                                        index,
                                        'billAmount',
                                        e.target.value
                                    )
                                }
                                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                            />
                            <button
                                onClick={() => handleRemoveBill(index)}
                                className="mt-2 text-sm text-red-500 underline hover:text-red-700"
                            >
                                Remove Bill
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={handleAddBill}
                        className="mb-4 text-sm text-blue-500 underline hover:text-blue-700"
                    >
                        Add Bill
                    </button>
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

ReceiptPage.auth = true;
ReceiptPage.getLayout = Dashboard.getLayout;
