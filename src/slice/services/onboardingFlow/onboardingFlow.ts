import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';

export const onboardingFlowApi = createApi({
    reducerPath: 'onboardingFlowApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.onboardingFlow
    }),
    tagTypes: ['onboardingFlow'],

    endpoints: builder => ({
        postOnboardingFlow: builder.mutation({
            query: payload => ({
                url: `/${payload.path}`,
                method: 'PUT',
                data: payload.data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        })
    })
});

export const { usePostOnboardingFlowMutation } = onboardingFlowApi;
