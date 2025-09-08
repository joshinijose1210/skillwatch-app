import { useDepartmentDropdownData } from '@common/hooks/useDepartmentDropdownData';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { Designation } from '@pages/EmployeeManagement/types';
import { useAppSelector } from '@slice';
import {
    useEditKpiMutation,
    useGetActiveReviewCycleQuery,
    useGetDesignationMutation,
    useGetTeamsDataMutation,
    useGetTeamsQuery,
    usePostKpiMutation
} from '@slice/services';
import { performValidation } from '@utils/validations';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { KpiDepartmentTeamDesignation, KpiDropdownItem, KpiDropdownItemList, KpiErrorType } from './types';
import { useKRADropdownData } from '@common/hooks/useKRADropdownData';
import { KraType } from '@pages/KraManagement/useKraManagement';
import { GRACE_PERIOD_MS } from '@constants/data';

export const useKPIForm = () => {
    const userDetails = useAppSelector(state => state.user);
    const { isDepartmentReceived, department } = useDepartmentDropdownData();
    const { ActivePage } = useParams();
    const [reviewCycleActive, setReviewCycleActive] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [kpiData, setKpiData] = useState({ title: '', status: true });
    const [kraId, setKraId] = useState<KraType['id'] | null>(null);
    const [isStateMapping, setIsStateMapping] = useState(false);
    const [kpiDropDown, setKpiDropDown] = useState<KpiDropdownItemList>([
        {
            designationIds: [],
            designationList: [],
            teamsList: [],
            teamId: '',
            departmentId: '',
            designationRefId: Math.ceil(Math.random() * 1000),
            teamError: '',
            departmentError: '',
            designationError: ''
        }
    ]);
    const kpiDropdwonRef = useRef<KpiDropdownItemList>([]);
    const [description, setDescription] = useState('');
    const [addKpi, { isError: addError, isSuccess: isAddSuccess, isLoading: isAddLoading, error: addKPIError }] = usePostKpiMutation();
    const [editkpi, { isError: editError, isSuccess: isEditSuccess, isLoading: isEditLoading, error: editKPIError }] = useEditKpiMutation();

    const { data, isSuccess } = useGetTeamsQuery({ path: '', params: [{ name: 'organisationId', value: userDetails.organisationId }] });
    const { data: activeReviewCycleData, isSuccess: hasFetchedActiveCycle } = useGetActiveReviewCycleQuery(
        {
            path: 'active',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        },
        {
            refetchOnMountOrArgChange: true
        }
    );
    const { krasList } = useKRADropdownData();
    const [getDesignation] = useGetDesignationMutation();
    const [getTeamsData] = useGetTeamsDataMutation();

    const navigate = useNavigate(),
        state = useLocation().state as any;

    const sortedData = useCallback((data: any, labelField: string, disableField: string) => {
        const activeItems = data
            .filter((item: any) => item[disableField] === true)
            .map((item: any) => ({ value: item.id, label: item[labelField] }))
            .sort((a: any, b: any) => a.label.localeCompare(b.label));
        const inActiveItems = data
            .filter((item: any) => item[disableField] === false)
            .map((item: any) => ({ value: item.id, label: item[labelField], disabled: true }))
            .sort((a: any, b: any) => a.label.localeCompare(b.label));

        return [...activeItems, ...inActiveItems];
    }, []);

    const departmentList = useMemo(() => {
        if (isDepartmentReceived && department?.departments) {
            return sortedData(department.departments, 'departmentName', 'departmentStatus');
        }
        return [];
    }, [department, isDepartmentReceived, sortedData]);

    const removeHtmlTags = (tempStr: string): string => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tempStr;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const disableUpdateBtn = useMemo(() => {
        let valid = false;
        const kpiError = performValidation('kpi-description', removeHtmlTags(description));
        if (kpiData.title.length === 0 || kpiData.title.length > 60 || kpiError.length !== 0 || !kraId) {
            valid = true;
        } else {
            kpiDropDown.forEach((element: KpiDropdownItem) => {
                if (
                    (element.teamId && element.teamId.length < 1) ||
                    (element.designationIds && element.designationIds.length === 0) ||
                    element.teamError !== '' ||
                    element.designationError !== ''
                ) {
                    valid = true;
                }
            });
        }

        return valid;
    }, [kpiData, description, kpiDropDown, kraId]);

    const handleToggleClick = () => {
        setKpiData({ ...kpiData, status: !kpiData.status });
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKpiData({ ...kpiData, title: e.target.value });
    };
    const handleDepartmentChange = (value: string, id: number) => {
        return getTeamsData({
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'departmentId', value }
            ]
        })
            .then((teamsData: any) => {
                const newData = kpiDropDown.map((team: KpiDropdownItem) => {
                    if (team.designationRefId === id) {
                        const teamsList =
                            teamsData.data.teams && teamsData.data.teams.length > 0
                                ? sortedData(teamsData.data?.teams, 'teamName', 'teamStatus')
                                : [];
                        return {
                            ...team,
                            departmentId: value,
                            teamsList,
                            teamId: '',
                            designationIds: [],
                            designationList: [],
                            departmentError:
                                teamsData.data && teamsData.data.totalTeams === 0
                                    ? 'This department is not linked with any team.'
                                    : teamsList.length
                                    ? ''
                                    : 'Selected department has no active team.',
                            teamError: ''
                        };
                    } else return team;
                });
                kpiDropdwonRef.current = newData;
                setKpiDropDown(newData);
                return data;
            })
            .catch(err => console.log(err));
    };
    const isTeamIdExists = (teamId: string, teamList: KpiDropdownItemList): boolean => {
        return teamList.some((entry: KpiDropdownItem) => entry.teamId === teamId);
    };
    const handleTeamChange = (value: string, id: number) => {
        if (isTeamIdExists(value, kpiDropDown)) {
            const newData = kpiDropDown.map((team: KpiDropdownItem) => {
                if (team.designationRefId === id) {
                    return {
                        ...team,
                        teamError: 'This team is already selected',
                        designationError: ''
                    };
                } else return team;
            });
            kpiDropdwonRef.current = newData;
            setKpiDropDown(newData);
            return data;
        } else {
            getDesignation({
                path: '',
                params: [
                    { name: 'organisationId', value: userDetails.organisationId },
                    { name: 'teamId', value },
                    { name: 'searchText', value: '' }
                ]
            })
                .then((designationsData: any) => {
                    const newData = kpiDropDown.map((team: KpiDropdownItem) => {
                        if (team.designationRefId === id) {
                            const designationList =
                                designationsData.data.designations && designationsData.data.designations.length > 0
                                    ? designationsData.data.designations
                                          .map((d: Designation) => {
                                              if (d.status) {
                                                  return { label: d.designationName, value: d.id };
                                              }
                                          })
                                          .filter((i: any) => !!i)
                                    : [];

                            return {
                                ...team,
                                teamId: value,
                                designationList,
                                teamError:
                                    designationsData.data && designationsData.data.totalDesignation === 0
                                        ? 'This team is not linked with any designation.'
                                        : designationList.length
                                        ? ''
                                        : 'Selected team has no active designations.',
                                designationError: ''
                            };
                        } else return team;
                    });
                    kpiDropdwonRef.current = newData;
                    setKpiDropDown(newData);
                    return data;
                })
                .catch(err => console.log(err));
        }
    };
    const handleDesignationChange = (value: number[], id: number) => {
        const newArray = kpiDropdwonRef.current.map((designation: KpiDropdownItem) => {
            if (designation.designationRefId === id) {
                return {
                    ...designation,
                    designationIds: value,
                    designationError: value.length === 0 ? 'Please select a designation' : ''
                };
            } else return designation;
        });
        const updateKpiDropdown = [...newArray];
        kpiDropdwonRef.current = updateKpiDropdown;
        setKpiDropDown(updateKpiDropdown);
    };
    const handleAddAnotherDropDowns = (isEditOptionsDisabled?: boolean) => {
        if (isEditOptionsDisabled) return null;

        const updateKpiDropdown = [
            ...kpiDropDown,
            {
                designationIds: [],
                designationList: [],
                teamsList: [],
                teamId: '',
                departmentId: '',
                designationRefId: new Date().getTime(),
                teamError: '',
                departmentError: '',
                designationError: ''
            }
        ];
        kpiDropdwonRef.current = updateKpiDropdown;
        setKpiDropDown(updateKpiDropdown);
    };
    const handleKraOnChange = (e: any) => {
        setKraId(e);
    };
    const handleAddKpi = () => {
        if (reviewCycleActive && !showModal) {
            setShowModal(true);
            return;
        }
        const requestPayload = {
            kpiTitle: kpiData.title,
            kpiDescription: description,
            kpiDepartmentTeamDesignations: kpiDropDown,
            kpiStatus: kpiData.status,
            organisationId: userDetails.organisationId,
            ipAddress: '216.24.57.253:443',
            actionBy: userDetails.id,
            kraId
        };
        if (state && state.id) {
            editkpi({
                id: state.id,
                ...requestPayload
            });
        } else {
            addKpi(requestPayload);
        }
    };

    const handleRemoveField = (removeId: number) => {
        setKpiDropDown(prevState => {
            const newInputFields = prevState.filter(({ designationRefId }: KpiDropdownItem) => designationRefId !== removeId);
            const updateKpiDropdown = [...newInputFields];
            kpiDropdwonRef.current = updateKpiDropdown;
            return [...newInputFields];
        });
    };

    useEffect(() => {
        async function mapState() {
            if (state?.action) {
                setIsStateMapping(true);
                if (state.action === 'add') {
                    setKpiData({
                        title: state?.title || '',
                        status: state?.status || true
                    });
                } else {
                    setKpiData({
                        title: state?.title || '',
                        status: state?.status || false
                    });
                }
                setKraId(state?.kraId || null);

                setDescription(state?.description || '');
                if (state.kpiDepartmentTeamDesignations && state.kpiDepartmentTeamDesignations.length > 0) {
                    const newData = state.kpiDepartmentTeamDesignations.map(async (data: KpiDepartmentTeamDesignation) => {
                        const result: any = await getTeamsData({
                            path: '',
                            params: [
                                { name: 'organisationId', value: userDetails.organisationId },
                                { name: 'departmentId', value: data.departmentId }
                            ]
                        });
                        const teamsList =
                            result.data.teams && result.data.teams.length > 0
                                ? sortedData(result?.data?.teams, 'teamName', 'teamStatus')
                                : [];

                        const isTeamDisabled = teamsList.find(team => team.disabled === true && team.value === data.teamId);
                        if (!isTeamDisabled) {
                            const result: any = await getDesignation({
                                path: '',
                                params: [
                                    { name: 'organisationId', value: userDetails.organisationId },
                                    { name: 'teamId', value: data.teamId },
                                    { name: 'searchText', value: '' }
                                ]
                            });
                            const designationIds: number[] =
                                data.designationIds && data.designationIds.length
                                    ? result?.data?.designations &&
                                      result.data.designations
                                          .map((d: Designation) => {
                                              if (d.status && data.designationIds.indexOf(d.id) >= 0) {
                                                  return d.id;
                                              }
                                          })
                                          .filter((i: number) => !!i)
                                    : [];

                            return {
                                designationIds,
                                designationList:
                                    result.data && result.data.designations && result.data.designations.length > 0
                                        ? sortedData(result.data.designations, 'designationName', 'status')
                                        : [],
                                teamId: data.teamId,
                                teamsList,
                                departmentId: data.departmentId,
                                designationRefId: Math.ceil(Math.random() * 1000),
                                designationError:
                                    result.data.totalDesignation !== 0 && (designationIds || []).length === 0
                                        ? 'One or more selected designations are inactive. Please select a new one.'
                                        : '',
                                teamError: result.data.totalDesignation === 0 ? 'This team is not linked with any designation.' : ''
                            };
                        } else {
                            return {
                                designationIds: data.designationIds || [],
                                designationList: [],
                                teamsList,
                                teamId: data.teamId,
                                departmentId: data.departmentId,
                                designationRefId: Math.ceil(Math.random() * 1000),
                                teamError: 'The team is inactive. Kindly activate the team or add a new one.'
                            };
                        }
                    });
                    const resolvedData = await Promise.all(newData);
                    kpiDropdwonRef.current = resolvedData;
                    setKpiDropDown(resolvedData);
                }
                setIsStateMapping(false);
            }
        }
        isSuccess && mapState();
    }, [data, getDesignation, isSuccess, state, userDetails.organisationId, sortedData, getTeamsData]);

    useEffect(() => {
        if (addError) {
            const addKPIErrorMessage = (addKPIError as KpiErrorType)?.data?.errorMessage;
            addToast({
                variant: 'error',
                header: addKPIErrorMessage,
                timer: 3000
            });
        }
    }, [addError]);

    useEffect(() => {
        if (editError) {
            const editKPIErrorMessage = (editKPIError as KpiErrorType)?.data?.errorMessage;

            addToast({
                variant: 'error',
                header: editKPIErrorMessage,
                timer: 3000
            });
        }
    }, [editError]);

    useEffect(() => {
        if (isAddSuccess) {
            addToast({
                variant: 'success',
                header: 'KPI added successfully',
                timer: 3000
            });
            navigate(`${routeConstants.kpiManagement}/${ActivePage}`);
        }
    }, [isAddSuccess, navigate]);
    useEffect(() => {
        if (
            activeReviewCycleData &&
            new Date(activeReviewCycleData.selfReviewStartDate) < new Date() &&
            new Date(activeReviewCycleData.endDate) > new Date()
        )
            setReviewCycleActive(true);
    }, [activeReviewCycleData, hasFetchedActiveCycle]);

    useEffect(() => {
        if (isEditSuccess) {
            navigate(`${routeConstants.kpiManagement}/${ActivePage}`);
            addToast({
                variant: 'success',
                header: 'KPI updated successfully',
                timer: 3000
            });
        }
    }, [ActivePage, isEditSuccess, navigate]);

    // disable the dropwdowns in edit when the review cycle is active and the self review has started
    const isEditOptionsDisabled = useMemo(() => {
        if (
            hasFetchedActiveCycle &&
            activeReviewCycleData &&
            new Date(activeReviewCycleData?.selfReviewStartDate) < new Date() &&
            new Date(activeReviewCycleData?.checkInWithManagerEndDate + GRACE_PERIOD_MS) > new Date() &&
            activeReviewCycleData?.publish
        ) {
            return true;
        } else {
            return false;
        }
    }, [activeReviewCycleData, hasFetchedActiveCycle]);

    return {
        handleAddKpi,
        isStateMapping,
        isAddLoading,
        isEditLoading,
        handleToggleClick,
        kpiData,
        description,
        setDescription,
        state,
        handleOnChange,
        showModal,
        setShowModal,
        reviewCycleActive,
        kpiDropDown,
        handleTeamChange,
        handleDesignationChange,
        handleAddAnotherDropDowns,
        handleRemoveField,
        disableUpdateBtn,
        handleDepartmentChange,
        handleKraOnChange,
        departmentList,
        krasList,
        kraId,
        isEditOptionsDisabled
    };
};
