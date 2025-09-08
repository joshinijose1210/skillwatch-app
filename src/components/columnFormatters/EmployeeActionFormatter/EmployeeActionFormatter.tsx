import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { TableColumnConfig } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmployeeActionFormattersWrapper } from './EmployeeActionFormatter.styled';

export const EmployeeActionFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const modulePermission = useAppSelector(state => state.user.modulePermission);
    const navigate = useNavigate();
    const { ActivePage } = useParams();
    const actionToShow = useMemo(() => {
        let action = '';
        const module = modulePermission?.find(module => module.moduleName === 'Employees');
        if (module) {
            action = module.edit ? 'Edit' : module.view ? 'View' : '';
        }

        return action;
    }, [modulePermission]);

    const handleClick = useCallback(
        (action = 'View') => {
            navigate(
                action === 'View'
                    ? `${routeConstants.employeeManagement}/${ActivePage}/view-employee/${rowData && rowData.id}`
                    : `${routeConstants.employeeManagement}/${ActivePage}/edit-employee/${rowData && rowData.id}`
            );
        },
        [ActivePage, navigate, rowData]
    );

    const handleActionClick = useCallback(() => {
        handleClick(actionToShow);
    }, [handleClick, actionToShow]);

    return (
        <EmployeeActionFormattersWrapper>
            {actionToShow ? <ColumnActionText onClick={handleActionClick}>{actionToShow}</ColumnActionText> : ''}
        </EmployeeActionFormattersWrapper>
    );
};
