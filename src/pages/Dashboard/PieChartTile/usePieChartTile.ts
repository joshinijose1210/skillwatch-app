import { useAppSelector } from '@slice';
import { useGetFeedbackPercentageQuery } from '@slice/services/chart';
import customColors from '@theme/core/colors';
import { useCallback, useEffect, useState } from 'react';
import { dataCategories } from './constants';
import { CategoriesType, GraphDataStateType, NoCountStateType } from './types';

export const usePieChartTile = () => {
    const userDetails = useAppSelector(state => state.user);
    const reviewCycle = useAppSelector(state => state.dashboardReviewFilter.reviewCycle);
    const [data, setData] = useState<GraphDataStateType>({
        submittedGraphData: [],
        receivedGraphData: []
    });
    const [noData, setNoData] = useState<NoCountStateType>({
        received: false,
        submitted: false
    });

    const { data: chartData, isSuccess } = useGetFeedbackPercentageQuery(
        {
            path: 'feedback-graph',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'id', value: userDetails.id },
                { name: 'reviewCycleId', value: reviewCycle }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const graphDataFormatter = useCallback(
        (type: string) => {
            const { feedbackCounts, feedbackPercentages } = chartData;
            return dataCategories.map((category: CategoriesType) => {
                const labelPercentage = `${feedbackPercentages[`${type}${category}Percentage`].toFixed(1)}`;
                const afterDecimalValue = parseInt(labelPercentage.split('.')[1]);
                const beforeDecimalValue = parseInt(labelPercentage.split('.')[0]);
                return {
                    label: `${beforeDecimalValue}${afterDecimalValue > 0 ? `.${afterDecimalValue}` : ''}%`,
                    id: category,
                    value: parseInt(feedbackCounts[`${type}${category}Count`]),
                    color: (customColors as any)[category.toLowerCase()]
                };
            });
        },
        [chartData]
    );

    useEffect(() => {
        if (chartData && isSuccess) {
            const { feedbackCounts } = chartData;
            const noDataObj: any = {};
            const graphDataObj: any = {};
            ['received', 'submitted'].forEach(type => {
                const hasZeroCount = Object.keys(feedbackCounts)
                    .filter(key => key.includes(type))
                    .every(key => feedbackCounts[key] === 0);
                graphDataObj[`${type}GraphData`] = hasZeroCount
                    ? [
                          {
                              label: `0%`,
                              id: 'No Data',
                              value: 1,
                              color: '#cfd4dc'
                          }
                      ]
                    : graphDataFormatter(type);
                noDataObj[type] = hasZeroCount;
            });

            setNoData(noDataObj);
            setData(graphDataObj);
        } else {
            setData(() => {
                const emptyData = [
                    {
                        label: `0%`,
                        id: 'No Data',
                        value: 1,
                        color: '#cfd4dc'
                    }
                ];
                setNoData({ received: true, submitted: true });
                return { submittedGraphData: emptyData, receivedGraphData: emptyData };
            });
        }
    }, [chartData, graphDataFormatter, isSuccess]);
    return {
        data,
        noData
    };
};
