import { ReviewCycleType } from '@pages/ReviewCycle/types';
import { AppState, useAppSelector } from '@slice';
import { useGetCyclesQuery } from '@slice/services';
import { format } from 'date-fns';
import { useState, useMemo } from 'react';

export const useSelfReview = () => {
    const [activePage, setActivePage] = useState(1),
        [activeTestPage, setActiveTestPage] = useState(1); // this is used only for testing

    const userDetails = useAppSelector((state: AppState) => state.user);
    const { reviewCycleList } = useAppSelector(state => state.reviewCycleFilter);
    const { data, isLoading } = useGetCyclesQuery(
        {
            path: 'self-review',
            params: [
                { name: 'reviewTypeId', value: 1 },
                { name: 'reviewToId', value: userDetails.id },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewFromId', value: userDetails.id },
                { name: 'page', value: activePage ?? activeTestPage },
                { name: 'limit', value: 10 },
                { name: 'reviewCycleId', value: reviewCycleList }
            ]
        },
        {
            refetchOnMountOrArgChange: true
        }
    );
    const handlePageChange = (page: number) => {
        setActiveTestPage(page);
        setActivePage(page);
    };

    const selfReviewCycles = useMemo(() => {
        if (data && data.reviewCycles && data.reviewCycles.length > 0) {
            return data.reviewCycles.map((cycle: ReviewCycleType) => {
                return {
                    ...cycle,
                    submittedDate: cycle.publish && cycle.updatedAt ? format(new Date(cycle.updatedAt), 'd/M/yyyy') : 'Not Submitted',
                    reviewCycle: `${format(new Date(cycle.startDate), 'do MMM yyyy')} - ${format(new Date(cycle.endDate), 'do MMM yyyy')}`
                };
            });
        } else {
            return [];
        }
    }, [data]);

    const count = useMemo(() => {
        if (data && data.reviewCycles && data.reviewCycles.length > 0) {
            return data.totalReviewCycles;
        } else {
            return 0;
        }
    }, [data]);

    return {
        selfReviewCycles,
        count,
        isLoading,
        activePage,
        handlePageChange
    };
};
