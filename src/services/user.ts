import { AxiosResponse } from 'axios';
import { GenericResponse, http } from './http';
import { AccountType, CreateAccountType, User, User2 } from 'interfaces';

export const UserService = {
    async getUser(): Promise<User> {
        try {
            const response: AxiosResponse<GenericResponse<User>> =
                await http.get('/user');
            const userData: User = response.data.data; // Extract user data from AxiosResponse
            return Promise.resolve(userData);
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
    async createKycProfile(
        reqObj: Partial<User2>
    ): Promise<AxiosResponse<User>> {
        try {
            const accounttype = reqObj?.accounttype;
            const kycStage = reqObj?.kycStage;
            const { data } = await http.post(
                `/kyc/${accounttype}/${kycStage}`,
                reqObj
            );
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },
    async createAccountType(
        reqObj: CreateAccountType
    ): Promise<AxiosResponse<CreateAccountType>> {
        try {
            const { data } = await http.post('/user/account-type', reqObj);
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },
    async getAccountTypes(): Promise<
        AxiosResponse<GenericResponse<AccountType>>
    > {
        try {
            const { data } = await http.get('/account-type');
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error?.response.data);
        }
    },
    async switchAccountService(
        accountId: number
    ): Promise<AxiosResponse<User>> {
        console.log('accounttype?>?', accountId);
        try {
            const { data } = await http.post(`/kyc/${accountId}`);
            console.log('data>>>>>>>>', data);
            return Promise.resolve(data);
        } catch (error: any) {
            console.log('error>>>>>>>>', error);
            return Promise.reject(error?.response.data);
        }
    },
};
