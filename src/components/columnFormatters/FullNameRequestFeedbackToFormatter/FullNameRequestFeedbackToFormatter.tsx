import { TableColumnConfig, Text } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useMemo } from 'react';

export const FullNameRequestFeedbackToFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const isRequestReceivedTab = sessionStorage.getItem('myTab') === 'inbox';
    const isRequestSentTab = sessionStorage.getItem('myTab') === 'sent';
    const user = useAppSelector(state => state.user);

    const feedbackAboutName = useMemo(() => {
        switch (true) {
            case isRequestSentTab && user.employeeId === rowData?.feedbackToEmployeeId:
                return 'Me';
            case isRequestReceivedTab && rowData?.requestedByEmployeeId === rowData?.feedbackToEmployeeId:
                return 'Self';
            default:
                return `${rowData?.feedbackToFirstName} ${rowData?.feedbackToLastName} (${rowData?.feedbackToEmployeeId})`;
        }
    }, [
        rowData?.feedbackToEmployeeId,
        rowData?.feedbackToFirstName,
        rowData?.feedbackToLastName,
        rowData?.requestedByEmployeeId,
        isRequestReceivedTab,
        isRequestSentTab,
        user.employeeId
    ]);

    return <Text>{feedbackAboutName}</Text>;
};
