import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const employeeList = createApi({
    reducerPath: 'employeeList',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.employeeList
    }),

    tagTypes: ['employees'],

    endpoints: builder => ({
        getEmployeeList: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['employees']
        })
    })
});

export const { useGetEmployeeListQuery } = employeeList;
