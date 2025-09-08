import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const companyInfoApi = createApi({
    reducerPath: 'companyInfoApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.organisation
    }),
    tagTypes: ['companyInfo', 'companyInfoConfiguration', 'companyLogo'],

    endpoints: builder => ({
        // TODO: check if this is really required in companyinfo page and update later
        getKras: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['companyInfo']
        }),

        postCompanyInfoData: builder.mutation({
            query: payload => ({
                url: '',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['companyInfo']
        }),

        getCompanyInfo: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['companyInfoConfiguration']
        }),

        getCompanyLogo: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            keepUnusedDataFor: 0.0001,
            providesTags: ['companyLogo']
        }),
        removeCompanyLogo: builder.mutation({
            query: payload => ({
                url: `/logo/${payload}`,
                method: 'PATCH',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['companyLogo']
        }),
        putCompanyInfoData: builder.mutation({
            query: payload => ({
                url: `/${payload.id}`,
                method: 'PUT',
                data: payload.data,
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }),
            invalidatesTags: ['companyInfoConfiguration', 'companyLogo']
        })
    })
});

export const {
    usePostCompanyInfoDataMutation,
    useGetCompanyInfoQuery,
    usePutCompanyInfoDataMutation,
    useRemoveCompanyLogoMutation,
    useGetCompanyLogoQuery
} = companyInfoApi;
