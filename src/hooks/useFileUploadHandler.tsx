import { useMutation } from 'react-query';
import React from 'react';
import { useQuery } from 'react-query';
import { FileUploadServices } from 'services';
import { useQueryClient } from 'react-query';

const useFileUploadHandler = (category = '', type = '') => {
    const queryClient = useQueryClient();
    // const queryKey = ['/userFiles'];
    // if (type) queryKey.push(type);
    // if (category) queryKey.push(category);
    const { data: uploadedFiles, isLoading: loadinguploadFiles } = useQuery(
        'GET_UPLOADED_FILES',
        async () => {
            if (category && type) {
                return await FileUploadServices.getUploadFilesByCategoryAndType(
                    category,
                    type
                );
            }
        }
    );

    const { mutateAsync: setUploadFileAsync, isLoading: uploadProfileLoading } =
        useMutation('FILE_UPLOAD', FileUploadServices.uploadFiles, {
            onSuccess: () => {
                queryClient.invalidateQueries(['GET_UPLOADED_FILES']);
            },
        });

    return {
        uploadedFiles,
        loadinguploadFiles,
        setUploadFileAsync,
        uploadProfileLoading,
    };
};

export default useFileUploadHandler;
