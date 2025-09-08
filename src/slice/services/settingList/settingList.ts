import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const settingList = createApi({
    reducerPath: 'settingList',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.settingList
    }),

    tagTypes: ['settings'],

    endpoints: builder => ({
        getSettingList: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            }),
            providesTags: ['settings']
        }),
        updateSettingRequest: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'PUT',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['settings']
        })
    })
});

export const { useGetSettingListQuery, useUpdateSettingRequestMutation } = settingList;
