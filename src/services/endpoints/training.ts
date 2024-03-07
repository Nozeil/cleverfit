import type { GetTrainingQueryParams, GetTrainingResponse } from '@models/models';
import { api } from '@services/api';

export const trainingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTraining: builder.query<GetTrainingResponse, GetTrainingQueryParams>({
            query: (params) => ({
                url: '/training',
                params,
            }),
        }),
    }),
});

export const { useGetTrainingQuery, useLazyGetTrainingQuery } = trainingApi;
