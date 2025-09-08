import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useGetSingleRequestedFeedbackQuery, useGetTagsListQuery, usePostFeedbackMutation } from '@slice/services';
import { performValidation } from '@utils/validations';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TurnDown from 'turndown';
import { EditedDataPayload, Errors, FeedbackItem, FeedbackTypeId, FeedbackTypeObject, FeedbackTypeOption, Payload, Tag } from './types';
import { accordionHeaderTitles } from './constants';

export const useRequestedFeedbackForm = () => {
    const navigateTo = useNavigate();

    const { ActivePage } = useParams();
    const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);
    const [feedbackErrors, setFeedbackErrors] = useState<Errors>({ 1: '', 2: '', 3: '' });
    const [buttonLoader, setButtonLoader] = useState(0);
    const [draftData, setDraftData] = useState(false);
    const userDetails = useAppSelector(state => state.user);
    const state = useLocation().state as any;
    const [isActionDraft, setActionDraft] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState<FeedbackTypeOption | ''>('');
    const [feedbackTagText, setFeedbackTagText] = useState<FeedbackTypeOption>('positive');

    const { data: tags, isSuccess: isTagsListReceived } = useGetTagsListQuery({});

    const feedbackTypeOptions: FeedbackTypeObject[] = useMemo(
        () =>
            isTagsListReceived
                ? [
                      ...tags.map((tag: Tag) => {
                          return { ...tag, label: accordionHeaderTitles[tag.feedbackTypeId], value: tag.feedbackType.toLowerCase() };
                      })
                  ]
                : [],
        [isTagsListReceived, tags]
    );

    // // SingleFeedbackData = the current viewing/editing feedback in the form
    const {
        data: SingleFeedbackData,
        isSuccess: isSingleFeedbackSuccess,
        isLoading: isSingleFeedbackLoading
    } = useGetSingleRequestedFeedbackQuery(
        {
            path: state.requestId,
            params: []
        },
        {
            refetchOnMountOrArgChange: true
        }
    );

    // to keep track of the data for edit isNewlyAdded or isDeleted computations
    const previousFeedbackDataState = useMemo(
        () => (isSingleFeedbackSuccess && !isSingleFeedbackLoading ? SingleFeedbackData?.feedbackData : []),
        [SingleFeedbackData?.feedbackData, isSingleFeedbackLoading, isSingleFeedbackSuccess]
    );

    const feedbackFrom = useMemo(
        () =>
            !isSingleFeedbackLoading && isSingleFeedbackSuccess
                ? `${SingleFeedbackData?.requestedByFirstName} ${SingleFeedbackData?.requestedByLastName} (${SingleFeedbackData?.requestedByEmployeeId})`
                : '',
        [
            SingleFeedbackData?.requestedByFirstName,
            SingleFeedbackData?.requestedByEmployeeId,
            SingleFeedbackData?.requestedByLastName,
            isSingleFeedbackLoading,
            isSingleFeedbackSuccess
        ]
    );

    const feedbackAbout = useMemo(
        () =>
            !isSingleFeedbackLoading && isSingleFeedbackSuccess
                ? SingleFeedbackData?.requestedByEmployeeId === SingleFeedbackData?.feedbackToEmployeeId
                    ? 'Self'
                    : `${SingleFeedbackData?.feedbackToFirstName} ${SingleFeedbackData?.feedbackToLastName} (${SingleFeedbackData?.feedbackToEmployeeId})`
                : '',
        [
            isSingleFeedbackLoading,
            isSingleFeedbackSuccess,
            SingleFeedbackData?.requestedByEmployeeId,
            SingleFeedbackData?.feedbackToEmployeeId,
            SingleFeedbackData?.feedbackToFirstName,
            SingleFeedbackData?.feedbackToLastName
        ]
    );

    const feedbackDescription = useMemo(
        () => (!isSingleFeedbackLoading && isSingleFeedbackSuccess ? SingleFeedbackData?.request : ''),
        [SingleFeedbackData?.request, isSingleFeedbackLoading, isSingleFeedbackSuccess]
    );

    const actionItem = useMemo(
        () => (!isSingleFeedbackLoading && isSingleFeedbackSuccess ? SingleFeedbackData?.actionItem : ''),
        [SingleFeedbackData?.actionItem, isSingleFeedbackLoading, isSingleFeedbackSuccess]
    );

    useEffect(() => {
        if (state?.action === 'View' && SingleFeedbackData && SingleFeedbackData?.feedbackData?.length >= 0) {
            setActiveAccordion(SingleFeedbackData?.feedbackData[0].feedbackType.toLowerCase() as FeedbackTypeOption);
        }
        if (state?.action === 'Edit' || state?.action === 'View') {
            if (isSingleFeedbackSuccess && !isSingleFeedbackLoading && SingleFeedbackData && SingleFeedbackData?.feedbackData) {
                setFeedbackData(
                    SingleFeedbackData.feedbackData.map(item => ({
                        feedbackId: item.feedbackId,
                        feedbackText: item.feedback,
                        feedbackTypeId: item.feedbackTypeId,
                        markdownText: null
                    }))
                );
            }
        }
    }, [state?.action, isSingleFeedbackSuccess, isSingleFeedbackLoading, SingleFeedbackData]);

    const [addNewFeedback, { error: addError, isSuccess: isAddSuccess, isLoading }] = usePostFeedbackMutation();

    const getEditedData = useCallback(
        (data: Payload): EditedDataPayload => {
            const previousDataMap = new Map(previousFeedbackDataState.map(item => [item.feedbackTypeId, item]));
            const currentDataMap = new Map(data.feedbackData.map(item => [item.feedbackTypeId, item]));

            const allFeedbackTypes: FeedbackTypeId[] = [1, 2, 3];

            const result: EditedDataPayload['feedbackData'] = [];
            const otherData: Omit<EditedDataPayload, 'feedbackData'> = {
                feedbackToId: data.feedbackToId,
                feedbackFromId: data.feedbackFromId,
                organisationId: data.organisationId,
                requestId: data.requestId,
                isDraft: data.isDraft
            };

            allFeedbackTypes.map(feedbackTypeId => {
                const prevItem = previousDataMap.get(feedbackTypeId);
                const currItem = currentDataMap.get(feedbackTypeId);
                if (!prevItem && currItem && currItem.feedbackText.trim()) {
                    // newly added feedback item
                    result.push({
                        isNewlyAdded: true,
                        isRemoved: false,
                        feedbackText: currItem.feedbackText,
                        feedbackTypeId,
                        markdownText: currItem.markdownText
                    });
                } else if (prevItem && (!currItem || currItem.feedbackText.trim() === '')) {
                    // removed feedback item
                    result.push({
                        isNewlyAdded: false,
                        isRemoved: true,
                        feedbackId: prevItem.feedbackId,
                        feedbackTypeId,
                        markdownText: null,
                        feedbackText: ''
                    });
                } else if (prevItem && currItem) {
                    // feedbackText updated or unchanged feedback item
                    result.push({
                        isNewlyAdded: false,
                        isRemoved: false,
                        feedbackId: prevItem.feedbackId,
                        feedbackText: currItem.feedbackText,
                        markdownText: currItem.markdownText,
                        feedbackTypeId
                    });
                }
            }, []);
            return { ...otherData, feedbackData: result };
        },
        [previousFeedbackDataState]
    );

    const handleSend = useCallback(
        (val: 'Draft' | 'Save') => {
            if (val === 'Draft') {
                setActionDraft(true);
            } else {
                setActionDraft(false);
            }

            const turndownService = new TurnDown()
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

            const feedbackDataWithMarkdown = feedbackData.map(dataItem => ({
                ...dataItem,
                markdownText: dataItem.feedbackText !== '' ? turndownService.turndown(dataItem.feedbackText) : null
            }));
            if (SingleFeedbackData) {
                const data: Payload = {
                    feedbackData: feedbackDataWithMarkdown,
                    requestId: SingleFeedbackData.requestId,
                    feedbackToId: SingleFeedbackData.feedbackToId,
                    feedbackFromId: userDetails.id,
                    organisationId: userDetails.organisationId,
                    isDraft: val === 'Draft' ? true : false
                };

                setButtonLoader(val === 'Draft' ? 1 : 2);
                setDraftData(val === 'Draft');
                if (state.action === 'Add') {
                    addNewFeedback({
                        data,
                        method: 'POST',
                        path: ''
                    });
                } else if (state.action === 'Edit') {
                    const editData = getEditedData(data);
                    addNewFeedback({
                        data: editData,
                        method: 'PUT',
                        path: ''
                    });
                }
            }
        },

        [SingleFeedbackData, addNewFeedback, feedbackData, getEditedData, state.action, userDetails.id, userDetails.organisationId]
    );

    const removeHtmlTags = (tempStr: string): string => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tempStr;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const isAddBtnDisabled = useMemo(() => {
        const hasNoFeedbackDataText = feedbackData.every(item => item.feedbackText === '');
        const hasNoFeedbackHtml = feedbackData.every(item => removeHtmlTags(item.feedbackText).length === 0);
        const hasNoFeedbackErrors =
            feedbackErrors['1']?.length !== 0 || feedbackErrors['2']?.length !== 0 || feedbackErrors['3']?.length !== 0;
        const hasNoFeedbackDescription = feedbackDescription?.length === 0;

        return hasNoFeedbackDataText || hasNoFeedbackDescription || hasNoFeedbackHtml || hasNoFeedbackErrors;
    }, [feedbackData, feedbackDescription?.length, feedbackErrors]);

    const debounced = debounce((value: string, feedbackId: FeedbackTypeId) => {
        // if atleast one of the feeedbackData already have correct data without errors then send the next error validation checks as isOptional as true
        // basically, if atleast one feedbacks is fully filled, rest become optional
        const valueWithoutHtmlTags = removeHtmlTags(value);
        const isOptional = feedbackData.some(item => removeHtmlTags(item.feedbackText).trim().length > 50) || false;
        const error = performValidation('feedback', valueWithoutHtmlTags.trim(), isOptional);

        setFeedbackErrors(prev => ({ ...prev, [feedbackId]: error }));

        const cleanedText = valueWithoutHtmlTags.trim();

        setFeedbackData(prev => {
            // remove the object itself if feedbackText is ''
            if (cleanedText === '') {
                setFeedbackErrors(prev => ({ ...prev, [feedbackId]: '' }));
                return prev.filter(item => item.feedbackTypeId !== feedbackId);
            }
            const isFeedbackExists = prev.find(item => item.feedbackTypeId === feedbackId) || false;
            // markdown data is null here because it is only updated when user clicks send
            if (!isFeedbackExists) {
                return [
                    ...prev,
                    {
                        feedbackTypeId: feedbackId,
                        feedbackText: value,
                        markdownText: null
                    }
                ];
            } else {
                return prev.map(prevDataItem =>
                    prevDataItem.feedbackTypeId === feedbackId
                        ? {
                              ...prevDataItem,
                              feedbackText: value,
                              markdownText: null
                          }
                        : prevDataItem
                );
            }
        });
    }, 500);

    const handleChange = useCallback(
        (value: string, feedbackId: FeedbackTypeId) => {
            debounced(value, feedbackId);
        },
        [debounced]
    );

    const handleAccordinToggle = (value: FeedbackTypeOption) => {
        setActiveAccordion(prev => (prev === value ? '' : value));
        setFeedbackTagText(value);
    };

    const getInputValue = useCallback(
        (feedbackTypeId: FeedbackTypeId) =>
            feedbackData.find(feedbackItem => feedbackItem.feedbackTypeId === feedbackTypeId)?.feedbackText || '',
        [feedbackData]
    );

    const feedbackTagNumber = useMemo(
        () => feedbackTypeOptions?.find(item => item.value === feedbackTagText)?.feedbackTypeId || 1,
        [feedbackTagText, feedbackTypeOptions]
    );

    useEffect(() => {
        if (typeof addError === 'object') {
            const errorObj = addError as ErrorType;
            addToast({
                variant: 'error',
                header: errorObj.data.errorMessage || 'Sorry, Feedback not submitted. Please try again Later.',
                timer: 3000
            });
        }
    }, [addError, isAddSuccess]);

    useEffect(() => {
        if (isAddSuccess) {
            addToast({
                variant: 'success',
                header: isActionDraft ? 'Requested feedback saved successfully' : 'Requested Feedback submitted successfully',
                timer: 3000
            });
        }
    }, [isActionDraft, isAddSuccess]);

    useEffect(() => {
        if (isAddSuccess) {
            navigateTo(`${routeConstants.requestFeedback}/${ActivePage}`);
        }
    }, [ActivePage, isAddSuccess, navigateTo]);

    return {
        feedbackAbout,
        feedbackTagText,
        feedbackDescription,
        feedbackData,
        action: state && state.action,
        isLoading: isLoading || isSingleFeedbackLoading,
        handleSend,
        isAddBtnDisabled,
        feedbackFrom,
        buttonLoader,
        draftData,
        actionItem,
        handleChange,
        activeAccordion,
        handleAccordinToggle,
        feedbackTypeOptions,
        getInputValue,
        feedbackTagNumber,
        feedbackErrors
    };
};
