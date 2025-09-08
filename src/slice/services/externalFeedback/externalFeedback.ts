import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const externalFeedbackApi = createApi({
    reducerPath: 'externalFeedbackApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.externalFeedback
    }),
    tagTypes: ['externalFeedback'],

    endpoints: builder => ({
        getExternalFeedback: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['externalFeedback']
        }),

        postExternalFeedback: builder.mutation({
            query: payload => ({
                url: `/${payload.path}`,
                method: payload.method,
                data: payload.data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['externalFeedback']
        })
    })
});

export const { useGetExternalFeedbackQuery, usePostExternalFeedbackMutation } = externalFeedbackApi;
