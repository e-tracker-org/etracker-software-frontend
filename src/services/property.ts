import { AxiosResponse } from 'axios';
import { GenericResponse, http } from './http';
import { Property, PropertySchema, User } from 'interfaces';

export const PropertyService = {
    async createProperty(
        data: FormData
    ): Promise<AxiosResponse<GenericResponse<Property>>> {
        return await http.post('/properties', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    async getProperties(): Promise<AxiosResponse<GenericResponse<Property[]>>> {
        return await http.get('/properties');
    },
    async getMyProperties(): Promise<
        AxiosResponse<GenericResponse<Property[]>>
    > {
        return await http.get('/properties/me');
    },
    async getPropertyById(
        id: string
    ): Promise<AxiosResponse<GenericResponse<Property>>> {
        return await http.get(`/properties/${id}`);
    },
    async getPropertyByStatus(
        status: string
    ): Promise<AxiosResponse<GenericResponse<Property>>> {
        return await http.get(`/properties/status?status=${status}`);
    },

    async updatePropertyById(
        property: Partial<PropertySchema>
    ): Promise<AxiosResponse<GenericResponse<Property>>> {
        return await http.patch(`/properties/${property.id}`, property);
    },
    async deletePropertyById(
        id: string
    ): Promise<AxiosResponse<GenericResponse<null>>> {
        return await http.delete(`/properties/${id}`);
    },

    async propertyKycDocument(reqObj: FormData): Promise<AxiosResponse<User>> {
        try {
            const accounttype = reqObj?.get('accountType');
            const kycStage = reqObj?.get('kycStage');
            const { data } = await http.post(
                `/kyc/${accounttype}/${kycStage}`,
                reqObj,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },
};
