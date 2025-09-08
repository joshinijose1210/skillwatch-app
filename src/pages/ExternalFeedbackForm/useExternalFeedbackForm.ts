import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { routeConstants } from '@constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { performValidation } from '@utils/validations';
import apiUrls from '@constants/apiUrls';
import { useAxios } from '@medly-components/utils';
import { addToast } from '@medly-components/core';
import { Buffer } from 'buffer';
import { UserData } from './types';

import {
    Errors,
    FeedbackItem,
    FeedbackTypeId,
    FeedbackTypeObject,
    FeedbackTypeOption,
    Tag
} from '@pages/RequestedFeedback/RequestedFeedbackForm/types';
import { accordionHeaderTitles } from '@pages/RequestedFeedback/RequestedFeedbackForm/constants';
import TurndownService from 'turndown';

export const useExternalFeedbackForm = () => {
    const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);
    const [buttonLoader, setButtonLoader] = useState(0),
        [submittedText, setSubmittedText] = useState(''),
        [externalFeedbackData, setExternalFeedbackData] = useState<UserData>(),
        [linkValid, setLinkValid] = useState(false),
        [isFetched, setIsFetched] = useState(true),
        [isFetchError, setIsFetchError] = useState(false),
        [submitError, setSubmitError] = useState(false),
        [activeAccordion, setActiveAccordion] = useState<FeedbackTypeOption | ''>('positive'),
        [feedbackTagText, setFeedbackTagText] = useState<FeedbackTypeOption>('positive'),
        [feedbackErrors, setFeedbackErrors] = useState<Errors>({ 1: '', 2: '', 3: '' }),
        [isTagsListReceived, setIsTagsListReceived] = useState<boolean>(false),
        [tagsList, setTagsList] = useState<Tag[] | null>(null);
    const { request, isLoading } = useAxios();
    const navigateTo = useNavigate();

    const [searchParams] = useSearchParams();

    const linkId = searchParams.get('id'),
        encryptedRequestId = searchParams.get('requestId');

    const getTagsQuery = () => {
        request({
            url: apiUrls.tags,
            method: 'GET',
            onSuccess: response => {
                if (response) {
                    setIsTagsListReceived(true);
                    setTagsList(response.data);
                }
            },
            onError: () => {
                setIsTagsListReceived(false);
                setTagsList(null);
            }
        });
    };

    const feedbackTypeOptions: FeedbackTypeObject[] = useMemo(() => {
        return isTagsListReceived && tagsList
            ? [
                  ...tagsList.map((tag: Tag) => {
                      return {
                          ...tag,
                          label: accordionHeaderTitles[tag.feedbackTypeId],
                          value: tag.feedbackType.toLowerCase() as FeedbackTypeObject['value']
                      };
                  })
              ]
            : [];
    }, [isTagsListReceived, tagsList]);

    const getExternalFeedbackQuery = (linkId: string, encryptedRequestId: string) => {
        const requestId = Buffer.from(encryptedRequestId, 'base64').toString('ascii');
        request({
            url: `${apiUrls.externalFeedback}?linkId=${linkId}&requestId=${requestId}`,
            method: 'GET',
            onError: err => {
                if (err?.status === 404) {
                    setSubmittedText('Feedback has already been submitted.');
                } else {
                    setIsFetchError(true);
                }
            },
            onSuccess: response => {
                if (response?.status === 200) {
                    setLinkValid(true);
                    setExternalFeedbackData(response.data);
                }
            }
        });
    };

    const handleAccordionToggle = (value: FeedbackTypeOption) => {
        setActiveAccordion(prev => (prev === value ? '' : value));
        setFeedbackTagText(value);
    };

    const handleSubmit = () => {
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

        const feedbackDataWithMarkdown = feedbackData.map(dataItem => ({
            ...dataItem,
            markdownText: dataItem.feedbackText !== '' ? turndownService.turndown(dataItem.feedbackText) : null
        }));

        const data = {
            linkId,
            feedbackToId: externalFeedbackData?.feedbackToId,
            feedbackFromId: externalFeedbackData?.feedbackFromId,
            feedback: feedbackDataWithMarkdown,
            requestId: externalFeedbackData?.requestId
        };
        setButtonLoader(2);

        request({
            url: `${apiUrls.externalFeedback}`,
            data,
            method: 'POST',
            onError: () => setSubmitError(true),
            onSuccess: () => setSubmittedText('Thank you for submitting your feedback.')
        });
    };

    const removeHtmlTags = (tempStr: string) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tempStr;
        const text = tempDiv.textContent || tempDiv.innerText || '';
        return text;
    };

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

    const handleRedirect = () => {
        navigateTo(routeConstants.root);
    };

    const feedbackDescription = useMemo(() => externalFeedbackData?.request || '', [externalFeedbackData?.request]);

    const isSubmitDisabled = useMemo(() => {
        const hasNoFeedbackDataText = feedbackData.every(item => item.feedbackText === '');
        const hasNoFeedbackHtml = feedbackData.every(item => removeHtmlTags(item.feedbackText).length === 0);
        const hasFeedbackErrors =
            feedbackErrors['1']?.length !== 0 || feedbackErrors['2']?.length !== 0 || feedbackErrors['3']?.length !== 0;

        return hasNoFeedbackDataText || hasNoFeedbackHtml || hasFeedbackErrors;
    }, [feedbackData, feedbackErrors]);

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
        setIsFetched(false);
        if (linkId && encryptedRequestId) {
            getExternalFeedbackQuery(linkId, encryptedRequestId);
        }
        getTagsQuery();
    }, []);

    useEffect(() => {
        if (submitError) {
            addToast({
                variant: 'error',
                header: 'Unable to submit feedback.',
                timer: 3000
            });
            setSubmitError(false);
        }
    }, [submitError]);
    return {
        handleChange,
        isLoading,
        buttonLoader,
        externalFeedbackData,
        linkValid,
        submittedText,
        isFetchError,
        isFetched,
        isSubmitDisabled,
        handleRedirect,
        handleSubmit,
        activeAccordion,
        handleAccordionToggle,
        feedbackTagText,
        feedbackTagNumber,
        feedbackTypeOptions,
        getInputValue,
        feedbackErrors,
        feedbackDescription
    };
};
