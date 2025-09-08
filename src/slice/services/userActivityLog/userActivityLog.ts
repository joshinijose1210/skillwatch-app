import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const userActivityLog = createApi({
    reducerPath: 'userActivityLog',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.userActivity
    }),

    tagTypes: ['userActivity'],

    endpoints: builder => ({
        getUserActivityLogs: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['userActivity']
        })
    })
});

export const { useGetUserActivityLogsQuery } = userActivityLog;
