import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { reviewStatusConstants } from '@constants/reviewStatusConstants';
import { TableColumnConfig, Text } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export const CheckInReviewActionFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const navigateTo = useNavigate();
    const isReviewCycleActive = rowData?.isReviewCycleActive;

    const status = useMemo(() => {
        let reviewStatus;

        switch (true) {
            case rowData?.checkInDraft && rowData?.selfReviewPublish && rowData?.firstManagerReviewPublish:
                reviewStatus = reviewStatusConstants.CheckInWithManagerInProgress;
                break;
            case !rowData?.checkInPublish && rowData?.selfReviewPublish && rowData?.firstManagerReviewPublish:
                reviewStatus = reviewStatusConstants.CheckInWithManagerPending;
                break;
            case rowData?.checkInPublish && rowData?.selfReviewPublish && rowData?.firstManagerReviewPublish:
                reviewStatus = reviewStatusConstants.CheckInWithManagerCompleted;
                break;
            case rowData?.firstManagerReviewDraft && rowData?.selfReviewPublish:
                reviewStatus = reviewStatusConstants.Manager1ReviewInProgress;
                break;
            case !rowData?.firstManagerReviewPublish && rowData?.selfReviewPublish:
                reviewStatus = reviewStatusConstants.Manager1ReviewPending;
                break;
            case rowData?.firstManagerReviewPublish && rowData?.selfReviewPublish:
                reviewStatus = reviewStatusConstants.Manager1ReviewCompleted;
                break;
            case !rowData?.isCheckInWithManagerActive && rowData?.secondManagerReviewDraft && rowData?.selfReviewPublish:
                reviewStatus = reviewStatusConstants.Manager2ReviewInProgress;
                break;
            case !rowData?.isCheckInWithManagerActive && !rowData?.secondManagerReviewPublish && rowData?.selfReviewPublish:
                reviewStatus = reviewStatusConstants.Manager2ReviewPending;
                break;
            case !rowData?.isCheckInWithManagerActive && rowData?.secondManagerReviewPublish && rowData?.selfReviewPublish:
                reviewStatus = reviewStatusConstants.Manager2ReviewCompleted;
                break;
            case rowData?.selfReviewDraft:
                reviewStatus = reviewStatusConstants.SelfReviewInProgress;
                break;
            case !rowData?.selfReviewPublish:
                reviewStatus = reviewStatusConstants.SelfReviewPending;
                break;
            default:
                reviewStatus = reviewStatusConstants.SelfReviewCompleted;
                break;
        }
        return reviewStatus;
    }, [rowData]);

    const path = useLocation().pathname;
    const handleClick = () => {
        let navigateToPath = '/';
        if (path.includes(routeConstants.checkInWithTeamMember)) {
            if (actionToShow === 'View') {
                navigateToPath = `${routeConstants.checkInWithTeamMember}/${rowData?.reviewCycle}/review-summary`;
            } else {
                navigateToPath = `${routeConstants.checkInWithTeamMemberPerformanceGuidelines}`;
            }
        } else if (path.includes(routeConstants.performanceReview)) {
            if (actionToShow === 'View') {
                navigateToPath = `${routeConstants.performanceReview}/${rowData?.reviewCycle}/review-summary`;
            } else {
                navigateToPath = `${routeConstants.performanceReviewPerformanceGuidelines}`;
            }
        } else {
            // this is null because manager-check-in page action will only be view for an employee so it will route to review summary screen
            return null;
        }
        navigateTo(navigateToPath, {
            state: {
                ...rowData,
                action: actionToShow
            }
        });
    };

    const { modulePermission } = useAppSelector(state => state.user);

    const actionToShow = useMemo(() => {
        let action = '';
        const module = modulePermission?.find(module => module.moduleName === 'Check-in with Team Members');

        if (module) {
            if (module.edit) {
                if (rowData?.isCheckInWithManagerActive) {
                    if (rowData?.checkInDraft) action = 'Edit';
                    else if (rowData?.checkInPublish) {
                        action = 'View';
                    } else {
                        action = 'Add';
                    }
                } else action = 'View';
            } else {
                action = 'View';
            }
        }
        return action;
    }, [modulePermission, rowData?.isCheckInWithManagerActive, rowData?.checkInDraft, rowData?.checkInPublish]);

    const canShowActionText =
        (status === reviewStatusConstants.CheckInWithManagerPending && rowData?.isCheckInWithManagerActive && isReviewCycleActive) ||
        status === reviewStatusConstants.CheckInWithManagerCompleted ||
        (status === reviewStatusConstants.CheckInWithManagerInProgress && rowData?.isCheckInWithManagerActive && isReviewCycleActive);

    return canShowActionText ? <ColumnActionText onClick={handleClick}>{actionToShow}</ColumnActionText> : <Text>N/A</Text>;
};
