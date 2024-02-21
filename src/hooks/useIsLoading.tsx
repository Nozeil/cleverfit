import { useAppSelector } from './typed-react-redux-hooks';

const status = 'pending';

const useIsLoading = () => {
    const api = useAppSelector((state) => state.api);

    const isQueryPending = Object.values(api.queries).some((query) => query?.status === status);
    const isMutatitonPending = Object.values(api.mutations).some(
        (mutation) => mutation?.status === status,
    );

    return isQueryPending || isMutatitonPending;
};

export default useIsLoading;
