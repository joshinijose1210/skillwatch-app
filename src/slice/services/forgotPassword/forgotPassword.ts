import apiUrls from '@constants/apiUrls';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

const IS_TEST_ENV = process.env.NODE_ENV && process.env.NODE_ENV === 'test' ? true : false;
export const forgotPasswordApi = createApi({
    reducerPath: 'forgotPasswordApi',
    baseQuery: IS_TEST_ENV
        ? axiosBaseQuery({
              baseUrl: apiUrls.root
          })
        : fetchBaseQuery({
              baseUrl: apiUrls.root
          }),
    tagTypes: ['forgotPasswordApi'],

    endpoints: builder => ({
        // TODO: check if this is really required and update later
        getKras: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['forgotPasswordApi']
        }),

        checkLinkValidity: builder.query({
            query: payload => ({
                url: `/check-link-validity?linkId=${payload.id}`
            })
        }),

        forgotPasswordApi: builder.mutation({
            query: payload => ({
                url: '/reset-password-email',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['forgotPasswordApi']
        }),

        setPassword: builder.mutation({
            query: payload => ({
                url: '/set-password/',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        })
    })
});

export const { useForgotPasswordApiMutation, useCheckLinkValidityQuery, useSetPasswordMutation } = forgotPasswordApi;
