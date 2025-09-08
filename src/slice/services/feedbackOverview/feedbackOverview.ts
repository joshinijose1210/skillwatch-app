import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const feedbackOverviewApi = createApi({
    reducerPath: 'feedbackOverviewApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.feedbackOverview
    }),
    tagTypes: ['feedbackOverview'],

    endpoints: builder => ({
        getFeedbackOverview: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['feedbackOverview']
        })
    })
});

export const { useGetFeedbackOverviewQuery } = feedbackOverviewApi;
