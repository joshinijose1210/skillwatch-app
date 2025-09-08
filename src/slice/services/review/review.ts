import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.review
    }),
    tagTypes: ['review'],

    endpoints: builder => ({
        getReview: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['review']
        }),
        autoSaveReview: builder.mutation({
            query: payload => ({
                url: '/auto-save',
                method: payload.method,
                data: payload.data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['review']
        }),
        submitReview: builder.mutation({
            query: payload => ({
                url: '/',
                method: payload.method,
                data: payload.data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['review']
        })
    })
});

export const { useGetReviewQuery, useSubmitReviewMutation, useAutoSaveReviewMutation } = reviewApi;
