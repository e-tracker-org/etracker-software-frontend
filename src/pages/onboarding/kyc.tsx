import { ReactElement, useEffect, useMemo, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import ProfileForm from 'components/onboarding/ProfileForm';
import PropertyForm from 'components/onboarding/PropertyForm';
import DocumentUpload from 'components/onboarding/DocumentUpload';
import { useRouter } from 'next/router';
import SuccessPage from 'components/onboarding/SuccessPage';
import Timeline from 'components/base/Timeline';
import Dashboard from 'layouts/dashboard';
import { useAppStore } from 'hooks/useAppStore';
import { UserService } from 'services';
import { useQuery } from 'react-query';
import { AccountType, KycStatus } from 'interfaces';
import Button from 'components/base/Button';

interface StepConfigProps {
    accountStep: number;
    accountStepTitle: string[];
}

export default function KycOnboarding() {
    const states = useAppStore();
    const router = useRouter();
    const [accounType, setAccounType] = useState<AccountType | undefined>();

    const [stepConfig, setStepConfig] = useState<StepConfigProps>({
        accountStep: 2, //default is tenant,
        accountStepTitle: ['Profile', 'Upload document'],
    });

    const { data: accountTypes, isLoading: isTypeLoading } = useQuery(
        'getAccountTypes',
        UserService.getAccountTypes
    );

    console.log(accountTypes?.data, 'accountTypes');

    const step = useMemo(() => states?.step as number, [states?.step]);

    const onNavBack = () => {
        if (step > 1) {
            states?.goBack();
            return;
        }
        router.back();
    };

    useEffect(() => {
        if (states?.activeKyc && Array.isArray(accountTypes?.data)) {
            const acctType = accountTypes?.data.find(
                (accountype: AccountType) => {
                    const typeID = states?.activeKyc?.accountType;
                    return Number(accountype?.typeID) === Number(typeID);
                }
            );
            console.log(acctType, 'acctType');

            setAccounType(acctType);
        } else {
            states?.setActiveKyc({
                accountType: states?.user?.currentKyc?.accountType,
                kycStage: 1,
                nextStage: 2,
                status: 'INCOMPLETE',
            });
            states?.setActiveAccount(states?.user?.currentKyc?.accountType);
            // setAccounType(states?.user?.currentKyc?.accountType);
        }
    }, [states?.activeKyc?.accountType, accountTypes?.data]);

    useEffect(() => {
        if (states?.activeAccount) {
            switch (states?.activeAccount) {
                case 1:
                    setStepConfig({
                        accountStep: 2, //default is tenant,
                        accountStepTitle: ['Profile', 'Upload document'],
                    }); // Timeline kyc steps or stages for tenant
                    break;
                case 2:
                    setStepConfig({
                        accountStep: 2, //default is tenant,
                        accountStepTitle: [
                            'Profile',
                            'Upload document',
                            'Add Property',
                        ],
                    }); // Timeline kyc steps or stages for landlord
                    break;
                case 3:
                    setStepConfig({
                        accountStep: 2, //default is tenant,
                        accountStepTitle: [
                            'Profile',
                            'Upload document',
                            'Add Property',
                        ],
                    }); // Timeline kyc steps or stages for property agent
                    break;
                default:
                    setStepConfig({
                        accountStep: 2, //default is tenant,
                        accountStepTitle: ['Profile', 'Upload document'],
                    }); // Timeline kyc steps or stages for tenant
            }
        }
    }, [states?.activeAccount]);

    if (states?.user?.isUserVerified) {
        router.replace('/dashboard');
    }

    return (
        <section className="">
            <div className="flex gap-4">
                <button
                    onClick={onNavBack}
                    className="inline-flex text-primary-600 items-center gap-3 text-xl font-semibold"
                >
                    <BiArrowBack />
                    <span>Back</span>
                </button>
                <h1 className="text-xl text-[#686868] font-medium">
                    {accounType?.accountType === 'Landlord'
                        ? `Property Manager / ${accounType?.accountType}`
                        : accounType?.accountType}{' '}
                    Information
                </h1>
            </div>
            <div className="my-5 ml-auto w-full">
                <Timeline
                    stepSize={stepConfig?.accountStep}
                    currentStep={step}
                    titles={stepConfig?.accountStepTitle}
                    goto={states?.goto}
                />
            </div>
            {step === 1 && <ProfileForm page="kyc" />}
            {step === 2 && <DocumentUpload page="kyc" />}
            {step === 3 && states?.activeAccount === 1 && (
                <DocumentUpload page="kyc" />
            )}

            {step >= 3 && states?.activeAccount !== 1 && (
                <PropertyForm page="kyc" />
            )}

            {/*{step === 4 && <GuarantorForm />} */}
            {/* {step === 3 && <EmploymentStatus />} */}
        </section>
    );
}

KycOnboarding.auth = true;
KycOnboarding.onboarding = true;

KycOnboarding.getLayout = function getLayout(page: ReactElement) {
    return <Dashboard>{page}</Dashboard>;
};
