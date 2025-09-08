import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useEditRoleMutation, usePostRoleMutation } from '@slice/services';
import { useGetPermissionModulesQuery } from '@slice/services/permissionModules';
import { performValidation } from '@utils/validations';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const useRoleForm = () => {
    const userDetails = useAppSelector(state => state.user);
    const path = useLocation().pathname;
    const [input, setInput] = useState('');
    const { ActivePage } = useParams();
    const [activePage, setActivePage] = useState(1);
    const [status, setStatus] = useState(true);
    const [stateData, setStateData] = useState<any>();
    const [errorText, setErrorText] = useState('');
    const [permissions, setPermissions] = useState<
        { moduleId: number; view: boolean; edit: boolean; moduleName?: string; action?: string; input?: string }[]
    >([]);
    const [action, setAction] = useState('');
    const [editRoleId, setEditRoleId] = useState('');
    const [isSaveDisabled, setIsSaveDisabled] = useState(false);
    const inputElement: any = useRef<HTMLInputElement>(null);
    const [addRole, { error: addError, isSuccess: isAddSuccess, isLoading: isAddRoleLoading }] = usePostRoleMutation();
    const [editRole, { error: editError, isSuccess: isEditSuccess, isLoading: isEditRoleLoading }] = useEditRoleMutation();
    const { data: permissionModules, isSuccess, isLoading } = useGetPermissionModulesQuery({ path: '', params: [] });
    const navigate = useNavigate();

    const state = useLocation().state as any;

    const roleId = state?.roleId as string;

    const isToggleDisabled = action === 'View';

    const focusInput = () => {
        inputElement.current && inputElement.current.focus();
    };

    useEffect(() => {
        const check = permissions.filter(permission => permission.view === true);
        if (check.length >= 0) {
            setIsSaveDisabled(true);
        } else setIsSaveDisabled(false);
    }, [permissions]);

    useEffect(() => {
        if (isSuccess && permissionModules && permissionModules.length > 0) {
            setPermissions(
                permissionModules.reduce((acc: any, permission: any) => {
                    const rowData = {
                        moduleId: permission.moduleId,
                        view: false,
                        edit: false,
                        moduleName: permission.moduleName,
                        isSubModule: Boolean(permission?.mainModule)
                    };
                    if (permission.mainModule) {
                        const mainModule = acc.find((module: any) => module.moduleName === permission.mainModule);
                        if (!mainModule)
                            return [
                                ...acc,
                                {
                                    moduleId: '',
                                    view: false,
                                    edit: false,
                                    showViewEdit: false,
                                    moduleName: permission.mainModule,
                                    haveSubModules: true
                                },
                                rowData
                            ];
                    }
                    return [...acc, rowData];
                }, [])
            );
        }
    }, [permissionModules, isSuccess]);
    useEffect(() => {
        if (!state) {
            navigate(routeConstants.root, {
                state: {
                    error: true,
                    header: 'Unauthorized Access',
                    message: 'You do not have access to the page, please contact system administrator/HR.'
                }
            });
        } else if (state && permissions.length > 0) {
            state.action && setAction(state.action);
            if (state.action && state.modulePermission) {
                setEditRoleId(state.id);
                const { modulePermission, tempPermission } = state;
                setStateData(state);
                setPermissions((prev: any) =>
                    prev.map((permission: any) => {
                        let statePermission = modulePermission.find((per: any) => per.moduleId === permission.moduleId);
                        if (tempPermission && tempPermission.length) {
                            statePermission = tempPermission.find((per: any) => per.moduleId === permission.moduleId);
                        }
                        if (statePermission) {
                            return {
                                ...permission,
                                view: statePermission.view,
                                edit: statePermission.edit,
                                action: state.action,
                                input: state.roleName
                            };
                        } else return { ...permission, action: state.action, input: state.roleName };
                    })
                );
                setInput(state.roleName);
                setStatus(state.status);
            } else {
                setPermissions((prev: any) =>
                    prev.map((permission: any) => {
                        if (permission.moduleId === state.moduleId) {
                            return {
                                ...permission,
                                view: state.view,
                                edit: state.edit
                            };
                        } else return permission;
                    })
                );
            }
        }
    }, [navigate, permissions.length, state]);

    const handlePageChange = (page: number) => setActivePage(page);

    const handleInputChange = useCallback((e: any) => {
        const { name, value } = e.target;
        const errors = performValidation(name, value);
        setInput(value);
        setErrorText(errors);
    }, []);

    const handleToggleClick = () => {
        setStatus(!status);
    };
    const matchObjectsById = (object1: any[], object2: any[]): boolean => {
        if (!object1 || !object2) {
            return false;
        }
        return object1.every(obj1 => {
            const matchedObj = object2.find(obj2 => obj2.moduleId === obj1.moduleId);
            if (!matchedObj) {
                return false;
            }
            return Object.keys(obj1).every(key => obj1[key] === matchedObj[key]);
        });
    };
    const isDisabled = useMemo(() => {
        const tempSessionState = sessionStorage.getItem('tempCheckboxState');
        return (
            !input.length ||
            !isSaveDisabled ||
            !!errorText ||
            action === 'View' ||
            (stateData &&
                stateData.roleName === input &&
                stateData.status === status &&
                matchObjectsById(stateData.modulePermission, tempSessionState && JSON.parse(tempSessionState)))
        );
    }, [action, errorText, input, isSaveDisabled, stateData, status]);
    const handleAddRole = () => {
        const newPermissions = permissions.map(p => {
            const newP = p;
            delete newP.action;
            delete newP.input;
            return newP;
        });

        const payloadData = {
            roleName: input,
            modulePermission: newPermissions,
            status,
            actionBy: userDetails.id,
            organisationId: userDetails.organisationId,
            ipAddress: '216.24.57.253:443'
        };
        if (action === 'Edit') {
            editRole({
                body: payloadData,
                path: `${editRoleId}`
            });
        } else {
            addRole(payloadData);
        }
    };

    const goBackHandle = () => {
        navigate(`${routeConstants.firstRoleRedirect}/${ActivePage}`);
    };

    useEffect(() => {
        if (addError) {
            focusInput();
            const errorObj = addError as ErrorType;
            setErrorText(errorObj.data.errorMessage);
        }
    }, [addError]);

    useEffect(() => {
        if (editError) {
            focusInput();
            const errorObj = editError as ErrorType;
            setErrorText(errorObj.data.errorMessage);
        }
    }, [editError]);

    useEffect(() => {
        if (ActivePage) {
            setActivePage(parseInt(ActivePage));
        }
    }, [ActivePage]);

    useEffect(() => {
        if (isAddSuccess) {
            addToast({
                variant: 'success',
                header: `Role added successfully`,
                timer: 3000
            });
            if (path.includes(routeConstants.firstRoleRedirect)) {
                navigate(`${routeConstants.firstRoleRedirect}/${1}`);
            } else {
                navigate(`${routeConstants.rolesAndPermissions}/${1}`);
            }
        }
    }, [isAddSuccess, navigate, path, userDetails.onboardingFlow, userDetails.roleName]);

    useEffect(() => {
        if (isEditSuccess) {
            if (path.includes(routeConstants.firstRoleRedirect)) {
                navigate(`${routeConstants.firstRoleRedirect}/${ActivePage}`);
            } else {
                navigate(`${routeConstants.rolesAndPermissions}/${ActivePage}`);
            }
            addToast({
                variant: 'success',
                header: `Role updated successfully`,
                timer: 3000
            });
        }
    }, [ActivePage, isEditSuccess, navigate, path]);

    return {
        input,
        inputElement,
        activePage,
        handlePageChange,
        handleToggleClick,
        isToggleDisabled,
        status,
        handleAddRole,
        permissions,
        isLoading,
        action,
        errorText,
        handleInputChange,
        isAddRoleLoading,
        isEditRoleLoading,
        state,
        isDisabled,
        goBackHandle,
        isRoleOrgAdmin: roleId?.toLowerCase()?.trim() === 'r1'
    };
};
