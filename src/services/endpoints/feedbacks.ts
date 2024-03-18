import type { CreateFeedbackBody, GetFeedbacksResponse } from '@models/models';
import { api } from '@services/api';
import { FEEDBACKS_ENDPOINTS } from '@services/api.constants';

export const feedbacksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFeedbacks: builder.query<GetFeedbacksResponse, void>({
            query: () => ({
                url: FEEDBACKS_ENDPOINTS.FEEDBACK,
            }),
            providesTags: ['Feedback'],
        }),
        createFeedback: builder.mutation<void, CreateFeedbackBody>({
            query: (body) => ({
                url: FEEDBACKS_ENDPOINTS.FEEDBACK,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Feedback'],
        }),
    }),
});

export const { useGetFeedbacksQuery, useCreateFeedbackMutation } = feedbacksApi;
