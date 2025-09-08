import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const departmentApi = createApi({
    reducerPath: 'departmentApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.departments
    }),
    tagTypes: ['departments'],

    endpoints: builder => ({
        getDepartment: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['departments']
        }),

        postDepartment: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['departments']
        }),

        editDepartment: builder.mutation({
            query: payload => ({
                url: `/${payload.path}`,
                method: 'PUT',
                data: payload.body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['departments']
        })
    })
});

export const { useGetDepartmentQuery, usePostDepartmentMutation, useEditDepartmentMutation } = departmentApi;
