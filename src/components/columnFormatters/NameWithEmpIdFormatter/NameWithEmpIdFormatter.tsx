import { TableColumnConfig, Text } from '@medly-components/core';

export const NameWithEmpIdFormatter: TableColumnConfig['component'] = ({ rowData, data }) => {
    return rowData?.isExternalFeedback ? (
        data === rowData?.feedbackToId ? (
            <Text>
                {rowData?.toEmpName} ({rowData?.feedbackToEmployeeId})
            </Text>
        ) : (
            <Text>{rowData?.externalFeedbackFromEmailId}</Text>
        )
    ) : data === rowData?.feedbackFromId ? (
        <Text>
            {rowData?.fromEmpName} ({rowData?.feedbackFromEmployeeId})
        </Text>
    ) : data === rowData?.empFirstName ? (
        <Text>
            {rowData?.empFirstName} {rowData?.empLastName} ({rowData?.feedbackTo})
        </Text>
    ) : (
        <Text>
            {rowData?.toEmpName} ({rowData?.feedbackToEmployeeId})
        </Text>
    );
};
