import { useGetPreviousGoalActionItemTagsListQuery, usePatchGoalItemMutation } from '@slice/services';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GoalModalProps, ProgressId } from '../types';
import { useAppDispatch, useAppSelector } from '@slice';
import { closeGoalModal } from '@slice/goalModalSlice';
import { ErrorType } from '@common';
import { addToast } from '@medly-components/core';

const useGoalsModal = ({ refetchData }: GoalModalProps) => {
    const { id: goalId, progressId: initialProgressId } = useAppSelector(state => state.goalModal);
    const dispatch = useAppDispatch();
    const [progressId, setProgressId] = useState<ProgressId>(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [updateGoal, { error: response, isLoading: progressLoading, isSuccess, isError }] = usePatchGoalItemMutation();

    const { data } = useGetPreviousGoalActionItemTagsListQuery({});

    const handleProgressIdChange = (progressId: ProgressId) => {
        setProgressId(progressId);
    };
    const goalModalData = useAppSelector(state => state.goalModal);

    const submitUpdateGoal = () => {
        updateGoal({ path: goalModalData.id.toString(), params: [], progressId });
    };

    const closeModal = useCallback(() => {
        setModalOpen(false);
        dispatch(closeGoalModal());
    }, [dispatch]);

    useEffect(() => {
        if (goalId !== -99) {
            setModalOpen(true);
            setProgressId(initialProgressId);
        }
    }, [goalId, initialProgressId]);

    useEffect(() => {
        if (isSuccess) {
            addToast({
                variant: 'success',
                header: 'Goal progress updated successfully!',
                timer: 3000
            });
            refetchData();
            setModalOpen(false);
            dispatch(closeGoalModal());
        } else if (isError) {
            const error = (response as ErrorType)?.data?.errorMessage;
            addToast({
                variant: 'error',
                header: error || 'Something went wrong!',
                timer: 3000
            });
        }
    }, [dispatch, isError, isSuccess, refetchData, response]);

    const progressOptions = useMemo(() => (data ? data?.map(item => ({ value: item.progressId, label: item.progressName })) : []), [data]);

    return { progressId, progressOptions, goalModalData, progressLoading, handleProgressIdChange, submitUpdateGoal, modalOpen, closeModal };
};

export default useGoalsModal;
