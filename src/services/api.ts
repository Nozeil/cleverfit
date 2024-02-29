import type {
    AuthUserBody,
    ChangePasswordBody,
    ChangePasswordResponse,
    CheckEmailBody,
    CheckEmailResponse,
    ConfirmEmailBody,
    ConfirmEmailResponse,
    LoginResponse,
} from '@models/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { checkAccessToken } from '@utils/utils';

const BASE_URL = 'https://marathon-api.clevertec.ru/';

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
        getFeedbacks: builder.query<ChangePasswordResponse, void>({
            query: () => ({
                url: '/feedback',
            }),
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
} = api;
