import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const domainList = createApi({
    reducerPath: 'domainList',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.domainList
    }),

    tagTypes: ['domains'],

    endpoints: builder => ({
        getDomainList: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['domains']
        }),
        addDomainRequest: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['domains']
        })
    })
});

export const { useGetDomainListQuery, useAddDomainRequestMutation } = domainList;
