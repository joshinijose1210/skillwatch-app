import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const genderListApi = createApi({
    reducerPath: 'genderListApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.genderList
    }),

    tagTypes: ['gender'],

    endpoints: builder => ({
        getGenderList: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['gender']
        })
    })
});

export const { useGetGenderListQuery } = genderListApi;
