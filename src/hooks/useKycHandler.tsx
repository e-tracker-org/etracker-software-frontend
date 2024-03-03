import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FileUploadServices } from 'services';
import { KycServices } from 'services/kyc';
import { useAppStore } from './useAppStore';

const useKycHandler = (
    type = '',
    category = '',
    accountType: number | undefined = undefined
) => {
    const queryClient = useQueryClient();

    const { mutateAsync: kycHandler, isLoading } = useMutation({
        mutationFn: KycServices.kycApiHandler,
        onSuccess: () => {
            queryClient.invalidateQueries(['getUserProfile']);
            queryClient.invalidateQueries(['GET_UPLOADED_FILES']);
        },
    });

    // const { data: fileTypes, isLoading: loadingFileType } = useQuery(
    //     ['/fileTypes'],
    //     async () => await FileUploadServices.getFileTypes()
    // );
    const queryKey = ['/fileTypes'];
    if (type) queryKey.push(type);
    if (category) queryKey.push(category);
    if (accountType) queryKey.push(accountType.toString());
    const { data: fileTypes, isLoading: loadingFileType } = useQuery(
        queryKey,
        async () => {
            if (type && category && accountType) {
                return await FileUploadServices.getFileTypesByTypeAndCategory(
                    type,
                    category,
                    accountType
                );
            }
        }
    );

    return {
        kycHandler,
        isLoading,
        fileTypes,
        loadingFileType,
    };
};

export default useKycHandler;
