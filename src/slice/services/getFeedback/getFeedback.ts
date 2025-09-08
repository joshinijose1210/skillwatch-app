import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummy.com/feedback' }),
    tagTypes: ['Feedback'],

    endpoints: builder => ({
        getFeedback: builder.query({
            query: payload => createUrlWithParams(payload)
        })
    })
});

export const { useGetFeedbackQuery } = feedbackApi;
