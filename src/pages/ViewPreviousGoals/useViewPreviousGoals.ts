import { useAppSelector } from '@slice';
import { useGetPreviousGoalActionItemsQuery } from '@slice/services/previousGoalCycles';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ViewTeamFeedbackState } from './types';

export const useViewPreviousGoals = () => {
    const userDetails = useAppSelector(state => state.user);
    const [activeTab, setActiveTab] = useState(1);
    const navigateTo = useNavigate(),
        state = useLocation().state as ViewTeamFeedbackState;

    const { data, isLoading, refetch } = useGetPreviousGoalActionItemsQuery({
        path: '',
        params: [
            { name: 'organisationId', value: userDetails.organisationId },
            { name: 'reviewToId', value: state.employeeId },
            { name: 'reviewCycleId', value: state.reviewCycleId }
        ]
    });

    const handleBackClick = () => {
        navigateTo(-1);
    };

    const onChangeHandle = (id: number) => setActiveTab(id);

    return {
        data,
        isLoading,
        activeTab,
        handleBackClick,
        onChangeHandle,
        refetchPreviousGoalsOnEditSuccess: refetch
    };
};
