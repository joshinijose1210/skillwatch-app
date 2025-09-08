import { TableColumnConfig, Text } from '@medly-components/core';
import format from 'date-fns/format';

export const DateFormatter: TableColumnConfig['component'] = ({ data }) => {
    return <Text>{format(new Date(data), 'dd/MM/yyyy')}</Text>;
};
