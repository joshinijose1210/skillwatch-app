import apiUrls from '@constants/apiUrls';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/axiosBaseQuery';

export const tagsList = createApi({
    reducerPath: 'tagsList',
    baseQuery: axiosBaseQuery({
        baseUrl: apiUrls.tags
    }),

    endpoints: builder => ({
        getTagsList: builder.query({
            query: () => ({ url: '/' })
        })
    })
});

export const { useGetTagsListQuery } = tagsList;
