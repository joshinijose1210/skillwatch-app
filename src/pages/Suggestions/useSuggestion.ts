import { routeConstants } from '@constants';
import { useAppDispatch, useAppSelector } from '@slice';
import {
    useGetSuggestionPendingCountQuery,
    useGetSuggestionsQuery,
    useGetSuggestionTagsListQuery,
    usePostSuggestionProgressMutation
} from '@slice/services';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import format from 'date-fns/format';
import { SuggestionRowData, TabType, ViewSuggestionComment } from './types';
import { addToast } from '@medly-components/core';
import { ErrorType } from '@common';
import { updateSuggestionReceivedFilter } from '@slice/suggestionReceivedFilter';
import { debounce } from '@utils/debounce';
import TurndownService from 'turndown';

const removeHtmlTags = (tempStr: string): string => {
    if (typeof document === 'undefined') {
        return tempStr;
    }
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = tempStr;
    return (tempDiv.textContent || tempDiv.innerText || '').trim();
};

// TODO: refactor this later similarly to view previous goals page
export const useSuggestion = () => {
    const { modulePermission } = useAppSelector(state => state.user);
    const initialSuggestedId = 0;
    const initialProgressId = 1;
    const { ActivePage } = useParams();
    const [searchParams] = useSearchParams();
    const navigateTo = useNavigate();
    const [suggestedBy, setSuggestedBy] = useState(''),
        [suggestedDate, setSuggestedDate] = useState(''),
        [suggestionText, setSuggestionText] = useState(''),
        [suggestedId, setSuggestedId] = useState(initialSuggestedId),
        [page, setPage] = useState(1),
        [progressStatus, setProgressStatus] = useState(initialProgressId);
    const { reviewCycleList } = useAppSelector(state => state.reviewCycleFilter);
    const suggestionReceivedFilter = useAppSelector(state => state.suggestionReceivedFilter);

    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<TabType>(() => {
        const storeValue = sessionStorage.getItem('myTab') as TabType;
        return storeValue ?? 'index';
    });
    const [dateSortOrder, setDateSortOrder] = useState('dateDesc');
    const handlePageChange = (page: number) => {
        setPage(page);
        navigateTo(`${routeConstants.suggestionBox}/${page}`);
    };
    const state = useLocation().state as SuggestionRowData;
    const userDetails = useAppSelector(state => state.user);
    const [modalState, setModalState] = useState(false);
    const [comments, setComments] = useState<ViewSuggestionComment[]>([]);
    const [suggestionComment, setSuggestionComment] = useState('');

    const openModal = useCallback((rowData: SuggestionRowData) => {
        setSuggestionComment('');
        setSuggestedId(rowData.id);
        setProgressStatus(rowData.progressId);
        setSuggestedBy(
            rowData.suggestedByFirstName
                ? `${rowData.suggestedByFirstName} ${rowData.suggestedByLastName} (${rowData.suggestedByEmployeeId})`
                : ' Anonymous'
        );
        setSuggestedDate(`${format(new Date(rowData.date), 'dd/MM/yyyy')}`);
        setSuggestionText(`${rowData.suggestion}`);
        if (rowData.comments && rowData.comments.length > 0) {
            setComments(
                rowData.comments.map(c => ({
                    date: format(new Date(c.date), 'dd/MM/yyyy'),
                    comment: c.comment || '',
                    id: c.id
                }))
            );
        } else {
            setComments([]);
        }
        setModalState(true);
    }, []);

    const closeModal = useCallback(() => {
        navigateTo(`${routeConstants.suggestionBox}/${page}`);
        setModalState(false);
        setSuggestedId(initialSuggestedId);
        setProgressStatus(initialProgressId);
        setSuggestedBy('');
        setSuggestedDate('');
        setSuggestionText('');
        setSuggestionComment('');
        setComments([]);
    }, [page, navigateTo]);

    const debouncedComment = useMemo(
        () =>
            debounce((value: string) => {
                const plainText = removeHtmlTags(value);
                if (plainText.length === 0) {
                    setSuggestionComment('');
                } else {
                    setSuggestionComment(value);
                }
            }, 500),
        []
    );

    const handlesuggestionCommentChange = useCallback(
        (value: string) => {
            debouncedComment(value);
        },
        [debouncedComment]
    );

    const checkPermission = (name: string) => {
        let isPermitted = false;
        const module = modulePermission?.find(module => module.moduleName === name);
        if (module && module.view) {
            isPermitted = true;
        }
        return isPermitted;
    };

    const isReceivedAllowed = checkPermission('Received Suggestions');

    const { data: suggestionsData, isFetching: suggestionsDataIsLoading } = useGetSuggestionsQuery(
            {
                path: '',
                params: [
                    { name: 'organisationId', value: userDetails.organisationId },
                    { name: 'suggestionById', value: activeTab === 'receivedSuggestion' ? -99 : userDetails.id },
                    { name: 'reviewCycleId', value: reviewCycleList },
                    { name: 'isDraft', value: activeTab === 'receivedSuggestion' ? false : 'true,false' },
                    { name: 'page', value: page },
                    { name: 'progressIds', value: suggestionReceivedFilter.progressId },
                    { name: 'limit', value: 10 },
                    { name: 'sortBy', value: dateSortOrder }
                ]
            },
            { refetchOnMountOrArgChange: true }
        ),
        { data: suggestionTags, isSuccess: isTagsListReceived } = useGetSuggestionTagsListQuery({});

    const [postSuggestionProgress, { isError: updateProgressError, isSuccess: progressUpdatedSuccess, isLoading: progressLoading }] =
        usePostSuggestionProgressMutation();

    const {
        data: suggestionPendingCountData,
        isSuccess: isSuggestionPendingCountSuccess,
        refetch: suggestionPendingCountRefetch
    } = useGetSuggestionPendingCountQuery(
        {
            path: '',
            params: [
                {
                    name: 'organisationId',
                    value: userDetails.organisationId
                },
                {
                    name: 'reviewCycleId',
                    value: reviewCycleList[0]
                }
            ]
        },
        {
            refetchOnMountOrArgChange: true
        }
    );
    const handleSortChange = (order: string) => {
        navigateTo(`${routeConstants.suggestionBox}/${1}`);
        setDateSortOrder(order === 'asc' ? 'dateAsc' : 'dateDesc');
    };

    const addSuggestionPage = () => {
        navigateTo(`${routeConstants.suggestionBox}/${page}/add-suggestion`, {
            state: { action: 'Add' }
        });
    };
    const handleTabChange = useCallback(
        (id: any) => {
            sessionStorage.setItem('myTab', id);
            navigateTo(`${routeConstants.suggestionBox}/${1}`);
            setActiveTab(id);
        },
        [navigateTo]
    );

    const tagsList: { value: number; label: string }[] = useMemo(
        () =>
            isTagsListReceived
                ? [
                      ...suggestionTags?.map((tag: { progressId: number; progressName: string }) => {
                          return { value: tag.progressId, label: tag.progressName };
                      })
                  ]
                : [],
        [suggestionTags, isTagsListReceived]
    );

    const handleSuggestionReceievedDropdownChange = useCallback(
        (value: number) => {
            setPage(1);
            dispatch(updateSuggestionReceivedFilter({ progressId: value }));
            navigateTo(`${routeConstants.suggestionBox}/${1}`);
        },
        [dispatch, navigateTo]
    );

    const suggestionFilterOptions: { value: number; label: string }[] = useMemo(
        () => [{ value: -99, label: 'All' }, ...tagsList],
        [tagsList]
    );

    const suggestionPendingCount = useMemo(
        () =>
            isSuggestionPendingCountSuccess && suggestionPendingCountData?.pendingSuggestions > 0
                ? suggestionPendingCountData?.pendingSuggestions
                : undefined,
        [isSuggestionPendingCountSuccess, suggestionPendingCountData?.pendingSuggestions]
    );

    const handleDropdownChange = (value: any) => {
        setProgressStatus(value);
    };

    const turndownService = new TurndownService()
        .addRule('bold', {
            filter: ['strong'],
            replacement: content => `*${content}*`
        })
        .addRule('strikethrough', {
            filter: ['s'],
            replacement: content => `~${content}~`
        })
        .addRule('list', {
            filter: ['ul'],
            replacement: content => content.replaceAll('* ', '- ')
        });

    const handleProgressSubmission = async (): Promise<void> => {
        try {
            const response = await postSuggestionProgress({
                url: `/progress/${suggestedId}`,
                data: {
                    progressId: progressStatus,
                    organisationId: userDetails.organisationId,
                    comment: suggestionComment,
                    markDownComment: turndownService.turndown(suggestionComment)
                }
            });
            setModalState(false);
            if ('data' in response) {
                addToast({
                    variant: 'success',
                    header: 'Suggestion progress updated successfully',
                    timer: 3000
                });
            } else {
                const error = response.error as ErrorType;
                addToast({
                    variant: 'error',
                    header: error?.data?.errorMessage || 'something went wrong',
                    timer: 3000
                });
            }
            suggestionPendingCountRefetch();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (ActivePage) setPage(parseInt(ActivePage));
        const myTab = searchParams.get('tab');
        if (myTab) {
            sessionStorage.setItem('myTab', myTab);
            setActiveTab(myTab as TabType);
            return;
        }
        const storeValue = sessionStorage.getItem('myTab');
        if (storeValue && (storeValue == 'submittedSuggestion' || storeValue == 'receivedSuggestion')) {
            setActiveTab(storeValue);
        } else {
            sessionStorage.setItem('myTab', 'submittedSuggestion');
            setActiveTab('submittedSuggestion');
        }
    }, [ActivePage, searchParams]);

    useEffect(() => {
        if (state) {
            openModal(state);
        }
    }, [openModal, state]);

    return {
        addSuggestionPage,
        handleTabChange,
        suggestionsData: suggestionsData?.suggestions || [],
        totalSuggestionsDataCount: suggestionsData?.totalSuggestions || 0,
        handlePageChange,
        page,
        activeTab,
        suggestionsDataIsLoading,
        handleSortChange,
        openModal,
        closeModal,
        suggestedBy,
        suggestedDate,
        suggestionText,
        isReceivedAllowed,
        modalState,
        tagsList,
        comments,
        handleDropdownChange,
        progressStatus,
        handleProgressSubmission,
        progressLoading,
        handleSuggestionReceievedDropdownChange,
        suggestionReceivedFilter,
        suggestionFilterOptions,
        suggestionPendingCount,
        suggestionComment,
        handlesuggestionCommentChange,
        removeHtmlTags
    };
};
