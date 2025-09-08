import { TableColumnConfig, Text } from '@medly-components/core';
import { useMemo } from 'react';

export const AverageRatingFormatter: TableColumnConfig['component'] = ({ data = 9 }) => {
    const getFormattedValue = useMemo(() => {
        if (data < 0) return 'N/A';
        const valueString = `${data.toFixed(1)}`;
        const beforeDecimalValue = parseInt(valueString.split('.')[0]);
        const afterDecimalValue = parseInt(valueString.split('.')[1]);
        return `${beforeDecimalValue}${afterDecimalValue > 0 ? `.${afterDecimalValue}` : ''}`;
    }, [data]);
    return <Text>{getFormattedValue}</Text>;
};
