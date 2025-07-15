import { QueryKey, useQuery } from 'react-query';
import Button from 'components/base/Button';
import { useAppStore } from 'hooks/useAppStore';
import { AccountType, KycStatus } from 'interfaces';
import React, { FC, useEffect, useState } from 'react';
import { UserService } from 'services';
import { GET_ACCOUNT_TYPES_QUERY_KEY } from 'utils/constants';
import AccountTypeCard from './AccountTypeCard';
import { extractAndCapitalizeWords, switchAccount } from 'utils/helper';
import { useRouter } from 'next/router';
import { DialogModal } from 'components/base/DialogModal';
import SuccessPage from 'components/onboarding/SuccessPage';

interface SwitchAccountProps {
    handleSwitchAccount: (accountId: number | undefined) => void;
}

const SwitchAccountCard: FC<SwitchAccountProps> = ({ handleSwitchAccount }) => {
    const states = useAppStore();
    const route = useRouter();
    const [account, setAccount] = useState<AccountType>();
    const [openModal, setOpenModal] = useState<boolean>();
    const [switchAccountId, setSwitchAccountId] = useState<number>();

    const { data: accountTypes, isLoading } = useQuery(
        'getAccountTypes',
        UserService.getAccountTypes
    );

    const closeModal = () => {
        setOpenModal(false);
        states?.setScreen('');
    };

    useEffect(() => {
        if (states?.activeKyc && Array.isArray(accountTypes?.data)) {
            const newAccount = accountTypes?.data.filter(
                (account) => account?.typeID === states.activeAccount
            )[0];
            newAccount && setAccount(newAccount);
        }
    }, [states?.activeAccount, account, accountTypes?.data, states?.activeKyc]);

    // useEffect(() => {
    //     if (!openModal) {
    //         handleSwitchAccount(switchAccountId);
    //     }
    // }, [openModal]);

    const renderAccountTypeCards = () => {
        if (Array.isArray(accountTypes?.data)) {
            const typeID = states?.activeAccount;

            return accountTypes?.data.map(
                (accountType) =>
                    accountType?.typeID !== typeID && (
                        <AccountTypeCard
                            key={accountType?.typeID}
                            accountType={accountType.accountType}
                            onClick={() => {
                                // Switch to a new account without kyc yet
                                if (
                                    !states?.user?.accountTypes?.includes(
                                        accountType?.typeID
                                    ) &&
                                    states?.user?.currentKyc?.accountType !==
                                        +accountType?.typeID
                                ) {
                                    if (
                                        states?.startKycScreen === 'onboarding'
                                    ) {
                                        states?.setActiveKyc({
                                            status: KycStatus?.INCOMPLETE,
                                            nextStage: 2,
                                            accountType: accountType?.typeID,
                                            kycStage: 1, // Assign a default value or a valid number
                                        });

                                        states?.setActiveAccount(
                                            accountType?.typeID
                                        );
                                        setOpenModal(false);
                                        states?.setScreen('kyc');
                                        window.location =
                                            '/onboarding/kyc' as any;
                                    } else {
                                        setSwitchAccountId(accountType?.typeID);
                                        states?.setActiveKyc({
                                            status: KycStatus?.INCOMPLETE,
                                            nextStage: 2,
                                            accountType: accountType?.typeID,
                                            kycStage: 1, // Assign a default value or a valid number
                                        });

                                        states?.setActiveAccount(
                                            accountType?.typeID
                                        );

                                        states?.setScreen('kyc');
                                        setOpenModal(false);
                                        window.location =
                                            '/onboarding/kyc' as any;
                                    }
                                } else {
                                    switchAccount(
                                        +accountType?.typeID,
                                        states,
                                        route
                                    );
                                }
                            }}
                        />
                    )
            );
        }
    };

    return (
        <div
            className={`transition-all duration-300 ease-in-out overflow-hidden absolute right-0  px-10 py-10 top-[100px] right-5 w-[400px] lg:w-[500px]  shadow-md z-[100]  !bg-white`}
        >
            <section className="flex gap-4 items-center border-b pb-7 mb-5">
                <div className="flex justify-center items-center bg-primary-600 py-7 px-8 rounded-full text-white w-[80px] h-[80px]">
                    <span>
                        {extractAndCapitalizeWords(
                            states?.user?.firstname +
                                ' ' +
                                states?.user?.lastname
                        )}
                    </span>
                </div>
                <div>
                    <h3 className="text-gray-700 font-bold text-sm md:text-xl">
                        {states?.user?.firstname + ' ' + states?.user?.lastname}
                    </h3>
                    <p className="text-lg font-medium text-gray-500 py-2 text-sm md:text-xl">
                        {account?.accountType}
                    </p>
                    <p className="text-lg font-medium text-gray-500 text-sm md:text-xl">
                        {states?.user?.email}
                    </p>
                </div>
            </section>

            {/* <section>
                <div className=" border-b pb-7 w-full text-left">
                    <h3 className="text-gray-700 font-bold text-sm md:text-xl mb-5">
                        Switch Roles
                    </h3>
                    {renderAccountTypeCards()}
                </div>
            </section> */}
            <section>
                <button
                    className="flex gap-5 mt-8 pl-5"
                    onClick={(e) => {
                        states?.signout();
                        states?.resetTenantState();
                    }}
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 26 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill="#E80404" />
                        <path
                            d="M25.4514 13.4333C25.6952 13.1854 25.8322 12.8517 25.8327 12.5039V12.4959C25.832 12.1437 25.6915 11.806 25.442 11.5573L20.1087 6.22395C19.9857 6.0966 19.8386 5.99502 19.6759 5.92514C19.5132 5.85527 19.3383 5.81848 19.1612 5.81694C18.9842 5.81541 18.8086 5.84914 18.6447 5.91618C18.4809 5.98322 18.332 6.08223 18.2068 6.20742C18.0816 6.33261 17.9826 6.48148 17.9156 6.64534C17.8485 6.8092 17.8148 6.98477 17.8163 7.16181C17.8179 7.33885 17.8547 7.51381 17.9245 7.67648C17.9944 7.83916 18.096 7.98628 18.2233 8.10928L21.2807 11.1666H8.49935C8.14573 11.1666 7.80659 11.3071 7.55654 11.5571C7.30649 11.8072 7.16602 12.1463 7.16602 12.4999C7.16602 12.8536 7.30649 13.1927 7.55654 13.4428C7.80659 13.6928 8.14573 13.8333 8.49935 13.8333H21.2807L18.2233 16.8906C17.9805 17.1421 17.8461 17.4789 17.8491 17.8285C17.8522 18.1781 17.9924 18.5125 18.2396 18.7597C18.4868 19.0069 18.8212 19.1471 19.1708 19.1502C19.5204 19.1532 19.8572 19.0188 20.1087 18.7759L25.442 13.4426L25.4514 13.4333Z"
                            fill="#E80404"
                        />
                    </svg>
                    <span className="text-xl font-medium text-[#E80404]">
                        Log out
                    </span>
                </button>
            </section>
            <DialogModal openModal={openModal}>
                <div className="flex flex-col items-center">
                    <SuccessPage
                        isIcon={false}
                        title=" Warning!"
                        content="There is an active KYC that is either incomplete or has
                    not been approved yet. The action you are about to take
                    will override the active KYC."
                        titleClassname="text-red-300"
                    />
                    <Button
                        title="Continue"
                        className="py-4 mt-10 text-[17px] w-1/3 text-center"
                        onClick={() => {
                            states?.setScreen('');
                            route.push('/onboarding/kyc');
                            closeModal();
                            console.log('not closed');
                        }}
                    />
                </div>
            </DialogModal>
        </div>
    );
};

export default SwitchAccountCard;
