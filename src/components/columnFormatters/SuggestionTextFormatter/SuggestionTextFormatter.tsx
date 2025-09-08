import { TableColumnConfig, Text } from '@medly-components/core';
import { removeHtmlTagsAndTruncate } from '@utils/truncate-html';

export const SuggestionTextFormatter: TableColumnConfig['component'] = ({ data }) => {
    return <Text>{removeHtmlTagsAndTruncate(data, 100)}</Text>;
};
