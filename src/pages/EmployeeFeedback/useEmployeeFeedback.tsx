import { routeConstants } from '@constants';
import { DateRangeType } from '@medly-components/core';
import { debounce } from '@medly-components/utils';
import { useAppSelector } from '@slice';
import { resetFilters, updateFeedbackFilter } from '@slice/feedbackFilter';
import { updateSearch } from '@slice/search';
import { useGetReceivedFeedbacksQuery, useGetTagsListQuery } from '@slice/services';
import format from 'date-fns/format';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export const useEmployeeFeedback = () => {
    const userDetails = useAppSelector(state => state.user);
    const search = useAppSelector(state => state.search);
    const feedbackFilterData = useAppSelector(state => state.feedbackFilter);
    const { reviewCycleList } = useAppSelector(state => state.reviewCycleFilter);
    const { ActivePage } = useParams();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [testPaginationIndex, setTestPaginationIndex] = useState<number>();

    const formatDate = (date: Date | null) => (date !== null ? format(date || new Date(), 'yyyy-MM-dd') : '');
    const handlePageChange = (page: number) => {
        setTestPaginationIndex(page);
        navigateTo(`${routeConstants.employeeFeedback}/${page}`);
    };
    const [dateRange, SetDateRange] = useState<DateRangeType>({
        startDate: null,
        endDate: null
    });

    const handleOrderChange = (order: string) => {
        setSortOrder(order);
        navigateTo(`${routeConstants.employeeFeedback}/${1}`);
    };
    const { data: tags, isSuccess: isTagsListReceived } = useGetTagsListQuery({});
    const {
        data,
        isFetching: isLoading,
        isError
    } = useGetReceivedFeedbacksQuery(
        {
            path: '',
            params:
                feedbackFilterData.dateRange.startDate && feedbackFilterData.dateRange.endDate
                    ? [
                          { name: 'page', value: ActivePage ?? testPaginationIndex },
                          { name: 'limit', value: 10 },
                          { name: 'organisationId', value: userDetails.organisationId },
                          { name: 'searchText', value: searchText ? encodeURIComponent(searchText) : '' },
                          { name: 'feedbackTypeId', value: feedbackFilterData.feedbackType || -99 },
                          { name: 'sortBy', value: sortOrder === 'desc' ? 'dateDesc' : 'dateAsc' },
                          {
                              name: 'fromDate',
                              value:
                                  formatDate(feedbackFilterData.dateRange.endDate) <= formatDate(feedbackFilterData.dateRange.startDate)
                                      ? formatDate(feedbackFilterData.dateRange.endDate)
                                      : formatDate(feedbackFilterData.dateRange.startDate)
                          },
                          {
                              name: 'toDate',
                              value:
                                  formatDate(feedbackFilterData.dateRange.endDate) <= formatDate(feedbackFilterData.dateRange.startDate)
                                      ? formatDate(feedbackFilterData.dateRange.startDate)
                                      : formatDate(feedbackFilterData.dateRange.endDate)
                          },
                          { name: 'reviewCycleId', value: reviewCycleList }
                      ]
                    : [
                          { name: 'page', value: ActivePage ?? testPaginationIndex },
                          { name: 'organisationId', value: userDetails.organisationId },
                          { name: 'limit', value: 10 },
                          { name: 'searchText', value: search.searchText ? encodeURIComponent(search.searchText) : '' },
                          { name: 'feedbackTypeId', value: feedbackFilterData.feedbackType || -99 },
                          { name: 'reviewCycleId', value: reviewCycleList },
                          { name: 'sortBy', value: sortOrder === 'desc' ? 'dateDesc' : 'dateAsc' }
                      ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const handleDateChange = (value: DateRangeType) => {
        SetDateRange(value);
        dispatch(updateFeedbackFilter({ dateRange: value }));
        navigateTo(`${routeConstants.employeeFeedback}/${1}`);
    };

    const onSearchClear = () => {
        setSearchText('');
        dispatch(
            updateSearch({
                ...search,
                searchText: ''
            })
        );
        navigateTo(`${routeConstants.employeeFeedback}/${ActivePage}`);
    };

    const onSearch = useCallback(
        (value: string) => {
            dispatch(
                updateSearch({
                    searchText: value,
                    modulePath: '/feedback'
                })
            );
            navigateTo(`${routeConstants.employeeFeedback}/${1}`);
        },
        [dispatch, navigateTo]
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

    const handleDatePickerClear = () => {
        SetDateRange({
            startDate: null,
            endDate: null
        });
        dispatch(resetFilters());
    };

    const tagsList = isTagsListReceived
        ? [
              { value: -99, label: 'All' },
              ...tags?.map((tag: any) => {
                  return { value: tag.feedbackTypeId, label: tag.feedbackType };
              })
          ]
        : [];

    const handleDropdownChange = useCallback(
        (value: any) => {
            dispatch(updateFeedbackFilter({ feedbackType: value }));
            navigateTo(`${routeConstants.employeeFeedback}/${1}`);
        },
        [dispatch, navigateTo]
    );

    useEffect(() => {
        if (search) {
            setSearchText(search.searchText);
        }
    }, [search]);
    return {
        isError,
        ActivePage,
        isLoading,
        data,
        dateRange,
        debouncedOnChange,
        onSearchClear,
        onSearch,
        handleDateChange,
        handlePageChange,
        searchText,
        handleDatePickerClear,
        tagsList,
        handleDropdownChange,
        handleOrderChange,
        search,
        onSearchChange,
        feedbackFilterData
    };
};
