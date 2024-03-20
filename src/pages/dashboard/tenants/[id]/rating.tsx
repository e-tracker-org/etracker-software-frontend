import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from 'components/base/Button';

function TenantRating({ tenant }:any) {
    const { query } = useRouter();
    const [rating, setRating] = useState(0);


    const fileCount = Number(localStorage.getItem('selectedTenantFilesCount'));

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
            if(fileCount>0){
                ratingValue += 10;
            }

            setRating(ratingValue);
        }
    }, [tenant]);



    return (
        <div>
            <main className="flex justify-between items-center mb-5">
                <CircularProgressbar value={rating} text={`${rating}%`} styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',

                // Text size
                textSize: '16px',

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',
                pathColor: `rgba(62, 152, 199, ${rating / 100})`,
                textColor: 'green',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
            })} />
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
