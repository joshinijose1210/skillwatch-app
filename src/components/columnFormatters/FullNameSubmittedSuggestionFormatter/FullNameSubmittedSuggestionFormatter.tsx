import { TableColumnConfig, Text } from '@medly-components/core';

export const FullNameSubmittedSuggestionFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    return (
        <>
            {rowData?.suggestedByEmployeeId ? (
                <Text>
                    {rowData?.suggestedByFirstName} {rowData?.suggestedByLastName} ({rowData?.suggestedByEmployeeId})
                </Text>
            ) : (
                <Text textAlign="center">Anonymous</Text>
            )}
        </>
    );
};
