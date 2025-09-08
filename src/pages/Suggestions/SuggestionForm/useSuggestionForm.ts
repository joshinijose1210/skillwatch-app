import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useGetSettingListQuery, usePostSuggestionMutation } from '@slice/services';
import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { useLocation, useNavigate } from 'react-router-dom';
import { performValidation } from '@utils/validations';
import TurndownService from 'turndown';

export const useSuggestionForm = () => {
    const navigateTo = useNavigate(),
        userDetails = useAppSelector(state => state.user),
        state = useLocation().state as any;

    const [suggestionData, setSuggestion] = useState(''),
        [suggestionDataErr, setSuggestionDataErr] = useState(''),
        [buttonLoader, setButtonLoader] = useState(0),
        [status, setStatus] = useState(false);

    const { data: settingData } = useGetSettingListQuery(
        {
            path: '',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        },
        { refetchOnMountOrArgChange: true }
    );

    const [addNewSuggestion, { error: addError, isSuccess: isAddSuccess, isLoading }] = usePostSuggestionMutation();

    const handleSend = useCallback(
        (val: string) => {
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

            const data = {
                isAnonymous: status,
                suggestion: suggestionData,
                markdownText: turndownService.turndown(suggestionData),
                suggestedById: userDetails.id,
                isDraft: val === 'Draft' ? true : false
            };
            setButtonLoader(val === 'Draft' ? 1 : 2);

            if (state.action === 'Add') {
                addNewSuggestion({
                    data,
                    method: 'POST',
                    path: ''
                });
            } else if (state.action === 'Edit') {
                addNewSuggestion({
                    data,
                    method: 'PUT',
                    path: state.id
                });
            }
        },
        [addNewSuggestion, suggestionData, userDetails.id, userDetails.organisationId, status]
    );

    const removeHtmlTags = (tempStr: string): string => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tempStr;
        return tempDiv.textContent || '';
    };

    const debounced = debounce((value: string) => {
        const error = performValidation('suggestion', removeHtmlTags(value));
        setSuggestionDataErr(error);
        setSuggestion(value);
    }, 500);

    const handleChange = useCallback(
        (value: string) => {
            debounced(value);
        },
        [debounced]
    );

    const handleToggleClick = () => {
        setStatus(!status);
    };

    const isDraftDisabled = useMemo(() => {
        let response = true;
        if (suggestionData && !suggestionDataErr) {
            response = false;
        }
        return response;
    }, [suggestionData, suggestionDataErr]);

    useEffect(() => {
        if (typeof addError === 'object') {
            const errorObj = addError as ErrorType;
            addToast({
                variant: 'error',
                header: errorObj.data.errorMessage || 'something went wrong',
                timer: 3000
            });
        }
    }, [addError]);

    useEffect(() => {
        if (isAddSuccess) {
            addToast({
                variant: 'success',
                header: 'Suggestion submitted successfully',
                timer: 3000
            });
        }
    }, [isAddSuccess]);

    useEffect(() => {
        if (isAddSuccess) {
            sessionStorage.setItem('myTab', 'submitted');
            navigateTo(`${routeConstants.suggestionBox}/${1}`);
        }
    }, [isAddSuccess, navigateTo]);

    useEffect(() => {
        if (state) {
            if (state.action && state.action === 'Edit') {
                setStatus(settingData?.isAnonymousSuggestionAllowed ? state.isAnonymous : false);
                setSuggestion(state.suggestion);
            }
        }
    }, [state, settingData?.isAnonymousSuggestionAllowed]);

    return {
        suggestionData,
        state,
        isLoading,
        buttonLoader,
        handleSend,
        setSuggestion,
        userDetails,
        handleChange,
        isDraftDisabled,
        status,
        handleToggleClick,
        settingData
    };
};
