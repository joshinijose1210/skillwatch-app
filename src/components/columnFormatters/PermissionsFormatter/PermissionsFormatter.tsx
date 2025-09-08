import { routeConstants } from '@constants';
import { Label, TableColumnConfig } from '@medly-components/core';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MainModuleName, PermissionFormattersWrapper, StyledCheckbox, SubModuleName, Wrapper } from './PermissionFormatter.styled';

export const PermissionsFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const [checkState, setCheckState] = useState({ view: false, edit: false }),
        { ActivePage } = useParams(),
        path = useLocation().pathname;

    const sessionData = JSON.parse(`${sessionStorage.getItem('modulePermissions')}`);
    const tempSessionState = sessionStorage.getItem('tempCheckboxState');
    const state = useLocation().state as any;

    const handleBeforeUnload = () => {
        sessionStorage.removeItem('tempCheckboxState');
    };

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);

        const currentPermissionState = tempSessionState ? JSON.parse(tempSessionState) : sessionData;

        if (currentPermissionState && currentPermissionState.length > 0) {
            const currentModulePermission = currentPermissionState.find((per: any) => per.moduleId === rowData?.moduleId);
            if (currentModulePermission?.view !== checkState.view || currentModulePermission?.edit !== checkState.edit) {
                setCheckState({ view: currentModulePermission?.view, edit: currentModulePermission?.edit });
            }
        }
        if (sessionStorage.getItem('tempCheckboxState') === null && sessionData && sessionData.length) {
            sessionStorage.setItem('tempCheckboxState', JSON.stringify(sessionData));
        }
        if (state && state.action === 'View') {
            if (rowData?.view !== checkState.view || rowData?.edit !== checkState.edit) {
                setCheckState({ view: rowData?.view, edit: rowData?.edit });
            }
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [state, rowData, checkState.view, checkState.edit, tempSessionState, sessionData]);

    const navigate = useNavigate();

    const onChangeHandlerView = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        let viewCheck: boolean;
        let editCheck: boolean;
        let newTempState;

        if (name === 'view') {
            viewCheck = checked;
            editCheck = checked ? checkState.edit : false;
        } else {
            viewCheck = checked ? true : checkState.view;
            editCheck = checked;
        }

        const tempSessionCheckboxState = JSON.parse(`${sessionStorage.getItem('tempCheckboxState')}`);
        if (tempSessionCheckboxState && tempSessionCheckboxState.length) {
            newTempState = [...tempSessionCheckboxState];

            const selectedItem = newTempState.findIndex(item => {
                return item.moduleId === rowData?.moduleId;
            });

            newTempState[selectedItem].view = viewCheck;
            newTempState[selectedItem].edit = editCheck;

            sessionStorage.setItem('tempCheckboxState', JSON.stringify(newTempState));
        }

        setCheckState({ view: viewCheck, edit: editCheck });

        const currentState = {
            id: state.id,
            modulePermission: state.modulePermission,
            tempPermission: newTempState,
            action: state.action,
            roleName: state.roleName,
            status: state.status,
            moduleId: rowData?.moduleId,
            view: viewCheck,
            edit: editCheck
        };

        if (path.includes(routeConstants.firstRoleRedirect)) {
            navigate(`${routeConstants.firstRoleRedirect}/${ActivePage}/add-role-&-permissions`, {
                state: currentState
            });
        } else {
            let routePath = `add-role-&-permissions`;
            if (path.includes('/edit-role-&-permissions')) {
                routePath = `edit-role-&-permissions`;
            }
            navigate(`${routeConstants.rolesAndPermissions}/${ActivePage}/${routePath}`, {
                state: currentState
            });
        }
    };
    if (rowData?.showViewEdit === false) return <></>;
    return (
        <PermissionFormattersWrapper>
            <Wrapper>
                <StyledCheckbox
                    name="view"
                    checked={checkState.view}
                    onChange={onChangeHandlerView}
                    disabled={rowData?.action === 'View' || (rowData?.action === 'Edit' && rowData?.input === 'Org Admin')}
                />
                <Label>View</Label>
            </Wrapper>
            <Wrapper>
                <StyledCheckbox
                    name="edit"
                    checked={checkState.edit}
                    onChange={onChangeHandlerView}
                    disabled={rowData?.action === 'View' || (rowData?.action === 'Edit' && rowData?.input === 'Org Admin')}
                />
                <Label>Edit</Label>
            </Wrapper>
        </PermissionFormattersWrapper>
    );
};

export const ModuleNameFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    return !rowData?.isSubModule ? (
        <MainModuleName textWeight="Medium">{rowData?.moduleName}</MainModuleName>
    ) : (
        <SubModuleName textWeight="Regular">{rowData?.moduleName}</SubModuleName>
    );
};
