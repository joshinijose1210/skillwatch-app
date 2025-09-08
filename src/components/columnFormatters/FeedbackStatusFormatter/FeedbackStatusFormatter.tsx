import { TableColumnConfig, Text } from '@medly-components/core';

export const FeedbackStatusFormatter: TableColumnConfig['component'] = ({ data }) => {
    return <Text>{data ? 'In-Draft' : 'Submitted'}</Text>;
};
