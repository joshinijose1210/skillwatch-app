import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import apiInstance from './api';

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string;
            method?: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
            headers?: AxiosRequestConfig['headers'];
            params?: AxiosRequestConfig['params'];
        },
        unknown,
        unknown
    > =>
    async ({ url, method = 'GET', data, headers, params }) => {
        try {
            const token =
                process.env.NODE_ENV && process.env.NODE_ENV === 'test'
                    ? 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYW1pci5pc2xhbUBzY2FsZXJlYWwuY29tIiwibmJmIjoxNjk0NDA3NzQzLCJyb2xlcyI6WyJPUkcgQURNSU4iXSwiaX'
                    : '';
            if (token) {
                apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                const accessToken = JSON.parse(localStorage.getItem('token') as string).access_token;
                apiInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            }
            // commented as of now, used for writing test cases
            // console.log(method, baseUrl + url);
            const result = await apiInstance({
                url: `${baseUrl}${url}`,
                method,
                data,
                params,
                headers
            });
            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message
                }
            };
        }
    };
