import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';

export const markFeedbackReceievedAsReadApi = createApi({
    reducerPath: 'markFeedbackReceievedAsReadApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.markFeedbackReceievedAsRead
    }),
    tagTypes: ['markFeedbackReceievedAsRead'],

    endpoints: builder => ({
        postMarkFeedbackReceievedAsRead: builder.mutation({
            query: payload => ({
                url: `/${payload.path}`, // append final URL as `/:srNo/mark-read` - srNo is the id of the feeedback
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        })
    })
});

export const { usePostMarkFeedbackReceievedAsReadMutation } = markFeedbackReceievedAsReadApi;
