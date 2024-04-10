import type { CreateInviteResponse, CreateTrainingBody, GetInvitesResponse } from '@models/models';
import { api } from '@services/api';
import { INVITE_ENDPOINTS } from '@services/api.constants';

export const catalogsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getInvites: builder.query<GetInvitesResponse, void>({
            query: () => ({
                url: INVITE_ENDPOINTS.INVITE,
            }),
            providesTags: ['InviteStatus'],
        }),
        createInvite: builder.mutation<CreateInviteResponse, CreateTrainingBody>({
            query: (body) => ({
                url: INVITE_ENDPOINTS.INVITE,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['InviteStatus'],
        }),
    }),
});

export const { useGetInvitesQuery, useCreateInviteMutation } = catalogsApi;
