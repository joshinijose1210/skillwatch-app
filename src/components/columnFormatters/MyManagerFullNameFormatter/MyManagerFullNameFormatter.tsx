import { TableColumnConfig, Text } from '@medly-components/core';

export const MyManagerFullNameFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    if (rowData?.managerFirstName) {
        return (
            <Text>
                {rowData?.managerFirstName} {rowData?.managerLastName} ({rowData?.reviewFromEmployeeId})
            </Text>
        );
    }
    return <Text>-</Text>;
};
