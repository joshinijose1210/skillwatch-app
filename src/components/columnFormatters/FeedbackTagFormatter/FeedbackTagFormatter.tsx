import { TableColumnConfig, Text } from '@medly-components/core';
import { StyledChip } from './FeedbackTagFormatter.styled';

export const FeedbackTagFormatter: TableColumnConfig['component'] = ({ data }) => {
    return (
        <StyledChip label={data}>
            <Text textVariant="body3">{data}</Text>
        </StyledChip>
    );
};
