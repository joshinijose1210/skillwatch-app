import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const kpiApi = createApi({
    reducerPath: 'kpiApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.kpi
    }),
    tagTypes: ['kpi'],

    endpoints: builder => ({
        getKpis: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['kpi']
        }),

        postKpi: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['kpi']
        }),

        addBulkKpi: builder.mutation<any, FormData>({
            query: payload => ({
                url: '/bulk-import',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryH5HxJMw81PbLGByv'
                }
            }),
            invalidatesTags: ['kpi']
        }),

        editKpi: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'PATCH',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['kpi']
        })
    })
});

export const { useGetKpisQuery, usePostKpiMutation, useAddBulkKpiMutation, useEditKpiMutation } = kpiApi;
