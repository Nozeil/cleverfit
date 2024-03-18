import type {
    CreateTrainingResponse,
    GetTrainingResponse,
    TrainingBody,
    UpdateTrainingArgs,
} from '@models/models';
import { api } from '@services/api';
import { TRAINING_ENDPOINTS } from '@services/api.constants';

export const trainingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTraining: builder.query<GetTrainingResponse, void>({
            query: () => ({
                url: TRAINING_ENDPOINTS.TRAINING,
            }),
            providesTags: ['Training'],
        }),
        createTraining: builder.mutation<CreateTrainingResponse, TrainingBody>({
            query: (body) => ({
                url: TRAINING_ENDPOINTS.TRAINING,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Training'],
        }),
        updateTraining: builder.mutation<CreateTrainingResponse, UpdateTrainingArgs>({
            query: ({ id, body }) => ({
                url: `${TRAINING_ENDPOINTS.TRAINING}/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Training'],
        }),
    }),
});

export const {
    useGetTrainingQuery,
    useLazyGetTrainingQuery,
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
} = trainingApi;
