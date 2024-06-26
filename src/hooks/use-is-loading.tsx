import { useAppSelector } from './typed-react-redux-hooks';

const status = 'pending';

export const useIsLoading = () => {
    const api = useAppSelector((state) => state.api);

    const isQueryPending = Object.values(api.queries).some((query) => {
        if (query?.endpointName === 'getUserInfo' || query?.endpointName === 'getInvites') {
            return false;
        }

        return query?.status === status;
    });
    const isMutatitonPending = Object.values(api.mutations).some((mutation) => {
        if (
            mutation?.endpointName === 'createTraining' ||
            mutation?.endpointName === 'updateUserInfo' ||
            mutation?.endpointName === 'buyTariff' ||
            mutation?.endpointName === 'updateInvite' ||
            mutation?.endpointName === 'deleteInvite'
        ) {
            return false;
        }

        return mutation?.status === status;
    });

    return isQueryPending || isMutatitonPending;
};
