import { routeConstants } from '@constants';
import { Option } from '@medly-components/core/dist/es/components/MultiSelect/types';
import { useAppSelector } from '@slice';
import { updateCheckInFilters } from '@slice/checkInWithManager';
import { useGetCyclesQuery, useGetEmployeesByManagerQuery, useGetManagerEmployeeListQuery } from '@slice/services';
import { format } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getOverAllStatus } from './getOverallStatus';
import { CheckInWithManagerItem, Employee, EmployeeByManager } from './types';

export const useCheckInWithManager = () => {
    const userDetails = useAppSelector(state => state.user);
    const { reviewCycleList } = useAppSelector(state => state.reviewCycleFilter);
    const navigateTo = useNavigate();
    const { ActivePage } = useParams();
    const [checkInWithManagerData, setCheckInWithManagerData] = useState([]);
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();

    const filters = useAppSelector(state => state.checkInWithManager);
    const [sortOrder, setSortOrder] = useState('');
    const [testActivePage, setTestActivePage] = useState<number>();
    const path = useLocation().pathname;
    const { data, isFetching: isLoading } = useGetCyclesQuery(
        {
            path: 'check-in-with-manager',
            params: [
                {
                    name: 'managerId',
                    value: path.includes(routeConstants.checkInWithTeamMember) ? userDetails.id : -99
                },
                {
                    name: 'reviewToId',
                    value: path.includes(routeConstants.myCheckInWithManager) ? userDetails.id : filters.employees.join(',') || -99
                },
                { name: 'teamId', value: -99 },
                { name: 'page', value: ActivePage ?? testActivePage },
                { name: 'limit', value: 10 },
                { name: 'reviewCycleId', value: reviewCycleList },
                {
                    name: 'reviewTypeId',

                    value:
                        filters.reviewStatus && [1, 2, 3].includes(Number(filters.reviewStatus))
                            ? 1
                            : [4, 5, 6, 7, 8, 9].includes(Number(filters.reviewStatus))
                            ? 2
                            : [10, 11, 12].includes(Number(filters.reviewStatus))
                            ? 3
                            : ''
                },
                { name: 'organisationId', value: userDetails.organisationId },
                {
                    name:
                        filters.reviewStatus && [1, 2, 3].includes(Number(filters.reviewStatus))
                            ? 'selfReviewDraft'
                            : [4, 5, 6].includes(Number(filters.reviewStatus))
                            ? 'firstManagerReviewDraft'
                            : [7, 8, 9].includes(Number(filters.reviewStatus))
                            ? 'secondManagerReviewDraft'
                            : [10, 11, 12].includes(Number(filters.reviewStatus))
                            ? 'checkInDraft'
                            : '',
                    value: filters.reviewStatus ? ![1, 4, 7, 3, 6, 9, 10, 12].includes(Number(filters.reviewStatus)) : ''
                },
                {
                    name:
                        filters.reviewStatus && [1, 2, 3].includes(Number(filters.reviewStatus))
                            ? 'selfReviewPublished'
                            : [4, 5, 6].includes(Number(filters.reviewStatus))
                            ? 'firstManagerReviewPublished'
                            : [7, 8, 9].includes(Number(filters.reviewStatus))
                            ? 'secondManagerReviewPublished'
                            : [10, 11, 12].includes(Number(filters.reviewStatus))
                            ? 'checkInPublished'
                            : '',
                    value: filters.reviewStatus ? ![1, 4, 7, 2, 5, 8, 10, 11].includes(Number(filters.reviewStatus)) : ''
                },
                { name: 'sortRating', value: sortOrder },
                { name: 'filterRatingId', value: filters.filterRatingId }
            ]
        },
        {
            refetchOnMountOrArgChange: true
        }
    );

    const { data: employees, isSuccess: isEmployeeListReceived } = useGetManagerEmployeeListQuery(
        {
            path: 'list',
            params: [
                { name: 'id', value: -99 },
                {
                    name: 'firstManagerId',
                    value: path.includes(routeConstants.checkInWithTeamMember) ? userDetails.id : -99
                },
                { name: 'secondManagerId', value: -99 },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'searchText', value: '' }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const { data: employeesByManager, isSuccess: isEmployeesByManagerListReceived } = useGetEmployeesByManagerQuery(
        {
            path: '',
            params: [
                { name: 'managerId', value: userDetails.id },
                { name: 'organisationId', value: userDetails.organisationId }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const employeeList = useMemo(() => {
        const list =
            isEmployeeListReceived && employees.employeesCount > 0
                ? employees.employeeManagerData.map((employee: Employee) => {
                      return {
                          value: employee.id,
                          label: `${employee.firstName} ${employee.lastName} (${employee.employeeId})`
                      };
                  })
                : [];
        list.sort((a: Option, b: Option) => a.label.localeCompare(b.label));
        return list;
    }, [employees, isEmployeeListReceived]);

    const handleOrderChange = (order: string) => {
        setSortOrder(order);
        navigateTo(
            `${
                path.includes(routeConstants.checkInWithTeamMember)
                    ? routeConstants.checkInWithTeamMember
                    : routeConstants.performanceReview
            }/${1}`
        );
    };

    const employeesByManagerList = useMemo(() => {
        let list =
            isEmployeesByManagerListReceived && employeesByManager.reporteesCount > 0
                ? employeesByManager.reporteesData.map((employee: EmployeeByManager) => {
                      return {
                          value: employee.id,
                          label: `${employee.firstName} ${employee.lastName} (${employee.employeeId})`
                      };
                  })
                : [];
        list = list.filter((employee: Option) => employee.value !== userDetails.id);

        list.sort((a: Option, b: Option) => a.label.localeCompare(b.label));
        return list;
    }, [employeesByManager, isEmployeesByManagerListReceived, userDetails.id]);

    // the type of value kept as any because it is used for various select components with different value types
    const handleDropdownChange = useCallback(
        (name: string, value: any) => {
            const refreshPath = path.includes(routeConstants.performanceReview)
                ? routeConstants.performanceReview
                : routeConstants.checkInWithTeamMember;
            let updatedFilters;
            if (name === 'reviewStatus' && filters.reviewStatus === value) {
                updatedFilters = {
                    ...filters,
                    [name]: undefined
                };
            } else if (name === 'filterRatingId' && filters.filterRatingId === value) {
                updatedFilters = {
                    ...filters,
                    [name]: -1
                };
            } else {
                updatedFilters = {
                    ...filters,
                    [name]: value
                };
            }
            dispatch(updateCheckInFilters(updatedFilters));
            navigateTo(`${refreshPath}/${1}`);
        },
        [dispatch, filters, navigateTo, path]
    );

    const handlePageChange = (page: number) => {
        setTestActivePage(page);
        navigateTo(
            `${
                path.includes(routeConstants.myCheckInWithManager)
                    ? routeConstants.myCheckInWithManager
                    : path.includes(routeConstants.checkInWithTeamMember)
                    ? routeConstants.checkInWithTeamMember
                    : routeConstants.performanceReview
            }/${page}`
        );
    };

    useEffect(() => {
        if (data && data.totalCheckInWithManager > 0) {
            setCount(data.totalCheckInWithManager);
            const checkInList = data.checkInWithManagers.map((item: CheckInWithManagerItem) => ({
                ...item,
                reviewCycle: `${format(new Date(item?.startDate), 'do MMM yyyy')} - ${format(new Date(item?.endDate), 'do MMM yyyy')}`,
                overallStatus: getOverAllStatus(item)
            }));
            setCheckInWithManagerData(checkInList);
        } else {
            setCount(0);
            setCheckInWithManagerData([]);
        }
    }, [data]);

    return {
        handlePageChange,
        isLoading,
        checkInWithManagerData,
        ActivePage,
        count,
        employeeList,
        handleDropdownChange,
        filters,
        reviewCycleList,
        path,
        employeesByManagerList,
        handleOrderChange
    };
};
