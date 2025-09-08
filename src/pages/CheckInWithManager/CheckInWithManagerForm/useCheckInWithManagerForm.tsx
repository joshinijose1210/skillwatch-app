import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { kpi, KpiRecords } from '@pages/SelfReview/SelfReviewForm/types';
import { AppState, useAppSelector } from '@slice';
import { useGetKpisQuery, useGetKrasQuery } from '@slice/services';
import { useAutoSaveReviewMutation, useGetReviewQuery, useSubmitReviewMutation } from '@slice/services/review';
import { debounce } from '@utils/debounce';
import { sliceAndCapitalize } from '@utils/sliceAndCapitalize';
import { performValidation } from '@utils/validations';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ReviewCycleInfo } from '../types';
import { KraType } from '@pages/KraManagement/useKraManagement';
import { SortRecords } from '@utils/sortRecords';
import { ReviewFormValuesState } from '@common/types';
import { InputHandlerProps } from './types';

export const useCheckInWithManagerForm = () => {
    const path = useLocation().pathname;
    const { ActivePage } = useParams();
    const [reviewCycleInfo, setReviewCycleInfo] = useState<ReviewCycleInfo>({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const [kpiData, setKpiData] = useState<kpi[]>([]),
        [groupKpis, setGroupKpis] = useState<kpi[]>([]),
        [clickedOnCancel, setClickedOnCancel] = useState(false),
        [openModal, setOpenModal] = useState(false),
        [proceed, setProceed] = useState(false),
        [prompt, setPrompt] = useState(false),
        [feedbackModal, setFeedbackModal] = useState(false),
        [isSaved, setIsSaved] = useState(false),
        [stateToBeSent, setStateToBeSent] = useState<any>(),
        [existingKpiData, setExistingKpiData] = useState<kpi[]>([]),
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
            kpiTitle,
            reviewCycleId,
            startDate,
            endDate,
            reviewToId,
            firstManagerId,
            secondManagerId,
            checkInFromId,
            reviewToEmployeeId,
            firstName,
            lastName,
            firstManagerFirstName,
            firstManagerLastName,
            firstManagerEmployeeId,
            secondManagerFirstName,
            secondManagerLastName,
            secondManagerEmployeeId,
            action
        } = (useLocation().state || {}) as any,
        [activeKpi, setActiveKpi] = useState<string>(kpiTitle || '');

    const [apiMethod, setApiMethod] = useState('POST');
    const [editReview, { isSuccess: editSuccess, isLoading: isEditLoading, error: editError }] = useSubmitReviewMutation();
    const [autoSaveReview, { isLoading: autoSaveLoading, isSuccess: autoSaveSuccess }] = useAutoSaveReviewMutation();
    const { data, isLoading, isSuccess } = useGetReviewQuery(
        {
            path: '',
            params: [
                {
                    name: 'reviewTypeId',
                    value: [1, 2, 3]
                },
                {
                    name: 'reviewCycleId',
                    value: reviewCycleId
                },
                { name: 'organisationId', value: userDetails.organisationId },
                {
                    name: 'reviewToId',
                    value: reviewToId
                },
                {
                    name: 'reviewFromId',
                    value: [reviewToId, firstManagerId, secondManagerId, checkInFromId]
                }
            ]
        },
        {
            refetchOnMountOrArgChange: true,
            skip: !reviewCycleId || !userDetails.id
        }
    );
    const { data: kraData, isSuccess: isKraSuccess } = useGetKrasQuery(
        {
            path: '',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        },
        { refetchOnMountOrArgChange: true }
    );

    // commented out for now, might be required later
    // const { data: actionItems, isLoading: isLoadingActionItems } = useGetCheckInWithManagerReviewsQuery({
    //     path: '',
    //     params: [
    //         { name: 'reviewCycleId', value: reviewCycleId },
    //         { name: 'reviewTypeId', value: [3] },
    //         { name: 'organisationId', value: userDetails.organisationId },
    //         { name: 'reviewToId', value: reviewToId },
    //         { name: 'reviewFromId', value: [reviewToId, firstManagerId, secondManagerId, checkInFromId] }
    //     ]
    // });

    const { data: initialKpiData, isSuccess: initialKpiDataSuccess } = useGetKpisQuery(
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
        }
    );

    const navigateTo = useNavigate();

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

    const isSubmitting = useMemo(() => isEditLoading, [isEditLoading]);

    const isSubmitDisabled = useMemo(() => {
        let response = false;
        kpiData.forEach(kpi => {
            if (kpi.checkInRating === '' || kpi.responseError !== '' || kpi.ratingError !== '') {
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
            const kpiErr = kpiData.filter(kpi => kpi.responseError !== '' || kpi.ratingError !== '');
            if (kpiErr.length > 0) {
                response = true;
            } else {
                response = false;
            }
        }
        return response;
    }, [existingKpiData, kpiData]);

    const removeHtmlTags = (tempStr: string): string => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tempStr;
        return tempDiv.textContent || '';
    };

    const isActiveKpi = (kpiName: string) => activeKpi === kpiName;

    const handleGetKpiReviewStatus = (kpiName: string): 'active' | 'ongoing' | 'complete' => {
        const targetKpi = kpiData?.find(kpi => kpi.title === kpiName);

        if (!targetKpi) return 'active';

        const { checkInResponse, checkInRating, responseError, ratingError } = targetKpi;

        if ((checkInResponse && responseError) || ratingError || (checkInResponse && !checkInRating)) {
            return 'ongoing';
        }
        if (checkInRating) {
            return 'complete';
        }

        return 'active';
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
                const checkInData = data.find((review: any) => review.reviewTypeId === 3);
                if (checkInData) {
                    const { reviewData } = checkInData;
                    const editingKpi = reviewData?.find((kpi: { id: string }) => kpi.id === id);
                    const property = name === 'response' ? 'review' : 'rating';
                    if (editingKpi?.id) {
                        // trigger autosave with the updated value and spread the existing
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
                setFeedbackModal(false);
                setLoadingPopup(false);
                console.log(err);
            }
        },
        [autoSaveReview, data]
    );

    const handleInputChange = useCallback(
        ({ id, name, value }: InputHandlerProps) => {
            setFeedbackModal(false);
            const isOptional = true;
            const error = performValidation(`kpi-${String(name).toLocaleLowerCase()}`, removeHtmlTags(value), isOptional);
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
                        [`checkIn${sliceAndCapitalize(String(name))}`]: value,
                        [`${String(name).toLocaleLowerCase()}Error`]: error
                    };
                } else return kpi;
            });
            setKpiData(updatedKpiData);
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
                    review: kpi.checkInResponse,
                    rating: kpi.checkInRating
                }));
                const { reviewDetailsId } = reviewCycleInfo;
                const data = {
                    reviewTypeId: 3,
                    reviewCycleId,
                    reviewToId,
                    reviewDetailsId,
                    reviewToEmployeeId,
                    reviewFromId: userDetails.id,
                    firstManagerId,
                    secondManagerId,
                    draft: true,
                    organisationId: userDetails.organisationId,
                    published: false,
                    reviewData: kpiDataToBeSubmitted
                };
                if (!secondManagerId) {
                    delete data.secondManagerId;
                }
                editReview({
                    data: {
                        ...data
                    },
                    method: 'POST'
                });
            }
            // checks if kpi data has changed and only then calls the
            // auto save function instead of calling it on every active kpi change
            const hasChanged = !kpiData.some(kpi => kpi.id === id && (kpi.checkInResponse === value || kpi.checkInRating === value));

            if (hasChanged && error === '') {
                setKpiData(updatedKpiData);

                debounce(() => handleAutoSave({ id, name, value }), 500)();
            }
        },
        [
            prevValues,
            editReview,
            firstManagerId,
            handleAutoSave,
            kpiData,
            reviewCycleId,
            reviewCycleInfo,
            reviewToEmployeeId,
            reviewToId,
            secondManagerId,
            userDetails.id,
            userDetails.organisationId
        ]
    );

    const handleSend = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            setReviewCycleInfo((prev: any) => ({
                ...prev,
                draft: true,
                published: false
            }));
            const kpiDataToBeSubmitted = kpiData.map((kpi: any) => ({
                id: kpi.id,
                kraId: kpi.kraId,
                review: kpi.checkInResponse,
                rating: kpi.checkInRating
            }));
            const { reviewDetailsId } = reviewCycleInfo;
            const data = {
                reviewTypeId: 3,
                reviewCycleId,
                reviewToId,
                reviewToEmployeeId,
                reviewFromId: userDetails.id,
                firstManagerId,
                secondManagerId,
                draft: true,
                organisationId: userDetails.organisationId,
                published: false,
                reviewData: kpiDataToBeSubmitted
            };
            if (!secondManagerId) {
                delete data.secondManagerId;
            }
            apiMethod === 'POST'
                ? editReview({
                      data: {
                          ...data
                      },
                      method: apiMethod
                  })
                : editReview({
                      data: {
                          ...data,
                          reviewDetailsId
                      },
                      method: apiMethod
                  });
            (e.target as any).name === 'draft' ? setProceed(false) : setProceed(true);
            setStateToBeSent({
                state: {
                    ...data,
                    startDate,
                    endDate,
                    firstName,
                    lastName,
                    reviewDetailsId,
                    actionItem: []
                }
            });
        },
        [
            kpiData,
            reviewCycleInfo,
            reviewCycleId,
            reviewToId,
            reviewToEmployeeId,
            userDetails.id,
            userDetails.organisationId,
            firstManagerId,
            secondManagerId,
            apiMethod,
            editReview,
            startDate,
            endDate,
            firstName,
            lastName
        ]
    );

    const navigateToTeamFeedback = () => {
        const routes = [routeConstants.myCheckInWithManager, routeConstants.performanceReview, routeConstants.checkInWithTeamMember];
        const basePath = routes.find(route => path.includes(route)) || routeConstants.checkInWithTeamMember;
        const finalPath = `${basePath}/${ActivePage}/${reviewCycleInfo.name}/view-team-feedback-(${
            firstName.charAt(0).toUpperCase() + firstName.slice(1)
        }-${lastName.charAt(0).toUpperCase() + lastName.slice(1)}-${reviewToEmployeeId})`;

        navigateTo(finalPath, {
            state: {
                name: 'Back to Check-in with Team Members review',
                reviewCycle: reviewCycleInfo.name,
                employeeId: reviewToId,
                reviewCycleId
            }
        });
    };

    const navigateToPreviousGoals = () => {
        const routes = [routeConstants.myCheckInWithManager, routeConstants.performanceReview, routeConstants.checkInWithTeamMember];
        const basePath = routes.find(route => path.includes(route)) || routeConstants.checkInWithTeamMember;
        const finalPath = `${basePath}/${ActivePage}/${reviewCycleInfo.name}/view-previous-goals-(${
            firstName.charAt(0).toUpperCase() + firstName.slice(1)
        }-${lastName.charAt(0).toUpperCase() + lastName.slice(1)}-${reviewToEmployeeId})`;

        navigateTo(finalPath, {
            state: {
                name: 'Back to Previous Goals',
                reviewCycle: reviewCycleInfo.name,
                employeeId: reviewToId,
                reviewCycleId
            }
        });
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
        if (data && !data.length) {
            kpiData.forEach((kpi: kpi) => {
                if (kpi.checkInResponse !== '' || kpi.checkInRating !== '') {
                    flag = true;
                }
            });
        }
        data?.length &&
            kpiData.length &&
            data[0].reviewData?.forEach((review: any, idx: number) => {
                if ((!review.review && kpiData[idx].checkInResponse !== '') || (!review.rating && kpiData[idx].checkInRating !== '')) {
                    flag = true;
                }
                if (
                    (review.review && kpiData[idx].checkInResponse !== review.review) ||
                    (review.rating && kpiData[idx].checkInRating !== review.rating)
                ) {
                    flag = true;
                }
            });
        return flag;
    }, [data, kpiData, isSaved]);

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

    const handlePreviousGoalsNavigation = () => {
        navigateToPreviousGoals();
    };

    useEffect(() => {
        if (kpiData && data && !checkKpiChanges) {
            setFeedbackModal(false);
        }
    }, [data, kpiData, checkKpiChanges]);

    useEffect(() => {
        if (data && data.length > 1) {
            // first find self, first manager and second manager data from response
            const selfData = data.find((review: any) => review.reviewTypeId === 1);
            const firstManagerData = data.find((review: any) => review.reviewTypeId === 2 && review.reviewFromId === firstManagerId);
            const secondManagerData = data.find((review: any) => review.reviewTypeId === 2 && review.reviewFromId === secondManagerId);
            const checkInData = data.find((review: any) => review.reviewTypeId === 3);

            checkInData ? setApiMethod('PUT') : setApiMethod('POST');

            // if required data is available
            if (selfData && firstManagerData && selfData.published && (firstManagerData.published || secondManagerData.published)) {
                setReviewCycleInfo({
                    reviewDetailsId: checkInData?.reviewDetailsId || '',
                    reviewCycleId: selfData.reviewCycleId,
                    reviewToId,
                    reviewFromId: userDetails.id,
                    draft: checkInData ? checkInData.draft : false,
                    published: checkInData ? checkInData.published : false,
                    name: `${format(new Date(startDate), 'do MMM yyyy')} - ${format(new Date(endDate), 'do MMM yyyy')}`
                });
                const kpiDataToPush: kpi[] = [];

                selfData.reviewData.forEach((kpi: any) => {
                    const selfKpi = selfData.reviewData.find((selfK: any) => selfK.id === kpi.id);
                    const manager1Kpi = firstManagerData.reviewData.find((managerK: any) => managerK.id === kpi.id);
                    const manager2Kpi = secondManagerData && secondManagerData.reviewData.find((managerK: any) => managerK.id === kpi.id);
                    const checkInKpi = checkInData && checkInData.reviewData.find((checkInK: any) => checkInK.id === kpi.id);
                    kpiDataToPush.push({
                        id: kpi.id,
                        title: kpi.kpiTitle,
                        kraId: kpi.kraId,
                        kraName: kpi.kraName,
                        description: kpi.kpiDescription,
                        response: selfKpi && selfKpi.review ? selfKpi.review : '',
                        rating: selfKpi && selfKpi.rating ? selfKpi.rating : '',
                        manager1Response: manager1Kpi && manager1Kpi.review ? manager1Kpi.review : '',
                        manager1Rating: manager1Kpi && manager1Kpi.rating ? manager1Kpi.rating : '',
                        manager2Response: manager2Kpi && manager2Kpi.review ? manager2Kpi.review : '',
                        manager2Rating: manager2Kpi && manager2Kpi.rating ? manager2Kpi.rating : '',
                        checkInResponse: checkInKpi && checkInKpi.review ? checkInKpi.review : '',
                        checkInRating: checkInKpi && checkInKpi.rating ? checkInKpi.rating : '',
                        responseError: '',
                        ratingError: ''
                    });
                });
                const t = kpiDataToPush.sort((kpi1: any, kpi2: any) => (kpi1.id < kpi2.id ? -1 : kpi1.id > kpi2.id ? 1 : 0));
                setKpiData(t);
                setExistingKpiData(t);
            } else {
                isSuccess &&
                    setReviewCycleInfo({
                        message: 'Self or First Manager review has not been submitted yet.',
                        name: `${format(new Date(startDate), 'do MMM yyyy')} - ${format(new Date(endDate), 'do MMM yyyy')}`
                    });
            }
        } else {
            isSuccess &&
                setReviewCycleInfo({
                    message: 'Self or First Manager review has not been submitted yet.',
                    name: `${format(new Date(startDate), 'do MMM yyyy')} - ${format(new Date(endDate), 'do MMM yyyy')}`
                });
        }
    }, [data, isSuccess, endDate, firstManagerId, reviewToId, secondManagerId, startDate, userDetails.employeeId, userDetails.id]);

    const groupedKpis: KpiRecords = useMemo(() => {
        const order = isKraSuccess && kraData.map((kra: KraType) => kra.name);
        const records = groupKpis?.slice().reduce((record: { [key: string]: string[] }, kpi: any) => {
            if (!record[kpi.kraName]) {
                record[kpi.kraName] = [];
            }
            const kpiTitle = kpi.kpiTitle ? kpi.kpiTitle : kpi.title;
            record[kpi.kraName].push(kpiTitle);
            return record;
        }, {});
        if (order && records) return SortRecords(records, order);
        else return records;
    }, [groupKpis, kraData, isKraSuccess]);

    const flattenKpiData = useMemo(() => {
        if (!groupedKpis) return [];
        return Object.values(groupedKpis).flat();
    }, [groupedKpis]);

    const activeKpiIndex = useMemo(() => {
        if (!activeKpi) {
            return 0;
        }
        return flattenKpiData?.findIndex(kpi => kpi === activeKpi);
    }, [activeKpi, flattenKpiData]);

    const isPrevDisabled = activeKpiIndex === 0;
    const isNextDisabled = useMemo(() => activeKpiIndex === flattenKpiData.length - 1, [flattenKpiData, activeKpiIndex]);

    useEffect(() => {
        if (action === 'View') {
            const checkInData = data?.find((review: any) => review.reviewTypeId === 3);
            setGroupKpis(checkInData?.reviewData);
        } else {
            if (initialKpiDataSuccess && initialKpiData.length > 0) {
                setGroupKpis(initialKpiData);
            }
        }
    }, [initialKpiData, initialKpiDataSuccess, action, data]);

    useEffect(() => {
        if (flattenKpiData.length > 0 && !activeKpi) {
            setActiveKpi(flattenKpiData[0]);
        }
    }, [flattenKpiData, activeKpi]);

    useEffect(() => {
        if (editSuccess) {
            if (!proceed) {
                setApiMethod('PUT');
                setIsSaved(true);
            } else if (path.includes(routeConstants.checkInWithTeamMember)) {
                navigateTo(`${routeConstants.checkInWithTeamMember}/${reviewCycleInfo.name}/add-goals`, stateToBeSent);
            } else if (path.includes(routeConstants.performanceReview)) {
                navigateTo(`${routeConstants.performanceReview}/${reviewCycleInfo.name}/add-goals`, stateToBeSent);
            }
        }
    }, [
        editSuccess,
        reviewToId,
        firstName,
        lastName,
        navigateTo,
        path,
        proceed,
        reviewCycleInfo.draft,
        reviewCycleInfo.published,
        stateToBeSent,
        reviewToEmployeeId,
        reviewCycleInfo.name
    ]);

    useEffect(() => {
        const error = editError as any;
        if (error && typeof error === 'object') {
            addToast({
                variant: 'error',
                header: error?.data?.errorMessage || 'Something went wrong.',
                timer: 3000
            });
        }
    }, [editError]);

    useEffect(() => {
        setFeedbackModal(false);
        if (autoSaveSuccess) {
            setShowSuccessMessage(true);
            if (isRetry) {
                toggleModal('');
            }

            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [autoSaveSuccess, isRetry]);
    const kpiDataSorted: kpi[] = useMemo(
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
        proceed,
        navigateToTeamFeedback,
        toggleModal,
        handleCancel,
        handleInputChange,
        handleSend,
        // actionItems,
        // isLoadingActionItems,
        feedbackModal,
        prompt,
        path,
        firstName,
        lastName,
        reviewToEmployeeId,
        firstManagerFirstName,
        firstManagerLastName,
        firstManagerEmployeeId,
        secondManagerFirstName,
        secondManagerLastName,
        secondManagerEmployeeId,
        handleSelectKpi,
        isPrevDisabled,
        isNextDisabled,
        hanldeKpiChange,
        groupedKpis,
        flattenKpiData,
        activeKpi,
        activeKpiIndex,
        isActiveKpi,
        handleGetKpiReviewStatus,
        handleNavigation,
        handlePreviousGoalsNavigation,
        handleRetry,
        autoSaveLoading,
        showSuccessMessage,
        loadingPopup
    };
};
