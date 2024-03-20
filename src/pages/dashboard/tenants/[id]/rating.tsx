import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from 'components/base/Button';

function TenantRating({ tenant }) {
    const { query } = useRouter();
    const id = query?.id as string;
    const [rating, setRating] = useState(0);

    console.log(tenant, 'tenant');

    useEffect(() => {
        if (tenant) {
            let ratingValue = 0;

            if (tenant?.profileImage == '' && tenant?.isUserVerified == false) {
                ratingValue = 10;
            } else if (
                tenant.profileImage &&
                tenant.profileImage !== '' &&
                tenant.isUserVerified
            ) {
                ratingValue = 30;
            } else if (tenant.profileImage && tenant.profileImage !== '') {
                ratingValue = 20;
            }

            setRating(ratingValue);
        }
    }, [tenant]);

    return (
        <div>
            <main className="flex justify-between items-center mb-5">
                <CircularProgressbar value={rating} text={`${rating}%`} />
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
}

export default TenantRating;
