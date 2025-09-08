import { useAppSelector } from '@slice';
import { useGetRankingsAnalyticsQuery } from '@slice/services';

export const useRankings = (reviewCycleId: string) => {
    const userDetails = useAppSelector(state => state.user);
    const { data: rankings, isLoading: isLoading } = useGetRankingsAnalyticsQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewCycleId', value: reviewCycleId }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    return {
        rankings,
        isLoading
    };
};
