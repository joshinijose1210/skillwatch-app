import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const weightedScoreApi = createApi({
    reducerPath: 'weightedScoreApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.weightedScore
    }),
    tagTypes: ['weightedScore'],

    endpoints: builder => ({
        getweightedScore: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['weightedScore']
        })
    })
});

export const { useGetweightedScoreQuery } = weightedScoreApi;
