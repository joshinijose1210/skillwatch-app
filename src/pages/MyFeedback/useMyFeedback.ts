import { routeConstants } from '@constants';
import { useAppSelector } from '@slice';
import { resetMyFeedbackFilter, updateMyFeedbackFilter } from '@slice/myFeedbackFilter';
import { useGetEmployeeListQuery, useGetReceivedFeedbacksQuery, useGetSubmittedFeedbacksQuery, useGetTagsListQuery } from '@slice/services';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { CustomTableData, TabType } from './types';
import { SubmittedFeedbackCols, ReceivedFeedbackCols } from './columns';
import { resetReqFBFilter } from '@slice/reqFeedbackFilter';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';

export const useMyFeedback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userDetails = useAppSelector(state => state.user);
    const myFeedbackFilter = useAppSelector(state => state.myFeedbackFilter);
    const { reviewCycleList } = useAppSelector(state => state.reviewCycleFilter);
    const [activeTab, setActiveTab] = useState<TabType>(() => {
        const storeValue = sessionStorage.getItem('myTab') as TabType;
        return storeValue ?? 'index';
    });
    const [searchParams] = useSearchParams();
    const selectedFeedbackType = myFeedbackFilter.activeFeedbackType;
    const selectedEmployees = myFeedbackFilter.activeEmployee;
    const { ActivePage } = useParams();
    const [sortOrder, setSortOrder] = useState('desc');

    const handleOrderChange = useCallback(
        (order: string) => {
            setSortOrder(order);
            navigate(`${routeConstants.myFeedback}/${1}`);
        },
        [navigate]
    );

    const handlePageChange = (page: number) => {
        navigate(`${routeConstants.myFeedback}/${page}`);
    };
    const navigateTo = useNavigate();
    const {
        data: submittedFeedbacks,
        isFetching: isSubmittedFeedbacksLoading,
        isError: isSubmittedFeedbacksError
    } = useGetSubmittedFeedbacksQuery(
        {
            path: 'submitted/',
            params: [
                { name: 'page', value: ActivePage ?? 1 },
                { name: 'limit', value: 10 },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'feedbackToId', value: selectedEmployees.join(',') || -99 },
                { name: 'feedbackFromId', value: userDetails.id },
                { name: 'feedbackTypeId', value: selectedFeedbackType || -99 },
                { name: 'sortBy', value: sortOrder === 'desc' ? 'dateDesc' : 'dateAsc' },
                { name: 'reviewCycleId', value: reviewCycleList }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const {
        data: receivedFeedbacks,
        isFetching: isReceivedFeedbacksLoading,
        isError: isReceivedFeedbacksError
    } = useGetReceivedFeedbacksQuery(
        {
            path: 'received/',
            params: [
                { name: 'page', value: ActivePage ?? 1 },
                { name: 'limit', value: 10 },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'feedbackFromId', value: selectedEmployees.join(',') || -99 },
                { name: 'feedbackToId', value: userDetails.id },
                { name: 'sortBy', value: sortOrder === 'desc' ? 'dateDesc' : 'dateAsc' },
                { name: 'feedbackTypeId', value: selectedFeedbackType || -99 },
                { name: 'reviewCycleId', value: reviewCycleList }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const { data: tags, isSuccess: isTagsListReceived } = useGetTagsListQuery({});

    const handleDropdownChange = (name: string, value: any) => {
        dispatch(
            updateMyFeedbackFilter({
                ...myFeedbackFilter,
                [name]: value
            })
        );
        navigateTo(`${routeConstants.myFeedback}/${1}`);
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
        navigateTo(`${routeConstants.myFeedback}/${ActivePage}/add-feedback`, { state: { action: 'Add' } });
    };
    const handleTabChange = useCallback(
        (id: any) => {
            sessionStorage.setItem('myTab', id);
            navigateTo(`${routeConstants.myFeedback}/${1}`);
            setActiveTab(id);
            dispatch(resetMyFeedbackFilter());
            dispatch(resetReqFBFilter());
        },
        [dispatch, navigateTo]
    );
    useEffect(() => {
        // when user comes from email or slack notifications
        const myTab = searchParams.get('tab');
        if (myTab) {
            sessionStorage.setItem('myTab', myTab);
            setActiveTab(myTab as TabType);
            return;
        }
        const storeValue = sessionStorage.getItem('myTab');
        if (storeValue) {
            setActiveTab(storeValue as TabType);
        } else {
            sessionStorage.setItem('myTab', 'submitted');
            setActiveTab('submitted');
        }
    }, [searchParams]);

    const submittedFeedbackData = useMemo(() => {
        return isSubmittedFeedbacksError
            ? []
            : submittedFeedbacks?.feedbacks?.length > 0
            ? submittedFeedbacks?.feedbacks?.map((feedback: any) => ({ ...feedback, feedbackData: feedback, feedbackCategory: activeTab }))
            : [];
    }, [activeTab, isSubmittedFeedbacksError, submittedFeedbacks?.feedbacks]);

    const receivedFeedbackData = useMemo(() => {
        return isReceivedFeedbacksError ? [] : receivedFeedbacks?.feedbacks || [];
    }, [isReceivedFeedbacksError, receivedFeedbacks?.feedbacks]);

    const submittedFeedbackCount = submittedFeedbacks?.totalFeedbacks || 0,
        receivedFeedbackCount = receivedFeedbacks?.totalFeedbacks || 0,
        unReadFeedbackCount = receivedFeedbacks?.unReadFeedbackCount || 0;
    const tableData: CustomTableData = useMemo(() => {
        // 'Feedback Given' Tab as default
        const defaultData: CustomTableData = {
            handleSort: handleOrderChange,
            isLoading: isSubmittedFeedbacksLoading,
            count: submittedFeedbackCount,
            data: submittedFeedbackData,
            columns: SubmittedFeedbackCols
        };
        switch (activeTab) {
            case 'submitted':
                return defaultData;
            case 'received':
                return {
                    handleSort: defaultData.handleSort,
                    isLoading: isReceivedFeedbacksLoading,
                    count: receivedFeedbackCount,
                    columns: ReceivedFeedbackCols,
                    data: receivedFeedbackData
                };

            default:
                return defaultData;
        }
    }, [
        activeTab,
        handleOrderChange,
        isReceivedFeedbacksLoading,
        isSubmittedFeedbacksLoading,
        receivedFeedbackCount,
        receivedFeedbackData,
        submittedFeedbackCount,
        submittedFeedbackData
    ]);

    const myFeedbackdataIds = useMemo(
        () =>
            activeTab === 'submitted' ? ['feedbackto-input', 'feedbackto-count-chip'] : ['feedbackfrom-input', 'feedbackfrom-count-chip'],
        [activeTab]
    );

    const myFeedbackTooltipValues = useMemo(() => {
        return selectedEmployees?.length && employeeList().length
            ? employeeList().filter(
                  (item: OptionsType) => typeof item.value === 'number' && (selectedEmployees as number[]).includes(item.value)
              )
            : [];
    }, [selectedEmployees, employeeList]);

    return {
        handleButtonClick,
        employeeList,
        handleTabChange,
        selectedEmployees,
        tagsList,
        handleDropdownChange,
        selectedFeedbackType,
        submittedFeedbacks,
        handlePageChange,
        ActivePage,
        activeTab,
        handleOrderChange,
        receivedFeedbacks,
        isSubmittedFeedbacksLoading,
        isReceivedFeedbacksLoading,
        submittedFeedbackData,
        receivedFeedbackData,
        submittedFeedbackCount,
        receivedFeedbackCount,

        // merged data
        tableData,
        myFeedbackdataIds,
        myFeedbackTooltipValues,
        unReadFeedbackCount
    };
};
