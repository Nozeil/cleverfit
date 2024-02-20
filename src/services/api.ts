import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AuthUserBody, LoginResponse } from '@models/models';

const BASE_URL = 'https://marathon-api.clevertec.ru/';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = api;
