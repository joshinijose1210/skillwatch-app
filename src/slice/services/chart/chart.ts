import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const chartApi = createApi({
    reducerPath: 'chartApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.dashboardChart
    }),

    tagTypes: ['chart', 'dashboardFeedbackPercentage'],

    endpoints: builder => ({
        getChartApi: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['chart']
        }),
        getFeedbackPercentage: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['dashboardFeedbackPercentage']
        })
    })
});

export const { useGetChartApiQuery, useGetFeedbackPercentageQuery } = chartApi;
