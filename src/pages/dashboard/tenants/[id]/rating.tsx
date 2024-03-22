import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from 'components/base/Button';
import { getTenantFiles } from 'services/newServices/tenant';
import RatingModal from 'components/dashboard/tenants/RatingModal';
import { createRating, getTenantRating } from 'services/newServices/rating';
import { DialogModal } from 'components/base/DialogModal';
import Input from 'components/base/form/Input';
import { useAppStore } from 'hooks/useAppStore';
import { UserService } from 'services';

function TenantRating({ tenant }: any) {
    const states = useAppStore();
    const landlordId = states?.user?.id;
    const { query } = useRouter();
    const id = query?.id as string;
    const [rating, setRating] = useState(0) as Number;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState(5);

    const updateUser = UserService.updateUser;
    const tenantRating = tenant.rating;

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

            setRating(ratingValue + tenantRating);
        }
    }, [tenant]);

    const handleRating = async () => {
        setIsLoading(true);
        const updatedRating = value + tenantRating;
        try {
            const payload = {
                id: tenant.id,
                rating: updatedRating,
                firstname: tenant.firstname,
                lastname: tenant.lastname,
                email: tenant.email,
                state: tenant.state,
                phone: tenant.phone,
                gender: tenant.gender,
                dob: tenant.dob,
                country: tenant.country,
                area: tenant.area,
                fullAddress: tenant.fullAddress,
            };

            const response = await updateUser(payload);
            console.log('Update User Response:', response);
            if (response.success) {
                setIsLoading(false);
                setIsModalOpen(false);
                console.log('User profile updated successfully');
            } else {
                console.error('User profile update failed:', response.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            // Handle error
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const increment = () => {
        if (value < 10) {
            setValue(value + 1);
        }
    };

    const decrement = () => {
        if (value > 1) {
            setValue(value - 1);
        }
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
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-gray-200 px-3 py-1 rounded-l"
                                onClick={decrement}
                            >
                                -
                            </button>
                            <div className="bg-gray-100 px-3 py-1">{value}</div>
                            <button
                                className="bg-gray-200 px-3 py-1 rounded-r"
                                onClick={increment}
                            >
                                +
                            </button>
                        </div>

                        {/* <Input
                            label="Enter Comment"
                            required
                            placeholder="Comment"
                            asterisk
                            inputClassName="bg-white h-20"
                            onChange={handleCommentChange}
                            aria-multiline={true}
                        /> */}
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
                                isLoading={isLoading}
                                onClick={() => {
                                    handleRating();
                                }}
                            >
                                Rate
                            </Button>
                        </div>
                    </div>
                </DialogModal>
            </main>
        </div>
    );
}

export default TenantRating;
