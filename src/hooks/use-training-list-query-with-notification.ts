import { useEffect } from 'react';
import {
    closeErrorNotification,
    openErrorNotification,
} from '@redux/slices/training-list-error-notification';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';

import { useAppDispatch } from '.';

export const useTrainingListQueryWithNotification = () => {
    const queryResult = useGetTrainingListQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const action = queryResult.isError ? openErrorNotification : closeErrorNotification;

        dispatch(action());
    }, [dispatch, queryResult.isError]);

    const refresh = () => {
        dispatch(closeErrorNotification());
        queryResult.refetch();
    };

    return { queryResult, refresh };
};
