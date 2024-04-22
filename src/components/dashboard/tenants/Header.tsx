import Button from 'components/base/Button';
import Dropdown from 'components/base/Dropdown';
import DropdownDialog from 'components/base/DropdownDialog';
import Select from 'components/base/form/Select';
import SelectBox from 'components/base/form/SelectBox';
import { useAppStore } from 'hooks/useAppStore';
import useProperty from 'hooks/useProperty';
import useTenant from 'hooks/useTenant';
import { KycStatus } from 'interfaces';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { goBackToKyc2 } from 'utils/helper';
import { TenantState } from 'store/tenantSlice';

interface TenantProp {
    tenantsCount: number;
}

const Header: FC<TenantProp> = ({ tenantsCount }) => {
    const states = useAppStore();
    const router = useRouter();
    const { getMyProperties } = useProperty();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        setSearchTerm(states?.searchParam as string);
    }, [states?.searchParam]);

    const properties = getMyProperties?.data.data.map((property) => ({
        value: property.id,
        label: property.name,
    }));

    const getPropertyName = (id: string) => {
        const property = properties?.find((p) => p.value === id);
        return property?.label;
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            states?.setSearchParam(searchTerm?.trim());
        }
    };

    const handleTenantAction = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        states?.setSelectMultiple(true);
        states?.setSelectMultipleAction(
            event.currentTarget.dataset
                .action as TenantState['selectMultipleAction']
        );
    };

    //@ts-ignore
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        if (searchTerm === '') {
            states?.setSearchParam('');
        }
    };

    const SearchInput = (
        <>
            <div className="relative w-full">
                <svg
                    className="absolute top-[25%] left-5"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M22.2314 21.1895L16.5674 15.5255C17.9285 13.8914 18.6072 11.7956 18.4624 9.67389C18.3176 7.55219 17.3603 5.56801 15.7898 4.1341C14.2193 2.7002 12.1565 1.92697 10.0304 1.97528C7.90429 2.02359 5.87867 2.88971 4.37492 4.39347C2.87116 5.89723 2.00503 7.92284 1.95672 10.0489C1.90842 12.175 2.68164 14.2379 4.11555 15.8084C5.54945 17.3789 7.53364 18.3361 9.65534 18.481C11.777 18.6258 13.8729 17.9471 15.5069 16.586L21.1709 22.25L22.2314 21.1895ZM3.48141 10.25C3.48141 8.91494 3.87729 7.6099 4.61899 6.49987C5.36069 5.38983 6.4149 4.52467 7.6483 4.01378C8.8817 3.50289 10.2389 3.36921 11.5483 3.62966C12.8576 3.89011 14.0604 4.53299 15.0044 5.47699C15.9484 6.421 16.5913 7.62373 16.8517 8.9331C17.1122 10.2425 16.9785 11.5997 16.4676 12.8331C15.9567 14.0665 15.0915 15.1207 13.9815 15.8624C12.8715 16.6041 11.5664 17 10.2314 17C8.44181 16.998 6.72607 16.2862 5.46063 15.0207C4.19519 13.7553 3.4834 12.0396 3.48141 10.25Z"
                        fill="#131313"
                        fillOpacity="0.45"
                    />
                </svg>
                <input
                    type="search"
                    placeholder="Type in name or email and press Enter"
                    className="rounded-xl bg-[#FFFFFF] placeholder:text-[#13131373] w-full pl-16 pr-4 py-3 focus:border-primary-600 border border-[#B9B9B9]"
                    value={searchTerm}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="flex justify-end w-full">
                {searchTerm && isMobile ? (
                    <Button
                        title="Clear"
                        className="py-4  text-[17px] w-auto text-center"
                        onClick={() => {
                            states?.setSearchParam('');
                            setSearchTerm('');
                        }}
                    />
                ) : null}
            </div>
        </>
    );

    const AddTenant = (
        <div className="flex justify-end w-full">
            <Button
                className="flex items-center max-h-[47px] !text-base !font-bold px-8 py-3"
                onClick={() => {
                    router.push('/dashboard/tenants/add');
                }}
            >
                Add Tenants
            </Button>
        </div>
    );

    const PropertyDropdown = (
        <Dropdown
            title={
                getPropertyName(states?.propertyId as string) ||
                'All Properties'
            }
            className="border border-[#BEBCBC] rounded-lg text-[18px] text-black"
            ulClassName="bg-white drop-shadow-t-xs"
            btnClasssName="lg:py-4 lg:px-3"
        >
            <li
                key="all"
                className={`py-4 px-3 text-black border-b border-[#E7E5E5] last:border:0 cursor-pointer hover:bg-slate-50 ${
                    states?.propertyId === '' && 'bg-slate-50'
                }`}
            >
                <button
                    onClick={(e) => {
                        states?.setPropertyId('');
                    }}
                >
                    All Properties
                </button>
            </li>
            {properties?.map((property) => (
                <li
                    key={property.value}
                    className={`py-4 px-3 text-black border-b border-[#E7E5E5] last:border:0 cursor-pointer hover:bg-slate-50 ${
                        states?.propertyId === property.value && 'bg-slate-50'
                    }`}
                >
                    <button
                        data-id={property.value}
                        onClick={(e) => {
                            console.log(
                                e.currentTarget.dataset,
                                'current target'
                            );
                            states?.setPropertyId(
                                e.currentTarget.dataset.id as string
                            );
                        }}
                        className="whitespace-nowrap"
                    >
                        {property.label}
                    </button>
                </li>
            ))}
        </Dropdown>
    );

    return (
        <header className="bg-white rounded-md px-5 py-[14px] mb-12 mt-6 flex flex-col lg:flex-row justify-between items-center w-full gap-10 lg:gap-20">
            {isMobile ? AddTenant : null}
            <div className="flex items-center  gap-x-8 mb-4">
                {!isMobile ? PropertyDropdown : null}
                <span className="text-xl font-medium whitespace-nowrap">
                    {tenantsCount} Total
                </span>
                {isMobile ? PropertyDropdown : null}
                {!isMobile ? SearchInput : null}
                {!isMobile ? AddTenant : null}
                <DropdownDialog title="More">
                    <li className="py-2 text-black border-b border-[#E7E5E5] last:border:0">
                        <button
                            className="w-full px-3 py-2 text-left hover:bg-slate-50 font-medium"
                            data-action="notify"
                            onClick={(e) => handleTenantAction(e)}
                        >
                            Notify Tenants
                        </button>
                    </li>
                    <li className="py-2 text-black border-b border-[#E7E5E5] last:border:0">
                        <button
                            className="w-full px-3 py-2 text-left  hover:bg-slate-50 font-medium"
                            data-action="receipt"
                            onClick={handleTenantAction}
                        >
                            Send Receipt
                        </button>
                    </li>
                </DropdownDialog>
            </div>
            {isMobile ? SearchInput : null}
        </header>
    );
};

export default Header;
