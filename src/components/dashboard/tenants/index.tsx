import { Dispatch, FC, SetStateAction } from 'react';
import Header from './Header';
import TenantTable from './TenantTable';
import { User } from 'interfaces';

interface TenantProp {
    tenants: any;
}

const TenantsList: FC<TenantProp> = ({ tenants }) => {
    return (
        <div className="w-full">
            <Header tenantsCount={tenants ? tenants.length : 0} />
            <TenantTable tenants={tenants} />
        </div>
    );
};

export default TenantsList;
