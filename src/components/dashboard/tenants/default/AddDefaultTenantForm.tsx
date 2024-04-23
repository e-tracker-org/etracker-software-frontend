import TextArea from 'antd/es/input/TextArea';
import Button from 'components/base/Button';
import ToolTip from 'components/base/Tooltip';
import Checkbox from 'components/base/form/Checkbox';
import Input from 'components/base/form/Input';
import Select from 'components/base/form/Select';
import { useAppStore } from 'hooks/useAppStore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createDefaultTenant } from 'services/newServices/tenant';

export default function VerifyForm() {
    const states = useAppStore();
    const landlordId = states?.user?.id;
    const [formState, setFormState] = useState({
        propertyAddress: '',
        complaints: '',
        landlordNIN: '',
        tenantNIN: '',
        proof: '',
        tenantEmail: '',
        tenantGender: '',
        tenantPhone: '',
        tenantName: '',
        agreed: false
    });

    // function to update the form state
    const updateFormState = (key: string, value: any) => {
        setFormState({ ...formState, [key]: value });
    }

    // function to submit the form
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!formState.agreed) {
            toast.error('Please agree to the terms and conditions');
            return;
        }

        if(!formState.tenantName || !formState.tenantPhone || !formState.tenantEmail) {
            toast.error('Please fill in all required fields');
            return;
        }

        if(formState.tenantPhone.length < 11) {
            toast.error('Invalid phone number');
            return;
        }

        if(!formState.tenantEmail.includes('@')) {
            toast.error('Invalid email address');
            return;
        }

        if(formState.tenantNIN.length < 11) {
            toast.error('Invalid NIN number');
            return;
        }

        if(formState.landlordNIN.length < 11) {
            toast.error('Invalid NIN number');
            return;
        }

        const data = {
            ...formState,
            landlordId
        }

        const addDefault = await createDefaultTenant(data);

        if(addDefault) {
            toast.success('Tenant added successfully');
            setFormState({
                propertyAddress: '',
                complaints: '',
                landlordNIN: '',
                tenantNIN: '',
                proof: '',
                tenantGender: '',
                tenantEmail: '',
                tenantPhone: '',
                tenantName: '',
                agreed: false
            })
        }
    }

    console.log(formState)
    return (
        <form className="bg-white p-10 ">
            <section className="grid grid-cols-2 gap-6">
                <Input
                    label="Tenant Name"
                    required
                    placeholder="Enter name "    
                    asterisk
                    value={formState.tenantName}
                    onChange={(e) => updateFormState('tenantName', e.target.value)}
                    // register={{ ...register('name') }}
                    // error={errors.name}
                    inputClassName="bg-white"
                />

                <Input
                    label="Tenant Phone number"
                    type="number"
                    required
                    placeholder="Enter phone number"
                    asterisk
                    value={formState.tenantPhone}
                    minLength={11}
                    onChange={(e) => updateFormState('tenantPhone', e.target.value)}
                    // register={{ ...register('numberOfBath') }}
                    // error={errors.numberOfBath}
                    inputClassName="bg-white"
                />
                <Input
                    label="Your National identificaton number"
                    type="number"
                    required
                    minLength={11}
                    placeholder="Enter NIN number"
                    asterisk
                    value={formState.landlordNIN}
                    onChange={(e) => updateFormState('landlordNIN', e.target.value)}
                    // register={{ ...register('numberOfRooms') }}
                    // error={errors.numberOfRooms}
                    inputClassName="bg-white"
                />

                <Input
                    label="Tenant National identificaton number"
                    type="number"
                    required
                    minLength={11}
                    placeholder="Enter NIN number"
                    asterisk
                    value={formState.tenantNIN}
                    onChange={(e) => updateFormState('tenantNIN', e.target.value)}
                    // register={{ ...register('numberOfRooms') }}
                    // error={errors.numberOfRooms}
                    inputClassName="bg-white"
                />
                <Input
                    label="Tenant Email address"
                    type="email"
                    required
                    placeholder="Enter email address"
                    asterisk
                    value={formState.tenantEmail}
                    onChange={(e) => updateFormState('tenantEmail', e.target.value)}
                    // register={{ ...register('numberOfBath') }}
                    // error={errors.numberOfBath}
                    inputClassName="bg-white"
                />

                {/* gender */}
                <Select
                    label="Gender"
                    required
                    value={formState.tenantGender}
                    onChange={(e) => updateFormState('tenantGender', e.target.value)}
                    // register={{ ...register('gender') }}
                    // error={errors.gender}
                    className="bg-white"
                >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Select>
                

                <Input
                    label="Property Address"
                    type="text"
                    required
                    placeholder="Enter property address"
                    asterisk
                    value={formState.propertyAddress}
                    onChange={(e) => updateFormState('propertyAddress', e.target.value)}
                    // register={{ ...register('numberOfBath') }}
                    // error={errors.numberOfBath}
                    inputClassName="bg-white col-span-2"
                />

                <textarea
                    className="bg-white border border-gray-300 rounded-md p-2 col-span-2"
                    required
                    value={formState.complaints}
                    placeholder="Enter your complaints"
                    onChange={(e) => updateFormState('complaints', e.target.value)}
                />

            </section>

            

            <Checkbox
                className="mt-8"
                label={
                    <p>
                        By submitting this tenant default request, You
                        agree with our{' '}
                        <span className="text-[#2F42EDD9] text-xs md:text-sm">
                            Terms and Conditions.
                        </span>
                    </p>
                }
                checked={formState.agreed}
                onChange={() => updateFormState('agreed', !formState.agreed)}
                // register={{ ...register('agreed') }}
                // error={errors.agreed}
            />

            <div className="w-1/2  mx-auto mb-10 mt-16">
                {/* @ts-ignore */}
                <Button onClick={onSubmit} className="w-full py-4">Submit Request</Button>
            </div>
        </form>
    );
}
