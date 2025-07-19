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
import toast from 'react-hot-toast';

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
            <div className="relative w-full lg:w-[50%] mb-3">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    placeholder="Type in name or email and press Enter"
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="flex justify-end w-full">
                {searchTerm && isMobile ? (
                    <Button
                        title="Clear"
                        className="py-3 px-4 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
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
        <div className=" w-full">
            <Button
                className="flex items-center max-h-[47px] !text-base !font-bold px-8 py-3"
                onClick={() => {
                    if (!states?.propertyId) {
                        toast.error('Please select a property');
                        return;
                    }
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

    const Notify = (
        <button
            className=" w-full flex justify-center items-center max-h-[47px] text-sm font-bold px-8 py-3   bg-primary-600 text-[#FFFFFF] rounded-lg  text-center hover:bg-primary-700 "
            data-action="notify"
            onClick={(event) => handleTenantAction(event)}
        >
            Notify Tenants
        </button>
    );

    const SendReceipt = (
        <button
            className=" w-full flex justify-center items-center max-h-[47px] text-sm font-bold px-8 py-3   bg-primary-600 text-[#FFFFFF] rounded-lg  text-center hover:bg-primary-700 "
            data-action="receipt"
            onClick={(event) => handleTenantAction(event)}
        >
            Send Receipt
        </button>
    );

    return (
        <header className="bg-white rounded-md px-5 lg:px-10 py-[14px] mb-12 mt-6 ">
            {!isMobile ? SearchInput : null}
            <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-5">
                {isMobile ? AddTenant : null}
                <div className="flex gap-5">
                    {isMobile ? Notify : null}
                    {isMobile ? SendReceipt : null}
                </div>

                <div className="flex items-center  gap-x-8 mb-4">
                    {!isMobile ? PropertyDropdown : null}
                    <span className="text-xl font-medium whitespace-nowrap">
                        {tenantsCount} Total
                    </span>
                    {isMobile ? PropertyDropdown : null}
                    {!isMobile ? Notify : null}
                    {!isMobile ? SendReceipt : null}
                    {!isMobile ? AddTenant : null}
                </div>
                {isMobile ? SearchInput : null}
            </div>
        </header>
    );
};

export default Header;
