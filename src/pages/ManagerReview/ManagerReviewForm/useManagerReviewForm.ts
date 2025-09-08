import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { AppState, useAppSelector } from '@slice';
import { useGetKpisQuery, useGetKrasQuery, useGetSettingListQuery } from '@slice/services';
import { useAutoSaveReviewMutation, useGetReviewQuery, useSubmitReviewMutation } from '@slice/services/review';
import { performValidation } from '@utils/validations';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReviewCycleInfo, kpi } from './types';
import { debounce } from '@utils/debounce';
import { ErrorType, ReviewFormValuesState } from '@common';
import { SortRecords } from '@utils/sortRecords';
import { KraType } from '@pages/KraManagement/useKraManagement';
import { KpiRecords, ReviewDataObjectType } from '@pages/SelfReview/SelfReviewForm/types';
import { InputHandlerProps } from './types';

export const useManagerReviewForm = () => {
    const path = useLocation().pathname;
    const navigateTo = useNavigate();
    const [reviewCycleInfo, setReviewCycleInfo] = useState<ReviewCycleInfo>({});
    const [kpiData, setKpiData] = useState<kpi[]>([]),
        [skipInitialKpiQuery, setSkipInitialKpiQuery] = useState(true),
        [clickedOnCancel, setClickedOnCancel] = useState(false),
        [openModal, setOpenModal] = useState(false),
        [isSaved, setIsSaved] = useState(false),
        [prompt, setPrompt] = useState(false),
        [isPut, setIsPut] = useState(false),
        [managerResponse, setManagerResponse] = useState(false),
        [feedbackModal, setFeedbackModal] = useState(false),
        [existingKpiData, setExistingKpiData] = useState([]),
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
        });
    const userDetails = useAppSelector((state: AppState) => state.user),
        {
            reviewCycleId,
            reviewCycle,
            startDate = new Date(),
            endDate = new Date(),
            reviewToEmployeeId,
            reviewToId,
            reviewFromId,
            action,
            firstName,
            lastName,
            managerFirstName,
            managerLastName,
            reviewFromEmployeeId,
            kpiTitle
        } = (useLocation().state || {}) as any;
    const [showSuccessMessage, setShowSuccessMessage] = useState(false),
        [activeKpi, setActiveKpi] = useState<string>(kpiTitle || '');

    const [submitReview, { isSuccess: submitSuccess, isLoading: isSubmitting, error: submitError }] = useSubmitReviewMutation();
    const [autoSaveReview, { isLoading: autoSaveLoading, isSuccess: autoSaveSuccess }] = useAutoSaveReviewMutation();

    const { data: ManagerReviewData, isLoading: ManagerReviewLoading } = useGetReviewQuery(
        {
            path: '',
            params: [
                {
                    name: 'reviewTypeId',
                    value: 2
                },
                {
                    name: 'reviewCycleId',
                    value: reviewCycleId
                },
                { name: 'organisationId', value: userDetails.organisationId },
                {
                    name: 'reviewToId',
                    value: path.includes(routeConstants.managerReview) ? reviewToId : userDetails.id
                },
                {
                    name: 'reviewFromId',
                    value: path.includes(routeConstants.managerReview) ? userDetails.id : reviewFromId
                }
            ]
        },
        {
            refetchOnMountOrArgChange: true,
            skip: !reviewCycleId || !userDetails.id
        }
    );

    const { data: settingData, isLoading: settingLading } = useGetSettingListQuery(
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
                    value: reviewToId
                },
                { name: 'organisationId', value: userDetails.organisationId }
            ]
        },
        {
            refetchOnMountOrArgChange: true
            // skip: skipInitialKpiQuery
        }
    );
    const { data: kraData, isSuccess: isKraSuccess } = useGetKrasQuery(
        {
            path: '',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        },
        { refetchOnMountOrArgChange: true }
    );

    const groupedKpis: KpiRecords = useMemo(() => {
        // using submitted review data for timelinecomponent for existing kpis without kras
        const data = action === 'View' ? ManagerReviewData && ManagerReviewData[0]?.reviewData : initialKpiData;
        const order: string[] = isKraSuccess && kraData?.map((kra: KraType) => kra.name);

        const records = data?.slice().reduce((record: { [key: string]: string[] }, kpi: ReviewDataObjectType) => {
            if (!record[kpi.kraName]) {
                record[kpi.kraName] = [];
            }
            const kpiTitle = kpi.kpiTitle ? kpi.kpiTitle : kpi.title;
            record[kpi.kraName].push(kpiTitle);
            return record;
        }, {});
        if (order && records) return SortRecords(records, order);
        else return records;
    }, [ManagerReviewData, action, initialKpiData, kraData, isKraSuccess]);

    const flattenKpiData = useMemo(() => {
        if (!groupedKpis) return [];
        return Object.values(groupedKpis).flat();
    }, [groupedKpis]);

    const activeKpiIndex = useMemo(() => {
        if (!activeKpi) return 0;
        return flattenKpiData?.findIndex(kpi => kpi === activeKpi);
    }, [activeKpi, flattenKpiData]);

    const isActiveKpi = (kpiName: string) => activeKpi === kpiName;
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

        if (!managerResponse) {
            if ((response && responseError) || ratingError || (response && !rating)) {
                return 'ongoing';
            }
            if (rating) {
                return 'complete';
            }
        } else {
            if (responseError || ratingError || (!response && rating) || (response && !rating)) {
                return 'ongoing';
            }
            if (response && rating) {
                return 'complete';
            }
        }

        return 'active';
    };

    const reviewToName = `${firstName} ${lastName}(${reviewToEmployeeId})`;

    const isLoading = useMemo(() => ManagerReviewLoading || initialKpiLoading, [initialKpiLoading, ManagerReviewLoading]);

    const isSubmitDisabled = useMemo(() => {
        let response = false;
        kpiData.forEach(kpi => {
            if (
                kpi.rating === '' ||
                kpi.responseError !== '' ||
                kpi.ratingError !== '' ||
                (managerResponse && (kpi.response === '' || kpi.response === '<p><br></p>'))
            ) {
                response = true;
                return;
            }
        });
        return response;
    }, [kpiData, managerResponse]);

    const isDraftDisabled = useMemo(() => {
        let response = true;
        if (JSON.stringify(kpiData) === JSON.stringify(existingKpiData)) {
            response = true;
        } else {
            const kpiDataError = kpiData.filter(kpi => kpi.responseError !== '');
            if (kpiDataError.length > 0) {
                response = true;
            } else {
                response = false;
            }
        }
        return response;
    }, [kpiData]);

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
        ({ id, name, value }: { id?: string | number; name?: string; value?: string }) => {
            try {
                if (ManagerReviewData && ManagerReviewData.length > 0) {
                    const { reviewData } = ManagerReviewData[0];
                    const editingKpi = reviewData?.find((kpi: { id: string }) => kpi.id === id);
                    const property = name === 'response' ? 'review' : 'rating';
                    if (editingKpi?.id) {
                        // Trigger autosave with the updated value and spread the existing
                        // values (either review response or rating)
                        const autoSaveObj = {
                            ...editingKpi,
                            [property]: value
                        };
                        setFeedbackModal(true);
                        setLoadingPopup(true);
                        autoSaveReview({ data: autoSaveObj, method: 'PUT' });
                    }
                }
            } catch (err) {
                console.log(err);
                setFeedbackModal(false);
                setLoadingPopup(false);
            }
        },
        [ManagerReviewData, autoSaveReview]
    );

    const handleInputChange = useCallback(
        ({ id, name, value }: InputHandlerProps) => {
            setFeedbackModal(false);

            const error = performValidation(`kpi-${name}`, removeHtmlTags(value), managerResponse);
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
                if (String(id) === String(kpi.id)) {
                    return {
                        ...kpi,
                        [name]: value,
                        [`${name}Error`]: error
                    };
                } else return kpi;
            });
            setKpiData(updatedKpiData);
            /*  if reviewId are generated, trigger autosave
                else trigger the 'Save as Draft' api when 
                the first KPI review is getting added to get the reviewId */
            if (!reviewCycleInfo.draft && !reviewCycleInfo.published && error === '') {
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
                const { reviewDetailsId } = reviewCycleInfo;
                submitReview({
                    data: {
                        reviewTypeId: 2,
                        reviewDetailsId,
                        reviewCycleId,
                        reviewToId,
                        reviewFromId: userDetails.id,
                        draft,
                        organisationId: userDetails.organisationId,
                        published: draft ? false : true,
                        reviewData: kpiDataToBeSubmitted
                    },
                    method: 'POST'
                });
            }
            // checks if kpi data has changed and only then calls the
            // auto save function instead of calling it on every active kpi change
            const hasChanged = !kpiData.some(kpi => String(kpi.id) === String(id) && (kpi.response === value || kpi.rating === value));
            if (hasChanged && error === '') {
                setKpiData(updatedKpiData);
                debounce(() => handleAutoSave({ id, name, value }), 500)();
            }
        },
        [
            prevValues,
            handleAutoSave,
            kpiData,
            managerResponse,
            reviewCycleId,
            reviewCycleInfo,
            reviewToId,
            submitReview,
            userDetails.id,
            userDetails.organisationId
        ]
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
                    reviewTypeId: 2,
                    reviewDetailsId,
                    reviewCycleId,
                    reviewToId,
                    reviewFromId: userDetails.id,
                    draft,
                    organisationId: userDetails.organisationId,
                    published: draft ? false : true,
                    reviewData: kpiDataToBeSubmitted
                },
                method: isPut ? 'PUT' : 'POST'
            });
        },
        [isPut, kpiData, reviewCycleId, reviewCycleInfo, reviewToId, submitReview, userDetails.id, userDetails.organisationId]
    );
    const navigateToTeamFeedback = () => {
        navigateTo(
            `${path.includes(routeConstants.myManagerReview) ? routeConstants.myManagerReview : routeConstants.managerReview}/${
                reviewCycleInfo.name
            }/${`view-team-feedback`}-(${`${firstName.charAt(0).toUpperCase() + firstName.slice(1)}`}-${`${
                lastName.charAt(0).toUpperCase() + lastName.slice(1)
            }`}-${reviewToEmployeeId})`,
            {
                state: { name: 'Back to manager review', reviewCycle: reviewCycleInfo.name, employeeId: reviewToId, reviewCycleId }
            }
        );
    };
    const handleCancel = () => navigateTo(-1);

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

    const checkKpiChanges = useMemo(() => {
        let flag = false;
        if (isSaved) return false;
        if (ManagerReviewData && !ManagerReviewData.length) {
            kpiData.forEach((kpi: kpi) => {
                if (kpi.response !== '' || kpi.rating !== '') {
                    flag = true;
                }
            });
        }
        ManagerReviewData &&
            ManagerReviewData.length &&
            kpiData.length &&
            ManagerReviewData[0].reviewData?.forEach((review: any, idx: number) => {
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
    }, [ManagerReviewData, kpiData, isSaved]);

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
        if (kpiData && ManagerReviewData && !checkKpiChanges) {
            setFeedbackModal(false);
        }
    }, [ManagerReviewData, kpiData, checkKpiChanges]);
    useEffect(() => {
        if (initialKpiData && initialKpiData.length > 0 && !reviewCycleInfo.draft && !reviewCycleInfo.published) {
            setReviewCycleInfo({
                reviewCycleId,
                reviewFromId: userDetails.id,
                reviewToId: reviewToEmployeeId,
                draft: false,
                published: false,
                name: `${format(new Date(startDate), 'do MMM yyyy')} - ${format(new Date(endDate), 'do MMM yyyy')}`
            });
            const t = initialKpiData
                .map((kpi: any) => ({ ...kpi, response: '', rating: '', responseError: '', ratingError: '' }))
                .sort((kpi1: any, kpi2: any) => (kpi1.id < kpi2.id ? -1 : kpi1.id > kpi2.id ? 1 : 0));
            setKpiData(t);
            setExistingKpiData(t);
        }
    }, [
        endDate,
        initialKpiData,
        reviewCycleId,
        reviewToEmployeeId,
        startDate,
        userDetails.id,
        reviewCycleInfo.draft,
        reviewCycleInfo.published
    ]);

    useEffect(() => {
        if (ManagerReviewData) {
            if (ManagerReviewData.length === 0) {
                setSkipInitialKpiQuery(false);
            } else {
                setIsPut(true);
                setReviewCycleInfo({
                    reviewDetailsId: ManagerReviewData[0].reviewDetailsId,
                    reviewCycleId: ManagerReviewData[0].reviewCycleId,
                    reviewToId: ManagerReviewData[0].reviewToEmployeeId,
                    reviewFromId: ManagerReviewData[0].reviewFrom,
                    draft: ManagerReviewData[0].draft,
                    published: ManagerReviewData[0].published,
                    name: `${format(new Date(startDate), 'do MMM yyyy')} - ${format(new Date(endDate), 'do MMM yyyy')}`
                });
                if (ManagerReviewData[0]) {
                    const t = ManagerReviewData[0].reviewData
                        .map((kpi: any) => ({
                            id: kpi.id,
                            title: kpi.kpiTitle,
                            kraId: kpi.kraId,
                            description: kpi.kpiDescription,
                            response: kpi.review || '',
                            rating: kpi.rating || '',
                            responseError: '',
                            ratingError: ''
                        }))
                        .sort((kpi1: any, kpi2: any) => (kpi1.id < kpi2.id ? -1 : kpi1.id > kpi2.id ? 1 : 0));
                    setKpiData(t);
                    setExistingKpiData(t);
                }
                if (ManagerReviewData[0].draft || ManagerReviewData[0].published) {
                    setFeedbackModal(false);
                }
            }
        }
    }, [endDate, ManagerReviewData, startDate]);

    useEffect(() => {
        if (flattenKpiData.length > 0 && !activeKpi) {
            setActiveKpi(flattenKpiData[0]);
        }
    }, [flattenKpiData, activeKpi]);

    useEffect(() => {
        if (submitSuccess && reviewCycleInfo.published) {
            setIsPut(true);
            addToast({
                variant: 'success',
                header: `Manager review submitted successfully!`,
                timer: 3000
            });
            setFeedbackModal(false);
            setIsSaved(true);
            reviewCycleInfo.published && navigateTo(routeConstants.reviewTimeline);
        } else if (submitError) {
            addToast({
                variant: 'error',
                message: (submitError as ErrorType)?.data?.errorMessage || 'Something went wrong.',
                timer: 3000
            });
            navigateTo(routeConstants.reviewTimeline);
        }
    }, [navigateTo, reviewCycleInfo.published, submitError, submitSuccess]);

    useEffect(() => {
        // Determines the review status in handleGetKpiReviewStatus function based on the provided setting and action:
        // - If 'settingData' exists and the action is not 'View', set the manager response based on isManagerReviewMandatory.
        // - else default the manager response to 'false' as its already submitted, it will populate with the data if manager responses exist
        // else it will show as optional response in review placeholder.

        if (settingData && action !== 'View') {
            setManagerResponse(settingData.isManagerReviewMandatory);
        } else {
            setManagerResponse(false);
        }
    }, [settingData, action]);

    useEffect(() => {
        const error = submitError as any;
        if (error && typeof error === 'object') {
            addToast({
                variant: 'error',
                header: error.data.errorMessage || 'Something went wrong.',
                timer: 3000
            });
        }
    }, [submitError]);

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
    }, [action, autoSaveSuccess, submitSuccess, isRetry]);

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
        kpiDataSorted,
        action,
        isLoading,
        autoSaveLoading,
        showSuccessMessage,
        isSubmitDisabled,
        isDraftDisabled,
        isSubmitting,
        reviewToName,
        toggleModal,
        handleInputChange,
        navigateToTeamFeedback,
        handleSend,
        handleCancel,
        feedbackModal,
        prompt,
        firstName,
        lastName,
        reviewToEmployeeId,
        path,
        managerFirstName,
        managerLastName,
        reviewFromEmployeeId,
        managerResponse,
        navigateTo,
        reviewCycle,
        isMakingChanges,
        groupedKpis,
        isActiveKpi,
        isPrevDisabled,
        isNextDisabled,
        activeKpi,
        activeKpiIndex,
        handleSelectKpi,
        hanldeKpiChange,
        handleGetKpiReviewStatus,
        handleNavigation,
        handleRetry,
        loadingPopup
    };
};
