import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const kraApi = createApi({
    reducerPath: 'kraApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.kra
    }),
    tagTypes: ['kra'],

    endpoints: builder => ({
        getKras: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['kra']
        }),
        postKra: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'PUT',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['kra']
        }),
        editKra: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'PATCH',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['kra']
        })
    })
});

export const { useGetKrasQuery, useEditKraMutation, usePostKraMutation } = kraApi;
