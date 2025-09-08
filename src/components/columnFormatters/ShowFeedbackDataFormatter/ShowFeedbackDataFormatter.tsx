import { TableColumnConfig, Text } from '@medly-components/core';
import { removeHtmlTagsAndTruncate } from '@utils/truncate-html';

export const ShowFeedbackDataFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    return <Text>{removeHtmlTagsAndTruncate(rowData?.feedback, 100)}</Text>;
};
