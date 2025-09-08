import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const singleEmployeeData = createApi({
    reducerPath: 'singleEmployeeData',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.singleEmployee
    }),

    tagTypes: ['singleEmployees'],

    endpoints: builder => ({
        getEmployeeData: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['singleEmployees']
        })
    })
});

export const { useGetEmployeeDataQuery } = singleEmployeeData;
