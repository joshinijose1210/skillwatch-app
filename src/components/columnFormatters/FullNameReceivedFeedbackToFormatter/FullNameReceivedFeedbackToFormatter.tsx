import { TableColumnConfig, Text } from '@medly-components/core';

export const FullNameReceivedFeedbackFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    return (
        <Text>
            {rowData?.isExternalFeedback
                ? rowData?.externalFeedbackFromEmailId
                : `${rowData?.empFirstName} ${rowData?.empLastName} (${rowData?.feedbackFromEmployeeId})`}
        </Text>
    );
};
