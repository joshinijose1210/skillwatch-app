import { useAppSelector } from '@slice';
import { useGetFeedbackAnalyticsQuery, useGetReviewStatusAnalyticsQuery } from '@slice/services';
import customColors from '@theme/core/colors';
import { useMemo } from 'react';
import { reviewGraphKeys, reviewStatusGraphData, statusCategories } from './constants';
import { FeedbackPercentage, IBarGraphData, IReviewStatusDataEntries } from './types';

export const usePieChartTile = (reviewCycleId: string) => {
    const userDetails = useAppSelector(state => state.user);

    const { data: chartData, isLoading: loadingGraphData } = useGetFeedbackAnalyticsQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewCycleId', value: reviewCycleId }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const { data: reviewStatusData, isLoading: loadingReviewStatusData } = useGetReviewStatusAnalyticsQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewCycleId', value: reviewCycleId }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const feedbackGraphData = useMemo(() => {
        const categories: (keyof FeedbackPercentage)[] = ['positive', 'improvement', 'appreciation'];

        const feedbackCounts = chartData?.analyticsFeedbackCount;
        const feedbackPercentages = chartData?.analyticsFeedbackPercentage;

        if (
            feedbackCounts &&
            feedbackPercentages &&
            Object.values(feedbackCounts).some((val: number) => val > 0) &&
            Object.values(feedbackPercentages).some((val: number) => val > 0)
        ) {
            return categories.map(category => {
                const labelPercentage = `${feedbackPercentages[category].toFixed(1)}`;
                const labelValue = feedbackCounts[category];
                return {
                    label: `${labelPercentage}%`,
                    id: category.charAt(0).toUpperCase() + category.slice(1),
                    value: labelValue,
                    color: (customColors as any)[category.toLowerCase()]
                };
            });
        }

        return [
            {
                label: '0%',
                id: 'No Data',
                value: 1,
                color: '#cfd4dc'
            }
        ];
    }, [chartData]);

    const reviewStatusGraph = useMemo((): IBarGraphData => {
        const graphData: IBarGraphData = {
            keys: statusCategories,
            data: reviewStatusGraphData
        };
        if (reviewStatusData && Object.entries(reviewStatusData).length) {
            graphData.data = [];
            Object.entries(reviewStatusData).forEach((item: IReviewStatusDataEntries) => {
                const key = reviewGraphKeys[item[0]];
                graphData.data.push({
                    reviewStatus: key,
                    ...(item[1] || {})
                });
            });
        }
        return graphData;
    }, [reviewStatusData]);

    return {
        feedbackGraphData,
        loadingGraphData,
        reviewStatusGraph,
        loadingReviewStatusData
    };
};
