import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PropertyService } from 'services/property';

const useProperty = (
    id?: string | undefined,
    category?: string | undefined
) => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: createPropertyHandler,
        isLoading: createPropertyLoading,
    } = useMutation({
        mutationFn: PropertyService.createProperty,
        onSuccess: () => {
            queryClient.invalidateQueries(['getMyProperties']);
        },
    });

    const { mutateAsync: propertyKycDocument, isLoading: propertyKycLoading } =
        useMutation({
            mutationFn: PropertyService.propertyKycDocument,
            onSuccess: (data) => {
                console.log('data>>>', data);
                queryClient.invalidateQueries(['getMyProperties']);
                queryClient.invalidateQueries(['getProperties']);
            },
        });
    const { mutateAsync: updateProperty, isLoading: updatePropertyLoading } =
        useMutation({
            mutationFn: PropertyService.updatePropertyById,
            onSuccess: () => {
                queryClient.invalidateQueries(['getMyProperties']);
                queryClient.invalidateQueries(['getProperties']);
            },
        });

    const { data: getMyProperties, isLoading: getMyPropertiesLoading } =
        useQuery(
            ['getMyProperties', category],
            PropertyService.getMyProperties
        );

    const { data: getProperties, isLoading: getPropertiesLoading } = useQuery(
        ['getProperties', category],
        PropertyService.getProperties
    );

    const { data: getProperty, isLoading: getPropertyLoading } = useQuery(
        ['getProperty', id],
        () =>
            PropertyService.getPropertyById(id || '').then(
                (response) => response.data
            ),
        {
            enabled: !!id,
        }
    );

    return {
        createPropertyHandler, // Api to get all  property for an approved users
        createPropertyLoading, // Api to get all  property for an approved users loading
        getMyProperties, // Api to get all  properties by a user
        getMyPropertiesLoading, // Api to get all  properties by a user loading state
        propertyKycDocument, // Api to create kyc property
        propertyKycLoading, // Api to create kyc property loading state
        getProperty, // Api to get a single property by id
        getPropertyLoading, // Api to get a single property loading state
        updateProperty, // Api to update property
        updatePropertyLoading, // Api to update property loading state
        getProperties, // Api to get all properties
        getPropertiesLoading, // Api to get all properties loading state
    };
};

export default useProperty;
