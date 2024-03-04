import { AxiosResponse } from 'axios';
import { User } from 'interfaces';
import { GenericResponse, http } from './http';

interface notifyTenantProp {
    notifyMsg: string;
    tenantIds: string[];
}

export const TenantService = {
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
                `/api/v1/landlord/tenant/search?q=${searchTerm}`
            );
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },
    async searchTenantByProperty({
        //@ts-ignore
        queryKey,
    }): Promise<AxiosResponse<GenericResponse<User[]>>> {
        const { propertyId, searchParam } = queryKey[1];
        try {
            const { data } = await http.get(
                `/api/v1/landlord/tenant/search?q=${propertyId}&q1=${searchParam}`
            );
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },
    async notifyTenants(
        reqObj: notifyTenantProp
    ): Promise<AxiosResponse<GenericResponse<string>>> {
        try {
            const { data } = await http.post(`/api/v1/landlord/notify/tenant`, reqObj);
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },
    async getReceiptCategories(): Promise<
        AxiosResponse<GenericResponse<User[]>>
    > {
        try {
            const { data } = await http.get('/api/v1/receipt/category');

            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },
    async createTransaction(reqObj: {
        category: string;
        dueDate: string;
        amount: string;
        tenants: string[];
    }): Promise<AxiosResponse<GenericResponse<string>>> {
        try {
            const { data } = await http.post(
                `/api/v1/transaction/create-transaction`,
                reqObj
            );
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },
    // landlord/tenant/search?q=64ac2b6071278aac00b04cbd&q1=Rose
    // async createLandlordTenant(
    //     reqObj: User[]
    // ): Promise<AxiosResponse<GenericResponse<string>>> {
    //     return await http.post(`/addProperty/${tenantId}/${propertyId}`, data, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     });
    // },
};
