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

export const LandlordService = {
    async getAllTenants(): Promise<AxiosResponse<GenericResponse<User[]>>> {
        try {
            const { data } = await http.get('/landlord/tenant');
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
                `/landlord/search/tenant?q=${searchTerm}`
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
            const { data } = await http.post(`/landlord/addProperty`, reqObj);
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
                `/landlord/confirmTenant`,
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
            const { data } = await http.patch('/user', reqObj);
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },
};
