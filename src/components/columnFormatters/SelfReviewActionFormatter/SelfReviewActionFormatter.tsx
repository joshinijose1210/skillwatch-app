import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { reviewStatusConstants } from '@constants/reviewStatusConstants';
import { TableColumnConfig, Text } from '@medly-components/core';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@slice';

export const SelfReviewActionFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const navigateTo = useNavigate();
    const userDetails = useAppSelector(state => state.user);
    const isReviewCycleActive = rowData?.isReviewCyclePublish;
    const status =
        !rowData?.isSelfReviewActive && !rowData?.publish && !rowData?.draft
            ? reviewStatusConstants.SelfReviewNotStarted
            : rowData?.isSelfReviewDatePassed && (!rowData?.publish || rowData?.draft)
            ? reviewStatusConstants.SelfReviewDatePassed
            : rowData?.isSelfReviewActive && !rowData?.draft && !rowData?.publish
            ? reviewStatusConstants.SelfReviewPending
            : rowData?.isSelfReviewActive && rowData?.draft && !rowData?.publish
            ? reviewStatusConstants.SelfReviewInProgress
            : reviewStatusConstants.SelfReviewSubmitted;

    const handleClick = () => {
        navigateTo(
            `${
                actionToShow !== 'View'
                    ? routeConstants.selfReviewPerformanceGuidelines
                    : `/performance-review/self-review/${rowData?.reviewCycle}/review-summary`
            }`,

            {
                state: {
                    ...rowData,
                    reviewFromId: userDetails.id,
                    reviewToId: userDetails.id,
                    action: actionToShow
                }
            }
        );
    };

    const actionToShow = useMemo(() => {
        if (rowData?.draft) {
            return 'Edit';
        } else if (rowData?.publish) {
            return 'View';
        } else if (rowData?.isSelfReviewActive) {
            return 'Add';
        } else {
            return 'N/A';
        }
    }, [rowData?.draft, rowData?.publish, rowData?.isSelfReviewActive]);

    return (rowData?.isSelfReviewActive || rowData?.publish) &&
        ((status === reviewStatusConstants.SelfReviewPending && isReviewCycleActive) ||
            (status === reviewStatusConstants.SelfReviewInProgress && isReviewCycleActive) ||
            status === reviewStatusConstants.SelfReviewSubmitted) ? (
        <ColumnActionText onClick={handleClick}>{actionToShow}</ColumnActionText>
    ) : (
        <Text>N/A</Text>
    );
};
