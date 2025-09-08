import { routeConstants } from '@constants';
import { useAppSelector } from '@slice';
import { useGetEmployeeListQuery, useGetSubmittedFeedbacksQuery, useGetTagsListQuery } from '@slice/services';
import { updateSubFeedbackFilter } from '@slice/submittedFeedback';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export const useSubmittedFeedback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userDetails = useAppSelector(state => state.user);
    const submittedFeedback = useAppSelector(state => state.submittedFeedback);
    const { reviewCycleList } = useAppSelector(state => state.reviewCycleFilter);
    const [selectedTag, setSelectedTag] = useState(submittedFeedback.activeFeedbackType || -99);
    const [selectedEmployees, setSelectedEmployees] = useState(submittedFeedback.activeEmployee || []);
    const { ActivePage } = useParams();
    const [sortOrder, setSortOrder] = useState('desc');
    const [page, setPage] = useState<number>();

    const handleOrderChange = (order: string) => {
        setSortOrder(order);
        navigate(`${routeConstants.submittedFeedback}/${1}`);
    };
    const handlePageChange = (page: number) => {
        setPage(page);
        navigate(`${routeConstants.submittedFeedback}/${page}`);
    };
    const navigateTo = useNavigate();
    const {
        data,
        isFetching: isLoading,
        isError
    } = useGetSubmittedFeedbacksQuery(
        {
            path: 'submitted/',
            params: [
                { name: 'page', value: selectedEmployees.length == 0 ? ActivePage ?? page : 1 },
                { name: 'limit', value: 10 },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'feedbackToId', value: selectedEmployees.join(',') || -99 },
                { name: 'feedbackFromId', value: userDetails.id },
                { name: 'feedbackTypeId', value: selectedTag || -99 },
                { name: 'sortBy', value: sortOrder === 'desc' ? 'dateDesc' : 'dateAsc' },
                { name: 'reviewCycleId', value: reviewCycleList }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const { data: tags, isSuccess: isTagsListReceived } = useGetTagsListQuery({});

    const handleDropdownChange = useCallback(
        (value: any) => {
            dispatch(
                updateSubFeedbackFilter({
                    activeFeedbackType: value
                })
            );
            setSelectedTag(value);
            navigate(`${routeConstants.submittedFeedback}/${1}`);
        },
        [navigate]
    );

    const handleSelectEmployee = (value: any) => {
        dispatch(
            updateSubFeedbackFilter({
                activeEmployee: value
            })
        );
        setSelectedEmployees(value);
        navigate(`${routeConstants.submittedFeedback}/${1}`);
    };

    const { data: employees, isSuccess: isEmployeeListReceived } = useGetEmployeeListQuery(
        {
            path: '',
            params: [
                { name: 'teamId', value: -99 },
                { name: 'designationId', value: -99 },
                { name: 'roleId', value: -99 },
                { name: 'organisationId', value: userDetails.organisationId },
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

    const handleButtonClick = () => {
        navigateTo(`${routeConstants.submittedFeedback}/${ActivePage}/add-feedback`, { state: { action: 'Add' } });
    };

    return {
        isLoading,
        handleButtonClick,
        employeeList,
        handleSelectEmployee,
        selectedEmployees,
        tagsList,
        handleDropdownChange,
        selectedTag,
        data,
        isError,
        handlePageChange,
        ActivePage,
        handleOrderChange
    };
};
