import { RatingBadge } from '@components/reusableComponents/RatingsHeader/types';
import { useAppSelector } from '@slice';
import { useGetActiveEmployeeQuery, useGetEmployeesAnalyticsQuery, useGetEmployeesRatingsQuery } from '@slice/services';
import { useMemo } from 'react';

export const useReportsAnalytics = () => {
    const userDetails = useAppSelector(state => state.user);
    const reviewCycle = useAppSelector(state => state.analyticsReviewFilter.reviewCycle);

    const { data: employeesCount, isLoading: isCompanyInfoLoading } = useGetActiveEmployeeQuery(
        {
            path: 'get-all/by-review-cycle',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewCycleId', value: reviewCycle }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const { data: ratings, isLoading: isRatingsLoading } = useGetEmployeesRatingsQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewCycleId', value: reviewCycle }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const { data: analyticsData, isLoading: isAnalyticsDataLoading } = useGetEmployeesAnalyticsQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewCycleId', value: reviewCycle }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const ratingsInfo = useMemo(
        (): RatingBadge[] => [
            { rating: ratings?.unacceptable ?? 0, subTitle: 'Unsatisfactory', titleColor: '#BC1435', bgColor: '#F64D6E26' },
            { rating: ratings?.needsImprovement ?? 0, subTitle: 'Needs Improvement', titleColor: '#C0741A', bgColor: '#F2A14226' },
            { rating: ratings?.meetsExpectations ?? 0, subTitle: 'Meets Expectations', titleColor: '#29A016', bgColor: '#5CBE4C26' },
            { rating: ratings?.exceedsExpectations ?? 0, subTitle: 'Exceeds Expectations', titleColor: '#0D9887', bgColor: '#4ACEBE26' },
            { rating: ratings?.outstanding ?? 0, subTitle: 'Outstanding', titleColor: '#7557EF', bgColor: '#F0EDFF' }
        ],
        [ratings]
    );

    return {
        employeesCount,
        isCompanyInfoLoading,
        ratingsInfo,
        reviewCycle,
        ratings,
        isRatingsLoading,
        analyticsData,
        isAnalyticsDataLoading
    };
};
