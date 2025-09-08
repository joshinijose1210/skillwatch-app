import { TableColumnConfig, Text } from '@medly-components/core';

export const FullNameRequestFeedbackFromFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    return (
        <Text>
            {rowData?.isExternalRequest
                ? `${rowData?.externalFeedbackFromEmail}`
                : `${rowData?.feedbackFromFirstName} ${rowData?.feedbackFromLastName} (${rowData?.feedbackFromEmployeeId})`}
        </Text>
    );
};

export const RequestFromFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    return <Text>{`${rowData?.requestedByFirstName} ${rowData?.requestedByLastName} (${rowData?.requestedByEmployeeId})`}</Text>;
};
