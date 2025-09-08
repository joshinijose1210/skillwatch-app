import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import { addToast, DateRangeType } from '@medly-components/core';
import { AppState, useAppSelector } from '@slice';
import { useAddCycleMutation, useUpdateCycleMutation } from '@slice/services';
import format from 'date-fns/format';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReviewCycleFormInputs } from './types';
import { dateRangeValidations } from './validations';

export const useReviewCycleForm = () => {
    const userDetails = useAppSelector((state: AppState) => state.user),
        navigateTo = useNavigate(),
        state = useLocation().state as any;

    const [inputs, setInputs] = useState<ReviewCycleFormInputs>({
            reviewCycle: {
                startDate: null,
                endDate: null
            },
            selfReview: {
                startDate: null,
                endDate: null
            },
            managerReview: {
                startDate: null,
                endDate: null
            },
            checkInWithManager: {
                startDate: null,
                endDate: null
            },
            publish: false,
            organisationId: userDetails.organisationId,
            errors: {
                reviewCycle: '',
                selfReview: '',
                managerReview: '',
                checkInWithManager: ''
            }
        }),
        [action, setAction] = useState('View'),
        [sendEmail, setSendEmail] = useState(true),
        [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const [addCycle, { isSuccess: isAddSuccess, isLoading: isAddLoading, error: isAddError }] = useAddCycleMutation(),
        [updateCycle, { isSuccess: isUpdateSuccess, isLoading: isUpdateLoading, error: isUpdateError }] = useUpdateCycleMutation();

    const formatDate = (date: Date | null) => (date !== null ? format(date || new Date(), 'yyyy-MM-dd') : ''),
        isLoading = useMemo(() => isAddLoading || isUpdateLoading, [isAddLoading, isUpdateLoading]);

    const handleToggleChange = () => {
            setInputs(prevState => {
                return { ...prevState, publish: !prevState.publish };
            });
        },
        handleEmailNotification = () => {
            setSendEmail(!sendEmail);
        },
        handleDateChange = (name: string, value: DateRangeType) => {
            setIsSubmitDisabled(false);
            const error = dateRangeValidations(name, value, inputs);

            setInputs(prevState => ({
                ...prevState,
                [name]: value,
                errors: {
                    ...prevState.errors,
                    [name]: error
                }
            }));

            if (name === 'reviewCycle') {
                setInputs(prevState => ({
                    ...prevState,
                    selfReview: {
                        startDate: null,
                        endDate: null
                    },
                    managerReview: {
                        startDate: null,
                        endDate: null
                    },
                    checkInWithManager: {
                        startDate: null,
                        endDate: null
                    },
                    errors: {
                        ...prevState.errors,
                        selfReview: '',
                        managerReview: '',
                        checkInWithManager: ''
                    }
                }));
            } else if (name === 'selfReview') {
                setInputs(prevState => ({
                    ...prevState,
                    checkInWithManager: {
                        startDate: null,
                        endDate: null
                    },
                    errors: {
                        ...prevState.errors,
                        checkInWithManager: ''
                    }
                }));
            } else if (name === 'managerReview') {
                setInputs(prevState => ({
                    ...prevState,
                    checkInWithManager: {
                        startDate: null,
                        endDate: null
                    },
                    errors: {
                        ...prevState.errors,
                        checkInWithManager: ''
                    }
                }));
            }
        },
        handleSubmit = useCallback(
            (e: React.FormEvent) => {
                e.preventDefault();

                const data = {
                    startDate: formatDate(inputs.reviewCycle.startDate),
                    endDate: formatDate(inputs.reviewCycle.endDate),
                    selfReviewStartDate: formatDate(inputs.selfReview.startDate),
                    selfReviewEndDate: formatDate(inputs.selfReview.endDate),
                    managerReviewStartDate: formatDate(inputs.managerReview.startDate),
                    managerReviewEndDate: formatDate(inputs.managerReview.endDate),
                    checkInWithManagerStartDate: formatDate(inputs.checkInWithManager.startDate),
                    checkInWithManagerEndDate: formatDate(inputs.checkInWithManager.endDate),
                    publish: inputs.publish,
                    organisationId: userDetails.organisationId,
                    actionBy: userDetails.id,
                    ipAddress: '216.24.57.253:443'
                };
                if (action === 'Add') {
                    addCycle(data);
                } else {
                    if (state && state.reviewCycleId) updateCycle({ id: state.reviewCycleId, ...data, notifyEmployees: sendEmail });
                }
            },
            [
                inputs.reviewCycle.startDate,
                inputs.reviewCycle.endDate,
                inputs.selfReview.startDate,
                inputs.selfReview.endDate,
                inputs.managerReview.startDate,
                inputs.managerReview.endDate,
                inputs.checkInWithManager.startDate,
                inputs.checkInWithManager.endDate,
                inputs.publish,
                userDetails.organisationId,
                userDetails.id,
                action,
                addCycle,
                state,
                updateCycle,
                sendEmail
            ]
        );

    useEffect(() => {
        if (isAddSuccess || isUpdateSuccess) {
            navigateTo(routeConstants.reviewCycleConfiguration);
            addToast({
                variant: 'success',
                header: `Review cycle ${isAddSuccess ? 'added' : 'updated'} successfully`,
                timer: 3000
            });
        } else if (typeof isAddError === 'object' || typeof isUpdateError === 'object') {
            const error = (isAddError as ErrorType) || (isUpdateError as ErrorType);

            addToast({
                variant: 'error',
                header: error.data.errorMessage || 'Something went wrong',
                timer: 3000
            });
            setIsSubmitDisabled(true);
        }
    }, [isAddError, isAddSuccess, isUpdateError, isUpdateSuccess, navigateTo]);

    useEffect(() => {
        if (state) {
            setAction(state.action);
            if (state.reviewCycle) {
                setInputs({
                    reviewCycle: {
                        startDate: new Date(new Date(state.startDate).setHours(0, 0, 0)) || null,
                        endDate: new Date(new Date(state.endDate).setHours(0, 0, 0)) || null
                    },
                    selfReview: {
                        startDate: new Date(new Date(state.selfReviewStartDate).setHours(0, 0, 0)) || null,
                        endDate: new Date(new Date(state.selfReviewEndDate).setHours(0, 0, 0)) || null
                    },
                    managerReview: {
                        startDate: new Date(new Date(state.managerReviewStartDate).setHours(0, 0, 0)) || null,
                        endDate: new Date(new Date(state.managerReviewEndDate).setHours(0, 0, 0)) || null
                    },
                    checkInWithManager: {
                        startDate: new Date(new Date(state.checkInWithManagerStartDate).setHours(0, 0, 0)) || null,
                        endDate: new Date(new Date(state.checkInWithManagerEndDate).setHours(0, 0, 0)) || null
                    },
                    publish: state.publish || false,
                    organisationId: userDetails.organisationId,
                    errors: {
                        reviewCycle: '',
                        selfReview: '',
                        managerReview: '',
                        checkInWithManager: ''
                    }
                });
            }
        }
    }, [state, userDetails.organisationId]);

    useEffect(() => {
        let state =
            [
                Object.values(inputs.reviewCycle),
                Object.values(inputs.selfReview),
                Object.values(inputs.managerReview),
                Object.values(inputs.checkInWithManager)
            ]
                .flat()
                .find(e => e === null) === null
                ? true
                : false;
        if (state === false) {
            [...Object.values(inputs.errors)].find(e => e !== '') !== undefined ? (state = true) : (state = false);
        }
        setIsSubmitDisabled(state);
    }, [inputs.checkInWithManager, inputs.errors, inputs.managerReview, inputs.reviewCycle, inputs.selfReview, inputs.publish]);

    const handleDatePickerClear = (name: any) => {
        if (name === 'reviewCycle') {
            setInputs({
                ...inputs,
                reviewCycle: {
                    startDate: null,
                    endDate: null
                },
                selfReview: {
                    startDate: null,
                    endDate: null
                },
                managerReview: {
                    startDate: null,
                    endDate: null
                },
                checkInWithManager: {
                    startDate: null,
                    endDate: null
                },
                organisationId: userDetails.organisationId,
                errors: {
                    reviewCycle: '',
                    selfReview: '',
                    managerReview: '',
                    checkInWithManager: ''
                }
            });
        } else if (name === 'selfReview') {
            setInputs({
                ...inputs,
                selfReview: { startDate: null, endDate: null },
                checkInWithManager: {
                    startDate: null,
                    endDate: null
                },
                errors: {
                    ...inputs.errors,
                    selfReview: '',
                    checkInWithManager: ''
                }
            });
        } else if (name === 'managerReview') {
            setInputs({
                ...inputs,
                managerReview: { startDate: null, endDate: null },
                checkInWithManager: {
                    startDate: null,
                    endDate: null
                },
                errors: {
                    ...inputs.errors,
                    managerReview: '',
                    checkInWithManager: ''
                }
            });
        } else if (name === 'checkInWithManager') {
            setInputs({
                ...inputs,
                checkInWithManager: { startDate: null, endDate: null },
                errors: {
                    ...inputs.errors,
                    checkInWithManager: ''
                }
            });
        }
    };

    return {
        inputs,
        isLoading,
        isSubmitDisabled,
        action,
        handleDateChange,
        handleSubmit,
        handleToggleChange,
        handleDatePickerClear,
        handleEmailNotification,
        sendEmail
    };
};
