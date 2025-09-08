import { TableColumnConfig, Text } from '@medly-components/core';

export const ReporteeNameFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    return (
        <Text key={rowData?.id}>
            {rowData?.firstName} {rowData?.lastName} ({rowData?.employeeId})
        </Text>
    );
};
