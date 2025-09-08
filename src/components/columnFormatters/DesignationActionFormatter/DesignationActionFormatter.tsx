import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { TableColumnConfig } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DesignationActionFormattersWrapper } from './DesignationActionFormatter.styled';

export const DesignationActionFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const navigate = useNavigate(),
        { ActivePage } = useParams();

    const handleViewClick = () => {
        navigate(`${routeConstants.designationManagement}/${ActivePage}`, {
            state: {
                ...rowData,
                action: 'View'
            }
        });
    };

    const handleEditClick = () => {
        navigate(`${routeConstants.designationManagement}/${ActivePage}`, {
            state: {
                ...rowData,
                action: 'Edit'
            }
        });
    };

    const { modulePermission } = useAppSelector(state => state.user);

    const actionToShow = useMemo(() => {
        let action = '';
        const module = modulePermission?.find(module => module.moduleName === 'Designations');
        if (module) {
            action = module.edit ? 'Edit' : module.view ? 'View' : '';
        }

        return action;
    }, [modulePermission]);

    return (
        <DesignationActionFormattersWrapper
            title={rowData?.teamStatus !== undefined && !rowData?.teamStatus ? 'Please activate the team to edit.' : ''}
        >
            {rowData?.teamStatus !== undefined && !rowData?.teamStatus ? (
                'N/A'
            ) : actionToShow ? (
                <ColumnActionText onClick={actionToShow === 'Edit' ? handleEditClick : handleViewClick}>{actionToShow}</ColumnActionText>
            ) : (
                ''
            )}
        </DesignationActionFormattersWrapper>
    );
};
