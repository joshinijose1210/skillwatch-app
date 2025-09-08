import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { reviewStatusConstants } from '@constants/reviewStatusConstants';
import { TableColumnConfig, Text } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const MyCheckInActionFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const navigate = useNavigate();
    const { ActivePage } = useParams();
    let status;

    switch (true) {
        case rowData?.selfReviewDraft:
            status = reviewStatusConstants.SelfReviewInProgress;
            break;
        case !rowData?.selfReviewPublish:
            status = reviewStatusConstants.SelfReviewPending;
            break;
        case rowData?.firstManagerReviewPublish || rowData?.secondManagerReviewPublish:
            switch (true) {
                case rowData?.isReviewCycleActive && !rowData?.isCheckInWithManagerDatePassed && !rowData?.isCheckInWithManagerActive:
                    status = 'Check-in with manager not started';
                    break;
                case rowData?.isCheckInWithManagerDatePassed && !rowData?.checkInPublish:
                    status = 'Check-in with manager date passed';
                    break;
                case rowData?.checkInDraft:
                    status = reviewStatusConstants.CheckInWithManagerInProgress;
                    break;
                case !rowData?.checkInPublish:
                    status = reviewStatusConstants.CheckInWithManagerPending;
                    break;
                default:
                    status = 'Review Submitted';
            }
            break;
        case rowData?.firstManagerReviewDraft && !rowData?.secondManagerReviewDraft:
            status = reviewStatusConstants.Manager1ReviewInProgress;
            break;
        case rowData?.secondManagerReviewDraft && !rowData?.firstManagerReviewDraft:
            status = reviewStatusConstants.Manager2ReviewInProgress;
            break;
        case rowData?.firstManagerReviewDraft && rowData?.secondManagerReviewDraft:
            status = 'Manager 1 & 2 review in progress';
            break;
        case !rowData?.firstManagerReviewDraft && !rowData?.secondManagerReviewDraft:
            status = reviewStatusConstants.Manager1ReviewPending;
            break;
        default:
            status = reviewStatusConstants.Manager2ReviewPending;
    }

    const handleClick = () => {
        navigate(
            `${routeConstants.myCheckInWithManager}/${ActivePage}/${format(new Date(rowData?.startDate), 'do MMM yyyy')} - ${format(
                new Date(rowData?.endDate),
                'do MMM yyyy'
            )}/review-summary`,
            {
                state: {
                    ...rowData,
                    action: actionToShow
                }
            }
        );
    };

    const { modulePermission } = useAppSelector(state => state.user);

    const actionToShow = useMemo(() => {
        let action = '';
        const module = modulePermission?.find(module => module.moduleName === 'Check-in with Team Members');
        if (module) {
            action = 'View';
        }

        return action;
    }, [modulePermission]);

    return status === 'Review Submitted' ? <ColumnActionText onClick={handleClick}>{actionToShow}</ColumnActionText> : <Text>N/A</Text>;
};
