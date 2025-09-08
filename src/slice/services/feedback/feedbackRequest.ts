import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const feedbackRequestApi = createApi({
    reducerPath: 'requestedFeedbackApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.feedbackRequest
    }),
    tagTypes: ['feedbackRequest', 'action-items'],

    endpoints: builder => ({
        getRequestedFeedback: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['feedbackRequest']
        }),
        addFeedbackRequest: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['feedbackRequest']
        }),
        getFeedbackActionItems: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['action-items']
        })
    })
});

export const { useGetRequestedFeedbackQuery, useAddFeedbackRequestMutation, useGetFeedbackActionItemsQuery } = feedbackRequestApi;
