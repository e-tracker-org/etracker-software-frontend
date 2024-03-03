import Button from 'components/base/Button';
import SuccessPage from 'components/onboarding/SuccessPage';
import { useAppStore } from 'hooks/useAppStore';
import { NextRouter, useRouter } from 'next/router';
import React, { FC } from 'react';
import { string } from 'yup';

interface ModalContentProp {
    screenType: string | undefined;
    closeModal: () => void;
}

const handleScreenTypes = (
    screenType: string | undefined,
    route: NextRouter,
    closeModal: () => void,
    states: any
) => {
    switch (screenType) {
        case 'awaitApproval':
            return (
                <>
                    <SuccessPage
                        title="Awaiting Approval"
                        content="Congratulations on successfully completing the KYC process! Your KYC details are now being reviewed. You will receive an email notification 
                    once the review process is complete and you have been either approved or rejected."
                    />
                    <Button
                        title="Continue"
                        className="py-4 mt-10 text-[17px] w-1/3 text-center"
                        onClick={() => {
                            states?.setScreen('');
                            // route.push('/dashboard/properties');
                            closeModal();
                        }}
                    />
                </>
            );

        case 'kycCompleted':
            return (
                <>
                    <SuccessPage
                        title="Congratulations"
                        content=" Congratulations on completing your KYC process! Please check
                    your email for an important link that you need to forward to
                    your tenants. This link will allow them to complete their
                    KYC process quickly and easily. Thank you for using our
                    platform"
                    />
                    <Button
                        title="Continue"
                        className="py-4 mt-10 text-[17px] w-1/3 text-center"
                        onClick={() => {
                            states?.setScreen('');
                            route.push('/dashboard/properties');
                            closeModal();
                        }}
                    />
                </>
            );
        case 'kyc':
            return (
                <>
                    <SuccessPage
                        title="Welcome back! Continue where you left off?"
                        content="  We noticed that you have previously used our dashboard.
                        Would you like to continue where you left off?"
                        isIcon={false}
                    />
                    <Button
                        title="Continue"
                        className="py-4 mt-10 text-[17px] w-1/3 text-center"
                        onClick={() => {
                            states?.setScreen('');
                            route.push('/onboarding/kyc');
                            closeModal();
                        }}
                    />
                </>
            );
    }
};

const ModalContent: FC<ModalContentProp> = ({ screenType, closeModal }) => {
    const route = useRouter();
    const states = useAppStore();
    return <>{handleScreenTypes(screenType, route, closeModal, states)}</>;
};

export default ModalContent;
