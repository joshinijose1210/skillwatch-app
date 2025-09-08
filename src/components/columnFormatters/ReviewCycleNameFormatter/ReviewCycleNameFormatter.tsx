import { TableColumnConfig, Text } from '@medly-components/core';
import format from 'date-fns/format';

export const ReviewCycleNameFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    return (
        <Text>
            {format(new Date(rowData?.startDate), 'do MMM yyyy')} - {format(new Date(rowData?.endDate), 'do MMM yyyy')}
        </Text>
    );
};
