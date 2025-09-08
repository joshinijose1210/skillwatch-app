import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const designationApi = createApi({
    reducerPath: 'designationApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.designation
    }),
    tagTypes: ['designations'],

    endpoints: builder => ({
        getDesignations: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['designations']
        }),

        postDesignation: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['designations']
        }),

        editDesignation: builder.mutation({
            query: payload => ({
                url: `/${payload.path}`,
                method: 'PUT',
                data: payload.body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['designations']
        }),
        getDesignation: builder.mutation({
            query: payload => ({
                method: 'GET',
                url: createUrlWithParams(payload)
            })
        })
    })
});

export const { useGetDesignationsQuery, usePostDesignationMutation, useEditDesignationMutation, useGetDesignationMutation } =
    designationApi;
