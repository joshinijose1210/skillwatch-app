import { useMemo } from 'react';
import { ErrorType } from '@common';
import { useSelectFeedbacktag } from '@components/reusableComponents/SelectFeedbackTag/useSelectFeedbackTag';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { usePostFeedbackMutation } from '@slice/services';
import { performValidation } from '@utils/validations';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import TurnDown from 'turndown';
import { FeedbackItem, FeedbackTypeId, Payload } from '@pages/RequestedFeedback/RequestedFeedbackForm/types';

export const useFeedbackForm = () => {
    const state = useLocation().state as any,
        navigate = useNavigate(),
        { tagsList } = useSelectFeedbacktag(),
        userDetails = useAppSelector(state => state.user);

    const [feedbackTag, setFeedbackTag] = useState<any>(1);
    const [selectedEmployee, setSelectedEmployee] = useState(),
        [feedbackData, setFeedback] = useState<string>(''),
        [buttonLoader, setButtonLoader] = useState(0),
        [draftData, setDraftData] = useState(false),
        [feedbackDataErr, setFeedbackDataErr] = useState('');
    const [addNewFeedback, { isLoading, isError: addError, isSuccess: isAddSuccess, error }] = usePostFeedbackMutation();

    const getEditedData = useCallback(
        (data: any) => {
            const previousDataMap = new Map([[feedbackTag, feedbackData]]);
            const currentDataMap = new Map(data.feedbackData.map((item: any) => [item.feedbackTypeId, item]));

            const allFeedbackTypes: FeedbackTypeId[] = [1, 2, 3];

            const result: unknown[] = [];
            const otherData = {
                feedbackToId: data.feedbackToId,
                feedbackFromId: data.feedbackFromId,
                organisationId: data.organisationId,

                isDraft: data.isDraft
            };

            allFeedbackTypes.map(feedbackTypeId => {
                const prevItem = previousDataMap.get(feedbackTypeId);
                const currItem = currentDataMap.get(feedbackTypeId) as FeedbackItem;
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
                        feedbackId: state.srNo,
                        feedbackTypeId,
                        markdownText: null,
                        feedbackText: ''
                    });
                } else if (prevItem && currItem) {
                    // feedbackText updated or unchanged feedback item
                    result.push({
                        isNewlyAdded: false,
                        isRemoved: false,
                        feedbackId: state.srNo,
                        feedbackText: currItem.feedbackText,
                        markdownText: currItem.markdownText,
                        feedbackTypeId
                    });
                }
            }, []);
            return { ...otherData, feedbackData: result };
        },
        [feedbackTag, feedbackData, state.srNo]
    );

    const handleSend = useCallback(
        (val: string) => {
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
            const markdown = turndownService.turndown(feedbackData);

            const data = {
                feedbackData: [
                    {
                        feedbackId: state.srNo,
                        feedbackTypeId: feedbackTag,
                        feedbackText: feedbackData,
                        markdownText: markdown
                    }
                ],

                feedbackToId: selectedEmployee ? selectedEmployee : state.feedbackToId,
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
                const editedData = getEditedData(data as Payload);
                addNewFeedback({
                    data: editedData,
                    method: 'PUT',
                    path: ''
                });
            }
        },

        [
            addNewFeedback,
            feedbackData,
            feedbackTag,
            getEditedData,
            selectedEmployee,
            state.action,
            state.feedbackToId,
            state.srNo,
            userDetails.id,
            userDetails.organisationId
        ]
    );

    const handleSelectEmployee = (value: any) => {
        setSelectedEmployee(value);
    };

    const handleDropdownChange = (value: any) => {
        setFeedbackTag(value);
    };
    const feedbackTagText = feedbackTag && tagsList.find(tag => tag.value === feedbackTag)?.label.toLowerCase();

    const removeHtmlTags = (tempStr: string): string => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tempStr;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const debounced = debounce((value: string) => {
        const error = performValidation('feedback', removeHtmlTags(value));
        setFeedbackDataErr(error);
        setFeedback(value);
    }, 500);

    const handleChange = useCallback(
        (value: string) => {
            debounced(value);
        },
        [debounced]
    );

    const isDraftDisabled = useMemo(() => {
        let response = true;
        if (selectedEmployee && feedbackTag && feedbackData && !feedbackDataErr) {
            response = false;
        }
        return response;
    }, [selectedEmployee, feedbackTag, feedbackData, feedbackDataErr]);

    useEffect(() => {
        if (typeof error === 'object') {
            const errorObj = error as ErrorType;
            addToast({
                variant: 'error',
                header: errorObj.data.message,
                timer: 3000
            });
        }
    }, [addError, error, isAddSuccess]);

    useEffect(() => {
        if (isAddSuccess) {
            addToast({
                variant: 'success',
                header: draftData ? 'Feedback saved successfully' : 'Feedback submitted successfully',
                timer: 3000
            });
            sessionStorage.setItem('myTab', 'sent');
            navigate(`${routeConstants.myFeedback}/${1}?tab=submitted`);
        }
    }, [draftData, isAddSuccess, navigate]);

    useEffect(() => {
        if (state) {
            if (state.actionFrom) {
                setSelectedEmployee(state.feedbackFromId);
            } else {
                setSelectedEmployee(state.feedbackToId);
            }
            if (state.feedbackTypeId && state.feedback) {
                setFeedbackTag(state.feedbackTypeId);
                setFeedback(state.feedback);
            }
        }
    }, [state]);

    return {
        selectedEmployee,
        handleSelectEmployee,
        feedbackTag,
        handleDropdownChange,
        feedbackData,
        isLoading,
        setFeedback,
        handleSend,
        state,
        feedbackTagText,
        buttonLoader,
        handleChange,
        isDraftDisabled
    };
};
