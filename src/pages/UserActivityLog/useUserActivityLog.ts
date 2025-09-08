import { useAppSelector } from '@slice';
import { useGetUserActivityLogsQuery } from '@slice/services';
import { useState } from 'react';

export const useUserActivityLog = () => {
    const [activePage, setActivePage] = useState(1);
    const userDetails = useAppSelector(state => state.user);
    const handlePageChange = (page: number) => setActivePage(page);
    const { data, isFetching: isLoading } = useGetUserActivityLogsQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'limit', value: '10' },
                {
                    name: 'page',
                    value: activePage
                }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    return {
        handlePageChange,
        activePage,
        data,
        isLoading
    };
};
