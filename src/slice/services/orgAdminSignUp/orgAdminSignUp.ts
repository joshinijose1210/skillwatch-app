import apiUrls from '@constants/apiUrls';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
const IS_TEST_ENV = process.env.NODE_ENV && process.env.NODE_ENV === 'test' ? true : false;
import { Department } from '@pages/OrgAdminSignUp/CompanyInfo/types';

export const orgAdminSignUpApi = createApi({
    reducerPath: 'orgAdminSignUpApi',
    baseQuery: IS_TEST_ENV
        ? axiosBaseQuery({
              baseUrl: apiUrls.root
          })
        : fetchBaseQuery({
              baseUrl: apiUrls.root
          }),
    tagTypes: ['orgAdminSignUp'],

    endpoints: builder => ({
        getDefaultDepartments: builder.query<Department[], void>({
            query: () => ({ url: '/departments/default-setup' })
        }),
        getDefaultTeams: builder.query({
            query: departmentId => ({
                url: '/teams/default-setup',
                params: { departmentId }
            })
        }),
        getDefaultDesignations: builder.query({
            query: teamId => ({
                url: '/designation/default-setup',
                params: { teamId }
            })
        }),
        postOrgAdminSignUpData: builder.mutation({
            query: payload => ({
                url: '/user',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        }),
        addCompanyData: builder.mutation({
            query: payload => ({
                url: '/organisation',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        })
    })
});

export const {
    usePostOrgAdminSignUpDataMutation,
    useAddCompanyDataMutation,
    useGetDefaultDepartmentsQuery,
    useGetDefaultTeamsQuery,
    useGetDefaultDesignationsQuery
} = orgAdminSignUpApi;
