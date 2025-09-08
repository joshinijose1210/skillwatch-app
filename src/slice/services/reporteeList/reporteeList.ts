import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const reporteeList = createApi({
    reducerPath: 'reporteeList',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.employee
    }),

    tagTypes: ['reportee'],

    endpoints: builder => ({
        getReporteeList: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['reportee']
        }),
        postDeactivateManager: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'PUT',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        })
    })
});

export const { useGetReporteeListQuery, usePostDeactivateManagerMutation } = reporteeList;
