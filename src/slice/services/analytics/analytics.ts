import apiUrls from '@constants/apiUrls';
import { IFeedbackGraph } from '@pages/ReportsAnalytics/ChartSection/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';
import { createUrlWithParamsTypes } from '@utils/types/types';

export const analyticsApi = createApi({
    reducerPath: 'analytics',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.analytics
    }),

    tagTypes: ['ratings', 'analytics-feedback', 'review-status', 'rankings', 'rating-listing', 'demographics', 'employees-data'],

    endpoints: builder => ({
        getEmployeesRatings: builder.query({
            query: payload => ({
                url: `/ratings${createUrlWithParams(payload)}`
            }),
            providesTags: ['ratings']
        }),
        getFeedbackAnalytics: builder.query<IFeedbackGraph, createUrlWithParamsTypes>({
            query: payload => ({
                url: `/feedback-graph${createUrlWithParams(payload)}`
            }),
            providesTags: ['analytics-feedback']
        }),
        getReviewStatusAnalytics: builder.query({
            query: payload => ({
                url: `/review-status${createUrlWithParams(payload)}`
            }),
            providesTags: ['review-status']
        }),
        getRankingsAnalytics: builder.query({
            query: payload => ({
                url: `/rankings${createUrlWithParams(payload)}`
            }),
            providesTags: ['rankings']
        }),
        getRatingListing: builder.query({
            query: payload => ({
                url: `/rating-listing${createUrlWithParams(payload)}`
            }),
            providesTags: ['rating-listing']
        }),
        getEmployeesAnalytics: builder.query({
            query: payload => ({
                url: `/employees-data${createUrlWithParams(payload)}`
            }),
            providesTags: ['employees-data']
        })
    })
});

export const {
    useGetEmployeesRatingsQuery,
    useGetFeedbackAnalyticsQuery,
    useGetReviewStatusAnalyticsQuery,
    useGetRankingsAnalyticsQuery,
    useGetRatingListingQuery,
    useGetEmployeesAnalyticsQuery
} = analyticsApi;
