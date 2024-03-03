import type {
    AuthUserBody,
    ChangePasswordBody,
    ChangePasswordResponse,
    CheckEmailBody,
    CheckEmailResponse,
    ConfirmEmailBody,
    ConfirmEmailResponse,
    CreateFeedbackBody,
    GetFeedbacksResponse,
    LoginResponse,
} from '@models/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { checkAccessToken } from '@utils/utils';

import { BASE_URL } from './api.constants';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = checkAccessToken();

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Feedback'],
    endpoints: (builder) => ({
        registerUser: builder.mutation<void, AuthUserBody>({
            query: (body) => ({
                url: 'auth/registration',
                method: 'POST',
                body,
            }),
        }),
        loginUser: builder.mutation<LoginResponse, AuthUserBody>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
        }),
        checkEmail: builder.mutation<CheckEmailResponse, CheckEmailBody>({
            query: (body) => ({
                url: 'auth/check-email',
                method: 'POST',
                body,
            }),
        }),
        confirmEmail: builder.mutation<ConfirmEmailResponse, ConfirmEmailBody>({
            query: (body) => ({
                url: 'auth/confirm-email',
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
        changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordBody>({
            query: (body) => ({
                url: 'auth/change-password',
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
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

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
    useGetFeedbacksQuery,
    useLazyGetFeedbacksQuery,
    useCreateFeedbackMutation,
} = api;
