import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { AppState, useAppSelector } from '@slice';
import { useGetKpisQuery, useGetKrasQuery } from '@slice/services';
import { useGetReviewQuery, useSubmitReviewMutation, useAutoSaveReviewMutation } from '@slice/services/review';
import { performValidation } from '@utils/validations';
import { debounce } from '@utils/debounce';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { KpiRecords, ReviewCycleInfo, ReviewDataObjectType, kpi } from './types';
import { ErrorType, ReviewFormValuesState } from '@common';
import { KraType } from '@pages/KraManagement/useKraManagement';
import { SortRecords } from '@utils/sortRecords';
import { InputHandlerProps } from './types';
import { useGetReviewTimelineQuery } from '@slice/services';

export const useSelfReviewForm = () => {
    const navigateTo = useNavigate();
    const [reviewCycleInfo, setReviewCycleInfo] = useState<ReviewCycleInfo>({});
    const [kpiData, setKpiData] = useState<kpi[]>([]),
        [skipInitialKpiQuery, setSkipInitialKpiQuery] = useState(true),
        [clickedOnCancel, setClickedOnCancel] = useState(false),
        [openModal, setOpenModal] = useState(false),
        [prompt, setPrompt] = useState(false),
        [isSaved, setIsSaved] = useState(false),
        [isPut, setIsPut] = useState(false),
        [feedbackModal, setFeedbackModal] = useState(false),
        [existingKpiData, setExistingKpiData] = useState<kpi[]>([]),
        [isMakingChanges, setIsMakingChanges] = useState(false),
        [loadingPopup, setLoadingPopup] = useState(false),
        [isRetry, setIsRetry] = useState(false),
        [prevValues, setPrevValues] = useState<ReviewFormValuesState>({
            response: {
                id: '',
                name: '',
                value: ''
            },
            rating: {
                id: '',
                name: '',
                value: ''
            }
        }),
        { reviewCycleId, startDate, endDate, reviewCycle, action, kpiTitle } = (useLocation().state || {}) as any;
    const [activeKpi, setActiveKpi] = useState<string>(kpiTitle || '');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const today = new Date();

    const userDetails = useAppSelector((state: AppState) => state.user);
    const [submitReview, { isSuccess: submitSuccess, isLoading: isSubmitting, error: submitError }] = useSubmitReviewMutation();
    const [autoSaveReview, { isLoading: autoSaveLoading, isSuccess: autoSaveSuccess }] = useAutoSaveReviewMutation();
    const { data: selfReviewData, isLoading: selfReviewLoading } = useGetReviewQuery(
        {
            path: '',
            params: [
                {
                    name: 'reviewTypeId',
                    value: 1
                },
                {
                    name: 'reviewCycleId',
                    value: reviewCycleId
                },
                { name: 'organisationId', value: userDetails.organisationId },
                {
                    name: 'reviewToId',
                    value: userDetails.id
                },
                {
                    name: 'reviewFromId',
                    value: userDetails.id
                }
            ]
        },
        {
            refetchOnMountOrArgChange: true,
            skip: !reviewCycleId || !userDetails.employeeId
        }
    );

    const { data: kraData, isSuccess: isKraSuccess } = useGetKrasQuery(
        {
            path: '',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        },
        { refetchOnMountOrArgChange: true }
    );

    const { data: initialKpiData, isLoading: initialKpiLoading } = useGetKpisQuery(
        {
            path: 'fetch-by-employee-id',
            params: [
                {
                    name: 'reviewToId',
                    value: userDetails.id
                },
                { name: 'organisationId', value: userDetails.organisationId },
                {
                    name: 'reviewTypeId',
                    value: 1
                }
            ]
        },
        {
            refetchOnMountOrArgChange: true
            // skip: skipInitialKpiQuery
        }
    );

    const { data: reviewTimeLineData, isLoading: isTimelineDataLoading } = useGetReviewTimelineQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewToId', value: userDetails.id }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const groupedKpis: KpiRecords = useMemo(() => {
        // using submitted review data for timelinecomponent for existing kpis without kras
        const order: string[] = isKraSuccess && kraData?.map((kra: KraType) => kra.name);
        const data: ReviewDataObjectType[] = action === 'View' ? selfReviewData && selfReviewData[0]?.reviewData : initialKpiData;
        const records = data?.slice().reduce((record: KpiRecords, kpi: ReviewDataObjectType) => {
            if (!record[kpi.kraName]) {
                record[kpi.kraName] = [];
            }
            const kpiTitle = kpi.kpiTitle ? kpi.kpiTitle : kpi.title;
            record[kpi.kraName].push(kpiTitle);
            return record;
        }, {});
        if (order && records) return SortRecords(records, order);
        else return records;
    }, [action, selfReviewData, initialKpiData, kraData, isKraSuccess]);

    const flattenKpiData = useMemo(() => {
        if (!groupedKpis) return [];
        return Object.values(groupedKpis).flat();
    }, [groupedKpis]);

    const isLoading = useMemo(
        () => selfReviewLoading || initialKpiLoading || isTimelineDataLoading || !today,
        [selfReviewLoading, initialKpiLoading, isTimelineDataLoading, today]
    );

    const isActiveKpi = (kpiName: string) => activeKpi === kpiName;

    const activeKpiIndex = useMemo(() => {
        if (!activeKpi) return 0;
        return flattenKpiData?.findIndex(kpi => kpi === activeKpi);
    }, [activeKpi, flattenKpiData]);

    const isPrevDisabled = activeKpiIndex === 0;
    const isNextDisabled = useMemo(() => activeKpiIndex === flattenKpiData.length - 1, [flattenKpiData, activeKpiIndex]);

    const handleSelectKpi = (kpiName: string) => {
        setActiveKpi(kpiName);
    };

    const hanldeKpiChange = (direction: 'prev' | 'next') => {
        if (direction === 'prev' && !isPrevDisabled) {
            setActiveKpi(flattenKpiData[activeKpiIndex - 1]);
        } else if (direction === 'next' && !isNextDisabled) {
            setActiveKpi(flattenKpiData[activeKpiIndex + 1]);
        }
    };

    const handleGetKpiReviewStatus = (kpiName: string): 'active' | 'ongoing' | 'complete' => {
        const targetKpi = kpiData?.find(kpi => kpi.title === kpiName);
        if (!targetKpi) return 'active';
        const { response, rating, responseError, ratingError } = targetKpi;

        if (
            (responseError && responseError !== 'Please enter a response') ||
            ratingError ||
            ((!response || response === '<p><br></p>') && rating) ||
            (response && response !== '<p><br></p>' && !rating)
        )
            return 'ongoing';

        if (response && rating) return 'complete';

        return 'active';
    };

    const isSubmitDisabled = useMemo(() => {
        let response = false;
        kpiData.forEach(kpi => {
            if (kpi.response === '' || kpi.rating === '' || kpi.responseError !== '' || kpi.ratingError !== '') {
                response = true;
                return;
            }
        });
        return response;
    }, [kpiData]);

    const isDraftDisabled = useMemo(() => {
        let response = true;
        if (JSON.stringify(kpiData) === JSON.stringify(existingKpiData)) {
            response = true;
        } else {
            const kpiErr = kpiData.filter(kpi => kpi.responseError !== '');
            if (kpiErr.length === 0) {
                response = false;
            } else {
                response = true;
            }
        }
        return response;
    }, [existingKpiData, kpiData]);

    const removeHtmlTags = (tempStr: string): string => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tempStr;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const handleRetry = useCallback(() => {
        (Object.keys(prevValues) as Array<keyof ReviewFormValuesState>).forEach(key => {
            if (prevValues[key].id) {
                setIsRetry(true);
                handleAutoSave({ id: prevValues[key].id, name: prevValues[key].name, value: prevValues[key].value });
            }
        });
    }, [prevValues]);

    const handleAutoSave = useCallback(
        ({ id, name, value }: InputHandlerProps) => {
            try {
                if (selfReviewData && selfReviewData.length > 0) {
                    const { reviewData } = selfReviewData[0];
                    const editingKpi = reviewData?.find((kpi: { id: string }) => kpi.id === id);
                    const property = name === 'response' ? 'review' : 'rating';
                    if (editingKpi?.id) {
                        // trigger autosave with the updated value and spread the existing
                        // values (either review response or rating)
                        const autoSaveObj = {
                            ...editingKpi,
                            [property]: value
                        };
                        /* if reviewId are generated, trigger autosave
                         else trigger the 'Save as Draft' api when 
						 the first KPI review is getting added to get the reviewId */
                        setFeedbackModal(true);
                        setLoadingPopup(true);
                        autoSaveReview({ data: autoSaveObj, method: 'PUT' });
                    }
                }
            } catch (err) {
                let errorMessage = 'Something went wrong';
                if (err instanceof Error) {
                    errorMessage = err?.message;
                } else if (typeof err === 'object' && err !== null) {
                    if ('data' in err) {
                        const error = err as ErrorType;
                        errorMessage = error.data?.message || error.data.errorMessage;
                    } else {
                        errorMessage = String(err) || errorMessage;
                    }
                } else {
                    errorMessage = String(err) || errorMessage;
                }

                setFeedbackModal(false);
                setLoadingPopup(false);

                addToast({
                    variant: 'error',
                    message: errorMessage,
                    timer: 3000
                });
            }
        },
        [autoSaveReview, selfReviewData]
    );
    const handleSend = useCallback(
        (e: React.FormEvent, draft: boolean) => {
            e.preventDefault();
            setReviewCycleInfo(prev => ({
                ...prev,
                draft,
                published: draft ? false : true
            }));
            const kpiDataToBeSubmitted = kpiData.map(kpi => ({
                id: kpi.id,
                kraId: kpi.kraId,
                review: kpi.response,
                rating: kpi.rating
            }));
            const { reviewDetailsId } = reviewCycleInfo;
            submitReview({
                data: {
                    reviewTypeId: 1,
                    reviewDetailsId,
                    reviewCycleId,
                    reviewToId: userDetails.id,
                    reviewFromId: userDetails.id,
                    draft,
                    organisationId: userDetails.organisationId,
                    published: draft ? false : true,
                    reviewData: kpiDataToBeSubmitted
                },
                method: isPut ? 'PUT' : 'POST'
            });
            const reviewPeriod = `${format(new Date(startDate), 'do MMM yyyy')} - ${format(new Date(endDate), 'do MMM yyyy')}`;
            navigateTo(`${routeConstants.selfReview}/${reviewPeriod}/review-summary`, {
                state: {
                    ...reviewTimeLineData[0],
                    reviewFromId: userDetails.id,
                    reviewToId: userDetails.id,
                    action:
                        !reviewTimeLineData[0].selfReviewDraft && !reviewTimeLineData.selfReviewPublish
                            ? 'Add'
                            : reviewTimeLineData[0].selfReviewDraft && !reviewTimeLineData.selfReviewPublish
                            ? 'Edit'
                            : 'View',
                    reviewCycleId
                }
            });
        },
        [isPut, kpiData, reviewCycleId, reviewCycleInfo, submitReview, userDetails.id, userDetails.organisationId]
    );

    const handleInputChange = useCallback(
        ({ id, name, value }: InputHandlerProps) => {
            setFeedbackModal(false);
            const error = performValidation(`kpi-${name}`, removeHtmlTags(value));
            setIsRetry(false);
            if (error && value !== '<p><br></p>') {
                setFeedbackModal(true);
            }
            setPrevValues({
                ...prevValues,
                [name]: {
                    id,
                    name,
                    value
                }
            });
            const updatedKpiData = kpiData.map(kpi => {
                if (id === kpi.id) {
                    return {
                        ...kpi,
                        kraId: kpi.kraId,
                        [name]: value,
                        [`${name}Error`]: error
                    };
                } else return kpi;
            });
            setKpiData(updatedKpiData);
            // check for isDraft during initial save. if draft is true, trigger auto save else
            // trigger draft function for first time and auto save for subseqent changes

            if (!reviewCycleInfo.draft && !reviewCycleInfo.published && error === '') {
                const { reviewDetailsId } = reviewCycleInfo;
                const draft = true;
                setReviewCycleInfo(prev => ({
                    ...prev,
                    draft,
                    published: draft ? false : true
                }));
                const kpiDataToBeSubmitted = updatedKpiData.map(kpi => ({
                    id: kpi.id,
                    kraId: kpi.kraId,
                    review: kpi.response,
                    rating: kpi.rating
                }));

                submitReview({
                    data: {
                        reviewTypeId: 1,
                        reviewDetailsId,
                        reviewCycleId,
                        reviewToId: userDetails.id,
                        reviewFromId: userDetails.id,
                        draft: true,
                        organisationId: userDetails.organisationId,
                        published: false,
                        reviewData: kpiDataToBeSubmitted
                    },
                    method: 'POST'
                });
            }

            // checks if kpi data has changed and only then calls the
            // auto save function instead of calling it on every active kpi change
            const hasChanged = !kpiData.some(kpi => kpi.id === id && (kpi.response === value || kpi.rating === value));
            if (hasChanged && error === '') {
                setKpiData(updatedKpiData);
                debounce(() => handleAutoSave({ id, name, value }), 500)();
            }
        },

        [prevValues, handleAutoSave, kpiData, reviewCycleId, reviewCycleInfo, submitReview, userDetails.id, userDetails.organisationId]
    );

    const reformatLastName = (value: string) => {
        const nameArr = value.toLowerCase().split(' ');
        for (let i = 0; i < nameArr.length; i++) {
            nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].substring(1);
        }
        return nameArr.join('-');
    };

    const navigateToTeamFeedback = () => {
        const lastName = reformatLastName(userDetails.lastName);
        navigateTo(
            `${routeConstants.selfReview}/${reviewCycleInfo.name}/${`view-team-feedback`}-(${`${
                userDetails.firstName.charAt(0).toUpperCase() + userDetails.firstName.slice(1)
            }`}-${lastName}-${userDetails.employeeId})`,
            {
                state: { name: 'Back to self review', reviewCycle: reviewCycleInfo.name, employeeId: userDetails.id, reviewCycleId }
            }
        );
    };

    const toggleModal = (modalFor: string) => {
        setClickedOnCancel(modalFor === 'cancel');
        setOpenModal(!openModal);
        if (modalFor === 'View') {
            setLoadingPopup(false);
        }
        if (modalFor === 'feedback') {
            setPrompt(true);
        } else {
            setPrompt(false);
        }
    };

    const handleCancel = () => navigateTo(-1);

    const checkKpiChanges = useMemo(() => {
        let flag = false;
        if (isSaved) return false;

        if (selfReviewData && !selfReviewData.length) {
            kpiData.forEach((kpi: kpi) => {
                if (kpi.response !== '' || kpi.rating !== '') {
                    flag = true;
                }
            });
        }
        selfReviewData &&
            selfReviewData.length &&
            kpiData.length &&
            selfReviewData[0].reviewData?.forEach((review: any, idx: number) => {
                if ((!review.review && kpiData[idx].response !== '') || (!review.rating && kpiData[idx].rating !== '')) {
                    flag = true;
                }
                if (
                    (review.review && kpiData[idx].response !== review.review) ||
                    (review.rating && kpiData[idx].rating !== review.rating)
                ) {
                    flag = true;
                }
            });
        return flag;
    }, [selfReviewData, kpiData, isSaved]);

    const handleNavigation = useCallback(() => {
        const kpiErr = kpiData.filter(kpi => {
            return (kpi.responseError !== '' && kpi.response !== '<p><br></p>') || kpi.ratingError !== '';
        });
        if (kpiErr.length > 0) {
            setLoadingPopup(false);
            toggleModal('feedback');
            return;
        }
        if (autoSaveLoading) {
            setLoadingPopup(true);
            toggleModal('feedback');
            return;
        }
        navigateToTeamFeedback();
    }, [kpiData, autoSaveLoading]);

    useEffect(() => {
        // blocking this effect from running on page reload after the data
        // is in draft as its filling the responses with empty data
        if (initialKpiData?.length > 0 && !reviewCycleInfo.draft && !reviewCycleInfo.published) {
            const t = initialKpiData
                .map((kpi: any) => ({ ...kpi, response: '', rating: '', responseError: '', ratingError: '', kraId: kpi.kraId }))
                .sort((kpi1: any, kpi2: any) => (kpi1.id < kpi2.id ? -1 : kpi1.id > kpi2.id ? 1 : 0));
            setKpiData(t);
            setExistingKpiData(t);
        }
    }, [initialKpiData, reviewCycleInfo.draft, reviewCycleInfo.published]);

    useEffect(() => {
        if (selfReviewData) {
            if (selfReviewData.length === 0) {
                setReviewCycleInfo({
                    reviewCycleId,
                    reviewFrom: userDetails.employeeId,
                    reviewTo: userDetails.employeeId,
                    draft: false,
                    published: false,
                    name: reviewCycle || `${format(new Date(startDate), 'do MMM yyyy')} - ${format(new Date(endDate), 'do MMM yyyy')}`
                });
                setSkipInitialKpiQuery(false);
            } else {
                setIsPut(true);
                setReviewCycleInfo({
                    reviewDetailsId: selfReviewData[0].reviewDetailsId,
                    reviewCycleId: selfReviewData[0].reviewCycleId,
                    reviewTo: selfReviewData[0].reviewTo,
                    reviewFrom: selfReviewData[0].reviewFrom,
                    draft: selfReviewData[0].draft,
                    published: selfReviewData[0].published,
                    name: `${format(new Date(startDate), 'do MMM yyyy')} - ${format(new Date(endDate), 'do MMM yyyy')}`
                });
                if (selfReviewData[0].reviewData) {
                    const t = selfReviewData[0].reviewData
                        .map((kpi: any) => ({
                            id: kpi.id,
                            title: kpi.kpiTitle,
                            description: kpi.kpiDescription,
                            response: kpi.review || '',
                            rating: kpi.rating || '',
                            kraId: kpi.kraId,
                            responseError: '',
                            ratingError: ''
                        }))
                        .sort((kpi1: any, kpi2: any) => (kpi1.id < kpi2.id ? -1 : kpi1.id > kpi2.id ? 1 : 0));
                    setKpiData(t);
                    setExistingKpiData(t);
                }
                if (selfReviewData[0].draft || selfReviewData[0].published) {
                    setFeedbackModal(false);
                }
            }
        }
    }, [endDate, reviewCycle, reviewCycleId, selfReviewData, startDate, userDetails.employeeId]);

    useEffect(() => {
        if (submitSuccess && action !== 'Add') {
            setIsPut(true);
            addToast({
                variant: 'success',
                header: `Self review ${reviewCycleInfo.draft ? 'saved' : reviewCycleInfo.published ? 'submitted' : ''} successfully!`,
                timer: 3000
            });
            setFeedbackModal(false);
            setIsSaved(true);
            reviewCycleInfo.published && navigateTo(routeConstants.reviewTimeline);
        } else if (submitSuccess && !reviewCycleInfo.draft && reviewCycleInfo.published && action === 'Add') {
            addToast({
                variant: 'success',
                message: 'Self review submitted successfully!',
                timer: 3000
            });
            navigateTo(routeConstants.reviewTimeline);
        }
    }, [action, isPut, navigateTo, reviewCycleInfo.draft, reviewCycleInfo.published, submitError, submitSuccess]);

    // commenedted out temporarily will be updated later
    // useEffect(() => {
    //     const error = submitError as any;
    //     if (error && typeof error === 'object') {
    //         addToast({
    //             variant: 'error',
    //             header: error.data.errorMessage || 'Something went wrong.',
    //             timer: 3000
    //         });
    //     }
    // }, [submitError]);

    useEffect(() => {
        if (flattenKpiData.length > 0 && !activeKpi) {
            setActiveKpi(flattenKpiData[0]);
        }
    }, [flattenKpiData, activeKpi]);

    useEffect(() => {
        if (kpiData && selfReviewData && !checkKpiChanges) {
            setFeedbackModal(false);
        }
    }, [selfReviewData, kpiData, checkKpiChanges]);

    useEffect(() => {
        // show auto save success message when auto saved and for the first time draft
        setFeedbackModal(false);
        if (autoSaveSuccess || submitSuccess) {
            setShowSuccessMessage(true);
            if (autoSaveSuccess) {
                if (isRetry) {
                    toggleModal('');
                }
            }

            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [action, autoSaveSuccess, navigateTo, submitSuccess, isRetry]);

    const kpiDataSorted = useMemo(
        () =>
            kpiData.sort((a, b) => {
                return flattenKpiData.indexOf(a.title) - flattenKpiData.indexOf(b.title);
            }),
        [kpiData, flattenKpiData]
    );

    return {
        openModal,
        clickedOnCancel,
        action,
        kpiDataSorted,
        isLoading,
        isSubmitDisabled,
        isDraftDisabled,
        reviewCycleInfo,
        isSubmitting,
        autoSaveLoading,
        showSuccessMessage,
        navigateToTeamFeedback,
        toggleModal,
        handleCancel,
        handleInputChange,
        isMakingChanges,
        handleSend,
        feedbackModal,
        prompt,
        groupedKpis,
        isActiveKpi,
        isPrevDisabled,
        isNextDisabled,
        activeKpi,
        activeKpiIndex,
        handleSelectKpi,
        hanldeKpiChange,
        handleGetKpiReviewStatus,
        today,
        reviewTimeLineData,
        handleNavigation,
        handleRetry,
        loadingPopup
    };
};
