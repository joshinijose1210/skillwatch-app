import { To, useLocation, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useGetKpisQuery, useGetKrasQuery, useGetReviewTimelineQuery } from '@slice/services';
import { useAppSelector } from '@slice';
import { routeConstants } from '@constants';
import { useEffect, useMemo, useState } from 'react';
import { KraType } from '@pages/KraManagement/useKraManagement';
import { KPI } from '@pages/KpiManagement/types';
import { useGetReviewQuery } from '@slice/services/review';
import { LocationData } from './types';
import { KpiRecords } from '../SelfReviewForm/types';
import { SortRecords } from '@utils/sortRecords';

const defaultKpiRating = 5;

export const usePerformanceGuidelines = () => {
    const userDetails = useAppSelector(state => state.user);
    const navigateTo = useNavigate();

    const { ActivePage } = useParams();
    const [kras, setKras] = useState<KraType[] | null>(null);
    const [kpis, setKpis] = useState<KPI[] | null>(null);

    const {
        reviewCycleId,
        reviewCycle,
        startDate,
        endDate,
        reviewToEmployeeId,
        reviewToId,
        reviewFromId,
        firstName,
        lastName,
        managerFirstName,
        managerLastName,
        reviewFromEmployeeId,
        rowData,
        firstManagerId,
        secondManagerId,
        checkInFromId,
        firstManagerFirstName,
        firstManagerLastName,
        firstManagerEmployeeId,
        secondManagerFirstName,
        secondManagerLastName,
        secondManagerEmployeeId,
        secondManagerAverageRating,
        secondManagerReviewDraft,
        secondManagerReviewPublish,
        selfAverageRating,
        selfReviewDraft,
        selfReviewPublish,
        checkInAverageRating,
        checkInDraft,
        checkInEndDate,
        checkInPublish,
        checkInStartDate,
        firstManagerAverageRating,
        firstManagerReviewDraft,
        firstManagerReviewPublish,
        overallStatus,
        publish,
        action
    } = (useLocation().state as LocationData) || {};

    if (!action) {
        navigateTo(routeConstants.root, {
            state: {
                error: true,
                header: 'Unauthorized Access',
                message: 'You do not have access to the page, please contact system administrator/HR.'
            }
        });
    }
    const path = useLocation().pathname;

    const { data, isLoading: isReviewTimelineLoading } = useGetReviewTimelineQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewToId', value: userDetails.id }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );
    const {
        data: kraData,
        isSuccess: isKraSuccess,
        isFetching: isKrasLoading,
        isError: isKraError,
        error: krasError
    } = useGetKrasQuery(
        {
            path: '',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        },
        { refetchOnMountOrArgChange: true }
    );

    const {
        data: initialKpiData,
        isLoading: initialKpiLoading,
        isSuccess: initialKpiSuccess
    } = useGetKpisQuery(
        {
            path: 'fetch-by-employee-id',
            params: [
                {
                    name: 'reviewToId',
                    value: path.includes('self-review') || path.includes('manager-review') ? userDetails.id : reviewToId
                },
                { name: 'organisationId', value: userDetails.organisationId }
            ]
        },
        {
            refetchOnMountOrArgChange: true
            // skip: skipInitialKpiQuery
        }
    );

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

    const handleAddSelfReview = () => {
        navigateTo(
            path.includes(`team's-review`)
                ? `${routeConstants.managerReview}/${format(new Date(startDate), 'do MMM yyyy')} - ${format(
                      new Date(endDate),
                      'do MMM yyyy'
                  )}`
                : `${routeConstants.selfReview}/${format(new Date(startDate), 'do MMM yyyy')} - ${format(
                      new Date(endDate),
                      'do MMM yyyy'
                  )}`,

            path.includes(`team's-review`)
                ? {
                      state: {
                          ...ManagerReviewData[0],
                          firstName,
                          lastName
                      }
                  }
                : {
                      state: {
                          ...data[0],
                          action:
                              !data[0].selfReviewDraft && !data[0].selfReviewPublish
                                  ? 'Add'
                                  : data[0].selfReviewDraft && !data[0].selfReviewPublish
                                  ? 'Edit'
                                  : 'View',
                          reviewCycleId: data[0].reviewCycleId,
                          ...rowData
                      }
                  }
        );
    };

    const handleManagerReview = () => {
        navigateTo(
            path.includes(`team's-review`)
                ? `${routeConstants.managerReview}`
                : `${routeConstants.checkInWithTeamMember}/${ActivePage || 1}/${format(new Date(startDate), 'do MMM yyyy')} - ${format(
                      new Date(endDate),
                      'do MMM yyyy'
                  )}`,
            path.includes(`team's-review`)
                ? {
                      state: {
                          ...data[0],
                          firstName,
                          lastName,
                          action,
                          reviewCycleId,
                          reviewCycle: `${format(new Date(startDate), 'do MMM yyyy')} - ${format(new Date(endDate), 'do MMM yyyy')}`,
                          reviewToId,
                          reviewToEmployeeId
                      }
                  }
                : {
                      state: {
                          endDate,
                          firstManagerEmployeeId,
                          firstManagerFirstName,
                          firstManagerId,
                          firstManagerLastName,
                          checkInAverageRating,
                          checkInDraft,
                          checkInEndDate,
                          checkInPublish,
                          checkInStartDate,
                          firstManagerAverageRating,
                          firstManagerReviewDraft,
                          firstManagerReviewPublish,
                          overallStatus,
                          publish,
                          firstName,
                          lastName,
                          reviewCycle,
                          reviewCycleId,
                          reviewToEmployeeId,
                          reviewToId,
                          secondManagerEmployeeId,
                          secondManagerFirstName,
                          secondManagerId,
                          secondManagerLastName,
                          secondManagerAverageRating,
                          secondManagerReviewDraft,
                          secondManagerReviewPublish,
                          selfAverageRating,
                          selfReviewDraft,
                          checkInFromId,
                          selfReviewPublish,
                          startDate,
                          action
                      }
                  }
        );
    };

    useEffect(() => {
        if (isKraSuccess && kraData) setKras(kraData);
    }, [isKraSuccess, kraData]);

    useEffect(() => {
        if (initialKpiData && initialKpiSuccess) {
            setKpis(initialKpiData);
        }
    }, [initialKpiData, initialKpiSuccess]);

    const actionButtonLabel = useMemo(() => {
        if (!isReviewTimelineLoading) {
            if (path.includes('self-review')) {
                if (data[0]?.isSelfReviewActive === false) {
                    return 'View KPI details';
                } else {
                    if (action === 'Add') {
                        return 'Start Self Review';
                    } else if (action === 'Edit') {
                        return 'Continue Self Review';
                    } else if (action === 'View') {
                        return 'View Self Review';
                    }
                }
            } else if (path.includes(`team's-review`)) {
                if (action === 'Add') {
                    return `Start Team's Review`;
                } else if (action === 'Edit') {
                    return `Continue Team's Review`;
                } else if (action === 'View') {
                    return `View Team's Review`;
                }
            } else if (path.includes(`team's-check-in`) || path.includes('reports/performance-review/performance-guidelines')) {
                if (action === 'Add') {
                    return `Start Team's Check-In`;
                } else if (action === 'Edit') {
                    return `Continue Team's Check-In`;
                } else if (action === 'View') {
                    return `View Team's Check-In`;
                }
            }
        } else {
            return 'Loading';
        }
    }, [path, action, data]);

    const reviewPeriod = `${format(new Date(startDate), 'do MMM yyyy')} - ${format(new Date(endDate), 'do MMM yyyy')}`;

    const navigateWithState = (route: To, additionalState = {}) => {
        const commonState = {
            ...data[0],
            reviewFromId: userDetails.id,
            reviewToId: userDetails.id,
            action:
                !data[0].selfReviewDraft && !selfReviewPublish ? 'Add' : data[0].selfReviewDraft && !selfReviewPublish ? 'Edit' : 'View',
            reviewCycleId,
            ...additionalState
        };

        const teamReviewState = {
            ...data[0],
            firstName,
            lastName,
            action,
            reviewCycleId,
            reviewCycle: reviewPeriod,
            reviewToId,
            reviewToEmployeeId
        };

        const teamCheckinState = {
            endDate,
            firstManagerEmployeeId,
            firstManagerFirstName,
            firstManagerId,
            firstManagerLastName,
            checkInAverageRating,
            checkInDraft,
            checkInEndDate,
            checkInPublish,
            checkInStartDate,
            firstManagerAverageRating,
            firstManagerReviewDraft,
            firstManagerReviewPublish,
            overallStatus,
            publish,
            firstName,
            lastName,
            reviewCycle,
            reviewCycleId,
            reviewToEmployeeId,
            reviewToId,
            secondManagerEmployeeId,
            secondManagerFirstName,
            secondManagerId,
            secondManagerLastName,
            secondManagerAverageRating,
            secondManagerReviewDraft,
            secondManagerReviewPublish,
            selfAverageRating,
            selfReviewDraft,
            checkInFromId,
            selfReviewPublish,
            startDate,
            action
        };

        let stateToUse = commonState;

        if (path.includes("team's-review")) {
            stateToUse = teamReviewState;
        } else if (path.includes("team's-check-in")) {
            stateToUse = teamCheckinState;
        }

        navigateTo(route, { state: stateToUse });
    };

    const handleNavigation = () => {
        if (actionButtonLabel === 'View KPI details') {
            navigateTo(`${routeConstants.selfReview}/${reviewPeriod}`, {
                state: {
                    ...data[0],
                    reviewFromId: userDetails.id,
                    reviewToId: userDetails.id,
                    action:
                        !data[0].selfReviewDraft && !selfReviewPublish
                            ? 'Add'
                            : data[0].selfReviewDraft && !selfReviewPublish
                            ? 'Edit'
                            : 'View',
                    reviewCycleId
                }
            });
            return;
        }

        if (path.includes('self-review')) {
            handleAddSelfReview();
        } else if (path.includes(`team's-check-in`) || path.includes('reports/performance-review/performance-guidelines')) {
            navigateWithState(`${routeConstants.checkInWithTeamMember}/${ActivePage || 1}/${reviewPeriod}`);
        } else {
            navigateWithState(`${routeConstants.managerReview}/${reviewPeriod}`);
        }
    };

    const groupedKpis = useMemo(() => {
        const order: string[] = isKraSuccess && kraData?.map((kra: KraType) => kra.name);
        const records = kpis?.slice().reduce((record: KpiRecords, kpi: KPI) => {
            if (!record[kpi.kraName]) {
                record[kpi.kraName] = [];
            }
            record[kpi.kraName].push(kpi.title);
            return record;
        }, {});
        if (order && records) {
            return SortRecords(records, order);
        } else return records;
    }, [kpis, isKraSuccess, kraData]);

    return {
        kras,
        isReviewTimelineLoading,
        isKrasLoading,
        // isKpisLoading,
        firstName,
        lastName,
        handleManagerReview,
        reviewToEmployeeId,
        reviewCycle,
        // isKpisSuccess,
        // kpiError,
        actionButtonLabel,
        groupedKpis,
        isKraSuccess,
        krasError,
        initialKpiLoading,
        managerFirstName,
        managerLastName,
        reviewFromEmployeeId,
        action,
        handleAddSelfReview,
        defaultKpiRating,
        handleNavigation,
        ManagerReviewLoading
    };
};
