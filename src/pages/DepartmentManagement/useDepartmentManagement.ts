import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { debounce } from '@medly-components/utils';
import { useAppSelector } from '@slice';
import { useEditDepartmentMutation, useGetDepartmentQuery, usePostDepartmentMutation } from '@slice/services';
import { performValidation } from '@utils/validations';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DepartmentRowData, DepartmentsTypes } from './types';
import { pluralize } from '@utils/pluralize';

export const useDepartmentManagement = () => {
    const userDetails = useAppSelector(state => state.user),
        state = useLocation().state as DepartmentRowData,
        navigateTo = useNavigate(),
        { ActivePage } = useParams();

    const [searchText, setSearchText] = useState(''),
        [modalState, setModalState] = useState(false),
        [isAdded, setIsAdded] = useState(false),
        [departmentName, setDepartmentName] = useState(''),
        [status, setStatus] = useState(true),
        [departments, setDepartments] = useState<DepartmentsTypes>([]),
        [newDepartmentsList, setNewDepartmentsList] = useState<string[]>([]),
        [errorText, setErrorText] = useState(''),
        [testActivePage, setTestActivePage] = useState<number>(); // this variable used only for executing test cases

    const [postDepartment, { isSuccess: isAddSuccess, data: responseData, isLoading: isAddLoading }] = usePostDepartmentMutation();
    const [editDepartment, { isSuccess: isEditSuccess, error: editDepartmentError, isLoading: isEditLoading }] =
        useEditDepartmentMutation();
    const {
        data,
        isSuccess,
        error,
        isFetching: isLoading
    } = useGetDepartmentQuery(
        {
            path: '',
            params: [
                { name: 'page', value: ActivePage ?? testActivePage },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'limit', value: 10 },
                { name: 'searchText', value: searchText }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const isInputDisabled = useMemo(() => state && state.action === 'View', [state, departmentName]);

    const handlePageChange = (page: number) => {
        setTestActivePage(page);
        navigateTo(`${routeConstants.departmentManagement}/${page}`);
    };

    const openModal = () => {
        setModalState(true);
    };

    const closeModal = useCallback(() => {
        navigateTo(`${routeConstants.departmentManagement}/${ActivePage}`);
        setModalState(false);
        setDepartmentName('');
        setNewDepartmentsList([]);
        setErrorText('');
        setStatus(true);
    }, [ActivePage, navigateTo]);

    const openEditModal = useCallback((rowData: DepartmentRowData) => {
        openModal();
        setDepartmentName(rowData.departmentName);
        setStatus(rowData.departmentStatus);
    }, []);

    const handleDepartmentNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const errors = performValidation(name, value);
        setDepartmentName(value);
        setErrorText(errors);
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (state && state?.action === 'Edit') {
                if (e.key === 'Enter') handleAddDepartment();
                return;
            }
            if ((e.key === 'Enter' || e.key === ',') && departmentName.trim() !== '' && departmentName.length <= 50) {
                e.preventDefault();
                const newEntry = departmentName.trim();
                const errors = performValidation('departmentName', newEntry);
                // performing a case insensitive check
                if (!newDepartmentsList.some(d => d.toLowerCase() === newEntry.toLowerCase()) && !errors) {
                    const updatedList = [...newDepartmentsList, newEntry];
                    setNewDepartmentsList(updatedList);
                }
                setDepartmentName('');
            }
        },
        [departmentName, newDepartmentsList]
    );

    const handleRemoveChip = useCallback(
        (chipToRemove: string) => {
            if (newDepartmentsList.length === 1 && errorText) {
                setErrorText('');
            }
            setNewDepartmentsList(prev => prev.filter(name => name !== chipToRemove));
        },
        [newDepartmentsList]
    );

    const handleToggleClick = () => {
        setStatus(!status);
    };

    const onSearchClear = () => {
        setSearchText('');
        navigateTo(`${routeConstants.departmentManagement}/${1}`);
    };

    const onSearch = useCallback(
        (value: string) => {
            navigateTo(`${routeConstants.departmentManagement}/${1}`);
            setSearchText(value);
        },
        [navigateTo]
    );
    const debouncedOnChange = useCallback(
        debounce(value => {
            onSearch(value);
        }, 500),
        []
    );

    const handleAddDepartment = () => {
        const editDepartmentData = {
            departmentName,
            departmentStatus: status,
            organisationId: userDetails.organisationId,
            actionBy: userDetails.id,
            ipAddress: '216.24.57.253:443'
        };

        const departmentPayload = newDepartmentsList.map(name => ({
            departmentName: name,
            departmentStatus: status,
            organisationId: userDetails.organisationId
        }));

        // if the input field has a value that is not in the chips, add it to the payload
        if (departmentName.trim().length !== 0 && !newDepartmentsList.includes(departmentName.trim())) {
            departmentPayload.push({
                departmentName: departmentName.trim(),
                departmentStatus: status,
                organisationId: userDetails.organisationId
            });
        }

        // resetting the field after adding the department
        setDepartmentName('');

        if (state && state.action === 'Edit') {
            editDepartment({
                body: editDepartmentData,
                path: `${state?.id}`
            });
        } else {
            postDepartment({
                departments: departmentPayload,
                actionBy: userDetails.id,
                ipAddress: '216.24.57.253:443'
            });
        }
        setIsAdded(true);
    };
    const isDisabled = useMemo(
        () =>
            !departmentName.length ||
            !!errorText ||
            (state && (state.action == 'View' || (state.departmentStatus === status && state.departmentName === departmentName))),
        [errorText, departmentName, state, status]
    );

    useEffect(() => {
        if (state) {
            openEditModal(state);
        }
    }, [openEditModal, state]);

    useEffect(() => {
        if (data && isSuccess) {
            setDepartments(data.departments);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (editDepartmentError) {
            const errorObj = editDepartmentError as ErrorType;
            setErrorText(errorObj.data.errorMessage);
        }
    }, [editDepartmentError]);

    useEffect(() => {
        if (responseData && responseData?.existingDepartment.length > 0 && responseData?.addedDepartment.length > 0 && isAdded) {
            addToast({
                variant: 'success',
                header: `${responseData?.addedDepartment.length} ${pluralize(
                    responseData?.addedDepartment.length,
                    'department'
                )} added successfully`,
                timer: 3000
            });
            setIsAdded(false);
        } else {
            if (isAddSuccess && responseData && responseData.addedDepartment && responseData?.addedDepartment.length > 0 && isAdded) {
                closeModal();
                navigateTo(`${routeConstants.departmentManagement}/${1}`);
                addToast({
                    variant: 'success',
                    header: `${responseData?.addedDepartment.length} ${pluralize(
                        responseData?.addedDepartment.length,
                        'department'
                    )} added successfully`,
                    timer: 3000
                });
                setErrorText('');
                setIsAdded(false);
            }
        }
    }, [closeModal, isAddSuccess, navigateTo, responseData]);

    useEffect(() => {
        if (isEditSuccess && isAdded) {
            closeModal();
            addToast({
                variant: 'success',
                header: `Department updated successfully`,
                timer: 3000
            });
            setIsAdded(false);
        }
    }, [closeModal, isEditSuccess]);

    useEffect(() => {
        if (responseData && responseData?.existingDepartment?.length > 0) {
            setErrorText(`Following department(s) already exists:`);
            // the new departments list will have the conflicted departments from backend
            setNewDepartmentsList(responseData?.existingDepartment);
        }
    }, [responseData]);

    useEffect(() => {
        if (error) {
            setDepartments([]);
        }
    }, [error]);

    return {
        openModal,
        isLoading,
        modalState,
        isInputDisabled,
        closeModal,
        state,
        departmentName,
        handleDepartmentNameChange,
        errorText,
        departments,
        newDepartmentsList,
        handleAddDepartment,
        handleKeyDown,
        handleRemoveChip,
        handleToggleClick,
        openEditModal,
        status,
        ActivePage,
        handlePageChange,
        totalItems: departments?.length ? data?.totalDepartments : 0,
        isAddLoading,
        isEditLoading,
        isDisabled,
        searchText,
        onSearchClear,
        onSearch,
        debouncedOnChange
    };
};
