import type { CreateFeedbackBody, GetFeedbacksResponse } from '@models/models';
import { api } from '@services/api';

export const feedbacksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFeedbacks: builder.query<GetFeedbacksResponse, void>({
            query: () => ({
                url: '/feedback',
            }),
            providesTags: ['Feedback'],
        }),
        createFeedback: builder.mutation<void, CreateFeedbackBody>({
            query: (body) => ({
                url: '/feedback',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Feedback'],
        }),
    }),
});

export const { useGetFeedbacksQuery, useCreateFeedbackMutation } = feedbacksApi;
