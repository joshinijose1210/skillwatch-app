import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const roleApi = createApi({
    reducerPath: 'roleApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.role
    }),
    tagTypes: ['role'],

    endpoints: builder => ({
        getRoles: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['role']
        }),

        postRole: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['role']
        }),

        editRole: builder.mutation({
            query: payload => ({
                url: `/${payload.path}`,
                method: 'PATCH',
                data: payload.body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['role']
        })
    })
});

export const { useGetRolesQuery, usePostRoleMutation, useEditRoleMutation } = roleApi;
