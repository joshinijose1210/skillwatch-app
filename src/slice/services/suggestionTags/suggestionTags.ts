import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';

export const SuggestionTagsList = createApi({
    reducerPath: 'SuggestionTagsList',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.suggestionTags
    }),

    endpoints: builder => ({
        getSuggestionTagsList: builder.query({
            query: () => ({ url: '/' })
        })
    })
});

export const { useGetSuggestionTagsListQuery } = SuggestionTagsList;
