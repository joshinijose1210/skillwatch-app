import apiUrls from '@constants/apiUrls';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { LoginResponse } from './types';

const IS_TEST_ENV = process.env.NODE_ENV && process.env.NODE_ENV === 'test' ? true : false;
export const authenticationApi = createApi({
    reducerPath: 'authenticationApi',

    baseQuery: IS_TEST_ENV
        ? axiosBaseQuery({
              baseUrl: apiUrls.login
          })
        : fetchBaseQuery({
              baseUrl: apiUrls.login
          }),
    // baseQuery: fetchBaseQuery({
    //     baseUrl: apiUrls.login
    // }),
    tagTypes: ['authentication'],

    endpoints: builder => ({
        getAccessToken: builder.mutation<LoginResponse, any>({
            query: payload => ({
                url: payload.path,
                method: 'POST',
                body: payload.data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        })
    })
});

export const { useGetAccessTokenMutation } = authenticationApi;
