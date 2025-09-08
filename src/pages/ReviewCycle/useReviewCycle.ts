import { routeConstants } from '@constants';
import { useAppSelector } from '@slice';
import { useGetCyclesQuery } from '@slice/services';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReviewCycleColType, ReviewCycleType } from './types';

export const useReviewCycle = () => {
    const userDetails = useAppSelector(state => state.user);
    const [activePage, setActivePage] = useState(1);
    const { data, isFetching: isLoading } = useGetCyclesQuery({
        path: 'getAll',
        params: [
            { name: 'page', value: activePage },
            { name: 'organisationId', value: userDetails.organisationId },
            { name: 'limit', value: 10 }
        ]
    });
    const handlePageChange = (page: number) => setActivePage(page);
    const [columnData, setColumnData] = useState<ReviewCycleColType[]>([]);
    const navigateTo = useNavigate();

    const navigateToForm = () =>
        navigateTo(routeConstants.addReviewCycle, {
            state: {
                action: 'Add'
            }
        });

    useEffect(() => {
        if (data && data.reviewCycles) {
            const formattedData = data.reviewCycles.map((cycle: ReviewCycleType) => ({
                ...cycle,
                reviewCycle: `${format(new Date(cycle.startDate), 'do MMM yyyy')} - ${format(new Date(cycle.endDate), 'do MMM yyyy')}`,
                lastModified: cycle.lastModified
            }));
            setColumnData(formattedData);
        }
    }, [data]);

    return {
        columnData,
        navigateToForm,
        isLoading,
        activePage,
        handlePageChange,
        totalItems: data?.totalReviewCycles || 0
    };
};
