import apiUrls from '@constants/apiUrls';
import { SingleFeedbackResponse } from '@pages/RequestedFeedback/RequestedFeedbackForm/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';
import { createUrlWithParamsTypes } from '@utils/types/types';

export const singleRequestedFeedbackApi = createApi({
    reducerPath: 'singleRequestedFeedback',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.singleRequestedFeedback
    }),
    tagTypes: ['singleRequestedFeedback'],

    endpoints: builder => ({
        getSingleRequestedFeedback: builder.query<SingleFeedbackResponse, createUrlWithParamsTypes>({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['singleRequestedFeedback']
        })
    })
});

export const { useGetSingleRequestedFeedbackQuery } = singleRequestedFeedbackApi;
