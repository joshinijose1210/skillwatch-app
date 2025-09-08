import { ErrorType } from '@common';
import { useDepartmentDropdownData } from '@common/hooks/useDepartmentDropdownData';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { Option } from '@medly-components/core/dist/es/components/SearchBox/types';
import { debounce } from '@medly-components/utils';
import { useAppSelector } from '@slice';
import { useEditTeamMutation, useGetTeamsQuery, usePostTeamMutation } from '@slice/services/team';
import { performValidation } from '@utils/validations';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TeamsRowData, TeamsTypes } from './types';
import { pluralize } from '@utils/pluralize';

export const useTeamManagement = () => {
    const userDetails = useAppSelector(state => state.user),
        state = useLocation().state as TeamsRowData,
        navigateTo = useNavigate(),
        { ActivePage } = useParams(),
        { isDepartmentReceived, department } = useDepartmentDropdownData();

    const [searchText, setSearchText] = useState(''),
        [modalState, setModalState] = useState(false),
        [teamName, setTeamName] = useState(''),
        [newTeamList, setNewTeamList] = useState<string[]>([]),
        [status, setStatus] = useState(true),
        [departmentId, setDepartmentId] = useState(-1),
        [teams, setTeams] = useState<TeamsTypes>([]),
        [errorText, setErrorText] = useState(''),
        [page, setPage] = useState<number>();

    const [addTeam, { isSuccess: isAddSuccess, data: responseData, isLoading: isAddLoading }] = usePostTeamMutation();
    const [editTeam, { isSuccess: isEditSuccess, error: editTeamError, isLoading: isEditLoading }] = useEditTeamMutation();
    const {
        data,
        isSuccess,
        error,
        isFetching: isLoading
    } = useGetTeamsQuery(
        {
            path: '',
            params: [
                { name: 'page', value: ActivePage ?? page },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'limit', value: 10 },
                { name: 'searchText', value: searchText }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const isInputDisabled = useMemo(() => state && (state.action === 'View' || Boolean(!state?.departmentId)), [state, teamName]);

    const sortedData = useCallback((data: any[], labelField: string, disableField: string) => {
        const activeItems = data
            .filter((item: any) => item[disableField] === true)
            .map((item: any) => ({ value: item.id, label: item[labelField] }))
            .sort((a: Option, b: Option) => a.label.localeCompare(b.label));
        const inActiveItems = data
            .filter((item: any) => item[disableField] === false)
            .map((item: any) => ({ value: item.id, label: item[labelField], disabled: true }))
            .sort((a: Option, b: Option) => a.label.localeCompare(b.label));
        return [...activeItems, ...inActiveItems];
    }, []);

    const departmentList = useMemo(() => {
        if (isDepartmentReceived && department?.departments) {
            return sortedData(department.departments, 'departmentName', 'departmentStatus');
        }
        return [];
    }, [isDepartmentReceived, sortedData]);
    const handlePageChange = (page: number) => {
        navigateTo(`${routeConstants.teamManagement}/${page}`);
        setPage(page);
    };

    const openModal = () => {
        setModalState(true);
    };

    const closeModal = useCallback(() => {
        navigateTo(`${routeConstants.teamManagement}/${ActivePage}`);
        setModalState(false);
        setTeamName('');
        setNewTeamList([]);
        setErrorText('');
        setStatus(true);
        setDepartmentId(-1);
    }, [ActivePage, navigateTo]);

    const openEditModal = useCallback((rowData: TeamsRowData) => {
        openModal();
        setTeamName(rowData.teamName);
        setStatus(rowData.teamStatus);
        setDepartmentId(rowData.departmentId);
    }, []);

    const handleTeamNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const errors = performValidation(name, value);
        setTeamName(value);
        setErrorText(errors);
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (state && state?.action === 'Edit') {
                if (e.key === 'Enter') handleAddTeam();
                return;
            }
            if ((e.key === 'Enter' || e.key === ',') && teamName.trim() !== '' && teamName.length <= 50) {
                e.preventDefault();
                const newEntry = teamName.trim();
                const errors = performValidation('teamName', newEntry);
                // performing a case insensitive check
                if (!newTeamList.some(d => d.toLowerCase() === newEntry.toLowerCase()) && !errors) {
                    const updatedList = [...newTeamList, newEntry];
                    setNewTeamList(updatedList);
                }

                setTeamName('');
            }
        },
        [teamName, newTeamList]
    );

    const handleRemoveChip = useCallback(
        (chipToRemove: string) => {
            if (newTeamList.length === 1 && errorText) {
                setErrorText('');
            }
            setNewTeamList(prev => prev.filter(name => name !== chipToRemove));
        },
        [newTeamList]
    );

    const handleToggleClick = () => {
        setStatus(!status);
    };

    const onSearchClear = () => {
        setSearchText('');
        navigateTo(`${routeConstants.teamManagement}/${1}`);
    };

    const onSearch = useCallback(
        (value: string) => {
            navigateTo(`${routeConstants.teamManagement}/${1}`);
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

    const handleAddTeam = () => {
        const teamData = {
            teamName,
            departmentId,
            teamStatus: status,
            organisationId: userDetails.organisationId,
            actionBy: userDetails.id,
            ipAddress: '216.24.57.253:443'
        };

        const addTeamPayload = newTeamList.map(name => ({
            teamName: name,
            departmentId,
            teamStatus: status,
            organisationId: userDetails.organisationId
        }));

        // if the input field has a value that is not in the chips, add it to the payload
        if (teamName.trim().length !== 0 && !newTeamList.includes(teamName.trim())) {
            addTeamPayload.push({
                teamName: teamName.trim(),
                departmentId,
                teamStatus: status,
                organisationId: userDetails.organisationId
            });
        }

        // resetting the field after adding the team
        setTeamName('');

        if (state && state.action === 'Edit') {
            editTeam({
                body: teamData,
                path: `${state?.id}`
            });
            localStorage.setItem('toast', 'true');
        } else {
            addTeam({
                teams: addTeamPayload,
                actionBy: userDetails.id,
                ipAddress: '216.24.57.253:443'
            });
            localStorage.setItem('toast', 'true');
        }
    };
    const isDisabled = useMemo(
        () =>
            !teamName.length ||
            !!errorText ||
            !departmentId ||
            (state &&
                (state.action == 'View' ||
                    (state.teamStatus === status && state.teamName === teamName && state.departmentId === departmentId))),
        [teamName, errorText, departmentId, state, status]
    );
    const handleDropdownChange = (value: number) => {
        setDepartmentId(value);
    };

    useEffect(() => {
        if (state) {
            openEditModal(state);
        }
    }, [openEditModal, state]);

    useEffect(() => {
        if (data && isSuccess) {
            setTeams(data.teams);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (editTeamError) {
            const errorObj = editTeamError as ErrorType;
            setErrorText(errorObj.data.errorMessage);
        }
    }, [editTeamError]);

    useEffect(() => {
        if (responseData && responseData?.existingTeam.length > 0 && responseData?.addedTeam.length > 0 && localStorage.getItem('toast')) {
            addToast({
                variant: 'success',
                header: `${responseData?.addedTeam.length} ${pluralize(responseData?.addedTeam.length, 'team')} added successfully`,
                timer: 3000
            });
            localStorage.removeItem('toast');
        } else {
            if (isAddSuccess && responseData && responseData.addedTeam.length > 0 && localStorage.getItem('toast')) {
                closeModal();
                navigateTo(`${routeConstants.teamManagement}/${1}`);
                addToast({
                    variant: 'success',
                    header: `${responseData?.addedTeam.length} ${pluralize(responseData?.addedTeam.length, 'team')} added successfully`,
                    timer: 3000
                });
                localStorage.removeItem('toast');
            }
        }
    }, [closeModal, isAddSuccess, navigateTo, responseData]);

    useEffect(() => {
        if (isEditSuccess && localStorage.getItem('toast')) {
            closeModal();
            addToast({
                variant: 'success',
                header: `Team updated successfully`,
                timer: 3000
            });
            localStorage.removeItem('toast');
        }
    }, [closeModal, isEditSuccess]);

    useEffect(() => {
        if (responseData && responseData?.existingTeam?.length > 0) {
            setErrorText(`Following team(s) already exists:`);
            // the new teams list will have the conflicted teams from backend
            setNewTeamList(responseData?.existingTeam);
        }
    }, [responseData]);

    useEffect(() => {
        if (error) {
            setTeams([]);
        }
    }, [error]);

    return {
        openModal,
        isLoading,
        modalState,
        isInputDisabled,
        closeModal,
        state,
        teamName,
        handleTeamNameChange,
        handleKeyDown,
        handleRemoveChip,
        errorText,
        teams,
        handleAddTeam,
        handleToggleClick,
        openEditModal,
        status,
        ActivePage,
        handlePageChange,
        totalItems: teams?.length ? data?.totalTeams : 0,
        isAddLoading,
        isEditLoading,
        isDisabled,
        searchText,
        onSearchClear,
        onSearch,
        debouncedOnChange,
        departmentList,
        newTeamList,
        handleDropdownChange,
        departmentId,
        isEditSuccess
    };
};
