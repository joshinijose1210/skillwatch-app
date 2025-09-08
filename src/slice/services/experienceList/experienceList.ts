import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const experienceListApi = createApi({
    reducerPath: 'experienceListApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.experienceList
    }),

    tagTypes: ['experience'],

    endpoints: builder => ({
        getExperienceList: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['experience']
        })
    })
});

export const { useGetExperienceListQuery } = experienceListApi;
