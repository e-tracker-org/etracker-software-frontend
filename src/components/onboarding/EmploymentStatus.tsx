import Button from 'components/base/Button';
import Input from 'components/base/form/Input';
import { useAppStore } from 'hooks/useAppStore';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
    firstname: yup.string().required('Enter your first name'),
    email: yup.string().required('Enter your email address'),
    lastname: yup.string().required('Enter your last name'),
    phone: yup.string().required('Enter your phone number'),
    fullAddress: yup.string().required('Enter your address'),
    state: yup.string().required('Select state'),
    landmark: yup.string().optional(),
    dob: yup.string().required('Enter your date of birth'),
    gender: yup.string().required('Select your gender'),
    country: yup.string().required('Select country'),
});

export default function EmploymentStatus() {
    const states = useAppStore();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {};

    return (
        <div>
            <form
                className="grid grid-cols-2 gap-4 py-20"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    label="Employer name"
                    required
                    placeholder="Enter name"
                    register={{ ...register('firstname') }}
                    error={errors.firstname}
                />
                <Input
                    label="Monthly income"
                    required
                    placeholder="Enter income"
                    register={{ ...register('income') }}
                    error={errors.income}
                />
                <Input
                    label="Job title"
                    required
                    placeholder="Enter title"
                    register={{ ...register('jobTitle') }}
                    error={errors.jobTitle}
                />
                <Input
                    label="Employer address"
                    required
                    placeholder="Enter address"
                    register={{ ...register('address') }}
                    error={errors.address}
                />
                <Input
                    label="Official Email address"
                    required
                    placeholder="Enter email"
                    register={{ ...register('email') }}
                    error={errors.email}
                />

                <div className="flex w-4/6 gap-5 col-span-2 mx-auto my-10">
                    <Button
                        type="button"
                        onClick={states?.goBack}
                        variant="default"
                        className="w-full py-4"
                    >
                        Previous
                    </Button>
                    <Button className="w-full py-4" onClick={states?.goNext}>
                        Next
                    </Button>
                </div>
            </form>
        </div>
    );
}
