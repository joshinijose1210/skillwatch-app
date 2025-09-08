import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { GoalProgressType } from './types';

export const previousGoalsActionItemsList = createApi({
    reducerPath: 'previousGoalsActionItemsList',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.previousGoalsActionItems
    }),
    tagTypes: ['previousGoalsActionItems'],
    endpoints: builder => ({
        getPreviousGoalActionItemTagsList: builder.query<GoalProgressType[], unknown>({
            query: () => ({ url: '/' }),
            providesTags: ['previousGoalsActionItems']
        })
    })
});

export const { useGetPreviousGoalActionItemTagsListQuery } = previousGoalsActionItemsList;
