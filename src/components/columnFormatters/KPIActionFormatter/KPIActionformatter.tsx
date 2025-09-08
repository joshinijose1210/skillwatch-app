import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { TableColumnConfig } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { KPIActionFormattersWrapper } from './KPIActionFormatter.styled';

export const KPIActionFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const navigate = useNavigate(),
        { ActivePage } = useParams();
    const handleViewClick = useCallback(() => {
        navigate(`${routeConstants.kpiManagement}/${ActivePage}/view-KPI`, {
            state: {
                ...rowData,
                action: 'view'
            }
        });
    }, [ActivePage, navigate, rowData]);

    const handleEditClick = useCallback(() => {
        navigate(`${routeConstants.kpiManagement}/${ActivePage}/edit-KPI`, {
            state: {
                ...rowData,
                action: 'edit'
            }
        });
    }, [ActivePage, navigate, rowData]);

    const { modulePermission } = useAppSelector(state => state.user);

    const actionToShow = useMemo(() => {
        let action = '';
        const module = modulePermission?.find(module => module.moduleName === 'KPIs');
        if (module) {
            action = module.edit ? 'Edit' : module.view ? 'View' : '';
        }

        return action;
    }, [modulePermission]);

    return (
        <KPIActionFormattersWrapper>
            {actionToShow ? (
                <ColumnActionText onClick={actionToShow === 'Edit' ? handleEditClick : handleViewClick}>{actionToShow}</ColumnActionText>
            ) : (
                ''
            )}
        </KPIActionFormattersWrapper>
    );
};
