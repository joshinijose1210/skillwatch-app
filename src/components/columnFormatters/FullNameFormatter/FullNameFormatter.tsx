import { TableColumnConfig, Text } from '@medly-components/core';

export const FullNameFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    return rowData?.emailId ? (
        <Text>
            {rowData?.firstName} {rowData?.lastName}
        </Text>
    ) : (
        <Text>
            {rowData?.empFirstName || rowData?.firstName || rowData?.employeeName} {rowData?.empLastName || rowData?.lastName} (
            {rowData?.reviewTo || rowData?.reviewToEmployeeId})
        </Text>
    );
};
