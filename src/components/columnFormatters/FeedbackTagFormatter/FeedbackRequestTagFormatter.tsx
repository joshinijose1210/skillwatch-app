import { TableColumnConfig, Text } from '@medly-components/core';
import { StyledChip } from './FeedbackTagFormatter.styled';

export const FeedbackRequestTagFormatter: TableColumnConfig['component'] = ({ data }) => {
    return (
        <StyledChip label={data ? 'Completed' : 'Pending'}>
            <Text textVariant="body3">{data ? 'Completed' : 'Pending '}</Text>
        </StyledChip>
    );
};
