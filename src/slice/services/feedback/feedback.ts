import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.feedback
    }),
    tagTypes: ['feedback'],

    endpoints: builder => ({
        getSubmittedFeedbacks: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['feedback']
        }),

        getReceivedFeedbacks: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['feedback']
        }),

        postFeedback: builder.mutation({
            query: payload => ({
                url: `/${payload.path}`,
                method: payload.method,
                data: payload.data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['feedback']
        })
    })
});

export const { useGetSubmittedFeedbacksQuery, usePostFeedbackMutation, useGetReceivedFeedbacksQuery } = feedbackApi;
