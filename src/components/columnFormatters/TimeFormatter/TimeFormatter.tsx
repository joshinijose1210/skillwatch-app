import { TableColumnConfig, Text } from '@medly-components/core';
import format from 'date-fns/format';

export const TimeFormatter: TableColumnConfig['component'] = ({ data }) => {
    return <Text>{format(new Date(data), 'h:mm a')}</Text>;
};
