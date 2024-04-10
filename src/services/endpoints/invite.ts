import type {
    CreateInviteBody,
    CreateInviteResponse,
    DeleteInviteParams,
    GetInvitesResponse,
    UpdateInviteBody,
} from '@models/models';
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
        createInvite: builder.mutation<CreateInviteResponse, CreateInviteBody>({
            query: (body) => ({
                url: INVITE_ENDPOINTS.INVITE,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['InviteStatus'],
        }),
        updateInvite: builder.mutation<CreateInviteResponse, UpdateInviteBody>({
            query: (body) => ({
                url: INVITE_ENDPOINTS.INVITE,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['InviteStatus'],
        }),
        deleteInvite: builder.mutation<void, DeleteInviteParams>({
            query: (params) => ({
                url: `${INVITE_ENDPOINTS.INVITE}/${params.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['InviteStatus'],
        }),
    }),
});

export const { useGetInvitesQuery, useCreateInviteMutation, useUpdateInviteMutation, useDeleteInviteMutation } = catalogsApi;
