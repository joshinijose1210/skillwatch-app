import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const mutateEmployee = createApi({
    reducerPath: 'employeeList',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.mutateEmployeeList
    }),

    tagTypes: ['employees'],

    endpoints: builder => ({
        addNewEmployee: builder.mutation({
            query: payload => ({
                url: `/${payload.path}`,
                method: 'POST',
                data: payload.data.updatedDetails,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        }),
        getEmployeeTemplate: builder.query({
            query: payload => ({
                url: createUrlWithParams(payload)
            })
        }),

        addBulkEmployee: builder.mutation<any, FormData>({
            query: payload => ({
                url: '/upload',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryH5HxJMw81PbLGByv'
                }
            })
        }),

        editEmployee: builder.mutation({
            query: payload => ({
                url: `/${payload.path}`,
                method: 'PUT',
                data: payload.data.updatedDetails,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        })
    })
});

export const { useAddNewEmployeeMutation, useAddBulkEmployeeMutation, useGetEmployeeTemplateQuery, useEditEmployeeMutation } =
    mutateEmployee;
