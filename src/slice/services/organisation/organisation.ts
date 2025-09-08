import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const organisationApi = createApi({
    reducerPath: 'organisation',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.organisation
    }),

    tagTypes: ['organisation'],

    endpoints: builder => ({
        allOrganisations: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['organisation']
        })
    })
});

export const { useAllOrganisationsQuery } = organisationApi;
