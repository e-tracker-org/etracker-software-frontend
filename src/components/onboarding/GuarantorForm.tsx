import Button from 'components/base/Button';
import Input from 'components/base/form/Input';
import Select from 'components/base/form/Select';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import { useState } from 'react';
import Image from 'next/image';
import { getBase64, getBase64Async } from 'libs/files';

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

export default function GuarantorForm() {
    const states = useAppStore();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = () => {};

    const onFlowCompleted = () => {
        states?.toggleCompleted();
        states?.setUser({ user: { isUserVerified: true } });
    };

    return (
        <div>
            <form
                className="grid grid-cols-2 gap-4 py-20"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    label="First name"
                    required
                    placeholder="First name"
                    register={{ ...register('firstname') }}
                    error={errors.firstname}
                />
                <Input
                    label="Last name"
                    required
                    placeholder="Last name"
                    register={{ ...register('lastname') }}
                    error={errors.lastname}
                />
                <Input
                    label="Phone number"
                    required
                    placeholder="Phone number"
                    register={{ ...register('phone') }}
                    error={errors.phone}
                />
                <Input
                    label="Email adresss"
                    required
                    placeholder="Email adresss"
                    register={{ ...register('email') }}
                    error={errors.email}
                />
                <Input
                    label="Guarantor occupation"
                    required
                    placeholder="Guarantor occupation"
                    register={{ ...register('occupation') }}
                    error={errors.occupation}
                />
                <Input
                    label="Guarantor office address"
                    required
                    placeholder="Enter office address"
                    register={{ ...register('officeAddress') }}
                    error={errors.officeAddress}
                />
                <Input
                    label="Guarantor home address"
                    required
                    placeholder="Enter home address"
                    register={{ ...register('homeAddress') }}
                    error={errors.homeAddress}
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
                    <Button className="w-full py-4" onClick={onFlowCompleted}>
                        Complete
                    </Button>
                </div>
            </form>
        </div>
    );
}
