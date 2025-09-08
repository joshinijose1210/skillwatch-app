import { routeConstants } from '@constants';
import { CustomTableData, TabType } from '@pages/MyFeedback/types';
import { useAppSelector } from '@slice';
import { updateReqFBFilter } from '@slice/reqFeedbackFilter';
import { useGetEmployeeListQuery, useGetRequestedFeedbackQuery } from '@slice/services';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AllFeedbackCols, RequestedFeedbackCols } from './columns';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';

// using this hook only in 360-degree-feedback page (previously myfeedback page)
export const useRequestedFeedback = ({ activeTab }: { activeTab: TabType }) => {
    const isError = false;
    const { ActivePage } = useParams();
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const { reviewCycleList } = useAppSelector(state => state.reviewCycleFilter);
    const [page, setPage] = useState<number>();
    const [dateSortOrder, setDateSortOrder] = useState('dateDesc');
    const reqFeedbackFilter = useAppSelector(state => state.reqFeedbackFilter);
    const handlePageChange = (page: number) => {
        setPage(page);
        navigateTo(`${routeConstants.requestFeedback}/${page}`);
    };
    const userDetails = useAppSelector(state => state.user);
    const { data: employees, isSuccess: isEmployeeListReceived } = useGetEmployeeListQuery(
        {
            path: '',
            params: [
                { name: 'teamId', value: -99 },
                { name: 'designationId', value: -99 },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'roleId', value: -99 },
                { name: 'searchText', value: '' },
                { name: 'sortOrderId', value: 1 },
                { name: 'departmentId', value: -99 }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );
    // In case of requested feedback tab, requestedById stays as user id and feedbackFromId(reqOrFrom), feedbackToId(feedbackTo) gets changed.
    // This is because in the requested feedback tab, we are showing the requests user made, regarding feedbacks of anyone to anyone.
    // In other tabs, feedbackFromId stays the same and requestedById(reqOrFrom), feedbackToId(feedbackTo) gets changed.
    // This is because in Request pending tab, we are showing the requests he has received for feedback and are pending state.
    // In Completed tab, we are showing the requests user has received and are complete.

    // feedback request data for Request Sent tab
    const { data: allFeedbackDataRequestSent, isFetching: feedbackDataRequestSentIsLoading } = useGetRequestedFeedbackQuery(
        {
            path: 'sent/',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'requestedById', value: userDetails.id },
                { name: 'feedbackToId', value: activeTab === 'sent' ? reqFeedbackFilter.feedbackTo.join(',') || -99 : -99 },
                { name: 'feedbackFromId', value: activeTab === 'sent' ? reqFeedbackFilter.reqOrFrom.join(',') || -99 : -99 },
                { name: 'feedbackTypeId', value: -99 },
                {
                    name: 'isSubmitted',
                    value:
                        activeTab === 'sent'
                            ? reqFeedbackFilter.status && reqFeedbackFilter.status.toLowerCase() !== 'all'
                                ? reqFeedbackFilter.status.toLowerCase() === 'completed'
                                : 'true,false'
                            : 'true,false'
                },
                { name: 'page', value: ActivePage ?? page },
                { name: 'limit', value: 10 },
                { name: 'id', value: userDetails.id },
                { name: 'sortBy', value: dateSortOrder },
                { name: 'isExternalRequest', value: false },
                { name: 'externalFeedbackFromEmail', value: false },
                { name: 'reviewCycleId', value: reviewCycleList }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    // feedback request data for Request Received tab
    const { data: allFeedbackDataRequestReceived, isFetching: feedbackDataRequestReceivedIsLoading } = useGetRequestedFeedbackQuery(
        {
            path: 'received/',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'requestedById', value: activeTab === 'inbox' ? reqFeedbackFilter.reqOrFrom.join(',') || -99 : -99 },
                { name: 'feedbackToId', value: activeTab === 'inbox' ? reqFeedbackFilter.feedbackTo.join(',') || -99 : -99 },
                { name: 'feedbackFromId', value: userDetails.id },
                { name: 'feedbackTypeId', value: -99 },
                {
                    name: 'isSubmitted',
                    value:
                        activeTab === 'inbox'
                            ? reqFeedbackFilter.status && reqFeedbackFilter.status.toLowerCase() !== 'all'
                                ? reqFeedbackFilter.status.toLowerCase() === 'completed'
                                : 'true,false'
                            : 'true,false'
                },
                { name: 'page', value: ActivePage ?? page },
                { name: 'limit', value: 10 },
                { name: 'id', value: userDetails.id },
                { name: 'sortBy', value: dateSortOrder },
                { name: 'isExternalRequest', value: false },
                { name: 'externalFeedbackFromEmail', value: false },
                { name: 'reviewCycleId', value: reviewCycleList }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const employeeList = useCallback(() => {
        let filteredList = [];
        if (isEmployeeListReceived) {
            filteredList = employees?.totalEmployees ? employees?.employees.filter((employee: any) => employee.status === true) : [];
        }
        const list = filteredList
            ? filteredList.map((employee: any) => {
                  return {
                      value: employee.id,
                      label: `${employee.firstName} ${employee.lastName} (${employee.employeeId})`
                  };
              })
            : [];

        list.sort((a: any, b: any) => a.label.localeCompare(b.label));
        return list;
    }, [employees, isEmployeeListReceived]);

    const handleSortChange = useCallback(
        (order: string) => {
            navigateTo(`${routeConstants.threeSixtyDegreeFeedback}/${1}`);
            setDateSortOrder(order === 'asc' ? 'dateAsc' : 'dateDesc');
        },
        [navigateTo]
    );

    const handleDropdownChange = (name: string, value: any) => {
        dispatch(
            updateReqFBFilter({
                ...reqFeedbackFilter,
                [name]: value
            })
        );
        navigateTo(`${routeConstants.threeSixtyDegreeFeedback}/${1}`);
    };

    const addRequestPage = () => {
        navigateTo(`${routeConstants.threeSixtyDegreeFeedback}${routeConstants.requestFeedback}/${ActivePage}/Request`, {
            state: { requestId: allFeedbackDataRequestSent?.requestId }
        });
    };

    const feedbackDataRequestedSent = useMemo(() => allFeedbackDataRequestSent?.feedbackRequestData || [], [allFeedbackDataRequestSent]);
    const feedbackDataRequestedReceived = useMemo(
            () => allFeedbackDataRequestReceived?.feedbackRequestData || [],
            [allFeedbackDataRequestReceived]
        ),
        totalDataCountRequestReceived = allFeedbackDataRequestReceived?.totalFeedbackRequestDataCount || 0,
        totalDataCountRequestSent = allFeedbackDataRequestSent?.totalFeedbackRequestDataCount || 0,
        requestPendingCountRequestReceived = allFeedbackDataRequestReceived?.pendingFeedbackRequestCount || 0,
        requestPendingCountRequestSent = allFeedbackDataRequestSent?.pendingFeedbackRequestCount || 0;

    const tableDataRequestedFeedback: CustomTableData = useMemo(() => {
        switch (activeTab) {
            case 'sent':
                return {
                    handleSort: handleSortChange,
                    count: totalDataCountRequestSent || 0,
                    isLoading: feedbackDataRequestSentIsLoading,
                    data: feedbackDataRequestedSent,
                    columns: AllFeedbackCols
                };
            case 'inbox':
                return {
                    handleSort: handleSortChange,
                    count: totalDataCountRequestReceived || 0,
                    data: feedbackDataRequestedReceived,
                    columns: RequestedFeedbackCols,
                    isLoading: feedbackDataRequestReceivedIsLoading
                };
            default:
                return {
                    handleSort: handleSortChange,
                    count: totalDataCountRequestReceived || 0,
                    isLoading: feedbackDataRequestReceivedIsLoading,
                    data: feedbackDataRequestedReceived,
                    columns: AllFeedbackCols
                };
        }
    }, [
        activeTab,
        feedbackDataRequestReceivedIsLoading,
        feedbackDataRequestSentIsLoading,
        feedbackDataRequestedReceived,
        feedbackDataRequestedSent,
        handleSortChange,
        totalDataCountRequestReceived,
        totalDataCountRequestSent
    ]);

    const requestedFeedbackDataIds = useMemo(
        () =>
            activeTab === 'sent' ? ['feedbackfrom-input', 'feedbackfrom-count-chip'] : ['requestedfrom-input', 'requestedfrom-count-chip'],
        [activeTab]
    );

    const requestedFeedbackToolTipValues = useMemo(
        () => ({
            feedbackTo:
                reqFeedbackFilter.feedbackTo?.length && employeeList().length
                    ? employeeList().filter(
                          (item: OptionsType) =>
                              typeof item.value === 'number' && (reqFeedbackFilter.feedbackTo as number[]).includes(item.value)
                      )
                    : [],
            reqOrFrom:
                reqFeedbackFilter.reqOrFrom?.length && employeeList().length
                    ? employeeList().filter(
                          (item: OptionsType) =>
                              typeof item.value === 'number' && (reqFeedbackFilter.reqOrFrom as number[]).includes(item.value)
                      )
                    : []
        }),
        [employeeList, reqFeedbackFilter.feedbackTo, reqFeedbackFilter.reqOrFrom]
    );

    return {
        reqFeedbackFilter,
        employeeList,
        isError,
        handleDropdownChange,
        addRequestPage,
        feedbackDataRequestedReceived,
        feedbackDataRequestedSent,
        requestPendingCountRequestReceived,
        handlePageChange,
        ActivePage,
        activeTab,
        requestPendingCountRequestSent,
        feedbackDataRequestReceivedIsLoading,
        handleSortChange,
        tableDataRequestedFeedback,
        requestedFeedbackDataIds,
        requestedFeedbackToolTipValues
    };
};
