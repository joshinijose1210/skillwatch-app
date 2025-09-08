import { ErrorType, ITeam } from '@common';
import { useDepartmentDropdownData } from '@common/hooks/useDepartmentDropdownData';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { debounce } from '@medly-components/utils';
import { TeamsLabelData } from '@pages/FirstDesignation/types';
import { useAppSelector } from '@slice';
import { updateSearch } from '@slice/search';
import { useEditDesignationMutation, useGetDesignationsQuery, useGetTeamsDataMutation, usePostDesignationMutation } from '@slice/services';
import { performValidation } from '@utils/validations';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DesignationFormInput, DesignationRowData, DesignationTypes } from './types';
import { pluralize } from '@utils/pluralize';

export const useDesignationManagement = () => {
    const userDetails = useAppSelector(state => state.user),
        search = useAppSelector(state => state.search),
        { ActivePage } = useParams(),
        navigate = useNavigate(),
        { departmentList } = useDepartmentDropdownData();

    const [searchText, setSearchText] = useState(''),
        [modalState, setModalState] = useState(false),
        [input, setInput] = useState<DesignationFormInput>({
            designationName: '',
            teamId: '',
            departmentId: '',
            teamsList: [],
            teamsError: '',
            status: true
        }),
        [inputDisabled, setInputDisabled] = useState({
            designationName: false,
            teamId: false,
            departmentId: false,
            status: false
        }),
        [designations, setDesignations] = useState<DesignationTypes>([]),
        [newDesignationList, setNewDesignationList] = useState<string[]>([]),
        [errorText, setErrorText] = useState('');
    const [page, setPage] = useState<number>();
    const state = useLocation().state as DesignationRowData;
    const path = useLocation().pathname;
    const {
        data,
        isSuccess,
        error,
        isFetching: isLoading
    } = useGetDesignationsQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'page', value: ActivePage ?? page },
                { name: 'limit', value: 10 },
                { name: 'searchText', value: searchText }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const [addDesignation, { isSuccess: isAddSuccess, data: responseData, isLoading: isAddDesignationLoading }] =
        usePostDesignationMutation();
    const [editDesignation, { isSuccess: isEditSuccess, error: editDesignationError, isLoading: isEditDesignationLoading }] =
        useEditDesignationMutation();
    const [getTeamsData] = useGetTeamsDataMutation();

    const handlePageChange = (page: number) => {
        navigate(`${routeConstants.designationManagement}/${page}`);
        setPage(page);
    };

    const openModal = () => {
        setModalState(true);
    };
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const closeModal = useCallback(() => {
        setModalState(false);
        setInput({
            designationName: '',
            teamId: '',
            departmentId: '',
            teamsList: [],
            teamsError: '',
            status: true
        });
        setNewDesignationList([]);
        setErrorText('');
        navigateTo(`${routeConstants.designationManagement}/${ActivePage}`);
    }, [ActivePage, navigateTo]);

    const openEditModal = useCallback((rowData: DesignationRowData) => {
        setModalState(true);
        return getTeamsData({
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                {
                    name: 'departmentId',
                    value: rowData.departmentId
                }
            ]
        })
            .then((teamsData: any) => {
                const teamsList =
                    teamsData.data && teamsData.data.teams && teamsData.data.teams.length > 0
                        ? teamsData.data.teams
                              .filter((team: ITeam) => team.teamStatus === true)
                              .map((team: ITeam) => {
                                  return { value: team.id, label: team.teamName };
                              })
                              .sort((a: TeamsLabelData, b: TeamsLabelData) => a.label.localeCompare(b.label))
                        : rowData.teamId
                        ? [{ value: rowData.teamId, label: rowData.teamName }]
                        : [];

                const updatedInput = {
                    ...input,
                    designationName: rowData.designationName,
                    teamId: rowData.teamId,
                    departmentId: rowData.departmentId,
                    teamsList,
                    status: rowData.status,
                    teamsError:
                        !rowData.teamId && teamsData.data && teamsData.data.totalTeams === 0
                            ? 'This team is not linked with any department.'
                            : rowData.teamId || teamsList.length
                            ? ''
                            : 'Selected department has no active team.',
                    designationError: ''
                };
                setInput(updatedInput);
                return updatedInput;
            })
            .catch((err: Error) => {
                console.log(err);
                throw err;
            });
    }, []);

    const handleDesignationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const errors = performValidation(name, value);
        setInput(prevValue => ({
            ...prevValue,
            [name]: value
        }));
        setErrorText(errors);
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (state && state?.action === 'Edit') {
                if (e.key === 'Enter') handleSubmitDesignation();
                return;
            }
            const { designationName } = input;
            if ((e.key === 'Enter' || e.key === ',') && designationName.trim() !== '' && designationName.length <= 50) {
                e.preventDefault();
                const newEntry = designationName.trim();
                const errors = performValidation('designationName', newEntry);
                // performing a case insensitive check
                if (!newDesignationList.some(d => d.toLowerCase() === newEntry.toLowerCase()) && !errors) {
                    const updatedList = [...newDesignationList, newEntry];
                    setNewDesignationList(updatedList);
                }

                setInput(prev => {
                    return {
                        ...prev,
                        designationName: ''
                    };
                });
            }
        },
        [input, newDesignationList]
    );

    const handleRemoveChip = useCallback(
        (chipToRemove: string) => {
            if (newDesignationList.length === 1 && errorText) {
                setErrorText('');
            }
            setNewDesignationList(prev => prev.filter(name => name !== chipToRemove));
        },
        [newDesignationList]
    );

    const handleDropdownChange = (value: string) => {
        setInput(prevValues => ({
            ...prevValues,
            teamId: value
        }));
    };

    const handleDepartmentChange = (value: string) => {
        return getTeamsData({
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'departmentId', value }
            ]
        })
            .then((teamsData: any) => {
                const teamsList =
                    teamsData.data.teams && teamsData.data.teams.length > 0
                        ? teamsData.data.teams
                              .filter((team: ITeam) => team.teamStatus === true)
                              .map((team: ITeam) => {
                                  return { value: team.id, label: team.teamName };
                              })
                              .sort((a: TeamsLabelData, b: TeamsLabelData) => a.label.localeCompare(b.label))
                        : [];
                const updatedInput = {
                    ...input,
                    departmentId: value,
                    teamsList,
                    teamsError:
                        teamsData.data && teamsData.data.totalTeams === 0
                            ? 'This department is not linked with any team.'
                            : teamsList.length
                            ? ''
                            : 'Selected department has no active team.',
                    designationError: ''
                };

                setInput(updatedInput);
                return updatedInput;
            })
            .catch((err: Error) => {
                console.log(err);
                throw err;
            });
    };

    const handleToggleClick = () => {
        setInput(prevValues => ({
            ...prevValues,
            status: !prevValues.status
        }));
    };

    const handleSubmitDesignation = () => {
        const designationData = {
            ...input,
            actionBy: userDetails.id,
            ipAddress: '216.24.57.253:443',
            organisationId: userDetails.organisationId
        };

        const addDesignationPayload = newDesignationList.map(name => ({
            organisationId: userDetails.organisationId,
            teamId: input.teamId,
            designationName: name,
            status: input.status,
            departmentId: input.departmentId
        }));

        // if the input field has a value that is not in the chips, add it to the payload
        if (input.designationName.trim().length !== 0 && !newDesignationList.includes(input.designationName.trim())) {
            addDesignationPayload.push({
                designationName: input.designationName.trim(),
                teamId: input.teamId,
                departmentId: input.departmentId,
                status: input.status,
                organisationId: userDetails.organisationId
            });
        }

        // resetting the field after adding the designation
        setInput(prev => ({
            ...prev,
            designationName: ''
        }));

        if (state && state.action === 'Edit') {
            editDesignation({
                body: designationData,
                path: `${state?.id}`
            });
            localStorage.setItem('toast', 'true');
        } else {
            addDesignation({
                designations: addDesignationPayload,
                actionBy: userDetails.id,
                ipAddress: '216.24.57.253:443'
            });
            localStorage.setItem('toast', 'true');
        }
    };

    const onSearchClear = () => {
        setSearchText('');
        dispatch(
            updateSearch({
                ...search,
                searchText: ''
            })
        );
        navigate(`${routeConstants.designationManagement}/${1}`);
    };

    const onSearch = useCallback(
        (value: string) => {
            dispatch(
                updateSearch({
                    searchText: value,
                    modulePath: '/designations'
                })
            );
            navigate(`${routeConstants.designationManagement}/${1}`);
        },
        [dispatch, navigate]
    );
    const debouncedOnChange = useCallback(
        debounce(value => {
            onSearch(value);
        }, 500),
        []
    );
    const onSearchChange = useCallback(
        (val: string) => {
            setSearchText(val);
            debouncedOnChange(val);
        },
        [debouncedOnChange]
    );
    useEffect(() => {
        if (state) {
            openEditModal(state);
        }
    }, [openEditModal, state]);

    const isDisabled = useMemo(
        () =>
            !input.designationName.length ||
            !!errorText ||
            !input.teamId ||
            (state &&
                (state.action === 'View' ||
                    (state.action === 'Edit' && !state.departmentId) ||
                    (state.status === input.status && state.designationName === input.designationName && state.teamId === input.teamId))),
        [errorText, input, state]
    );

    useEffect(() => {
        if (data && isSuccess) {
            setDesignations(data.designations);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (editDesignationError) {
            const errorObj = editDesignationError as ErrorType;
            setErrorText(errorObj.data.errorMessage);
            setModalState(true);
        }
    }, [editDesignationError]);

    useEffect(() => {
        if (
            responseData &&
            responseData?.existingDesignation.length > 0 &&
            responseData?.addedDesignation.length > 0 &&
            localStorage.getItem('toast')
        ) {
            addToast({
                variant: 'success',
                header: `${responseData?.addedDesignation.length} ${pluralize(
                    responseData?.addedDesignation.length,
                    'designation'
                )} added successfully`,
                timer: 3000
            });
            localStorage.removeItem('toast');
        } else {
            if (isAddSuccess && responseData && responseData?.addedDesignation.length > 0 && localStorage.getItem('toast')) {
                closeModal();
                addToast({
                    variant: 'success',
                    header: `${responseData?.addedDesignation.length} ${pluralize(
                        responseData?.addedDesignation.length,
                        'designation'
                    )} added successfully`,
                    timer: 3000
                });
                localStorage.removeItem('toast');
                navigate(`${routeConstants.designationManagement}/${1}`);
            }
        }
    }, [closeModal, isAddSuccess, navigate, responseData]);

    useEffect(() => {
        if (isEditSuccess && localStorage.getItem('toast')) {
            closeModal();
            addToast({
                variant: 'success',
                header: `Designation updated successfully`,
                timer: 3000
            });
            localStorage.removeItem('toast');
        }
    }, [closeModal, isEditSuccess]);

    useEffect(() => {
        if (responseData && responseData?.existingDesignation?.length > 0) {
            setErrorText(`Following designation(s) already exists:`);
            // the new designations list will have the conflicted designations from backend
            setNewDesignationList(responseData?.existingDesignation);
        }
    }, [responseData]);

    useEffect(() => {
        if (state) {
            setInputDisabled({
                departmentId: state.action === 'View' || state.action === 'Edit',
                designationName: state.action === 'View' || (state.action === 'Edit' && state.teamId !== ''),
                teamId:
                    state.action === 'View' ||
                    (state.action === 'Edit' && input.departmentId === state.departmentId && state.teamId !== '' && !input.teamsError),
                status: state.action === 'View'
            });
        } else {
            setInputDisabled({
                designationName: false,
                teamId: false,
                departmentId: false,
                status: false
            });
        }
    }, [input.departmentId, input.designationName, input.teamsError, input.teamsList.length, state]);

    useEffect(() => {
        if (error) {
            setDesignations([]);
        }
    }, [error]);

    return {
        inputDisabled,
        state,
        isDisabled,
        openModal,
        closeModal,
        modalState,
        input,
        errorText,
        designations,
        isLoading,
        handleSubmitDesignation,
        handleToggleClick,
        handleDesignationChange,
        handleRemoveChip,
        handleKeyDown,
        ActivePage,
        handlePageChange,
        totalItems: designations?.length ? data?.totalDesignation : 0,
        isAddDesignationLoading,
        isEditDesignationLoading,
        handleDropdownChange,
        onSearchClear,
        onSearch,
        searchText,
        debouncedOnChange,
        handleDepartmentChange,
        departmentList,
        newDesignationList,
        onSearchChange,
        search
    };
};
