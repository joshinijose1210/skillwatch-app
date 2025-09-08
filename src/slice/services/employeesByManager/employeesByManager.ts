import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const employeesByManagerApi = createApi({
    reducerPath: 'employeesByManagerApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.employeesByManager
    }),

    tagTypes: ['employeesByManager'],

    endpoints: builder => ({
        getEmployeesByManager: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['employeesByManager']
        })
    })
});

export const { useGetEmployeesByManagerQuery } = employeesByManagerApi;
