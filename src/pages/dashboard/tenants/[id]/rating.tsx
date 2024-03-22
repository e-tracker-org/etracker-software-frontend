import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from 'components/base/Button';
import { getTenantFiles } from 'services/newServices/tenant';
import RatingModal from 'components/dashboard/tenants/RatingModal';
import { createRating, getTenantRating } from 'services/newServices/rating';
import { DialogModal } from 'components/base/DialogModal';
import Input from 'components/base/form/Input';
import { useAppStore } from 'hooks/useAppStore';

function TenantRating({ tenant }: any) {
    const states = useAppStore();
    const landlordId = states?.user?.id;
    const { query } = useRouter();
    const id = query?.id as string;
    const [rating, setRating] = useState(0) as any;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [selectedRatingType, setSelectedRatingType] = useState('');

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

    const handleRating = async () => {
        console.log('loading....');
        try {
            await createRating({
                tenantId: id,
                landlordId: landlordId,
                rating: selectedRatingType,
                comment: comment,
            });
            const response = await getTenantRating(id);
            const newRating = rating + response.rating.rating;

            setRating(newRating);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating/fetching rating:', error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getTenantRating(id);
                const fetchedRating = response.rating.rating;

                if (rating && rating > 0) {
                    const totalRating = rating + fetchedRating;
                    setRating(totalRating);
                }

                // Set the total rating
            } catch (error) {
                console.error('Error fetching tenant rating:', error);
            }
        }

        fetchData();
    }, []);

    const handleCommentChange = (event: { target: { value: SetStateAction<string>; }; }) => {
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
            <main className="flex flex-col gap-5 items-center justify-center mb-5">
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
                <DialogModal
                    openModal={isModalOpen}
                    closeModal={closeModal}
                    title="Rate Tenant"
                    contentClass="w-full !py-10"
                    className="rounded-md sm:ml-[40%] lg:ml-[10%] px-[3%] lg:!top-[10%]"
                >
                    <div>
                        <div className="flex w-4/6 gap-5 col-span-2 mx-auto mt-12 mb-5 justify-center">
                            {' '}
                            <button
                                onClick={() => setSelectedRatingType('good')}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Good
                            </button>
                            <button
                                onClick={() => setSelectedRatingType('bad')}
                                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                            >
                                Bad
                            </button>
                        </div>

                        <Input
                            label="Enter Comment"
                            required
                            placeholder="Comment"
                            asterisk
                            inputClassName="bg-white h-20"
                            onChange={handleCommentChange}
                            aria-multiline={true}
                        />
                        <div className="flex w-4/6 gap-5 col-span-2 mx-auto mt-16 mb-2">
                            <Button
                                type="button"
                                onClick={() => {
                                    closeModal();
                                }}
                                variant="default"
                                className="w-full py-4"
                            >
                                Cancel
                            </Button>

                            <Button
                                className="w-full py-4"
                                type="submit"
                                onClick={() => {
                                    handleRating();
                                }}
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </DialogModal>
            </main>
        </div>
    );
}

export default TenantRating;