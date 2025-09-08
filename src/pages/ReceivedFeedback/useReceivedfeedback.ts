import { routeConstants } from '@constants';
import { useAppSelector } from '@slice';
import { updateReceivedFeedbackFilter } from '@slice/receivedFeedback';
import { useGetEmployeeListQuery, useGetReceivedFeedbacksQuery, useGetTagsListQuery } from '@slice/services';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export const useReceivedFeedback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ActivePage } = useParams();
    const [page, setPage] = useState<number>(1);
    const { reviewCycleList } = useAppSelector(state => state.reviewCycleFilter);
    const userDetails = useAppSelector(state => state.user);
    const receivedFeedbackState = useAppSelector(state => state.receivedFeedback);
    const selectedTag = receivedFeedbackState.activeFeedbackType;
    const selectedEmployees = receivedFeedbackState.activeFromEmployees;
    const [sortOrder, setSortOrder] = useState('desc');

    const handleOrderChange = (order: string) => {
        setSortOrder(order);
        navigate(`${routeConstants.receivedFeedback}/${1}`);
    };
    const handlePageChange = (page: number) => {
        setPage(page);
        navigate(`${routeConstants.receivedFeedback}/${page}`);
    };
    const {
        data,
        isFetching: isLoading,
        isError
    } = useGetReceivedFeedbacksQuery(
        {
            path: 'received/',
            params: [
                { name: 'page', value: selectedEmployees.length == 0 ? ActivePage ?? page : 1 },
                { name: 'limit', value: 10 },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'feedbackFromId', value: selectedEmployees.join(',') || -99 },
                { name: 'feedbackToId', value: userDetails.id },
                { name: 'sortBy', value: sortOrder === 'desc' ? 'dateDesc' : 'dateAsc' },
                { name: 'feedbackTypeId', value: selectedTag || -99 },
                { name: 'reviewCycleId', value: reviewCycleList }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const { data: tags, isSuccess: isTagsListReceived } = useGetTagsListQuery({});

    const handleDropdownChange = useCallback(
        (value: number) => {
            dispatch(
                updateReceivedFeedbackFilter({
                    activeFeedbackType: value
                })
            );
            navigate(`${routeConstants.receivedFeedback}/${1}`);
        },
        [navigate]
    );

    const handleSelectEmployee = (value: any) => {
        dispatch(
            updateReceivedFeedbackFilter({
                activeFromEmployees: value
            })
        );
        navigate(`${routeConstants.receivedFeedback}/${1}`);
    };

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

    const employeeList = useCallback(() => {
        let filteredList = [];
        if (isEmployeeListReceived) {
            filteredList = employees?.totalEmployees ? employees?.employees.filter((employee: any) => employee.status === true) : [];
        }
        let list = filteredList
            ? filteredList.map((employee: any) => {
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

    const tagsList = isTagsListReceived
        ? [
              { value: -99, label: 'All' },
              ...tags?.map((tag: any) => {
                  return { value: tag.feedbackTypeId, label: tag.feedbackType };
              })
          ]
        : [];

    return {
        isLoading,
        employeeList,
        handleSelectEmployee,
        selectedEmployees,
        tagsList,
        handleDropdownChange,
        selectedTag,
        isError,
        data,
        ActivePage,
        handlePageChange,
        handleOrderChange
    };
};
