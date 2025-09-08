import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { TableColumnConfig } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TeamActionFormattersWrapper } from './TeamActionFormatter.styled';

export const TeamActionFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const navigate = useNavigate(),
        { ActivePage } = useParams();

    const handleViewClick = () => {
        navigate(`${rowData?.teamName ? routeConstants.teamManagement : routeConstants.departmentManagement}/${ActivePage}`, {
            state: {
                ...rowData,
                action: 'View'
            }
        });
    };

    const handleEditClick = () => {
        navigate(`${rowData?.teamName ? routeConstants.teamManagement : routeConstants.departmentManagement}/${ActivePage}`, {
            state: {
                ...rowData,
                action: 'Edit'
            }
        });
    };

    const { modulePermission } = useAppSelector(state => state.user);

    const actionToShow = useMemo(() => {
        let action = '';
        const module = modulePermission?.find(module => module.moduleName === 'Teams' || module.moduleName === 'Departments');
        if (module) {
            action = module.edit ? 'Edit' : module.view ? 'View' : '';
        }

        return action;
    }, [modulePermission]);

    return (
        <TeamActionFormattersWrapper>
            {actionToShow ? (
                <ColumnActionText onClick={actionToShow === 'Edit' ? handleEditClick : handleViewClick}>{actionToShow}</ColumnActionText>
            ) : (
                ''
            )}
        </TeamActionFormattersWrapper>
    );
};
