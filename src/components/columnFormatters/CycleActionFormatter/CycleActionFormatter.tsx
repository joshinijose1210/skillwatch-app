import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { TableColumnConfig } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
export const CycleActionFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const navigateTo = useNavigate();
    const { modulePermission } = useAppSelector(state => state.user);
    const updateEndDate = new Date(rowData && rowData.endDate).setHours(23, 59, 59);
    const actionToShow = useMemo(() => {
        let action = '';
        const module = modulePermission?.find(module => module.moduleName === 'Review Cycles');
        if (module) {
            action = module.edit && new Date(updateEndDate) > new Date() ? 'Edit' : 'View';
        }

        return action;
    }, [modulePermission, updateEndDate]);

    const handleClick = () => {
        if (actionToShow === 'Edit') {
            navigateTo(routeConstants.editReviewCycle, {
                state: {
                    ...rowData,
                    action: actionToShow
                }
            });
        } else
            navigateTo(routeConstants.viewReviewCycle, {
                state: {
                    ...rowData,
                    action: actionToShow
                }
            });
    };

    return <ColumnActionText onClick={handleClick}>{actionToShow}</ColumnActionText>;
};
