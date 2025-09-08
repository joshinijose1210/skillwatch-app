import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const suggestionApi = createApi({
    reducerPath: 'suggestionApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.suggestionListAddEdit
    }),
    tagTypes: ['suggestion'],

    endpoints: builder => ({
        getSuggestions: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['suggestion']
        }),

        postSuggestion: builder.mutation({
            query: payload => ({
                url: `/${payload.path}`,
                method: payload.method,
                data: payload.data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['suggestion']
        }),

        postSuggestionProgress: builder.mutation({
            query: payload => ({
                url: `${payload.url}`,
                method: 'PATCH',
                data: payload.data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['suggestion']
        })
    })
});

export const { useGetSuggestionsQuery, usePostSuggestionMutation, usePostSuggestionProgressMutation } = suggestionApi;
