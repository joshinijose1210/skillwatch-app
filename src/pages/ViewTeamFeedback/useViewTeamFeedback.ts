import { useAppSelector } from '@slice';
import { useGetAppreciationsMutation } from '@slice/services/dashboardAppreciation';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FeedbackData, ViewTeamFeedbackState } from './types';

export const useViewTeamFeedback = () => {
    const userDetails = useAppSelector(state => state.user);
    const [tagId, setTagId] = useState(1);
    const [feedbackData, setFeedbackData] = useState<FeedbackData>({
        positiveFeedbackCount: 0,
        improvementFeedbackCount: 0,
        appreciationFeedbackCount: 0,
        totalFeedbacks: 0,
        feedbacks: []
    });

    const navigateTo = useNavigate(),
        state = useLocation().state as ViewTeamFeedbackState;
    const [getFeedback, { data, isSuccess, isLoading }] = useGetAppreciationsMutation();

    const handleBackClick = () => {
        navigateTo(-1);
    };

    useEffect(() => {
        if (isSuccess) {
            setFeedbackData(data);
        }
    }, [data, isSuccess]);

    const onChangeHandle = useCallback((id: string) => {
        setFeedbackData(prev => ({
            ...prev,
            feedbacks: []
        }));
        if (id === 'positive') {
            setTagId(1);
        } else if (id === 'improvement') {
            setTagId(2);
        } else {
            setTagId(3);
        }
    }, []);

    useEffect(() => {
        getFeedback({
            path: '',
            params: [
                { name: 'id', value: state && state.employeeId },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'feedbackTypeId', value: tagId },
                { name: 'reviewCycleId', value: state.reviewCycleId }
            ]
        });
    }, [state, getFeedback, tagId, userDetails.organisationId]);

    return {
        data,
        feedbackData,
        isLoading,
        state,
        handleBackClick,
        onChangeHandle
    };
};
