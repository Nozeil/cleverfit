import { useEffect } from 'react';
import {
    closeTrainingListErrorNotification,
    openTrainingListErrorNotification,
} from '@redux/slices/training-list-error-notification';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';

import { useAppDispatch } from '.';

export const useTrainingListQueryWithNotification = () => {
    const queryResult = useGetTrainingListQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const action = queryResult.isError
            ? openTrainingListErrorNotification
            : closeTrainingListErrorNotification;

        dispatch(action());
    }, [dispatch, queryResult.isError]);

    const refresh = () => {
        dispatch(closeTrainingListErrorNotification());
        queryResult.refetch();
    };

    return { queryResult, refresh };
};
