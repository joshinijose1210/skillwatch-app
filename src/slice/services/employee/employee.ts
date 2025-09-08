import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.employee
    }),
    tagTypes: ['employee'],

    endpoints: builder => ({
        getEmployee: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) })
        }),

        getActiveEmployee: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) })
        }),

        postEmployee: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        }),

        getSearchedEmployee: builder.query({
            query: payload => ({
                url: `/?searchText=${payload}`
            })
        })
    })
});

export const { useGetEmployeeQuery, useGetActiveEmployeeQuery, usePostEmployeeMutation, useGetSearchedEmployeeQuery } = employeeApi;
