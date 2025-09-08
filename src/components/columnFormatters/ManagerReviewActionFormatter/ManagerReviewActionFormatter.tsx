import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { TableColumnConfig, Text } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
export const ManagerReviewActionFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const navigateTo = useNavigate();
    const userDetails = useAppSelector(state => state.user);
    const isReviewCycleActive = rowData?.isReviewCyclePublish && rowData?.isReviewCycleActive;

    const status = useMemo(() => {
        switch (true) {
            case !rowData?.isManagerReviewActive &&
                isReviewCycleActive &&
                (!rowData?.publish || !rowData.draft) &&
                !rowData?.isManagerReviewDatePassed:
                return 'Manager Review not started';
            case !rowData?.isManagerReviewActive && rowData?.isManagerReviewDatePassed && !rowData?.publish:
                return 'Manager Review date passed';
            case rowData?.isManagerReviewActive && !rowData?.draft && !rowData?.publish:
                return 'Manager Review pending';
            case rowData?.isManagerReviewActive && rowData?.draft && !rowData?.publish:
                return 'Manager Review in progress';
            case rowData?.publish:
                return 'Manager Review submitted';
        }
    }, [rowData, isReviewCycleActive]);

    const { modulePermission } = useAppSelector(state => state.user);

    const actionToShow = useMemo(() => {
        let action = '';
        const module = modulePermission?.find(module => module.moduleName === 'Reviews for Team Members');
        if (rowData?.reviewToId === userDetails.id) {
            action = 'View';
        } else if (module) {
            action = module.edit ? (rowData?.publish ? 'View' : rowData?.draft ? 'Edit' : 'Add') : 'View';
        }

        return action;
    }, [modulePermission, rowData?.draft, rowData?.publish, rowData?.reviewToId, userDetails.id]);

    const handleClick = () => {
        navigateTo(
            userDetails.id !== rowData?.reviewToId
                ? actionToShow !== 'View'
                    ? `${routeConstants.managerReviewPerformanceGuidelines}`
                    : `/performance-review/team's-review/${rowData?.reviewCycle}/review-summary`
                : `${routeConstants.myManagerReview}/${rowData?.reviewCycle}/review-summary`,
            {
                state: {
                    ...rowData,
                    firstManagerId: rowData?.reviewFromId,
                    reviewToId: rowData?.reviewToId,
                    action: actionToShow
                }
            }
        );
    };

    return ((status === 'Manager Review in progress' && isReviewCycleActive) ||
        (status === 'Manager Review pending' && isReviewCycleActive) ||
        status === 'Manager Review submitted') &&
        rowData?.reviewToId !== userDetails.id ? (
        <ColumnActionText onClick={handleClick}>{actionToShow}</ColumnActionText>
    ) : status === 'Manager Review submitted' && rowData?.reviewToId === userDetails.id ? (
        <ColumnActionText onClick={handleClick}>{actionToShow}</ColumnActionText>
    ) : (
        <Text textVariant="body2">N/A</Text>
    );
};
