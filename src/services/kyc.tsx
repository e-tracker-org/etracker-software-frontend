import { FileType, User, User2 } from 'interfaces';
import { GenericResponse, http } from './http';
import { AxiosResponse } from 'axios';

export const KycServices = {
    async kycApiHandler(reqObj: FormData): Promise<AxiosResponse<User>> {
        try {
            const accounttype = reqObj?.get('accountType');
            const kycStage = reqObj?.get('kycStage');
            const { data } = await http.post(
                `/api/v1/kyc/${accounttype}/${kycStage}`,
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

// interface Kyc {

//     id: string;
//     name: string;
// }

// async function getAllKycs(): Promise<AxiosResponse<Kyc[]>> {
//     try {
//         const response = await http.get('/api/v1/kyc/all');
//         return response.data;
//     } catch (error: any) {
//         return Promise.reject(error.response.data);
//     }
// }

// export default getAllKycs;
