import { reviewStatusConstants } from '@constants/reviewStatusConstants';
import { TableColumnConfig, Text } from '@medly-components/core';
import format from 'date-fns/format';

export const SelfReviewStatusFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const status =
        !rowData?.isSelfReviewActive && !rowData?.publish && !rowData?.isSelfReviewDatePassed
            ? reviewStatusConstants.SelfReviewNotStarted
            : rowData?.isSelfReviewDatePassed && !rowData?.publish
            ? reviewStatusConstants.SelfReviewDatePassed
            : rowData?.isSelfReviewActive && !rowData?.draft && !rowData?.publish
            ? reviewStatusConstants.SelfReviewPending
            : rowData?.isSelfReviewActive && rowData?.draft && !rowData?.publish
            ? reviewStatusConstants.SelfReviewInProgress
            : format(new Date(rowData?.updatedAt), 'dd/MM/yyyy');

    // Check if review cycle has started using flag instead of date
    if (rowData?.isReviewCycleActive || rowData?.publish) {
        return <Text>{status}</Text>;
    } else {
        return <Text>Review Cycle not started</Text>;
    }
};
