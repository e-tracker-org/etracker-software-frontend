import { AxiosResponse } from 'axios';
import { User } from 'interfaces';
import { GenericResponse, http } from './http';

interface createTenantProp {
    email: string;
    propertyId: string;
}

interface confirmTenantProp {
    tenantId: string;
    propertyId: string;
}

export interface endAgreementTenantProp {
    propertyId: string;
    tenantId: string;
}

export const LandlordService = {
    async getAllTenants(): Promise<AxiosResponse<GenericResponse<User[]>>> {
        try {
            const { data } = await http.get('/api/v1/landlord/tenant');
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },

    async searchLandlordTenant(
        searchTerm: string | undefined
    ): Promise<AxiosResponse<GenericResponse<User[]>>> {
        try {
            const { data } = await http.get(
                `/api/v1/landlord/search/tenant?q=${searchTerm}`
            );
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },

    async createLandlordTenant(
        reqObj: createTenantProp[]
    ): Promise<AxiosResponse<GenericResponse<string>>> {
        try {
            const { data } = await http.post(
                `/api/v1/landlord/addProperty`,
                reqObj
            );
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },

    async confirmTenant(
        reqObj: confirmTenantProp
    ): Promise<AxiosResponse<GenericResponse<User[]>>> {
        try {
            const { data } = await http.patch(
                `/api/v1/landlord/confirmTenant`,
                reqObj
            );
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },

    async updateUser(
        reqObj: Partial<User>
    ): Promise<AxiosResponse<GenericResponse<User>>> {
        try {
            const { data } = await http.patch('/api/v1/user', reqObj);
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },

    async endTenantAgreement(
        reqObj: endAgreementTenantProp
    ): Promise<AxiosResponse<GenericResponse<string>>> {
        try {
            const { data } = await http.patch(
                `/api/v1/landlord/end-tenant-agreement`,
                reqObj
            );
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },
};
