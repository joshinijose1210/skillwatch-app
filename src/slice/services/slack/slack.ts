import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const slackApi = createApi({
    reducerPath: 'slackApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.slack
    }),
    tagTypes: ['slack'],
    endpoints: builder => ({
        postSlackCode: builder.mutation({
            query: payload => ({
                url: '/access-token',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        }),
        getSlackConnectedStatus: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) })
        }),
        postDisconnectSlack: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'PATCH',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        })
    })
});
export const { useGetSlackConnectedStatusQuery, usePostSlackCodeMutation, usePostDisconnectSlackMutation } = slackApi;
