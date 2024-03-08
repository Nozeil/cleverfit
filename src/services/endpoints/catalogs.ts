import type { TrainingListResponse } from '@models/models';
import { api } from '@services/api';

export const catalogsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTrainingList: builder.query<TrainingListResponse, void>({
            query: () => ({
                url: 'catalogs/training-list',
            }),
        }),
    }),
});

export const { useGetTrainingListQuery } = catalogsApi;
