import { routeConstants } from '@constants';
import { ReviewCycleType } from '@pages/ReviewCycle/types';

import { AppState, useAppSelector } from '@slice';
import { useGetCyclesQuery, useGetEmployeesByManagerQuery, useGetManagersListQuery } from '@slice/services';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useManagerReview = () => {
    const path = useLocation().pathname;
    const [managerReviewCycles, setManagerReviewCycles] = useState([]),
        [count, setCount] = useState(0),
        [activePage, setActivePage] = useState(1),
        [searchActivePage, setSearchActivePage] = useState(1),
        [selectedEmployees, setSelectedEmployees] = useState([]),
        [reviewStatus, setReviewStatus] = useState<string>();
    const userDetails = useAppSelector((state: AppState) => state.user);
    const { reviewCycleList } = useAppSelector(state => state.reviewCycleFilter);
    const { data, isFetching: isLoading } = useGetCyclesQuery(
        {
            path: path === routeConstants.managerReview ? 'manager-review' : 'my-manager-review',
            params: [
                { name: 'reviewTypeId', value: 2 },
                {
                    name: 'reviewFromId',
                    value: path === routeConstants.managerReview ? userDetails.id : selectedEmployees.length !== 0 ? selectedEmployees : -99
                },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'page', value: selectedEmployees.length || reviewCycleList.length ? searchActivePage : activePage },
                { name: 'limit', value: 10 },
                {
                    name: 'reviewToId',
                    value:
                        path === routeConstants.managerReview ? (selectedEmployees.length !== 0 ? selectedEmployees : -99) : userDetails.id
                },
                { name: 'reviewCycleId', value: reviewCycleList.length ? reviewCycleList : -99 },
                ...(reviewStatus
                    ? [
                          { name: 'managerReviewDraft', value: reviewStatus ? +reviewStatus === 2 : '' },
                          { name: 'managerReviewPublished', value: reviewStatus ? +reviewStatus === 3 : '' }
                      ]
                    : [])
            ]
        },
        {
            refetchOnMountOrArgChange: true
        }
    );

    const { data: employees, isSuccess: isEmployeeListReceived } = useGetEmployeesByManagerQuery(
        {
            path: '',
            params: [
                { name: 'managerId', value: userDetails.id },
                { name: 'organisationId', value: userDetails.organisationId }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const { data: managers, isSuccess: isManagersReceived } = useGetManagersListQuery(
        {
            path: '',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        },
        { refetchOnMountOrArgChange: true }
    );

    const managersList = useCallback(() => {
        const filteredList =
            isManagersReceived && managers?.managers ? managers?.managers.filter((manager: any) => manager.status === true) : [];
        const list = filteredList
            ? filteredList.map((manager: any) => {
                  return {
                      value: manager.id,
                      label: `${manager.firstName} ${manager.lastName} (${manager.employeeId})`
                  };
              })
            : [];
        list.sort((a: any, b: any) => a.label.localeCompare(b.label));
        return list;
    }, [isManagersReceived, managers?.managers]);

    const handlePageChange = (page: number) => {
        selectedEmployees.length || reviewCycleList.length ? setSearchActivePage(page) : setActivePage(page);
    };
    const handleSelectEmployee = useCallback((value: any) => {
        setSelectedEmployees(value);
        setActivePage(1);
        setSearchActivePage(1);
    }, []);

    const handleReviewStatus = useCallback((value: string) => {
        setReviewStatus(value);
        setActivePage(1);
        setSearchActivePage(1);
    }, []);

    const employeeList = useCallback(() => {
        let list =
            isEmployeeListReceived && employees.reporteesCount > 0
                ? employees.reporteesData.map((employee: any) => {
                      return {
                          value: employee.id,
                          label: `${employee.firstName} ${employee.lastName} (${employee.employeeId})`
                      };
                  })
                : [];
        list = list.filter((employee: any) => employee.value !== userDetails.id);

        list.sort((a: any, b: any) => a.label.localeCompare(b.label));
        return list;
    }, [employees, isEmployeeListReceived, userDetails.id]);

    useEffect(() => {
        setCount(data?.totalManagerReviewCycles ?? 0);
        if (data?.managerReviewCycles || data?.myManagerReviewCycles) {
            data.managerReviewCycles
                ? setManagerReviewCycles(
                      data.managerReviewCycles.map((cycle: ReviewCycleType) => ({
                          ...cycle,
                          submittedDate:
                              cycle.publish && cycle.updatedAt ? new Date(cycle.updatedAt).toLocaleDateString() : 'Not Submitted',
                          reviewCycle: `${format(new Date(cycle.startDate), 'do MMM yyyy')} - ${format(
                              new Date(cycle.endDate),
                              'do MMM yyyy'
                          )}`
                      }))
                  )
                : setManagerReviewCycles(
                      data.myManagerReviewCycles.map((cycle: ReviewCycleType) => ({
                          ...cycle,
                          submittedDate:
                              cycle.publish && cycle.updatedAt ? new Date(cycle.updatedAt).toLocaleDateString() : 'Not Submitted',
                          reviewCycle: `${format(new Date(cycle.startDate), 'do MMM yyyy')} - ${format(
                              new Date(cycle.endDate),
                              'do MMM yyyy'
                          )}`
                      }))
                  );
        } else setManagerReviewCycles([]);
    }, [data]);

    return {
        managerReviewCycles,
        count,
        isLoading,
        activePage,
        reviewStatus,
        handlePageChange,
        employeeList,
        selectedEmployees,
        handleSelectEmployee,
        handleReviewStatus,
        searchActivePage,
        path,
        managersList,
        reviewCycleList
    };
};
