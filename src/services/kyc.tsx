import { FileType, User, User2 } from 'interfaces';
import { GenericResponse, http } from './http';
import { AxiosResponse } from 'axios';

export const KycServices = {
    async kycApiHandler(reqObj: FormData): Promise<AxiosResponse<User>> {
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
