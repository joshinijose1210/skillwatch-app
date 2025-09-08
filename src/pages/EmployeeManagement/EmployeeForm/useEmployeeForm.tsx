import { ErrorType } from '@common';
import { useDepartmentDropdownData } from '@common/hooks/useDepartmentDropdownData';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { Option } from '@medly-components/core/dist/es/components/MultiSelect/types';
import { useAppSelector } from '@slice';
import {
    useAddNewEmployeeMutation,
    useEditEmployeeMutation,
    useGetDesignationsQuery,
    useGetEmployeeDataQuery,
    useGetExperienceListQuery,
    useGetGenderListQuery,
    useGetManagersListQuery,
    useGetReporteeListQuery,
    useGetRolesQuery,
    useGetTeamsQuery,
    useGetTimelineMutation
} from '@slice/services';
import { compareObjects } from '@utils/compareObjects';

import { performValidation } from '@utils/validations';
import format from 'date-fns/format';
import { parsePhoneNumber } from 'libphonenumber-js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { EmployeeData, InputErrors, ManagerData, RoleData, SelfData } from './types';
import { employeeFormValidations } from './utils/employeeFormValidations';
import { reValidateFormErrors } from './utils/reValidateFormErrors';

const useEmployeeForm = () => {
    const { id, ActivePage } = useParams();
    const path = useLocation().pathname,
        navigate = useNavigate(),
        userDetails = useAppSelector(state => state.user),
        modulePermission = useAppSelector(state => state.user.modulePermission),
        { isDepartmentReceived, isDepartmentLoading, department } = useDepartmentDropdownData();

    const action = useMemo(() => (path.includes('view-employee') ? 'View' : path.includes('edit-employee') ? 'Edit' : 'Add'), [path]),
        [showToast, setShowToast] = useState(false),
        [manager2List, setManager2List] = useState<Option[]>([]),
        [manager1DropdownList, setManager1DropdownList] = useState<ManagerData[]>([]),
        [hasError, setHasError] = useState(false),
        [openModal, setOpenModal] = useState(''),
        [description, setDescription] = useState(''),
        [disableManagerField, setDisableManagerField] = useState(false),
        [enableUpdate, setEnableUpdate] = useState(false),
        employeeDetailsRef = useRef(null),
        selfOptionId = -99,
        [employeeDetails, setEmployeeDetails] = useState<EmployeeData>({
            firstName: '',
            lastName: '',
            contactNo: '',
            dateOfBirth: '',
            genderId: -1,
            emailId: '',
            employeeId: '',
            designationId: -1,
            roleId: -1,
            teamId: -1,
            departmentId: -1,
            firstManagerId: -1,
            secondManagerId: -1,
            dateOfJoining: '',
            experienceInMonths: 0,
            organisationId: userDetails.organisationId,
            actionBy: userDetails.id,
            ipAddress: '216.24.57.253:443',
            status: true,
            isConsultant: false
        }),
        [selfOptionDetails] = useState<SelfData>({
            id: selfOptionId,
            isSelf: true,
            status: true,
            organisationId: 0,
            employeeId: '',
            firstName: '',
            lastName: '',
            emailId: '',
            contactNo: '',
            teamName: '',
            designationName: '',
            roleName: '',
            firstManagerId: 0,
            firstManagerEmployeeId: ''
        });

    const [inputErrors, setInputErrors] = useState<InputErrors>({
        firstName: '',
        lastName: '',
        emailId: '',
        employeeId: '',
        contactNo: '',
        designationId: '',
        roleId: '',
        teamId: '',
        departmentId: '',
        firstManagerId: '',
        dateOfJoining: '',
        experienceInMonths: '',
        dateOfBirth: '',
        genderId: ''
    });

    const [getTimeline, { data, isLoading: isTimelineLoading }] = useGetTimelineMutation();

    const { data: state, isFetching: empIsLoading } = useGetEmployeeDataQuery(
            {
                path: '',
                params: [{ name: 'id', value: id || '' }]
            },
            { refetchOnMountOrArgChange: true, skip: !id }
        ),
        { data: managerData, isFetching: isLoading } = useGetReporteeListQuery(
            {
                path: 'by-manager',
                params: [
                    { name: 'organisationId', value: userDetails.organisationId },
                    { name: 'managerId', value: id || '' }
                ]
            },
            { refetchOnMountOrArgChange: true, skip: action !== 'Edit' }
        ),
        {
            data: roles,
            isSuccess: isRolesReceived,
            isFetching: isRolesLoading
        } = useGetRolesQuery(
            { path: '', params: [{ name: 'organisationId', value: userDetails.organisationId }] },
            { refetchOnMountOrArgChange: true }
        ),
        { data: designations, isSuccess: isDesignationsReceived } = useGetDesignationsQuery(
            {
                path: '',
                params: [
                    { name: 'organisationId', value: userDetails.organisationId },
                    { name: 'teamId', value: employeeDetails.teamId },
                    { name: 'searchText', value: '' }
                ]
            },
            { refetchOnMountOrArgChange: true, skip: employeeDetails.teamId === -1 }
        ),
        {
            data: managers,
            isSuccess: isManagersReceived,
            isFetching: isManagersLoading
        } = useGetManagersListQuery(
            {
                path: '',
                params: [{ name: 'organisationId', value: userDetails.organisationId }]
            },
            { refetchOnMountOrArgChange: true }
        ),
        {
            data: teams,
            isSuccess: isTeamsReceived,
            isFetching: isTeamsLoading
        } = useGetTeamsQuery(
            {
                path: '',
                params: [
                    { name: 'organisationId', value: userDetails.organisationId },
                    { name: 'departmentId', value: employeeDetails.departmentId }
                ]
            },
            { refetchOnMountOrArgChange: true, skip: employeeDetails.departmentId === -1 }
        ),
        {
            data: experienceListData,
            isSuccess: isExperienceListReceived,
            isFetching: isExperienceListLoading
        } = useGetExperienceListQuery({ path: '', params: [{ name: 'organisationId', value: userDetails.organisationId }] }),
        {
            data: genderListData,
            isSuccess: isGenderListReceived,
            isFetching: isGenderListLoading
        } = useGetGenderListQuery({ path: '', params: [{ name: 'organisationId', value: userDetails.organisationId }] });

    const [addNewEmployee, { isLoading: addNewEmployeeLoading, error: addNewEmployeeError, isSuccess: addNewEmployeeSuccess }] =
            useAddNewEmployeeMutation(),
        [editEmployee, { isLoading: editEmployeeLoading, error: editEmployeeError, isSuccess: editEmployeeSuccess }] =
            useEditEmployeeMutation();

    const isSaveLoading = action === 'Edit' ? editEmployeeLoading : addNewEmployeeLoading,
        onSaveError = action === 'Edit' ? editEmployeeError : addNewEmployeeError,
        onSaveSuccess = action === 'Edit' ? editEmployeeSuccess : addNewEmployeeSuccess;

    const isDataLoading =
        isLoading ||
        isRolesLoading ||
        isManagersLoading ||
        empIsLoading ||
        isGenderListLoading ||
        isExperienceListLoading ||
        isDepartmentLoading;

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

    const rolesList = useMemo(() => {
            const filteredList = isRolesReceived ? roles?.roles.filter((role: RoleData) => role.status === true) : [];
            const list = isRolesReceived
                ? filteredList.map((role: RoleData) => {
                      return { value: role.id, label: role.roleName };
                  })
                : [];
            list.sort((a: Option, b: Option) => a.label.localeCompare(b.label));
            return list;
        }, [isRolesReceived, roles?.roles]),
        experienceList = useMemo(() => {
            const list = isExperienceListReceived
                ? experienceListData.map((experience: any) => {
                      return { value: experience.totalMonths, label: experience.experienceString };
                  })
                : [];
            return list;
        }, [experienceListData, isExperienceListReceived]),
        genderList = useMemo(() => {
            const list = isGenderListReceived
                ? genderListData.map((gender: any) => {
                      return { value: gender.genderId, label: gender.genderName };
                  })
                : [];
            return list;
        }, [genderListData, isGenderListReceived]),
        designationsList = useMemo(() => {
            if (isDesignationsReceived && designations && designations.totalDesignation !== 0) {
                return sortedData(designations?.designations, 'designationName', 'status');
            } else return [];
        }, [designations, sortedData, isDesignationsReceived]),
        managersList = useMemo(() => {
            const filteredList =
                isManagersReceived && manager1DropdownList?.length
                    ? manager1DropdownList.filter((manager: ManagerData) => manager.status === true)
                    : [];
            let list = filteredList
                ? filteredList.map((manager: ManagerData) => {
                      return {
                          value: manager.id,
                          label: manager.isSelf ? 'Self' : `${manager.firstName} ${manager.lastName} (${manager.employeeId})`
                      };
                  })
                : [];
            list = list.filter((manager: Option) => manager.value !== state?.id);
            list.sort((a: Option, b: Option) => a.label.localeCompare(b.label));
            const isSelfIndex = list.findIndex(item => item.value === selfOptionId);
            if (isSelfIndex >= 0) {
                if (isSelfIndex >= 0) {
                    list.splice(isSelfIndex, 1);
                }
                list.unshift({
                    value: selfOptionId,
                    label: 'Self'
                });
            }
            return list;
        }, [isManagersReceived, manager1DropdownList, state?.id, selfOptionId]);

    const teamsList = useMemo(() => {
        if (isTeamsReceived && teams?.teams) {
            return sortedData(teams.teams, 'teamName', 'teamStatus');
        }
        return [];
    }, [isTeamsReceived, sortedData, teams?.teams]);

    const departmentList = useMemo(() => {
        if (isDepartmentReceived && department?.departments) {
            return sortedData(department.departments, 'departmentName', 'departmentStatus');
        }
        return [];
    }, [isDepartmentReceived, sortedData]);

    const toggleModal = (str: string) => {
        setOpenModal(str);
    };

    const isOrgAdmin = useCallback(
        (roleId: number): boolean => {
            return roles && roles.roles.some((role: RoleData) => role.id === roleId && role.roleName === 'Org Admin');
        },
        [roles]
    );

    const toggleEmployeeStatus = () => {
            setEmployeeDetails({ ...employeeDetails, status: !employeeDetails.status });
        },
        goBackHandle = () => {
            navigate(routeConstants.firstEmployee);
        },
        handleDateChange = useCallback((name: string, value: Date) => {
            setEmployeeDetails((values: any) => {
                return {
                    ...values,
                    [name]: value !== null ? format(value, 'yyyy-MM-dd') : ''
                };
            });
        }, []),
        // value type kept as any since its being used at multiple locations
        handleDropdownChange = useCallback(
            (name: string, value: any) => {
                const errors = employeeFormValidations(name, value, inputErrors);
                setInputErrors(errors);
                setEmployeeDetails((values: EmployeeData) => {
                    if (name === 'firstManagerId' && (value === values.secondManagerId || value === selfOptionId)) {
                        return {
                            ...values,
                            [name]: value,
                            secondManagerId: undefined
                        };
                    }
                    if (
                        name === 'firstManagerId' &&
                        value === values.firstManagerId &&
                        employeeDetails.teamId &&
                        employeeDetails.roleId &&
                        isOrgAdmin(value)
                    ) {
                        return {
                            ...values,
                            firstManagerId: undefined
                        };
                    }
                    if (name === 'secondManagerId') {
                        if (values.secondManagerId === value) {
                            return {
                                ...values,
                                [name]: undefined
                            };
                        } else
                            return {
                                ...values,
                                [name]: value
                            };
                    } else if (name === 'departmentId') {
                        setInputErrors(prev => ({
                            ...prev,
                            teamId: ''
                        }));
                        return {
                            ...values,
                            [name]: value,
                            teamId: -1
                        };
                    } else if (name === 'teamId') {
                        setInputErrors(prev => ({
                            ...prev,
                            designationId: ''
                        }));
                        return {
                            ...values,
                            [name]: value,
                            designationId: -1
                        };
                    } else if (name === 'roleId') {
                        if (isOrgAdmin(value)) {
                            const prevManager1DropdownList = [selfOptionDetails, ...manager1DropdownList];
                            const isSelfValueIndex = manager1DropdownList.findIndex(item => item.id === selfOptionId);
                            if (isSelfValueIndex < 0) {
                                setManager1DropdownList(prevManager1DropdownList);
                                return {
                                    ...values,
                                    [name]: value,
                                    firstManagerId: selfOptionId,
                                    secondManagerId: undefined
                                };
                            } else {
                                return {
                                    ...values,
                                    [name]: value
                                };
                            }
                        } else {
                            setManager1DropdownList([...managers?.managers]);
                            const currentFirstMangerId = values.firstManagerId && values.firstManagerId > 0 ? values.firstManagerId : -1;
                            return {
                                ...values,
                                [name]: value,
                                firstManagerId: currentFirstMangerId
                            };
                        }
                    } else
                        return {
                            ...values,
                            [name]: value
                        };
                });
            },
            [employeeDetails.roleId, employeeDetails.teamId, inputErrors, manager1DropdownList, managers?.managers, isOrgAdmin]
        ),
        handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setHasError(false);
                const { name, value } = e.target;
                const errors = employeeFormValidations(name, value, inputErrors);
                setInputErrors(errors);
                setEmployeeDetails(values => ({
                    ...values,
                    [name]: value
                }));
                Object.values(errors as InputErrors).forEach((val: string) => {
                    if (val.length > 0) {
                        setHasError(true);
                        return;
                    }
                });
            },
            [inputErrors]
        ),
        validateData = useCallback(() => {
            let valid = true;
            Object.values(inputErrors).forEach((val: string) => val.length > 0 && (valid = false));
            return valid;
        }, [inputErrors]),
        handlePhoneNumber = (value: string) => {
            setInputErrors(prev => ({
                ...prev,
                contactNo: performValidation('contactNo', value)
            }));
            setHasError(false);
            setEmployeeDetails({ ...employeeDetails, contactNo: value });
        },
        saveData = useCallback(async () => {
            if (action === 'Edit' && employeeDetails.roleId !== state.roleId && !openModal) {
                toggleModal('roleChange');
                return;
            }
            if (!employeeDetails.status && managerData && managerData.reporteesCount !== 0 && !openModal) {
                toggleModal('deactivateUser');
                return;
            }
            if (action === 'Add' && employeeDetails.isConsultant && !openModal) {
                toggleModal('isConsultant');
                return;
            }
            if (action === 'Edit' && employeeDetails.isConsultant !== state.isConsultant && !openModal) {
                toggleModal('isConsultant');
                return;
            }
            const errors = reValidateFormErrors(employeeDetails, inputErrors);
            const updatedDetails = {
                ...employeeDetails,
                contactNo: parsePhoneNumber(`+${Number(employeeDetails.contactNo)}`).format('E.164')
            };
            if (
                employeeDetails.teamId &&
                employeeDetails.roleId &&
                isOrgAdmin(employeeDetails.roleId) &&
                inputErrors.firstManagerId !== ''
            ) {
                errors.firstManagerId = '';
            }
            setInputErrors(errors);
            setEmployeeDetails(updatedDetails);

            if (validateData()) {
                const onSave = action === 'Edit' ? editEmployee : addNewEmployee;
                updatedDetails.actionBy = userDetails.id;
                updatedDetails.ipAddress = '216.24.57.253:443';
                employeeDetails.secondManagerId === -1 && delete updatedDetails['secondManagerId'];
                if (updatedDetails.firstManagerId === updatedDetails.secondManagerId) {
                    delete updatedDetails['secondManagerId'];
                }
                if (employeeDetails.firstManagerId === selfOptionId) {
                    delete updatedDetails['firstManagerId'];
                }
                onSave({ path: action === 'Edit' ? state.id : '', data: { updatedDetails } });
                setShowToast(true);
            }
            setOpenModal('');
        }, [
            action,
            employeeDetails,
            state,
            openModal,
            inputErrors,
            isOrgAdmin,
            validateData,
            editEmployee,
            addNewEmployee,
            userDetails.id,
            managerData,
            selfOptionId
        ]),
        handleRoleChangeProceed = () => {
            if (action === 'Edit' && managerData && managerData.reporteesCount !== 0) {
                navigate(`${routeConstants.employeeManagement}/${ActivePage ?? 1}/edit-employee/${id}/change-role`, {
                    state: { employeeDetails, managerData, isLoading, heading: 'Change Role' }
                });
            } else saveData();
            setOpenModal('');
        },
        handleModalProceedClick = () => {
            if (openModal === 'isConsultant') {
                saveData();
                return;
            }
            if (openModal === 'deactivateUser') {
                toggleEmployeeStatus();
                navigate(`${routeConstants.employeeManagement}/${ActivePage ?? 1}/edit-employee/${id}/deactivate-manager`, {
                    state: { employeeDetails, managerData, isLoading, heading: 'Change Manager' }
                });
                return;
            }
            if (openModal === 'roleChange') {
                handleRoleChangeProceed();
            }
        },
        isFormFilled = useCallback(() => {
            const employeeDetailsObj = { ...employeeDetails };
            if (
                employeeDetails.teamId &&
                employeeDetails.roleId &&
                isOrgAdmin(employeeDetails.roleId) &&
                employeeDetails.firstManagerId === -1
            ) {
                delete employeeDetailsObj.firstManagerId;
            }
            delete employeeDetailsObj.secondManagerId;
            delete employeeDetailsObj.status;
            delete employeeDetailsObj.actionBy;
            delete employeeDetailsObj.ipAddress;

            return (
                Object.values(employeeDetailsObj).every(value => value !== '' && value !== -1) &&
                Object.values(inputErrors).every(value => value === '')
            );
        }, [employeeDetails, inputErrors, isOrgAdmin]);

    const checkSpecificValue = (data: any, value: any) => {
        return data.some((item: any) => item.value === value);
    };

    const isSaveDisabled = useMemo(() => {
        const common = isSaveLoading || !isFormFilled() || !!hasError || !!inputErrors.contactNo;
        if (action === 'Edit') {
            return common || compareObjects(employeeDetails, state);
        } else return common;
    }, [action, employeeDetails, hasError, inputErrors.contactNo, isFormFilled, isSaveLoading, state]);

    const toggleCheckbox = () => {
        setEmployeeDetails(prev => {
            return { ...prev, isConsultant: !employeeDetails.isConsultant };
        });
    };

    useEffect(() => {
        setManager1DropdownList(managers?.managers);
        if ((state && path.toLowerCase().includes('edit')) || path.toLowerCase().includes('view')) {
            const employeeDetailsTemplate = {
                firstName: '',
                lastName: '',
                contactNo: '',
                dateOfBirth: '',
                genderId: -1,
                emailId: '',
                employeeId: '',
                designationId: '',
                roleId: -1,
                teamId: -1,
                departmentId: -1,
                firstManagerId: -1,
                secondManagerId: -1,
                dateOfJoining: '',
                experienceInMonths: 0,
                organisationId: userDetails.organisationId,
                actionBy: userDetails.id,
                ipAddress: '216.24.57.253:443',
                status: true
            };
            let details = {
                ...employeeDetailsTemplate,
                ...state
            };
            if (state?.id === state?.firstManagerId) {
                if (managers?.managers.length > 0) {
                    const updateManager1DropdownList = [selfOptionDetails, ...managers?.managers];
                    setManager1DropdownList(updateManager1DropdownList);
                }
                details = {
                    ...details,
                    firstManagerId: selfOptionId
                };
            }
            setEmployeeDetails(details);
            employeeDetailsRef.current = details;
            setInputErrors({
                firstName: '',
                lastName: '',
                emailId: '',
                employeeId: '',
                contactNo: '',
                designationId: '',
                roleId: '',
                teamId: '',
                departmentId: '',
                firstManagerId: '',
                dateOfJoining: '',
                experienceInMonths: '',
                dateOfBirth: '',
                genderId: ''
            });
        }
    }, [path, state, managers?.managers]);

    useEffect(() => {
        if (isDepartmentReceived && isTeamsReceived) {
            if (
                (action && teams && teams.totalTeams !== 0) ||
                (action === 'Edit' && teams && teams.totalTeams !== 0 && checkSpecificValue(departmentList, employeeDetails.departmentId))
            ) {
                if (
                    action === 'Edit' &&
                    checkSpecificValue(departmentList, employeeDetails.departmentId) &&
                    departmentList.find((d: Option) => d.value === employeeDetails.departmentId && d.disabled === true)
                ) {
                    setInputErrors(prev => ({
                        ...prev,
                        departmentId: 'Department selected is inactive, Kindly select a new one'
                    }));
                    setEmployeeDetails(prev => ({
                        ...prev,
                        teamId: -1,
                        designationId: -1
                    }));
                } else {
                    setInputErrors(prev => ({
                        ...prev,
                        departmentId: ''
                    }));
                }
            } else if (
                (action === 'Add' && teams && teams.totalTeams === 0 && checkSpecificValue(departmentList, employeeDetails.departmentId)) ||
                (action === 'Edit' && teams && teams.totalTeams === 0 && checkSpecificValue(departmentList, employeeDetails.departmentId))
            ) {
                setInputErrors(prev => ({
                    ...prev,
                    departmentId: 'This department is not linked with any team.'
                }));
                setEmployeeDetails(prev => ({
                    ...prev,
                    teamId: -1,
                    designationId: -1
                }));
            }
        }
    }, [action, departmentList, employeeDetails.departmentId, isDepartmentReceived, isTeamsReceived, teams]);

    useEffect(() => {
        if (isTeamsReceived && isDesignationsReceived) {
            if (
                (action && designations && designations.totalDesignation !== 0) ||
                (action === 'Edit' &&
                    designations &&
                    designations.totalDesignation !== 0 &&
                    checkSpecificValue(teamsList, employeeDetails.teamId))
            ) {
                setInputErrors(prev => ({
                    ...prev,
                    teamId: ''
                }));
            } else if (
                (action === 'Add' &&
                    designations &&
                    designations.totalDesignation === 0 &&
                    checkSpecificValue(teamsList, employeeDetails.teamId)) ||
                (action === 'Edit' &&
                    designations &&
                    designations.totalDesignation === 0 &&
                    checkSpecificValue(teamsList, employeeDetails.teamId))
            ) {
                setInputErrors(prev => ({
                    ...prev,
                    teamId: 'This team is not linked with any designation.'
                }));
                setEmployeeDetails(prev => ({
                    ...prev,
                    designationId: -1
                }));
            } else if (
                action === 'Edit' &&
                checkSpecificValue(teamsList, employeeDetails.teamId) &&
                teamsList.find((d: Option) => d.value === employeeDetails.teamId && d.disabled === true)
            ) {
                setInputErrors(prev => ({
                    ...prev,
                    teamId: 'Inactive team. Kindly assign a new one.'
                }));
                setEmployeeDetails(prev => ({
                    ...prev,
                    designationId: -1
                }));
            }

            if (
                action === 'Edit' &&
                employeeDetails.designationId !== -1 &&
                state.designationId === employeeDetails.designationId &&
                designationsList.find((d: Option) => d.value === state.designationId && d.disabled === true)
            ) {
                setInputErrors(prev => ({
                    ...prev,
                    designationId: 'Inactive designation. Kindly assign a new one.'
                }));
            }
            if (
                designations &&
                designations.totalDesignation !== 0 &&
                designations?.designations.every((item: any) => item.status === false)
            ) {
                setInputErrors(prev => ({
                    ...prev,
                    teamId: 'Selected team has no active designations.'
                }));
                setEmployeeDetails(prev => ({
                    ...prev,
                    designationId: -1
                }));
            }
        }
    }, [
        action,
        designations,
        designationsList,
        employeeDetails.designationId,
        employeeDetails.teamId,
        isDesignationsReceived,
        isTeamsReceived,
        state,
        teamsList
    ]);

    useEffect(() => {
        if (typeof onSaveError === 'object') {
            const errorObj = onSaveError as ErrorType;
            addToast({
                variant: 'error',
                header: errorObj.data.errorMessage,
                timer: 3000
            });
            setHasError(true);
        } else if (onSaveSuccess === true) {
            addToast({
                variant: 'success',
                header: action === 'Edit' ? 'Employee updated successfully' : 'Employee added successfully',
                timer: 3000
            });
            if (path.includes(routeConstants.firstEmployeeRedirect)) {
                navigate(`${routeConstants.firstEmployeeRedirect}/${1}`);
            } else {
                navigate(`${routeConstants.employeeManagement}/${ActivePage}`);
            }

            setHasError(false);
        }
    }, [action, navigate, onSaveError, onSaveSuccess, showToast, ActivePage, path]);

    useEffect(() => {
        if (employeeDetails.firstManagerId && managersList.length) {
            const updatedList = managersList
                ?.filter((manager: Option) => manager.value !== employeeDetails.firstManagerId && manager.value !== selfOptionId)
                .sort((a: Option, b: Option) => a.label.localeCompare(b.label));

            setManager2List(updatedList);
        }
    }, [employeeDetails.firstManagerId, managersList, selfOptionId]);

    useEffect(() => {
        if (data?.[0]?.managerReviewStartDate && data[0]?.checkInWithManagerEndDate && action === 'Edit') {
            setDisableManagerField(disableEdit);
        }
    }, [action, data]);

    useEffect(() => {
        getTimeline({
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewToId', value: userDetails.id }
            ]
        });
    }, [path, getTimeline, userDetails.organisationId, userDetails.id]);

    const disableEdit = useMemo(() => {
        if (!data || data.length === 0) {
            return false;
        }
        const timelineItem = data[0];
        return (
            timelineItem?.isSelfReviewActive ||
            timelineItem?.isManagerReviewActive ||
            timelineItem?.isCheckInWithManagerActive ||
            timelineItem?.selfReviewPublish
        );
    }, [data, isTimelineLoading]);

    useEffect(() => {
        let modalDescription = '';
        const employeeData =
            employeeDetails.firstName &&
            employeeDetails.lastName &&
            `${employeeDetails?.firstName.charAt(0).toUpperCase() + employeeDetails?.firstName.slice(1)} ${
                employeeDetails?.lastName.charAt(0).toUpperCase() + employeeDetails?.lastName.slice(1)
            }(${employeeDetails?.employeeId})`;
        if (action === 'Edit' && openModal === 'isConsultant') {
            modalDescription =
                (employeeDetails?.firstName &&
                    employeeDetails?.lastName &&
                    `Are you sure you want to set ${employeeData} ${
                        employeeDetails.isConsultant ? 'as a Consultant/Contractor?' : 'as a full time employee?'
                    } `) ||
                '';
            setDescription(modalDescription);
            return;
        }
        if (action === 'Edit' && openModal !== 'isConsultant') {
            modalDescription =
                (employeeDetails.firstName &&
                    employeeDetails.lastName &&
                    `Are you sure you want to ${openModal === 'deactivateUser' ? 'deactivate' : 'change the role of'} ${employeeData}?`) ||
                '';
            setDescription(modalDescription);
            return;
        }

        if (action === 'Add' && employeeDetails.isConsultant) {
            modalDescription =
                (employeeDetails?.firstName &&
                    employeeDetails?.lastName &&
                    `Are you sure you want to set ${employeeData} as a Consultant/Contractor?`) ||
                '';
            setDescription(modalDescription);
        }
    }, [
        employeeDetails.isConsultant,
        state,
        action,
        employeeDetails.roleId,
        employeeDetails.firstName,
        employeeDetails.lastName,
        employeeDetails.employeeId,
        openModal
    ]);

    useEffect(() => {
        const isForm = isFormFilled();
        if (action === 'Edit' && employeeDetails?.employeeId && employeeDetailsRef.current) {
            setEnableUpdate(JSON.stringify(employeeDetailsRef.current) !== JSON.stringify(employeeDetails) && isForm);
        }
    }, [action, employeeDetails]);

    return {
        isDataLoading,
        state,
        manager2List,
        saveData,
        isSaveLoading,
        rolesList,
        designationsList,
        teamsList,
        managerData,
        disableManagerField,
        toggleEmployeeStatus,
        handleDropdownChange,
        handleInputChange,
        action,
        employeeDetails,
        managersList,
        validateData,
        isFormFilled,
        hasError,
        goBackHandle,
        handlePhoneNumber,
        path,
        setOpenModal,
        toggleModal,
        openModal,
        handleModalProceedClick,
        checkSpecificValue,
        modulePermission,
        inputErrors,
        isSaveDisabled,
        handleDateChange,
        experienceList,
        genderList,
        description,
        toggleCheckbox,
        enableUpdate,
        departmentList,
        disableEdit
    };
};

export default useEmployeeForm;
