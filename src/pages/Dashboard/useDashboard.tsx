import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useAppDispatch, useAppSelector } from '@slice';
import { useGetFeedbackOverviewQuery, usePostOnboardingFlowMutation } from '@slice/services';
import { addUser } from '@slice/user';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useDashboard = () => {
    const userDetails = useAppSelector(state => state.user);
    const { data, isLoading } = useGetFeedbackOverviewQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'id', value: userDetails.id }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const dispatch = useAppDispatch();

    const [changeOnboardingFlow, { isLoading: isOnboardingLoading, error: isOnboardingError, isSuccess: isOnboardingSuccess }] =
        usePostOnboardingFlowMutation();

    const [modalState, setModalState] = useState(false);
    useEffect(() => {
        // if onboardingFlow is completed -> true, initially its false for everyone
        if (!userDetails?.onboardingFlow && userDetails.roleName.toLowerCase().trim() === 'org admin') {
            const timer = setTimeout(() => {
                setModalState(true);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [userDetails?.onboardingFlow, userDetails.roleName]);

    useEffect(() => {
        if (isOnboardingError) {
            addToast({
                variant: 'error',
                header: 'Something went wrong',
                timer: 3000
            });
        } else if (!isOnboardingLoading && isOnboardingSuccess) {
            dispatch(
                addUser({
                    ...userDetails,
                    onboardingFlow: true
                })
            );
            setModalState(false);
        }
    }, [isOnboardingError, isOnboardingSuccess]);

    const navigate = useNavigate();

    const toggleModal = () => setModalState(prev => !prev);

    const handleGiveFeedback = () => {
        navigate(routeConstants.newFeedbackFromDashboard, { state: { action: 'Add' } });
    };

    const handleGiveSelfReview = () => {
        navigate(routeConstants.selfReviewFromDashboard);
    };

    const handleOnboardingDone = () => {
        changeOnboardingFlow({
            path: userDetails.id,
            data: { id: userDetails.id, organisationId: userDetails.organisationId, onboardingFlow: true }
        });
    };

    return {
        data,
        isLoading,
        userDetails,
        modalState,
        handleGiveFeedback,
        handleGiveSelfReview,
        toggleModal,
        handleOnboardingDone
    };
};
