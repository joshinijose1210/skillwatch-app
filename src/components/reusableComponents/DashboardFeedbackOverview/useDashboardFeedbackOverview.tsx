import { routeConstants } from '@constants';
import { useAppSelector } from '@slice';
import { useGetFeedbackOverviewQuery } from '@slice/services';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useDashboardFeedbackOverview = () => {
    const userDetails = useAppSelector(state => state.user);
    const [feedbackOverview, setFeedbackOverview] = useState<{ [key: string]: any }>({});

    const { data, isLoading } = useGetFeedbackOverviewQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'id', value: userDetails.id }
            ]
        },
        {
            refetchOnMountOrArgChange: true
        }
    );

    useEffect(() => {
        data && data[0] && data[0].startDate && setFeedbackOverview(data[0]);
    }, [data]);

    const navigate = useNavigate();

    const handleViewAll = () => {
        navigate(routeConstants.receivedFeedback);
    };
    return { feedbackOverview, handleViewAll, isLoading };
};
