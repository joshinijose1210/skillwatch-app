import { routeConstants } from '@constants';
import { RatingChartData, reviewRatingOptionsChip } from '@constants/data';
import { addToast } from '@medly-components/core';
import { useAppSelector } from '@slice';
import {
    useGetCheckInWithManagerReviewsQuery,
    useGetEmployeeDataQuery,
    useGetKpisQuery,
    useGetKrasQuery,
    useGetReviewTimelineQuery,
    usePostCheckInWithManagerReviewsMutation
} from '@slice/services';
import { useGetChartApiQuery } from '@slice/services/chart';
import { format } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    CheckInData,
    EmployeeSummery,
    InputField,
    ReviewData,
    StateData,
    KRAWeightedScore,
    WeightedScore,
    FinalScore,
    DetailedReviewData
} from './types';
import { useGetReviewQuery } from '@slice/services/review';
import { KPI } from '@pages/KpiManagement/types';
import { useGetweightedScoreQuery } from '@slice/services/weightedScore';
import { SortRecords } from '@utils/sortRecords';
import { KraType } from '@pages/KraManagement/useKraManagement';
import { MetricStateData } from '@components/MetricsTable/types';

export const useReviewCycleActionItems = () => {
    const userDetails = useAppSelector(state => state.user);
    const data = useLocation().state as StateData;
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<EmployeeSummery>();
    const [inputFields, setInputFields] = useState<InputField[]>([
        {
            actionItem: '',
            actionItemId: Math.random(),
            actionItemError: '',
            targetDate: ''
        }
    ]);
    const [actionItem, setActionItem] = useState<InputField[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [clickedOnBack, setClickedOnBack] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [shouldShowBackModal, setShouldShowBackModal] = useState(false);
    const [checkInData, setCheckInData] = useState<CheckInData[]>([]);
    const [currentCheckInRating, setCurrentCheckInRating] = useState(0);
    const [reviewDetailsIdForWeightedScore, setReviewDetailsIdForWeightedScore] = useState<number>();
    const [reviewCycleId, setReviewCycleId] = useState<number>();
    const [weightedScoreLable, setWeightedScoreLable] = useState<string>('Weighted Score');
    const [latestManagerData, setLatestManagerData] = useState<Partial<MetricStateData>>({});

    const [reviewDataRatings, setReviewDataRatings] = useState<{
        selfReviewData: any;
        firstManagerData: any;
        secondManagerData: any;
        checkInWithManagerData: any;
    }>({ selfReviewData: null, firstManagerData: null, secondManagerData: null, checkInWithManagerData: null });

    const [submitCheckInWithManagerReview, { isSuccess: submitSuccess, isLoading: isSubmitLoading }] =
        usePostCheckInWithManagerReviewsMutation();

    const { data: reviewCycleData, isLoading: isReviewCycleDataLoading } = useGetReviewTimelineQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewToId', value: userDetails.id }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const { data: actionItemsData } = useGetCheckInWithManagerReviewsQuery(
        {
            path: '',
            params: [
                { name: 'reviewCycleId', value: data.reviewCycleId },
                { name: 'reviewTypeId', value: [3] },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewToId', value: data.reviewToId },
                { name: 'reviewFromId', value: data.reviewFromId }
            ]
        },
        { skip: !data.reviewCycleId || !data.reviewToId || !data.reviewFromId }
    );

    const { data: employeeDetails, isFetching: isEmployeeDataLoading } = useGetEmployeeDataQuery(
        {
            path: '',
            params: [
                { name: 'id', value: data.reviewToId },
                { name: 'reviewCycleId', value: data.reviewCycleId }
            ]
        },
        { refetchOnMountOrArgChange: true, skip: !data.reviewToId }
    );

    const {
        data: chartData,
        isSuccess,
        isLoading: loadingCycles
    } = useGetChartApiQuery(
        {
            path: 'average-ratings',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewToId', value: data.reviewToId },
                { name: 'reviewCycleId', value: data.reviewCycleId }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );
    const { data: actionItems, isLoading: isLoadingActionItems } = useGetCheckInWithManagerReviewsQuery(
        {
            path: '',
            params: [
                { name: 'reviewCycleId', value: data?.reviewCycleId },
                { name: 'reviewTypeId', value: [3] },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewToId', value: data?.reviewToId },
                {
                    name: 'reviewFromId',
                    value: [
                        data?.reviewToId,
                        data?.firstManagerId || employeeDetails?.firstManagerId,
                        data?.secondManagerId || employeeDetails?.secondManagerId
                    ]
                }
            ]
        },
        {
            refetchOnMountOrArgChange: true
        }
    );
    const { data: initialKpiData, isLoading: initialKpiLoading } = useGetKpisQuery(
        {
            path: 'fetch-by-employee-id',
            params: [
                {
                    name: 'reviewToId',
                    value: path.includes('self-review') || path.includes('manager-review') ? userDetails.id : data?.reviewToId
                },
                { name: 'organisationId', value: userDetails.organisationId }
            ]
        },
        {
            refetchOnMountOrArgChange: true
            // skip: skipInitialKpiQuery
        }
    );
    const {
        data: reviewData,
        isLoading: isReviewLoading,
        isSuccess: isReviewSuccess
    } = useGetReviewQuery(
        {
            path: '',
            params: [
                {
                    name: 'reviewTypeId',
                    value: [1, 2, 3]
                },
                {
                    name: 'reviewCycleId',
                    value: data?.reviewCycleId
                },
                { name: 'organisationId', value: userDetails.organisationId },
                {
                    name: 'reviewToId',
                    value: data?.reviewToId
                },
                {
                    name: 'reviewFromId',
                    value: [
                        data?.reviewToId,
                        data?.firstManagerId || employeeDetails?.firstManagerId || '',
                        data?.secondManagerId || employeeDetails?.secondManagerId || '',
                        data?.checkInFromId || ''
                    ]
                }
            ]
        },
        {
            refetchOnMountOrArgChange: true
        }
    );
    const {
        data: kraData,
        isSuccess: isKraSuccess,
        isFetching: isKrasLoading
    } = useGetKrasQuery(
        {
            path: '',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        },
        { refetchOnMountOrArgChange: true }
    );

    const {
        data: weightedScore,
        isLoading: isWeightedScoreLoading,
        isError: isWeightedScoreError,
        error: weightedScoreError,
        isSuccess: isWeightedScoreSuccess
    } = useGetweightedScoreQuery(
        {
            path: '',
            params: [
                { name: 'reviewCycleId', value: reviewCycleId },
                {
                    name: 'reviewDetailsId',
                    value: reviewDetailsIdForWeightedScore
                }
            ]
        },
        {
            skip: !reviewDetailsIdForWeightedScore,
            refetchOnMountOrArgChange: true
        }
    );

    // get the review details id of particular review flow, refactor this later into separate component
    const reviewDetailsId = useMemo(() => {
        if (isReviewSuccess) {
            let reviewTypeId: number;
            let reviewCycleId: number | undefined;
            if (path.includes('self-review')) {
                reviewTypeId = 1;
                reviewCycleId = data.reviewCycleId;
            } else if (path.includes(`team's-review`) || path.includes('/manager-review')) {
                reviewTypeId = 2;
                reviewCycleId = data.reviewCycleId;
            } else if (
                path.includes(`team's-check-in`) ||
                path.includes('manager-check-in') ||
                path.includes('/reports/performance-review/')
            ) {
                reviewTypeId = 3;
                reviewCycleId = data.reviewCycleId;
            }
            const reviewDetailsId = reviewData.find((item: DetailedReviewData) => item.reviewTypeId === reviewTypeId)?.reviewDetailsId;
            if (reviewCycleId !== undefined) {
                setReviewCycleId(reviewCycleId);
            }
            setReviewDetailsIdForWeightedScore(reviewDetailsId);
            return reviewDetailsId;
        }
    }, [isReviewSuccess, path, reviewData]);

    const updateSelfReviewState = (reviewData: DetailedReviewData[], employeeDetails: EmployeeSummery) => {
        const selfReview = reviewData.find(
            (review: DetailedReviewData) => review.reviewFromId === data.reviewToId && review.reviewTypeId === 1
        );
        if (selfReview) {
            setWeightedScoreLable('Self Weighted Score');
            setReviewCycleId(selfReview.reviewCycleId);
            setReviewDetailsIdForWeightedScore(selfReview.reviewDetailsId);
        }
    };

    const updateManagerReviewState = (reviewData: DetailedReviewData[], employeeDetails: EmployeeSummery, currentManagerId: number) => {
        const managerReview = reviewData.find(
            (review: DetailedReviewData) => review.reviewFromId === currentManagerId && review.reviewTypeId === 2
        );
        if (managerReview) {
            let managerName = '';
            if (managerReview.reviewFromEmployeeId === employeeDetails.firstManagerEmployeeId) {
                managerName = employeeDetails.firstManagerFirstName;
            } else if (managerReview.reviewFromEmployeeId === employeeDetails.secondManagerEmployeeId) {
                managerName = employeeDetails.secondManagerFirstName;
            }
            setWeightedScoreLable(`Weighted Score by ${managerName}`);
            setReviewCycleId(managerReview.reviewCycleId);
            setReviewDetailsIdForWeightedScore(managerReview.reviewDetailsId);
        }
    };

    const updateBothManagersState = (
        reviewData: DetailedReviewData[],
        employeeDetails: EmployeeSummery,
        reviewCycleData: any,
        weightedScore: any
    ) => {
        if (path.includes('/both-managers')) {
            const filteredReviews = reviewData.filter((review: DetailedReviewData) => review.reviewTypeId !== 1);

            if (filteredReviews.length > 0) {
                const mostRecentReview = filteredReviews.reduce((latest: DetailedReviewData, current: DetailedReviewData) => {
                    return current.submittedAt > latest.submittedAt ? current : latest;
                }, filteredReviews[0]);

                const latestManagerName = {
                    managerFirstName: '',
                    managerLastName: ''
                };

                if (mostRecentReview.reviewFromId === employeeDetails.firstManagerId) {
                    latestManagerName.managerFirstName = employeeDetails.firstManagerFirstName || 'Unknown';
                    latestManagerName.managerLastName = employeeDetails.firstManagerLastName || 'Unknown';
                } else if (mostRecentReview.reviewFromId === employeeDetails.secondManagerId) {
                    latestManagerName.managerFirstName = employeeDetails.secondManagerFirstName || 'Unknown';
                    latestManagerName.managerLastName = employeeDetails.secondManagerLastName || 'Unknown';
                }

                if (!isReviewCycleDataLoading && reviewCycleData && weightedScore) {
                    const latestManagerData = {
                        reviewCycleId: mostRecentReview.reviewCycleId,
                        startDate: reviewCycleData[0]?.startDate || null,
                        endDate: reviewCycleData[0]?.endDate || null,
                        managerReviewStartDate: reviewCycleData[0]?.managerReviewStartDate || null,
                        managerReviewEndDate: reviewCycleData[0]?.managerReviewEndDate || null,
                        team: userDetails.teamName || 'Unknown Team',
                        reviewToId: mostRecentReview.reviewToId,
                        reviewToEmployeeId: mostRecentReview.reviewToEmployeeId,
                        firstName: userDetails.firstName || 'Unknown',
                        lastName: userDetails.lastName || 'Unknown',
                        reviewFromId: mostRecentReview.reviewFromId,
                        reviewFromEmployeeId: mostRecentReview.reviewFromEmployeeId,
                        managerFirstName: latestManagerName.managerFirstName || 'Unknown',
                        managerLastName: latestManagerName.managerLastName || 'Unknown',
                        draft: mostRecentReview.draft || false,
                        publish: mostRecentReview.published || false,
                        averageRating: weightedScore.finalScore || 0,
                        submittedDate: mostRecentReview.submittedAt
                            ? new Date(mostRecentReview.submittedAt).toLocaleDateString()
                            : 'Not Submitted',
                        reviewCycle:
                            `${format(new Date(reviewCycleData[0]?.startDate), 'do MMM yyyy')} - ${format(
                                new Date(reviewCycleData[0]?.startDate),
                                'do MMM yyyy'
                            )}` || 'Unknown Cycle',
                        firstManagerId: mostRecentReview.reviewFromId,
                        action: 'View'
                    };
                    setLatestManagerData(latestManagerData);
                }
            } else {
                console.warn('No valid reviews found (excluding reviewTypeId === 1).');
            }
        }
        if (!reviewDataRatings.checkInWithManagerData || reviewDataRatings.checkInWithManagerData.length === 0) {
            const reviews = [];
            const selfReview = reviewData.find((review: DetailedReviewData) => review.reviewFromId === data.reviewToId);
            if (selfReview) {
                reviews.push({
                    type: 'self',
                    data: selfReview,
                    submittedAt: new Date(selfReview.submittedAt || 0).getTime()
                });
            }

            if (employeeDetails.firstManagerId) {
                const manager1Review = reviewData.find(
                    (review: DetailedReviewData) => review.reviewFromId === employeeDetails.firstManagerId
                );
                if (manager1Review) {
                    reviews.push({
                        type: 'manager1',
                        data: manager1Review,
                        submittedAt: new Date(manager1Review.submittedAt || 0).getTime()
                    });
                }
            }
            if (employeeDetails.secondManagerId) {
                const manager2Review = reviewData.find(
                    (review: DetailedReviewData) => review.reviewFromId === employeeDetails.secondManagerId
                );
                if (manager2Review) {
                    reviews.push({
                        type: 'manager2',
                        data: manager2Review,
                        submittedAt: new Date(manager2Review.submittedAt || 0).getTime()
                    });
                }
            }

            if (reviews.length > 0) {
                const filteredReviews = reviews.filter(review => review.data.reviewTypeId !== 1);

                const mostRecentReview = filteredReviews.reduce((latest, current) => {
                    return current.submittedAt > latest.submittedAt ? current : latest;
                }, filteredReviews[0]);

                if (mostRecentReview) {
                    let managerName = '';
                    if (mostRecentReview.data.reviewFromEmployeeId === employeeDetails.firstManagerEmployeeId) {
                        managerName = employeeDetails.firstManagerFirstName;
                    } else if (mostRecentReview.data.reviewFromEmployeeId === employeeDetails.secondManagerEmployeeId) {
                        managerName = employeeDetails.secondManagerFirstName;
                    }

                    setWeightedScoreLable(`Weighted Score by ${managerName}`);
                    if (path.includes(`/both-managers`)) {
                        setWeightedScoreLable(managerName != '' ? `Weighted Score by ${managerName}` : 'Weighted Score');
                    } else if (path.includes(`/team's-review`)) {
                        setWeightedScoreLable(`Weighted Score`);
                    } else {
                        setWeightedScoreLable(`Weighted Score in Check-in`);
                    }
                    setReviewCycleId(mostRecentReview.data.reviewCycleId);
                    setReviewDetailsIdForWeightedScore(mostRecentReview.data.reviewDetailsId);
                }
            }
        } else {
            const checkInReview = reviewData.find((review: DetailedReviewData) => review.reviewTypeId === 3);

            if (checkInReview) {
                setReviewCycleId(checkInReview.reviewCycleId);
                setReviewDetailsIdForWeightedScore(checkInReview.reviewDetailsId);
            }
        }
        if (path.includes(`/team's-review`)) {
            const managerReview = reviewData.filter(
                review =>
                    review?.reviewTypeId !== 1 &&
                    review?.reviewTypeId !== 3 &&
                    review?.reviewToId === employeeDetails.id &&
                    review?.reviewFromId === Number(userDetails?.id)
            );
            setReviewCycleId(managerReview[0]?.reviewCycleId);
            setReviewDetailsIdForWeightedScore(managerReview[0]?.reviewDetailsId);
        }
    };

    useEffect(() => {
        if (isReviewSuccess && reviewData && employeeDetails) {
            if (path.includes('self-review')) {
                updateSelfReviewState(reviewData, employeeDetails);
            } else if (path.includes('manager-review')) {
                const filteredReviews = reviewData.filter((review: DetailedReviewData) => review.reviewToId !== review.reviewFromId);

                const matchingReview = filteredReviews.find(
                    (review: DetailedReviewData) => review.reviewFromId === data.reviewFromId && review.reviewToId === data.reviewToId
                );

                if (matchingReview) {
                    updateManagerReviewState(reviewData, employeeDetails, matchingReview.reviewFromId);
                }
            } else if (
                path.includes('/both-managers') ||
                path.includes('manager-check-in') ||
                path.includes(`/team's-check-in`) ||
                path.includes(`/team's-review`)
            ) {
                updateBothManagersState(reviewData, employeeDetails, reviewCycleData, weightedScore);
            }
        }
    }, [isReviewSuccess, reviewData, employeeDetails, path, data?.firstManagerId, reviewCycleData, weightedScore]);

    const isLoading = useMemo(() => {
        return (
            isLoadingActionItems ||
            initialKpiLoading ||
            isKrasLoading ||
            isEmployeeDataLoading ||
            isReviewLoading ||
            isWeightedScoreLoading ||
            isReviewCycleDataLoading
        );
    }, [
        isLoadingActionItems,
        initialKpiLoading,
        isKrasLoading,
        isEmployeeDataLoading,
        isReviewLoading,
        isWeightedScoreLoading,
        isReviewCycleDataLoading
    ]);

    useEffect(() => {
        if (data && employeeDetails) {
            setEmployee(employeeDetails);
        }
    }, [data, employeeDetails]);

    const groupedKpis =
        !isLoading &&
        initialKpiData?.slice().reduce((record: { [key: string]: string[] }, kpi: KPI) => {
            if (!record[kpi.kraName]) {
                record[kpi.kraName] = [];
            }
            record[kpi.kraName].push(kpi.title);
            return record;
        }, {});

    useEffect(() => {
        if (!isReviewLoading && isReviewSuccess && reviewData.length > 0) {
            const selfReviewData = reviewData.filter((data: DetailedReviewData) => data.reviewTypeId === 1);

            const firstManagerData = reviewData.filter(
                (review: DetailedReviewData) =>
                    review.reviewTypeId === 2 &&
                    (review.reviewFromId === data?.firstManagerId || review.reviewFromId === employeeDetails?.firstManagerId)
            );
            const secondManagerData = reviewData.filter(
                (review: DetailedReviewData) =>
                    review.reviewTypeId === 2 &&
                    (review.reviewFromId === data?.secondManagerId || review.reviewFromId === employeeDetails?.secondManagerId)
            );
            const checkInWithManagerData = reviewData.filter((data: DetailedReviewData) => data.reviewTypeId === 3);

            setReviewDataRatings({
                selfReviewData: selfReviewData[0]?.reviewData || [],
                firstManagerData: firstManagerData[0]?.reviewData || [],
                secondManagerData: secondManagerData[0]?.reviewData || [],
                checkInWithManagerData: checkInWithManagerData[0]?.reviewData || []
            });
        }
    }, [
        data?.firstManagerId,
        data?.secondManagerId,
        employeeDetails?.firstManagerId,
        employeeDetails?.secondManagerId,
        isReviewLoading,
        isReviewSuccess,
        reviewData,
        reviewCycleId
    ]);

    const handleAddActionItem = () => {
        setInputFields([
            ...inputFields,
            {
                actionItem: '',
                actionItemId: Math.random(),
                actionItemError: '',
                targetDate: ''
            }
        ]);
    };

    const handleRemoveField = (removeId: number) => {
        setShouldShowBackModal(true);
        const newInputFields = inputFields.filter(({ actionItemId }: InputField) => {
            return actionItemId !== removeId;
        });
        setInputFields(newInputFields);
    };

    useEffect(() => {
        if (actionItemsData && actionItemsData[0] && actionItemsData[0].actionItem && actionItemsData[0].actionItem?.length > 0) {
            const newArray = actionItemsData[0].actionItem.map((item: InputField) => {
                return {
                    ...item,
                    targetDate: format(new Date(item.targetDate), 'yyyy-MM-dd'),
                    actionItemError: ''
                };
            });
            setInputFields(newArray);
        }
    }, [actionItemsData]);

    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
            setShouldShowBackModal(true);
            e.preventDefault();
            const newArray = inputFields.map((action: InputField) => {
                if (action.actionItemId === id) {
                    if (e.target.value?.length < 10) {
                        return {
                            ...action,
                            actionItem: e.target.value,
                            actionItemError: 'Please write more than 10 letters.'
                        };
                    } else if (e.target.value?.length > 150) {
                        return {
                            ...action,
                            actionItem: e.target.value,
                            actionItemError: 'Please write less than 150 letters.'
                        };
                    } else
                        return {
                            ...action,
                            actionItem: e.target.value,
                            actionItemError: ''
                        };
                } else return action;
            });
            setInputFields(newArray);
        },
        [inputFields]
    );
    const handleDateChange = (value: Date | null, id: number) => {
        const newArray = inputFields.map((action: InputField) => {
            if (action.actionItemId === id) {
                return {
                    ...action,
                    targetDate: value !== null ? format(value, 'yyyy-MM-dd') : ''
                };
            } else return action;
        });
        setInputFields(newArray);
    };

    const isDisabled = useMemo(() => {
        let response = false;
        if (inputFields && inputFields?.length > 0) {
            inputFields.forEach((action: InputField) => {
                if (action.actionItemError !== '' || action.actionItem === '' || !action.targetDate) {
                    response = true;
                }
            });
            reviewDetailsId;
        }
        return response;
    }, [inputFields]);

    useEffect(() => {
        if (data && chartData && Object.keys(chartData)?.length !== 0 && isSuccess) {
            let currentCheckInRating = data.reviewData?.reduce(function (accumulator: number, currentValue: ReviewData) {
                return accumulator + currentValue.rating;
            }, 0);
            currentCheckInRating = currentCheckInRating / data.reviewData?.length;
            setCurrentCheckInRating(currentCheckInRating);
            const ratingData = RatingChartData[(Math.floor(currentCheckInRating) || 1) - 1];
            ratingData.value = (360 / 5) * currentCheckInRating;
            const initialColor = {
                id: '',
                label: 'initial',
                value: 360 - ratingData.value,
                color: '#cfd4dc'
            };
            setCheckInData([initialColor, ratingData]);
        }
    }, [chartData, data, isSuccess]);

    useEffect(() => {
        const newArray = inputFields.map((action: InputField) => {
            return {
                actionItemId: action.actionItemId,
                actionItem: action.actionItem,
                targetDate: action.targetDate
            };
        });

        setActionItem(newArray);
    }, [inputFields]);

    const handleSubmit = () => {
        setOpenModal(true);
    };

    const handleNo = () => setOpenModal(!openModal);

    const handleYes = () => {
        if (actionItemsData && actionItemsData[0] && actionItemsData[0].reviewDetailsId) {
            submitCheckInWithManagerReview({
                data: { ...data, actionItem, published: true, draft: false, reviewDetailsId: actionItemsData[0].reviewDetailsId },
                method: 'PUT'
            });
        }
        setSubmit(true);
    };

    const handleSaveAsDraft = () => {
        if (actionItemsData && actionItemsData[0] && actionItemsData[0].reviewDetailsId) {
            submitCheckInWithManagerReview({
                data: { ...data, actionItem, published: false, draft: true, reviewDetailsId: actionItemsData[0].reviewDetailsId },
                method: 'PUT'
            });
        }
    };

    const openBackModal = () => {
        setClickedOnBack(true);
        setOpenModal(true);
    };

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (submitSuccess && submit) {
            addToast({
                variant: 'success',
                header: `Check-in with manager completed successfully!`,
                timer: 3000
            });
            navigate(routeConstants.reviewTimeline);
        } else if (submitSuccess && !submit) {
            addToast({
                variant: 'success',
                header: `Check-in with manager saved successfully!`,
                timer: 3000
            });
        } else if (isWeightedScoreError) {
            addToast({
                variant: 'error',
                header: `Error fetching weighted score!`,
                timer: 3000
            });
        }
    }, [navigate, submit, submitSuccess, isWeightedScoreError]);
    const kras = useMemo(() => {
        if (isWeightedScoreSuccess && weightedScore?.kraWeightedScores) {
            const summaryKras: KRAWeightedScore[] = [
                ...(weightedScore as WeightedScore)?.kraWeightedScores?.map((scoreItem: KRAWeightedScore) => {
                    return {
                        ...scoreItem,
                        kraName: scoreItem?.kraName,
                        weightedRating: scoreItem?.weightedRating,
                        kraWeightage: `Weightage - ${scoreItem.kraWeightage}%`
                    };
                })
            ];
            const order: string[] = isKraSuccess && kraData?.map((kra: KraType) => kra.name);
            const records: Record<string, KRAWeightedScore> = Object.fromEntries(summaryKras.map(item => [item.kraName, item]));

            if (order && records) {
                const sortedRecords = SortRecords(records, order);

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const sortedSummaryKras: KRAWeightedScore[] = Object.entries(sortedRecords).map(([_, summaryRecord]) => ({
                    ...summaryRecord
                }));

                return sortedSummaryKras;
            } else return summaryKras;
        }
    }, [isWeightedScoreSuccess, weightedScore, isKraSuccess, kraData]);

    const finalScore: FinalScore | null = useMemo(() => {
        let finalScoreString = '';
        if (path.includes('/self-review')) {
            finalScoreString = 'Your Self Score';
        } else if (path.includes('/manager-review') || path.includes(`/team's-review`) || path.includes('/both-managers')) {
            finalScoreString = 'Your Manager Score';
        } else if (path.includes('/manager-check-in') || path.includes(`/team's-check-in`) || path.includes('reports/performance-review')) {
            finalScoreString = 'Your Check-in Score';
        }

        if (isWeightedScoreSuccess && weightedScore?.finalScore) {
            const { finalScore } = weightedScore as WeightedScore;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const finalScoreLabel = (rating: number) => reviewRatingOptionsChip.find(option => option.value === Math.floor(rating))!.label;
            return {
                finalScore,
                finalScoreString,
                finalScoreLabel: finalScoreLabel(finalScore)
            };
        }
        return null;
    }, [path, isWeightedScoreSuccess, weightedScore]);

    const isCheckInReviewSummaryPage = useMemo(
        () =>
            (path.includes('review-summary') && path.includes(`team's-check-in`)) ||
            (path.includes('review-summary') && path.includes(`manager-check-in`)) ||
            (path.includes('review-summary') && path.includes('reports/performance-review/')),
        [path]
    );

    return {
        data,
        kras,
        finalScore,
        groupedKpis,
        handleAddActionItem,
        handleRemoveField,
        handleOnChange,
        inputFields,
        handleSubmit,
        clickedOnBack,
        openBackModal,
        handleBack,
        openModal,
        handleNo,
        handleYes,
        reviewDataRatings,
        employee,
        isLoading,
        isDisabled,
        isSubmitLoading,
        handleSaveAsDraft,
        shouldShowBackModal,
        checkInData,
        chartData,
        currentCheckInRating,
        handleDateChange,
        loadingCycles,
        actionItems,
        isLoadingActionItems,
        isCheckInReviewSummaryPage,
        weightedScore,
        isWeightedScoreLoading,
        weightedScoreLable,
        latestManagerData,
        employeeDetails
    };
};
