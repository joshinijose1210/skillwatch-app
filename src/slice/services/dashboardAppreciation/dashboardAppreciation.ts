import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const dashboardAppreciationApi = createApi({
    reducerPath: 'dashboardAppreciationApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.dashboardAppreciation
    }),
    tagTypes: ['dashboardAppreciation'],

    endpoints: builder => ({
        getAppreciations: builder.mutation({
            query: payload => ({ url: createUrlWithParams(payload) })
        })
    })
});

export const { useGetAppreciationsMutation } = dashboardAppreciationApi;
