import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { TableColumnConfig } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const RequestFeedbackActionFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const userDetails = useAppSelector(state => state.user);
    const { ActivePage } = useParams();

    const rowAction =
        rowData && !rowData.isSubmitted && rowData.feedbackFromId === userDetails.id && rowData.isDraft
            ? 'Edit'
            : rowData && !rowData.isSubmitted && rowData.feedbackFromId === userDetails.id
            ? 'Add'
            : 'View';

    const navigateTo = useNavigate();
    const handleClick = useCallback(() => {
        if (rowData && rowData.feedbackFromId !== userDetails.id) {
            navigateTo(
                `${routeConstants.threeSixtyDegreeFeedback}${routeConstants.requestFeedback}/${ActivePage}/View-Requested-Feedback`,
                {
                    state: {
                        ...rowData,
                        action: 'View'
                    }
                }
            );
        } else if (rowData && rowData.isSubmitted) {
            navigateTo(
                `${routeConstants.threeSixtyDegreeFeedback}${routeConstants.requestFeedback}/${ActivePage}/View-Submitted-Feedback`,
                {
                    state: {
                        ...rowData,
                        action: 'View'
                    }
                }
            );
        } else if (rowData && rowData.feedbackFromId === userDetails.id) {
            navigateTo(
                rowData.isDraft
                    ? `${routeConstants.threeSixtyDegreeFeedback}${routeConstants.requestFeedback}/${ActivePage}/Edit-Requested-Feedback`
                    : `${routeConstants.threeSixtyDegreeFeedback}${routeConstants.requestFeedback}/${ActivePage}/Add-Requested-Feedback`,
                {
                    state: {
                        ...rowData,
                        action: rowData.isDraft ? 'Edit' : 'Add'
                    }
                }
            );
        }
    }, [ActivePage, navigateTo, rowData, userDetails.id]);
    return <ColumnActionText onClick={handleClick}>{rowAction}</ColumnActionText>;
};
