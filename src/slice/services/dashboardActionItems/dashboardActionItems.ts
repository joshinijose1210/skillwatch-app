import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const dashboardActionItemApi = createApi({
    reducerPath: 'dashboardActionItemApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.dashboardActionItems
    }),
    tagTypes: ['dashboardActionItems'],

    endpoints: builder => ({
        getActionItems: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['dashboardActionItems']
        })
    })
});

export const { useGetActionItemsQuery } = dashboardActionItemApi;
