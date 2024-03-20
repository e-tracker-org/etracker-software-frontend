import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from 'components/base/Button';
import {
    createRating,
    getTenantRating,
} from '../../../../services/ratingService'; // Import the rating service
import RatingModal from '../../../../components/dashboard/tenants/RatingModal';

function TenantRating({ tenant }: any) {
    const { query } = useRouter();
    const id = query?.id as string;
    const [rating, setRating] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState('');

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

    const handleRating = async (ratingType) => {
        try {
            await createRating({
                tenantId: id,
                landlordId: 'sampleLandlordId', // Replace with actual landlord ID
                rating: ratingType,
                comment: comment,
            });
            // Update the tenant rating
            const response = await getTenantRating(id);
            const totalRating = rating + response.rating.rating;
            setRating(totalRating);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating/fetching rating:', error);
        }
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <main className="flex justify-between items-center mb-5">
                <CircularProgressbar
                    value={rating}
                    text={`${rating}%`}
                    styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: 'butt',
                        textSize: '16px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(62, 152, 199, ${rating / 100})`,
                        textColor: 'green',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                    })}
                />
                <div>
                    <Button title="Modify Rating" onClick={openModal} />
                </div>
                <RatingModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title="Modify Rating"
                >
                    <div>
                        <button onClick={() => handleRating('good')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12L9 16L19 6" />
                            </svg>
                        </button>
                        <button onClick={() => handleRating('bad')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M19 12L15 16L5 6" />
                            </svg>
                        </button>
                        <textarea
                            placeholder="Enter your comment"
                            value={comment}
                            onChange={handleCommentChange}
                        ></textarea>
                    </div>
                </RatingModal>
            </main>
        </div>
    );
}

export default TenantRating;
