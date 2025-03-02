import Button from 'components/base/Button';
import { useRouter } from 'next/router';
import renderEmptyState from 'pages/elements/EmptyState';
import { useEffect, useState } from 'react';
import { formatMoney, getFormattedDate } from 'services/config/config';
import { getTenantTransactions } from 'services/newServices/tenant';

function TransactionHistory({tenantId}:any) {
    console.log(tenantId, 'tenantId');
    const { query } = useRouter();
    const id = query?.id as string || tenantId as string;

    const [tenantTransaction, setTenantTransaction] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const transactions = await getTenantTransactions(id);
                setTenantTransaction(transactions);
            } catch (error) {
                console.error('Error fetching tenant transactions:', error);
            }
        }
        
        if (id) {
            fetchData();
        }
    }, [id]);

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
                {tenantTransaction.length > 0 ? (
                    tenantTransaction.map((t:any) => (
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
                            <td className="p-6 ">{getFormattedDate(t.dueDate)}</td>
                            <td className="p-6 ">{t.category}</td>
                            <td className="p-6 pr-0">{formatMoney(t.amount) || 'N/A'}</td>
                        </tr>
                    ))
                    ) : (
                        

                        renderEmptyState()

                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
