import { routeConstants } from '@constants';
import apiUrls from '@constants/apiUrls';
import { Option } from '@medly-components/core/dist/es/components/SingleSelect/types';
import { debounce } from '@medly-components/utils';
import { useAppDispatch, useAppSelector } from '@slice';
import { updateKPIFilter } from '@slice/kpiFilter';
import { updateSearch } from '@slice/search';
import { useGetKpisQuery, useGetReviewCycleDataMutation, useGetTeamsQuery, useGetDesignationsQuery } from '@slice/services';
import { downloadCSV } from '@utils/downloadCSV';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { kpiStatusOptions } from '../../constants/data';
import { KpiTypes } from './types';
import { useDepartmentDropdownData } from '@common/hooks/useDepartmentDropdownData';
import { useKRADropdownData } from '@common/hooks/useKRADropdownData';
import { Designation, Team } from './types';

export const useKpiManagement = () => {
    const userDetails = useAppSelector(state => state.user),
        { ActivePage } = useParams(),
        search = useAppSelector(state => state.search),
        { modulePermission } = useAppSelector(state => state.user);
    const filterData = useAppSelector(state => state.kpiFilter);
    const module = modulePermission?.find(module => module.moduleName === 'KPIs');

    const dispatch = useAppDispatch();
    const [sampleKpiModal, setSampleKpiModal] = useState(false);
    const [page, setPage] = useState<number>();
    const [kpis, setKpis] = useState<KpiTypes>([]);
    const [searchText, setSearchText] = useState('');
    const navigateTo = useNavigate();
    const navigate = useNavigate();
    const [getActiveReviewCycle, { data: activeReviewCycleData, isSuccess: hasFetchedActiveCycle }] = useGetReviewCycleDataMutation();
    const { departmentList } = useDepartmentDropdownData(),
        { data: teams, isSuccess: isTeamsReceived } = useGetTeamsQuery(
            {
                path: '',
                params: [
                    { name: 'organisationId', value: userDetails.organisationId },
                    ...(filterData.selectedDepartments.length ? [{ name: 'departmentId', value: filterData.selectedDepartments }] : [])
                ]
            },
            { refetchOnMountOrArgChange: true }
        ),
        { data: designations, isSuccess: isDesignationsReceived } = useGetDesignationsQuery(
            {
                path: '',
                params: [
                    { name: 'organisationId', value: userDetails.organisationId },
                    ...(filterData.selectedTeams.length ? [{ name: 'teamId', value: filterData.selectedTeams }] : [])
                ]
            },
            { refetchOnMountOrArgChange: true }
        );
    const { krasList } = useKRADropdownData();

    const [enableAddKpi, setEnableAddKpi] = useState(false);
    const {
        data,
        isSuccess,
        isFetching: isLoading,
        error
    } = useGetKpisQuery(
        {
            path: '',
            params: [
                { name: 'page', value: ActivePage ?? page },
                { name: 'limit', value: 10 },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'searchText', value: search.searchText },
                { name: 'kraId', value: filterData.selectedKRAs.length ? filterData.selectedKRAs : -99 },
                { name: 'teamId', value: filterData.selectedTeams.length ? filterData.selectedTeams : -99 },
                { name: 'designationId', value: filterData.selectedDesignations.join(',') || -99 },
                { name: 'departmentId', value: filterData.selectedDepartments.join(',') || -99 },
                { name: 'status', value: filterData.selectedStatus.length ? filterData.selectedStatus : 'true,false' }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const DownloadKpiTemplate = (path: string) => {
        downloadCSV(`${apiUrls.kpi}/${path}`, path);
    };

    const onSearchClear = () => {
        setSearchText('');
        dispatch(
            updateSearch({
                ...search,
                searchText: ''
            })
        );
        navigate(`${routeConstants.kpiManagement}/${1}`);
    };

    const onSearch = useCallback(
        (value: string) => {
            setSearchText(value);
            dispatch(
                updateSearch({
                    searchText: value,
                    modulePath: '/KPIs'
                })
            );
            navigate(`${routeConstants.kpiManagement}/${1}`);
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

    const openAddNewKPI = () => {
        navigate(`${routeConstants.kpiManagement}/${ActivePage}/add-KPI`, { state: { action: 'add' } });
    };

    const teamsList = useMemo(() => {
        const filteredList = isTeamsReceived ? teams?.teams?.filter((team: Team) => team.teamStatus === true) : [];
        const list =
            isTeamsReceived && filteredList?.length
                ? filteredList.map((team: Team) => {
                      // temporarily using like this, might be reverted back
                      // return { value: team.id, label: `${team.teamName} (${team.departmentName ?? '-'})` };
                      return { value: team.id, label: `${team.teamName}` };
                  })
                : [];
        list.sort((a: Option, b: Option) => a.label.localeCompare(b.label));
        return list;
    }, [isTeamsReceived, teams]);

    const designationsList = useMemo(() => {
        if (isDesignationsReceived && designations.designations && designations.designations.length) {
            const filteredList = designations?.designations
                .filter((designation: Designation) => designation.status === true)
                .map((d: Designation) => ({ label: `${d.designationName} (${d.teamName})`, value: d.id }));

            return filteredList.sort((a: Option, b: Option) => a.label.localeCompare(b.label));
        } else {
            return [];
        }
    }, [designations, isDesignationsReceived]);

    type dropDown = 'selectedDepartments' | 'selectedTeams' | 'selectedKRAs' | 'selectedDesignations' | 'selectedStatus';

    const handleDropdownChange = useCallback(
        (name: dropDown, value: any) => {
            let updatedFilter = { ...filterData };
            if (name === 'selectedDepartments' && value.length === 0) {
                updatedFilter = {
                    ...filterData,
                    selectedDepartments: [],
                    selectedTeams: [],
                    selectedDesignations: []
                };
            }
            if (name === 'selectedTeams' && value.length === 0) {
                updatedFilter = {
                    ...filterData,
                    selectedTeams: [],
                    selectedDesignations: []
                };
            }

            if (name === 'selectedKRAs' && value.length === 0) {
                updatedFilter = {
                    ...filterData,
                    selectedTeams: [],
                    selectedDesignations: []
                };
            }

            dispatch(updateKPIFilter({ ...updatedFilter, [name]: value, moduleName: `/KPIs` }));
            navigateTo(`${routeConstants.kpiManagement}/1`);
        },
        [dispatch, filterData, navigateTo]
    );

    const handleBulkImportClick = () => {
        navigateTo(`${routeConstants.kpiManagement}/${ActivePage}/bulk-import`, { state: { action: 'add', bulkImportType: 'kpis' } });
    };

    const handlePageChange = (page: number) => {
        setPage(page);
        navigate(`${routeConstants.kpiManagement}/${page}`);
    };

    useEffect(() => {
        if (data && isSuccess) {
            setKpis(data.kpis);
        }
        if (search) {
            setSearchText(search.searchText);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (error) {
            setKpis([]);
        }
    }, [error]);

    const openSampleKpiModal = () => {
        setSampleKpiModal(prev => !prev);
    };

    useEffect(() => {
        getActiveReviewCycle({
            path: 'active',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        });
    }, [getActiveReviewCycle, userDetails.organisationId]);

    useEffect(() => {
        if (
            activeReviewCycleData &&
            new Date(activeReviewCycleData.selfReviewStartDate) > new Date() &&
            new Date(activeReviewCycleData.managerReviewStartDate) > new Date()
        ) {
            setEnableAddKpi(true);
        }
        if (!activeReviewCycleData?.selfReviewStartDate && hasFetchedActiveCycle) {
            setEnableAddKpi(true);
        }
    }, [activeReviewCycleData, hasFetchedActiveCycle]);

    return {
        openAddNewKPI,
        isLoading,
        kpis,
        debouncedOnChange,
        onSearch,
        onSearchClear,
        ActivePage,
        handlePageChange,
        searchText,
        totalItems: kpis?.length ? data?.totalKPIs : 0,
        openSampleKpiModal,
        sampleKpiModal,
        enableAddKpi,
        DownloadKpiTemplate,
        handleDropdownChange,
        handleBulkImportClick,
        onSearchChange,
        search,
        kpiStatusOptions,
        krasList,
        departmentList,
        teamsList,
        designationsList,
        filterData,
        module
    };
};
