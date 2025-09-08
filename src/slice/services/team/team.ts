import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';
import { createUrlWithParams } from '@utils/createUrlWithParams';

export const teamApi = createApi({
    reducerPath: 'teamApi',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.teams
    }),
    tagTypes: ['teams'],

    endpoints: builder => ({
        getTeams: builder.query({
            query: payload => ({ url: createUrlWithParams(payload) }),
            providesTags: ['teams']
        }),

        postTeam: builder.mutation({
            query: payload => ({
                url: '/',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['teams']
        }),

        editTeam: builder.mutation({
            query: payload => ({
                url: `/${payload.path}`,
                method: 'PUT',
                data: payload.body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['teams']
        }),
        getTeamsData: builder.mutation({
            query: payload => {
                return {
                    url: createUrlWithParams(payload),
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                };
            }
        })
    })
});

export const { useGetTeamsQuery, usePostTeamMutation, useEditTeamMutation, useGetTeamsDataMutation } = teamApi;
