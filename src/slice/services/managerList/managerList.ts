import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const managerListApi = createApi({
    reducerPath: 'managerListApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.managersList
    }),

    tagTypes: ['managers'],

    endpoints: builder => ({
        getManagersList: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['managers']
        })
    })
});

export const { useGetManagersListQuery } = managerListApi;
