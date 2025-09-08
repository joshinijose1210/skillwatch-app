import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const managerEmployeeList = createApi({
    reducerPath: 'managerEmployeeList',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.managerEmployeeList
    }),
    tagTypes: ['managerEmployeeList'],
    endpoints: builder => ({
        getManagerEmployeeList: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload),
                providesTags: ['managerEmployeeList']
            })
        })
    })
});

export const { useGetManagerEmployeeListQuery } = managerEmployeeList;
