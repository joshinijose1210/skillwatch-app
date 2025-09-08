import { TableColumnConfig, Text } from '@medly-components/core';

export const UserActivityLog: TableColumnConfig['component'] = ({ rowData }) => {
    return <Text>{`${rowData?.activity}`}</Text>;
};

export const UserActivityActor: TableColumnConfig['component'] = ({ rowData }) => {
    return <Text>{`${rowData?.firstName} ${rowData?.lastName} (${rowData?.employeeId})`}</Text>;
};
