import { TableColumnConfig, Text } from '@medly-components/core';

export const FullNameSubmittedFeedbackFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    return (
        <Text>
            {rowData?.empFirstName} {rowData?.empLastName} ({rowData?.feedbackToEmployeeId})
        </Text>
    );
};
