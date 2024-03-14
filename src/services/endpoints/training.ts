import type {
    CreateTrainingBody,
    CreateTrainingResponse,
    GetTrainingQueryParams,
    GetTrainingResponse,
} from '@models/models';
import { api } from '@services/api';

export const trainingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTraining: builder.query<GetTrainingResponse, GetTrainingQueryParams>({
            query: (params) => ({
                url: '/training',
                params,
            }),
            providesTags: ['Training'],
        }),
        createTraining: builder.mutation<CreateTrainingResponse, CreateTrainingBody>({
            query: (body) => ({
                url: '/training',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Training'],
        }),
    }),
});

export const { useGetTrainingQuery, useLazyGetTrainingQuery, useCreateTrainingMutation } =
    trainingApi;
