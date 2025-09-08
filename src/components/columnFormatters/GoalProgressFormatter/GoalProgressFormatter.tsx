import { StyledChip } from '@components/reusableComponents/DashboardActionItems/DashboardActionItems.styled';
import { TableColumnConfig } from '@medly-components/core';
import { ProgressId } from '@pages/ViewPreviousGoals/types';

export const GoalProgressFormatter: TableColumnConfig['component'] = ({ rowData, data }) => {
    return <StyledChip progressId={rowData?.progressId as ProgressId} label={data} />;
};
