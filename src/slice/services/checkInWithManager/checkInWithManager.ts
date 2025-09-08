import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const checkInWithManagerApi = createApi({
    reducerPath: 'checkInWithManagerApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.checkInWithManagerReview
    }),
    tagTypes: ['checkInWithManagerReviews'],

    endpoints: builder => ({
        getCheckInWithManagerReviews: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['checkInWithManagerReviews']
        }),

        postCheckInWithManagerReviews: builder.mutation({
            query: payload => ({
                url: '/',
                method: payload.method,
                data: payload.data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['checkInWithManagerReviews']
        })
    })
});

export const { useGetCheckInWithManagerReviewsQuery, usePostCheckInWithManagerReviewsMutation } = checkInWithManagerApi;
