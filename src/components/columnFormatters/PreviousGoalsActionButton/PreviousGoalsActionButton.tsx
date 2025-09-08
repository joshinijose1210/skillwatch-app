import { ColumnActionText } from '@common';
import { TableColumnConfig } from '@medly-components/core';
import { ActionItem } from '@pages/ViewPreviousGoals/types';
import { useAppDispatch } from '@slice';
import { setGoalModal } from '@slice/goalModalSlice';

export const PreviousGoalsActionButton: TableColumnConfig['component'] = ({ rowData }) => {
    const dispatch = useAppDispatch();

    const handleViewClick = () => {
        dispatch(setGoalModal(rowData as ActionItem));
    };
    return <ColumnActionText onClick={handleViewClick}>Edit</ColumnActionText>;
};
