
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getTenantTransactions } from 'services/newServices/tenant';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from 'components/base/Button';

function TenantRating() {
    const { query } = useRouter();
    const id = query?.id as string;

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

    const percentage = 66;


    return (
        <div >
            <main className='flex justify-between items-center mb-5'>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <div>
            <Button
                        title="Modify Rating"
                        onClick={() => {
                            console.log('modify rating modal');
                        }}
                    />
                    </div>
            
            </main>
        </div>
    );
};

export default TenantRating;
