import { useAllOrganisationsQuery } from '@slice/services';
import { useState } from 'react';

export const useOrganisations = () => {
    const [activePage, setActivePage] = useState(1);
    const handlePageChange = (page: number) => setActivePage(page);
    const { data, isFetching: isLoading } = useAllOrganisationsQuery(
        {
            path: 'fetchAll',
            params: [
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
