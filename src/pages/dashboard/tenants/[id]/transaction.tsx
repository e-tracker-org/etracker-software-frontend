import Button from 'components/base/Button';
import { useState } from 'react';

const TransactionHistory = () => {
    const [tenantTransactions, setTenantTransactions] = useState([
        {
            id: 111,
            status: 'overdue',
            category: 'rent',
            dueDate: '22/08/2034',
        },
        {
            id: 112,
            status: 'paid',
            category: 'water bill',
            dueDate: '22/08/2034',
            totalPaid: '2000',
        },
        {
            id: 113,
            status: 'due',
            category: 'light bill',
            dueDate: '22/08/2034',
            totalPaid: '3000',
        },
        {
            id: 114,
            status: 'overdue',
            category: 'rent',
            dueDate: '22/08/2034',
        },
        {
            id: 10989,
            status: 'overdue',
            category: 'water bill',
            dueDate: '22/08/2034',
            totalPaid: '2000',
        },
        {
            id: 163,
            status: 'due',
            category: 'light bill',
            dueDate: '22/08/2034',
            totalPaid: '3000',
        },
        {
            id: 191,
            status: 'overdue',
            category: 'rent',
            dueDate: '22/08/2034',
        },
        {
            id: 117,
            status: 'paid',
            category: 'water bill',
            dueDate: '22/08/2034',
            totalPaid: '2000',
        },
        {
            id: 119,
            status: 'due',
            category: 'light bill',
            dueDate: '22/08/2034',
            totalPaid: '3000',
        },
    ]);
    return (
        <div className="w-full h-[400px] hidden-thin-scrollbar">
            <header className="flex justify-between items-center mb-5">
                <div className="flex items-center"></div>
                {/* <div className="flex">
                    <Button
                        title="Add Payment"
                        onClick={() => {
                            console.log('Add payment modal');
                        }}
                    />
                </div> */}
            </header>
            <table className="w-full whitespace-nowrap text-gray-700 border-separate font-[700]  text-center">
                <thead className="text-[#727070]">
                    <tr>
                        <th className="px-6 pl-0">Status</th>
                        <th className="px-6">Due date</th>
                        <th className="px-6">Category</th>
                        <th className="px-6 pr-0">Total Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {tenantTransactions.map((t) => (
                        <tr key={t.id} className="capitalize">
                            <td className="p-6 pl-0">
                                <span
                                    className={`py-1 px-[10px] rounded-lg ${
                                        t.status === 'overdue'
                                            ? 'text-[#FA0F0F] bg-[#FFE9E9]'
                                            : 'text-[#31AA06] bg-[#ECFFE9]'
                                    }`}
                                >
                                    {t.status}
                                </span>
                            </td>
                            <td className="p-6 ">{t.dueDate}</td>
                            <td className="p-6 ">{t.category}</td>
                            <td className="p-6 pr-0">{t.totalPaid || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
