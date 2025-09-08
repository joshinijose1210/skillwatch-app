import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';
import { createUrlWithParamsTypes } from '@utils/types/types';

export const SuggestionPendingCount = createApi({
    reducerPath: 'SuggestionPendingCount',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.suggestionPendingCount
    }),
    tagTypes: ['suggestionPendingCount'],
    endpoints: builder => ({
        getSuggestionPendingCount: builder.query<{ pendingSuggestions: number }, createUrlWithParamsTypes>({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['suggestionPendingCount']
        })
    })
});

export const { useGetSuggestionPendingCountQuery } = SuggestionPendingCount;
