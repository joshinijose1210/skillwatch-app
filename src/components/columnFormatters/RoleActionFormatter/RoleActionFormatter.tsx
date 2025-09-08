import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { TableColumnConfig } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RoleActionFormattersWrapper } from './RoleActionFormatter.styled';

export const RoleActionFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const { ActivePage } = useParams();
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const handleViewClick = () => {
        navigate(`${routeConstants.rolesAndPermissions}/${ActivePage}/view-role-&-permissions`, {
            state: {
                ...rowData,
                action: 'View'
            }
        });
    };

    const handleEditClick = () => {
        sessionStorage.setItem('modulePermissions', JSON.stringify(rowData?.modulePermission));
        if (path.includes(routeConstants.firstRoleRedirect)) {
            navigate(`${routeConstants.firstRoleRedirect}/${ActivePage}/edit-role-&-permissions`, {
                state: {
                    ...rowData,
                    action: 'Edit'
                }
            });
        } else {
            navigate(`${routeConstants.rolesAndPermissions}/${ActivePage}/edit-role-&-permissions`, {
                state: {
                    ...rowData,
                    action: 'Edit'
                }
            });
        }
    };

    const { modulePermission } = useAppSelector(state => state.user);

    const actionToShow = useMemo(() => {
        let action = '';
        const module = modulePermission?.find(module => module.moduleName === 'Roles & Permissions');
        if (module) {
            action = module.edit ? 'Edit' : module.view ? 'View' : '';
        }

        return action;
    }, [modulePermission]);

    return (
        <RoleActionFormattersWrapper>
            {actionToShow ? (
                <ColumnActionText onClick={actionToShow === 'Edit' ? handleEditClick : handleViewClick}>{actionToShow}</ColumnActionText>
            ) : (
                ''
            )}
        </RoleActionFormattersWrapper>
    );
};
