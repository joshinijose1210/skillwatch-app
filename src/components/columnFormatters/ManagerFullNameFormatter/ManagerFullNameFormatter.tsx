import { TableColumnConfig, Text } from '@medly-components/core';

export const ManagerFullNameFormatter: TableColumnConfig['component'] = ({ data, rowData }) => {
    let managerName = 'N/A';
    if (data === rowData?.firstManagerId && rowData?.id === rowData?.firstManagerId) {
        managerName = `Self`;
    } else if (data === rowData?.firstManagerId && rowData?.id !== rowData?.firstManagerId) {
        managerName = `${rowData?.firstManagerFirstName} ${rowData?.firstManagerLastName} (${rowData?.firstManagerEmployeeId})`;
    } else if (data && data === rowData?.secondManagerId) {
        managerName = `${rowData?.secondManagerFirstName} ${rowData?.secondManagerLastName} (${rowData?.secondManagerEmployeeId})`;
    }
    if (rowData?.firstManagerFirstName) {
        return <Text>{managerName}</Text>;
    }
    return <Text>-</Text>;
};
