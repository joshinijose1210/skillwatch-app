import { IReviewCycle } from '@pages/ReportsAnalytics/types';
import { useAppSelector } from '@slice';
import { useGetCyclesQuery, useGetEmployeeListQuery, useGetRatingListingQuery } from '@slice/services';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LocationState, RatingsData, ReviewCycleOptions } from './type';

export const useRatings = () => {
    const userDetails = useAppSelector(state => state.user);
    const { title = '', reviewCycle: reviewCycleId, ratingLabel } = useLocation().state as LocationState;
    const [activePage, setActivePage] = useState(1);
    const [reviewCycle, setReviewCycle] = useState(reviewCycleId ?? '');
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [columnData, setColumnData] = useState([]);
    const [testPage, setTestPage] = useState<number>(); // for testing purpose

    const { data, isFetching: isLoading } = useGetRatingListingQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewCycleId', value: reviewCycle },
                { name: 'ratingType', value: title ?? '' },
                { name: 'employeeId', value: selectedEmployees.join(',') || -99 },
                { name: 'page', value: activePage ?? testPage },
                { name: 'limit', value: 10 }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );
    const { data: reviewCyclesData } = useGetCyclesQuery(
        {
            path: 'getAll',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        },
        { refetchOnMountOrArgChange: true }
    );

    const { data: employees, isSuccess: isEmployeeListReceived } = useGetEmployeeListQuery(
        {
            path: '',
            params: [
                { name: 'teamId', value: -99 },
                { name: 'designationId', value: -99 },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'roleId', value: -99 },
                { name: 'searchText', value: '' },
                { name: 'departmentId', value: -99 }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    // const employeeList = useCallback(() => {
    //     let filteredList = [];
    //     if (isEmployeeListReceived) {
    //         filteredList = employees?.totalEmployees ? employees?.employees.filter((employee: any) => employee.status === true) : [];
    //     }
    //     let list = filteredList
    //         ? filteredList.map((employee: any) => {
    //               return {
    //                   value: employee.id,
    //                   label: `${employee.firstName} ${employee.lastName} (${employee.employeeId})`
    //               };
    //           })
    //         : [];
    //     list = list.filter((employee: any) => employee.value !== userDetails.id);

    //     list.sort((a: any, b: any) => a.label.localeCompare(b.label));
    //     return list;
    // }, [employees, isEmployeeListReceived, userDetails.id]);

    const reviewCycleList = useMemo(() => {
        return reviewCyclesData?.totalReviewCycles
            ? reviewCyclesData.reviewCycles.map((cycle: IReviewCycle) => {
                  if (!reviewCycleId && cycle.publish) setReviewCycle(cycle.reviewCycleId);
                  return {
                      value: cycle.reviewCycleId,
                      label: `${format(new Date(cycle.startDate), 'do MMM yyyy')} - ${format(new Date(cycle.endDate), 'do MMM yyyy')}`
                  };
              })
            : [];
    }, [reviewCycleId, reviewCyclesData?.reviewCycles, reviewCyclesData?.totalReviewCycles]);

    // const handleReviewCycle = useCallback((value: string) => {
    //     setReviewCycle(value);
    // }, []);

    // const handleSelectEmployee = (value: any) => {
    //     setSelectedEmployees(value);
    // };

    const handlePageChange = (page: number) => {
        setActivePage(page);
        setTestPage(page);
    };

    useEffect(() => {
        if (data?.ratingListing?.length) {
            const formattedData = data?.ratingListing.map((item: RatingsData) => ({
                reviewCycle:
                    reviewCycleList?.length &&
                    reviewCycleList?.find((cycle: ReviewCycleOptions) => cycle.value === item?.reviewCycleId).label,
                employeeDetails: `${item.firstName} ${item.lastName} (${item.employeeId})`,
                rating: item.checkInRating
            }));
            setColumnData(formattedData);
        } else {
            setColumnData([]);
        }
    }, [data?.ratingListing, reviewCycleList]);

    return {
        columnData,
        isLoading,
        activePage,
        handlePageChange,
        // handleReviewCycle,
        totalItems: data?.ratingListingCount || 0,
        reviewCycleList,
        reviewCycle,
        // employeeList,
        // handleSelectEmployee,
        selectedEmployees,
        ratingLabel
    };
};
