import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const reviewTimelineApi = createApi({
    reducerPath: 'reviewTimelineApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.reviewTimeline
    }),
    keepUnusedDataFor: 0.0001,
    tagTypes: ['timeline'],

    endpoints: builder => ({
        getReviewTimeline: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['timeline']
        }),
        getTimeline: builder.mutation({
            query: payload => ({
                method: 'GET',
                url: createUrlWithParams(payload)
            })
        })
    })
});

export const { useGetReviewTimelineQuery, useGetTimelineMutation } = reviewTimelineApi;
