import apiUrls from '@constants/apiUrls';
import { PreviousGoalActionItemsResponse } from '@pages/ViewPreviousGoals/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';
import { createUrlWithParamsTypes } from '@utils/types/types';

export const previousGoalActionItemsAPI = createApi({
    reducerPath: 'previousGoalsActionItemsAPI',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.previousGoalCycles
    }),
    tagTypes: ['previousGoalActionItems'],

    endpoints: builder => ({
        getPreviousGoalActionItems: builder.query<PreviousGoalActionItemsResponse, createUrlWithParamsTypes>({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['previousGoalActionItems']
        })
    })
});

export const { useGetPreviousGoalActionItemsQuery } = previousGoalActionItemsAPI;
