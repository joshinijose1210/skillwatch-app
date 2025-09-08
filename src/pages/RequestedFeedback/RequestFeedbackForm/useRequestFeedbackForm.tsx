import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useAppSelector } from '@slice';
import {
    useAddFeedbackRequestMutation,
    useGetEmployeeListQuery,
    useGetFeedbackActionItemsQuery,
    useGetSingleRequestedFeedbackQuery,
    useGetTagsListQuery
} from '@slice/services';
import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActionItems, EmployeList, Employee } from './types';
import { performValidation } from '@utils/validations';
import { FeedbackTypeObject, FeedbackTypeOption, Tag } from '../RequestedFeedbackForm/types';
import { accordionHeaderTitles } from '../RequestedFeedbackForm/constants';
import TurndownService from 'turndown';

export const useRequestFeedbackForm = () => {
    const navigateTo = useNavigate(),
        userDetails = useAppSelector(state => state.user),
        state = useLocation().state as any;

    const [requestFrom, setRequestFrom] = useState<string[]>([]),
        [feedbackTo, setFeedbackTo] = useState<string[]>([]),
        [actionItem, setActionItem] = useState<string>(''),
        [initialRender, setInitialRender] = useState(true),
        [showActionItems, setShowActionItems] = useState(false),
        [feedback, setFeedback] = useState(''),
        [feedbackDescription, setFeedbackDescription] = useState(''),
        [feedbackDataErr, setFeedbackDataErr] = useState(''),
        [isEmail, setIsEmail] = useState(true),
        [isExternal, setIsExternal] = useState(false),
        [selectedEmails, setSelectedEmails] = useState<any[]>([]),
        [externalEmails, setExternalEmails] = useState<string[]>([]),
        [sameUserError, setSameUserError] = useState(''),
        [feedbackType, setFeedbackType] = useState(''),
        [activeAccordion, setActiveAccordion] = useState<FeedbackTypeOption | ''>('positive');
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
        ),
        [addNewFeedback, { isError: addError, isSuccess: isAddSuccess, isLoading }] = useAddFeedbackRequestMutation(),
        {
            data: actionItemsList,
            isSuccess: isActionItemsRecieved,
            isError: actionError
        } = useGetFeedbackActionItemsQuery(
            {
                path: 'action-items',
                params: [
                    { name: 'organisationId', value: userDetails.organisationId },
                    { name: 'feedbackToId', value: userDetails.id }
                ]
            },
            { refetchOnMountOrArgChange: true }
        );

    const employeeList = useCallback(
        (val: string) => {
            const filteredList = isEmployeeListReceived
                ? state && state.action === 'View'
                    ? employees?.employees
                    : employees?.employees.filter((employee: Employee) => employee.status === true)
                : [];
            let list = filteredList
                ? filteredList.map((employee: Employee) => {
                      return {
                          value: employee.id,
                          label:
                              employee.id === userDetails.id ? 'Me' : `${employee.firstName} ${employee.lastName} (${employee.employeeId})`
                      };
                  })
                : [];
            if (val === 'From') {
                list = list.filter((employee: EmployeList) => employee.value !== userDetails.id);
            }
            if (val === 'To' && requestFrom.length > 0) {
                list = list.filter((employee: EmployeList) => !requestFrom.includes(employee.value));
            } else if (val === 'From' && feedbackTo.length > 0) {
                list = list.filter((employee: EmployeList) => !feedbackTo.includes(employee.value));
            }
            list.sort((a: EmployeList, b: EmployeList) => a.label.localeCompare(b.label));
            return list;
        },
        [employees?.employees, feedbackTo, isEmployeeListReceived, requestFrom, userDetails.id]
    );

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

    const viewFeedbackDescription = useMemo(
        () => (!isSingleFeedbackLoading && isSingleFeedbackSuccess ? SingleFeedbackData?.request : ''),
        [SingleFeedbackData?.request, isSingleFeedbackLoading, isSingleFeedbackSuccess]
    );

    const viewActionItem = useMemo(
        () => (!isSingleFeedbackLoading && isSingleFeedbackSuccess ? SingleFeedbackData?.actionItem : ''),
        [SingleFeedbackData?.actionItem, isSingleFeedbackLoading, isSingleFeedbackSuccess]
    );

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

    const handleSend = () => {
            addNewFeedback({
                organisationId: userDetails.organisationId,
                requestedBy: userDetails.id,
                feedbackToId: feedbackTo,
                feedbackFromId: requestFrom,
                feedbackFromEmail: externalEmails,
                isExternalRequest: isExternal,
                request: feedback,
                actionItemId: actionItem,
                markdownRequest: turndownService.turndown(feedback)
            });
        },
        handleSelectRequestFrom = (val: string[]) => {
            setRequestFrom(val);
        },
        handleEmailsRequestFrom = (val: string[]) => {
            const lowerCaseValues = val.map(element => {
                return element.toLowerCase();
            });
            sameUserEmailCheck(lowerCaseValues);
            setExternalEmails(val);
        },
        handleSelectFeedbackTo = (val: string[]) => setFeedbackTo(val),
        handleActionItems = (val: string) => setActionItem(val);

    const handleAccordinToggle = (value: FeedbackTypeOption) => {
        setActiveAccordion(prev => (prev === value ? '' : value));
    };

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

    const sameUserEmailCheck = (val: string[]) => {
        const sameUserEmailErrText = 'Cannot send request to same user.';
        if (val.length) {
            if (val.includes(userDetails.email.toLowerCase())) {
                setSameUserError(sameUserEmailErrText);
            } else {
                setSameUserError('');
            }
        } else {
            setSameUserError('');
        }
    };

    const handleCustomInputRequestFrom = useCallback((val: string) => {
        const emailPattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (val.match(emailPattern)) {
            setIsEmail(true);
        } else {
            setIsEmail(false);
        }
    }, []);

    const handleChange = useCallback(
        (value: string) => {
            debounced(value);
        },
        [debounced]
    );

    const handleToggleClick = () => {
        setIsExternal(!isExternal);
        setRequestFrom([]);
        setExternalEmails([]);
    };

    const isSendDisabled = () => {
        let response = true;
        if (
            ((!isExternal && requestFrom.length > 0) || (isExternal && externalEmails.length > 0)) &&
            feedbackTo.length > 0 &&
            feedback &&
            !feedbackDataErr &&
            state?.action !== 'View' &&
            !sameUserError
        ) {
            response = false;
        }
        return response;
    };

    const actionItemsOptions = useMemo(() => {
        let actionList = [];
        if (isActionItemsRecieved) {
            actionList = actionItemsList?.map((items: ActionItems) => ({
                value: items.actionItemId,
                label: items.actionItem
            }));
        }
        return actionList;
    }, [actionItemsList, isActionItemsRecieved]);

    const handleSelectFeedbackType = (val: any) => setFeedbackType(val);

    useEffect(() => {
        if (state && state.action === 'View') {
            setFeedbackType(state.feedbackTypeId || 1);
            setFeedbackTo([state.feedbackToId]);
            state?.feedback && setFeedback(state.feedback);
            setFeedbackDescription(state.request);
            if (state.actionItem) {
                setActionItem(state.actionItem);
                setShowActionItems(true);
            } else {
                setShowActionItems(false);
            }
            if (state.isExternalRequest) {
                setExternalEmails([state.externalFeedbackFromEmail]);
                setIsExternal(true);
                setIsEmail(true);
                setSelectedEmails([{ label: state.externalFeedbackFromEmail, value: state.externalFeedbackFromEmail }]);
            } else {
                setRequestFrom([state.feedbackFromId]);
                setIsExternal(false);
            }
        }
    }, [state]);

    useEffect(() => {
        if (isActionItemsRecieved) {
            setShowActionItems(true);
        }
        if (feedbackTo.length === 0 && initialRender) {
            if (state.feedbackToId) {
                setFeedbackTo([state.feedbackToId]);
            } else {
                setFeedbackTo([userDetails.id]);
            }
            setInitialRender(false);
        }
        if (feedbackTo.length > 1 || feedbackTo[0] !== userDetails.id || actionError) {
            setShowActionItems(() => false);
            return;
        }
    }, [feedbackTo, feedbackTo.length, initialRender, userDetails.id, actionError, isActionItemsRecieved, state.feedbackToId]);

    useEffect(() => {
        if (typeof addError === 'object') {
            const errorObj = addError as ErrorType;
            addToast({
                variant: 'error',
                header: errorObj.data.errorMessage || 'something went wrong',
                timer: 3000
            });
        }
    }, [addError, isAddSuccess]);

    useEffect(() => {
        if (isAddSuccess) {
            addToast({
                variant: 'success',
                header: 'Request Feedback submitted successfully',
                timer: 3000
            });
        }
    }, [isAddSuccess]);

    useEffect(() => {
        if (isAddSuccess) {
            sessionStorage.setItem('myTab', 'sent');
            navigateTo(`${routeConstants.requestFeedback}/${1}`);
        }
    }, [isAddSuccess, navigateTo]);

    return {
        viewActionItem,
        viewFeedbackDescription,
        SingleFeedbackData,
        feedbackTypeOptions,
        handleAccordinToggle,
        activeAccordion,
        handleCustomInputRequestFrom,
        handleSelectRequestFrom,
        handleEmailsRequestFrom,
        feedbackDescription,
        requestFrom,
        feedbackTo,
        employeeList,
        actionItem,
        handleActionItems,
        actionItemsOptions,
        handleSelectFeedbackTo,
        state,
        isLoading,
        handleSend,
        feedback,
        userDetails,
        showActionItems,
        handleChange,
        isSendDisabled,
        handleToggleClick,
        externalEmails,
        sameUserError,
        selectedEmails,
        isExternal,
        isEmail,
        feedbackType,
        handleSelectFeedbackType
    };
};
