import { TableColumnConfig, Text } from '@medly-components/core';

export const OrgAdminNameFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    return <Text>{`${rowData?.adminFirstName} ${rowData?.adminLastName}`}</Text>;
};
