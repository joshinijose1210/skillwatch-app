import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const performanceReviewCycleApi = createApi({
    reducerPath: 'performanceReviewCycle',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.performanceReviewCycles
    }),
    tagTypes: ['performanceReview'],

    endpoints: builder => ({
        getCycles: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['performanceReview']
        }),
        addCycle: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['performanceReview']
        }),
        updateCycle: builder.mutation({
            query: payload => {
                const { id, ...rest } = payload;
                return {
                    url: `/${id}`,
                    method: 'PUT',
                    data: rest,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                };
            },
            invalidatesTags: ['performanceReview']
        }),
        getActiveReviewCycle: builder.query({
            query: payload => {
                return {
                    url: createUrlWithParams(payload),
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                };
            }
        }),
        getReviewCycleData: builder.mutation({
            query: payload => {
                return {
                    url: createUrlWithParams(payload),
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                };
            }
        })
    })
});

export const {
    useGetCyclesQuery,
    useAddCycleMutation,
    useUpdateCycleMutation,
    useGetActiveReviewCycleQuery,
    useGetReviewCycleDataMutation
} = performanceReviewCycleApi;
