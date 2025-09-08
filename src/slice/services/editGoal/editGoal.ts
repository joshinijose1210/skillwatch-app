import { ErrorType } from '@common';
import apiUrls from '@constants/apiUrls';
import { ActionItem, ProgressId } from '@pages/ViewPreviousGoals/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';
import { createUrlWithParamsTypes } from '@utils/types/types';

export const editGoalApi = createApi({
    reducerPath: 'editGoalApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.goalItemEdit
    }),
    tagTypes: ['editGoal', 'dashboardActionItems'],
    endpoints: builder => ({
        patchGoalItem: builder.mutation<ActionItem | ErrorType, createUrlWithParamsTypes & { progressId: ProgressId }>({
            query: payload => ({
                url: createUrlWithParams(payload),
                data: JSON.stringify({ progressId: payload.progressId }),
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['editGoal', 'dashboardActionItems']
        })
    })
});

export const { usePatchGoalItemMutation } = editGoalApi;
