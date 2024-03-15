import type {
    CreateTrainingResponse,
    GetTrainingQueryParams,
    GetTrainingResponse,
    TrainingBody,
    UpdateTrainingArgs,
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
        createTraining: builder.mutation<CreateTrainingResponse, TrainingBody>({
            query: (body) => ({
                url: '/training',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Training'],
        }),
        updateTraining: builder.mutation<CreateTrainingResponse, UpdateTrainingArgs>({
            query: ({ id, body }) => ({
                url: `/training/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Training'],
        }),
    }),
});

export const { useGetTrainingQuery, useLazyGetTrainingQuery, useCreateTrainingMutation, useUpdateTrainingMutation } =
    trainingApi;
