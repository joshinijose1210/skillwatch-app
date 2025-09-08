import apiUrls from '@constants/apiUrls';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

const IS_TEST_ENV = process.env.NODE_ENV && process.env.NODE_ENV === 'test' ? true : false;
export const resendMailApi = createApi({
    reducerPath: 'resendMailApi',

    baseQuery: IS_TEST_ENV
        ? axiosBaseQuery({
              baseUrl: apiUrls.resendMail
          })
        : fetchBaseQuery({
              baseUrl: apiUrls.resendMail
          }),
    tagTypes: ['resendMail'],

    endpoints: builder => ({
        getResendMail: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['resendMail']
        })
    })
});

export const { useGetResendMailQuery } = resendMailApi;
