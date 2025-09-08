import { TableColumnConfig, Text } from '@medly-components/core';
import { StyledChip } from './SuggestionProgressFormatter.styled';

export const SuggestionProgressFormatter: TableColumnConfig['component'] = ({ rowData, data }) => {
    return (
        <>
            {rowData?.isDraft ? (
                <Text textVariant="h4" style={{ paddingLeft: '5rem' }}>
                    -
                </Text>
            ) : (
                <StyledChip label={data}>
                    <Text textVariant="body3">{data}</Text>
                </StyledChip>
            )}
        </>
    );
};
