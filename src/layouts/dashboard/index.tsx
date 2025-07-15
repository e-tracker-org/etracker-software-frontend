import { ReactNode, useEffect, useState } from 'react';
import Header from './Header';
import { useQuery } from 'react-query';
import { UserService } from 'services';
import { useAppStore } from 'hooks/useAppStore';
import { DialogModal } from 'components/base/DialogModal';
import { useRouter } from 'next/router';
import Loader from 'components/base/Loader';
import Sidebar from './SideBar';
import { Role } from 'utils/enums';
import ModalContent from 'components/dashboard/ModalContent';
import useAccountType from 'hooks/useAccountType';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<Role>(Role.Landlord);
    const states = useAppStore();
    const [isSidenavOpen, setSidenavOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { acctType } = useAccountType();

    const { data: userProfile, isLoading } = useQuery(
        'getUserProfile',
        UserService.getUser,
        {}
    );
    const closeModal = () => {
        if (
            states?.screen === 'kycCompleted' ||
            states?.screen === 'awaitApproval'
        ) {
            states?.setScreen('');
            setIsOpen(false);
            router.push('/dashboard/properties');
        } else {
            states?.setScreen('');
            setIsOpen(false);
        }
    };

    useEffect(() => {
        states?.screen && setIsOpen(!!states?.screen);
    }, [states?.screen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const toggleSidenav = (
        e: React.MouseEvent<HTMLButtonElement | SVGElement, MouseEvent>
    ) => {
        e.preventDefault();
        setSidenavOpen((isSidenavOpen) => !isSidenavOpen);
    };

    // const closeSidenav = () => {
    //     setSidenavOpen(false);
    // };

    useEffect(() => {
        if (userProfile) {
            const userData = userProfile;
            states?.setUser({ user: userData });
            if (userData?.currentKyc) {
                states?.setActiveKyc(userData?.currentKyc);
                states?.setStep(userData?.currentKyc?.nextStage);
            } else {
                if (
                    !states?.activeKyc &&
                    userData?.accountTypes.includes(states?.activeAccount)
                ) {
                    states?.setActiveKyc(undefined);
                    states?.setStep(1);
                    // router.push('/dashboard');
                    if (router.asPath.split('/')[1] === 'onboarding') {
                        router.push('/dashboard');
                    }
                }
            }
        } else if (!isLoading) {
            states?.signout();
            states?.resetTenantState();
            router.push('/auth/signin');
        }
    }, [userProfile, isLoading, states?.activeKyc, router, states]);

    useEffect(() => {
        if (acctType && acctType.accountType) {
            const accountType = acctType?.accountType.toLowerCase();
            switch (accountType) {
                case 'lordlord':
                    setRole(Role.Landlord);
                    break;
                case 'tenant':
                    setRole(Role.Tenant);
                    break;
                case 'landlord tenant':
                    setRole(Role.LandlordTenant);
                    break;
                case 'property agent tenant':
                    setRole(Role.PropertyAgentTenant);
                case 'property agent':
                    setRole(Role.PropertyAgent);
                    break;
                default:
                    setRole(Role.Landlord);
                    break;
            }
        }
    }, [acctType]);

    return isLoading ? (
        <Loader loading={isLoading} />
    ) : (
        <section>
            <DialogModal
                openModal={isOpen}
                showClose={false}
                closeModal={closeModal}
            >
                <div className="w-full text-center text-[#131313] px-10">
                    <ModalContent
                        screenType={states?.screen}
                        closeModal={handleClose}
                    />
                </div>
            </DialogModal>

            {/* Mobile backdrop overlay */}
            {isSidenavOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[99] md:hidden"
                    onClick={() => setSidenavOpen(false)}
                />
            )}

            <Sidebar
                role={role}
                isSidenavOpen={isSidenavOpen}
                setSidenavOpen={setSidenavOpen}
            />
            <section className="ml-0 md:ml-[234px] min-h-screen transition-all duration-300">
                <Header
                    isSidenavOpen={isSidenavOpen}
                    toggleSidenav={toggleSidenav}
                />
                <main className="bg-white md:bg-[#F5F5F5] pt-2 pb-16 px-[3.5%] min-h-[calc(100vh-80px)]">
                    {children}
                </main>
            </section>
        </section>
    );
}
