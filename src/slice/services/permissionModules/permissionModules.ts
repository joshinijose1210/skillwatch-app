import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const permissionModulesApi = createApi({
    reducerPath: 'permissionModulesApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.permissionModules
    }),
    tagTypes: ['permissionModules'],

    endpoints: builder => ({
        getPermissionModules: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['permissionModules']
        })
    })
});

export const { useGetPermissionModulesQuery } = permissionModulesApi;
