import { FileType, UploadedFile, User, User2 } from 'interfaces';
import { GenericResponse, http } from './http';
import { AxiosResponse } from 'axios';

export const FileUploadServices = {
    async createFileType(
        data: Partial<FileType>
    ): Promise<AxiosResponse<GenericResponse<FileType>>> {
        return http.post('/api/v1/docs/filetypes', data);
    },
    async getFileTypes(): Promise<AxiosResponse<GenericResponse<FileType[]>>> {
        return http.get('/api/v1/docs/filetypes');
    },
    async getFileTypesByTypeAndCategory(
        type: string,
        category: string,
        accountType: number | undefined
    ): Promise<AxiosResponse<GenericResponse<FileType[]>>> {
        return http.get(
            `/api/v1/docs/filetypes/type/${type}/category/${category}/${accountType}`
        );
    },
    async uploadFiles(data: FormData) {
        console.log('formDataImg', data.get);
        return http.post('/api/v1/docs/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    async getUploadFilesByCategoryAndType(
        category: string,
        type: string
    ): Promise<AxiosResponse<GenericResponse<UploadedFile[]>>> {
        return http.get(`/api/v1/docs/upload/userFiles/${category}/${type}`);
    },
};
