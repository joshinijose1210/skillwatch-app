import { useDepartmentDropdownData } from '@common/hooks/useDepartmentDropdownData';
import { routeConstants } from '@constants';
import { Option } from '@medly-components/core/dist/es/components/SingleSelect/types';
import { debounce } from '@medly-components/utils';
import { useAppSelector } from '@slice';
import { removeEmployeeData } from '@slice/employeeData';
import { updateFilter } from '@slice/filter';
import { updateSearch } from '@slice/search';
import { useGetDesignationsQuery, useGetEmployeeListQuery, useGetRolesQuery, useGetTeamsQuery } from '@slice/services';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Designation, Employee, Role, Team } from './types';

const useEmployeeManagement = () => {
    const dispatch = useDispatch(),
        search = useAppSelector(state => state.search),
        { departmentList } = useDepartmentDropdownData(),
        navigateTo = useNavigate(),
        path = useLocation().pathname;
    const { ActivePage } = useParams();

    const filterData = useAppSelector(state => state.filter),
        userDetails = useAppSelector(state => state.user);

    const [searchText, setSearchText] = useState(''),
        [employees, setEmployees] = useState<Employee[]>([]),
        [sortOrder, setSortOrder] = useState('desc'),
        [isTeamSelected, setIsTeamSelected] = useState(0);

    const encodedSearchText = encodeURIComponent(search.searchText);

    const { data, isFetching: isLoading } = useGetEmployeeListQuery(
        {
            path: '',
            params: [
                { name: 'teamId', value: filterData.teamName.join(',') || -99 },
                { name: 'designationId', value: filterData.designationName.join(',') || -99 },
                { name: 'roleId', value: filterData.roleName.join(',') || -99 },
                { name: 'departmentId', value: filterData.departmentName.join(',') || -99 },
                { name: 'searchText', value: encodedSearchText },
                { name: 'organisationId', value: userDetails.organisationId },
                {
                    name: 'page',
                    value: ActivePage ?? 1
                },
                { name: 'limit', value: 10 },
                { name: 'sortOrderId', value: sortOrder === 'desc' ? 2 : 1 }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );
    const handleOrderChange = (order: string) => {
        setSortOrder(order);
        navigateTo(`${routeConstants.employeeManagement}/${1}`);
    };
    const { data: roles, isSuccess: isRolesReceived } = useGetRolesQuery(
            { path: '', params: [{ name: 'organisationId', value: userDetails.organisationId }] },
            { refetchOnMountOrArgChange: true }
        ),
        { data: designations, isSuccess: isDesignationsReceived } = useGetDesignationsQuery(
            {
                path: '',
                params: [
                    { name: 'organisationId', value: userDetails.organisationId },
                    ...(filterData.teamName.length ? [{ name: 'teamId', value: filterData.teamName }] : [])
                ]
            },
            { refetchOnMountOrArgChange: true }
        ),
        { data: teams, isSuccess: isTeamsReceived } = useGetTeamsQuery(
            {
                path: '',
                params: [
                    { name: 'organisationId', value: userDetails.organisationId },
                    ...(filterData.departmentName.length ? [{ name: 'departmentId', value: filterData.departmentName }] : [])
                ]
            },
            { refetchOnMountOrArgChange: true }
        );

    const handlePageChange = (page: number) => navigateTo(`${routeConstants.employeeManagement}/${page}`);

    const onSearchClear = () => {
        setSearchText('');
        dispatch(
            updateSearch({
                ...search,
                searchText: ''
            })
        );
        navigateTo(`${routeConstants.employeeManagement}/${1}`);
    };

    const onSearch = useCallback(
        (value: string) => {
            dispatch(
                updateSearch({
                    searchText: value,
                    modulePath: '/employees'
                })
            );
            navigateTo(`${routeConstants.employeeManagement}/${1}`);
        },
        [dispatch, navigateTo]
    );
    const debouncedOnChange = debounce(value => {
        onSearch(value);
    }, 500);

    const rolesList = useMemo(() => {
            const filteredList = isRolesReceived ? roles?.roles.filter((role: Role) => role.status === true) : [];
            const list = isRolesReceived
                ? filteredList.map((role: Role) => {
                      return { value: role.id, label: role.roleName };
                  })
                : [];
            list.sort((a: Option, b: Option) => a.label.localeCompare(b.label));
            return list;
        }, [isRolesReceived, roles]),
        designationsList = useMemo(() => {
            if (isDesignationsReceived && designations.designations && designations.designations.length) {
                const filteredList = designations?.designations
                    .filter((designation: Designation) => designation.status === true)
                    .map((d: Designation) => ({ label: `${d.designationName} (${d.teamName})`, value: d.id }));

                return filteredList.sort((a: Option, b: Option) => a.label.localeCompare(b.label));
            } else {
                return [];
            }
        }, [designations, isDesignationsReceived]),
        teamsList = useMemo(() => {
            const filteredList = isTeamsReceived ? teams?.teams?.filter((team: Team) => team.teamStatus === true) : [];
            const list =
                isTeamsReceived && filteredList?.length
                    ? filteredList.map((team: Team) => {
                          // temporarily using like this, might be reverted back
                          //   return { value: team.id, label: `${team.teamName} (${team.departmentName ?? '-'})` };
                          return { value: team.id, label: `${team.teamName}` };
                      })
                    : [];
            list.sort((a: Option, b: Option) => a.label.localeCompare(b.label));
            return list;
        }, [isTeamsReceived, teams]);
    const addEmployeePage = () => {
            dispatch(removeEmployeeData());
            navigateTo(`${routeConstants.employeeManagement}/${ActivePage ?? 1}/add-employee`, { state: { action: 'add' } });
        },
        bulkImportPage = () => {
            navigateTo(`${routeConstants.employeeManagement}/${ActivePage ?? 1}/bulk-import`, {
                state: { action: 'add', bulkImportType: 'employees' }
            });
        },
        handleDropdownChange = useCallback(
            (name: string, value: any) => {
                let updatedFilter = { ...filterData };
                if (name === 'departmentName' && value.length === 0) {
                    updatedFilter = {
                        ...filterData,
                        departmentName: [],
                        teamName: [],
                        designationName: [],
                        roleName: []
                    };
                }
                if (name === 'teamName' && value.length === 0) {
                    updatedFilter = {
                        ...filterData,
                        teamName: [],
                        designationName: []
                    };
                }
                dispatch(updateFilter({ ...updatedFilter, [name]: value }));
                navigateTo(`${routeConstants.employeeManagement}/1`);
            },
            [dispatch, filterData, navigateTo]
        ),
        onSearchChange = useCallback(
            (val: string) => {
                setSearchText(val);
                debouncedOnChange(val);
            },
            [debouncedOnChange]
        );
    const goBackHandle = () => {
        navigateTo(routeConstants.firstEmployee);
    };
    useEffect(() => {
        function handleBeforeUnload() {
            return dispatch(
                updateFilter({
                    designationName: [],
                    teamName: [],
                    roleName: []
                })
            );
        }
        if (filterData.teamName.length) {
            setIsTeamSelected(1);
            return;
        }
        if (isTeamSelected === 1 && filterData.designationName.length) {
            dispatch(updateFilter({ ...filterData, designationName: [] }));
        }
        setIsTeamSelected(0);
        window.addEventListener('beforeunload', handleBeforeUnload);
    }, [dispatch, filterData, filterData.teamName, filterData.designationName, isTeamSelected]);

    useEffect(() => {
        if (data) {
            setEmployees(
                data.totalEmployees
                    ? data?.employees.map((d: Employee) => ({ ...d, teamAndDesignation: `${d.teamName} (${d.designationName})` }))
                    : []
            );
        }
        if (search) {
            setSearchText(search.searchText);
        }
    }, [data, search]);

    return {
        filterData,
        addEmployeePage,
        debouncedOnChange,
        onSearch,
        isLoading,
        onSearchClear,
        rolesList,
        handleDropdownChange,
        designationsList,
        teamsList,
        handlePageChange,
        ActivePage,
        bulkImportPage,
        data,
        searchText,
        handleOrderChange,
        employees,
        onSearchChange,
        search,
        path,
        goBackHandle,
        departmentList
    };
};

export default useEmployeeManagement;
