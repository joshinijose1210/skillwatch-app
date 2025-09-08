import { RatingChartData } from '@constants/data';
import { useAppSelector } from '@slice';
import { useGetChartApiQuery } from '@slice/services/chart';
import { useEffect, useState } from 'react';

export const useLineChartTile = () => {
    const userDetails = useAppSelector(state => state.user);
    const reviewCycle = useAppSelector(state => state.dashboardReviewFilter.reviewCycle);
    const [checkInGraphData, setCheckInGraphData] = useState<any>([]);
    const [lineGraphData, setLineGraphData] = useState({
        avgSelfReviewRating: 0,
        avgFirstManagerRating: 0,
        avgSecondManagerReviewRating: 0,
        avgCheckInReviewRating: 0
    });
    const {
        data: chartData,
        isSuccess,
        isLoading: loadingCycles
    } = useGetChartApiQuery(
        {
            path: 'average-ratings',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewToId', value: userDetails.id },
                { name: 'reviewCycleId', value: reviewCycle }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (chartData && Object.keys(chartData).length !== 0 && isSuccess) {
            const ratingData = RatingChartData[(Math.floor(chartData.avgCheckInReviewRating) || 1) - 1];
            ratingData.value = (360 / 5) * chartData.avgCheckInReviewRating;
            const initialColor = {
                id: '',
                label: 'initial',
                value: 360 - ratingData.value,
                color: '#cfd4dc'
            };
            setCheckInGraphData([initialColor, ratingData]);
            setLineGraphData(chartData);
        } else {
            const initialColor = {
                id: '',
                label: 'initial',
                value: 360,
                color: '#cfd4dc'
            };

            setLineGraphData({
                avgSelfReviewRating: 0,
                avgFirstManagerRating: 0,
                avgSecondManagerReviewRating: 0,
                avgCheckInReviewRating: 0
            });
            setCheckInGraphData([initialColor]);
        }
    }, [chartData, setCheckInGraphData, isSuccess]);
    return {
        loadingCycles,
        lineGraphData,

        checkInGraphData
    };
};
