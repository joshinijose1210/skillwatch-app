import { TableColumnConfig, Text } from '@medly-components/core';

export const ManagerReviewStatusFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const status =
        !rowData?.isManagerReviewActive &&
        rowData?.isReviewCycleActive &&
        (!rowData?.publish || !rowData.draft) &&
        !rowData?.isManagerReviewDatePassed
            ? 'Manager Review not started'
            : rowData?.isManagerReviewDatePassed && !rowData?.publish
            ? 'Manager Review date passed'
            : !rowData?.draft && !rowData?.publish && !rowData?.isManagerReviewDatePassed
            ? 'Manager Review pending'
            : rowData?.draft && !rowData?.publish && !rowData?.isManagerReviewDatePassed
            ? 'Manager Review in progress'
            : 'Manager Review submitted';

    if (rowData?.isReviewCycleActive || rowData?.publish || rowData?.draft || rowData?.isManagerReviewDatePassed) {
        return <Text>{status}</Text>;
    } else return <Text>Review Cycle not started</Text>;
};
