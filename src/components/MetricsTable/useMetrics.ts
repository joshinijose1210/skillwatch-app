import { useGetKrasQuery } from '@slice/services';
import { useAppSelector } from '@slice';
import { useCallback, useMemo, useState } from 'react';
import { KraType } from '@pages/KraManagement/useKraManagement';
import { KpiObject, MetricStateData, ReviewDataRatingsType, ReviewDataType, Employee } from './types';
import { useLocation, useNavigate } from 'react-router-dom';
import { routeConstants } from '@constants';
import { format } from 'date-fns';
import { SortRecords } from '@utils/sortRecords';

export const useMetricsTable = (
    reviewDataRatings: ReviewDataRatingsType,
    latestManagerData?: Partial<MetricStateData>,
    employeeDetails?: Employee
) => {
    const path = useLocation().pathname;
    const [activeIndex, setActiveIndex] = useState(-1);
    const data = useLocation().state as MetricStateData;
    const navigate = useNavigate();
    const userDetails = useAppSelector(state => state.user);

    const isManagerReview = path.includes('manager-review') || path.includes(`team's-review`);

    const {
        data: kras,
        isLoading: isKrasLoading,
        isSuccess: isKrasSuccess
    } = useGetKrasQuery({
        path: '',
        params: [{ name: 'organisationId', value: userDetails.organisationId }]
    });

    const handleAccordionToggle = (indexToToggle: number) => {
        setActiveIndex(prev => (prev === indexToToggle ? -1 : indexToToggle));
    };

    const headings = useMemo(
        () =>
            isManagerReview
                ? ['Performance Metrics & Ratings', 'Value', 'Self', 'Manager', 'Action']
                : ['Performance Metrics & Ratings', 'Value', 'Self', 'Manager 1', 'Manager 2', 'Check-in', 'Action'],
        [isManagerReview]
    );

    function transformReviewData(reviewData: ReviewDataRatingsType) {
        const kraRecords: Record<string, any[]> = {};
        const arrays: (keyof ReviewDataRatingsType)[] = [
            'selfReviewData',
            'firstManagerData',
            'secondManagerData',
            'checkInWithManagerData'
        ];

        const allKpis = new Set<string>();

        arrays.forEach(arrayName => {
            const data = reviewData[arrayName];
            if (data) {
                data.forEach((item: ReviewDataType) => {
                    allKpis.add(item.kpiTitle);
                });
            }
        });

        allKpis.forEach((kpiTitle: string) => {
            const selfReview = reviewData.selfReviewData?.find(item => item.kpiTitle === kpiTitle);
            const firstManager = reviewData.firstManagerData?.find(item => item.kpiTitle === kpiTitle);
            const secondManager = reviewData.secondManagerData?.find(item => item.kpiTitle === kpiTitle);
            const checkIn = reviewData.checkInWithManagerData?.find(item => item.kpiTitle === kpiTitle);

            const kraName = selfReview?.kraName || firstManager?.kraName || secondManager?.kraName || checkIn?.kraName || 'Unknown';

            const kraId = selfReview?.kraId || firstManager?.kraId || secondManager?.kraId || checkIn?.kraId || '';

            const kpiObject: KpiObject = {
                name: kpiTitle,
                value: 5,
                self: selfReview?.rating || '-',
                manager1: firstManager?.rating || '-',
                manager2: secondManager?.rating || '-',
                checkIn: checkIn?.rating || '-',
                isKra: false,
                kraId
            };

            if (!kraRecords[kraName]) {
                kraRecords[kraName] = [];
            }

            kraRecords[kraName].push(kpiObject);
        });

        return kraRecords;
    }

    const order = kras?.map((kra: KraType) => kra.name);
    const transformedData = SortRecords(transformReviewData(reviewDataRatings), order);

    const pathsToCheck = [`team's-check-in`, 'manager-check-in', '/reports/performance-review', '/both-managers'];
    const hasPath = pathsToCheck.some(pathToCheck => path.includes(pathToCheck));

    const ColsIndexToShow = useMemo(() => {
        if (path.includes('/both-managers')) {
            return 4;
        }
        if (!path.includes('review-summary')) {
            return headings.length;
        }
        if (path.includes('self-review')) {
            return 2;
        } else if (path.includes(`team's-review`) || path.includes('manager-review')) {
            return 4;
        }
        return headings.length;
    }, [headings.length, path]);

    const managerKey = useMemo(() => {
        if (path.includes(`team's-review`) && employeeDetails) {
            const newManagerKey = employeeDetails.firstManagerEmployeeId == userDetails.employeeId ? 'manager1' : 'manager2';
            return newManagerKey;
        }
        return 'manager1'; // default value
    }, [path, employeeDetails, userDetails]);

    const reRouteTo = useCallback(
        (kpiTitle: string) => {
            let state = {
                kpiTitle,
                reviewCycle: data.reviewCycle,
                startDate: data.startDate,
                endDate: data.endDate,
                reviewCycleId: data.reviewCycleId,
                action: 'View'
            };

            if (path.includes('/both-managers')) {
                if (
                    latestManagerData &&
                    latestManagerData.reviewCycle &&
                    latestManagerData.startDate &&
                    latestManagerData.endDate &&
                    latestManagerData.reviewCycleId
                ) {
                    state = {
                        kpiTitle,
                        reviewCycle: latestManagerData.reviewCycle,
                        startDate: latestManagerData.startDate,
                        endDate: latestManagerData.endDate,
                        reviewCycleId: latestManagerData.reviewCycleId,
                        action: 'View'
                    };
                }
            }

            const formatDateRange = (start: Date | number, end: Date | number) =>
                `${format(new Date(start), 'do MMM yyyy')} - ${format(new Date(end), 'do MMM yyyy')}`;

            if (path.includes('review-summary')) {
                if (path.includes('self-review')) {
                    navigate(`${routeConstants.selfReview}/${formatDateRange(data.startDate, data.endDate)}`, {
                        state
                    });
                } else if (path.includes(`team's-review`) || path.includes('manager-review')) {
                    const route = path.includes(`team's-review`) ? routeConstants.managerReview : routeConstants.myManagerReview;
                    navigate(`${route}/${formatDateRange(data.startDate, data.endDate)}`, {
                        state: {
                            ...state,
                            reviewToEmployeeId: data.reviewToEmployeeId,
                            reviewToId: data.reviewToId,
                            reviewFromId: data.reviewFromId,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            managerFirstName: data.managerFirstName,
                            managerLastName: data.managerLastName,
                            reviewFromEmployeeId: data.reviewFromEmployeeId
                        }
                    });
                } else if (path.includes(`manager-check-in`)) {
                    navigate(`${routeConstants.myCheckInWithManager}/1/${formatDateRange(data.startDate, data.endDate)}`, {
                        state: { ...state, ...data }
                    });
                } else if (path.includes(`/both-managers`) && latestManagerData?.startDate && latestManagerData?.endDate) {
                    navigate(`${routeConstants.myManagerReview}/${formatDateRange(state.startDate, state.endDate)}`, {
                        state: {
                            ...state,
                            reviewToEmployeeId: latestManagerData.reviewToEmployeeId,
                            reviewToId: latestManagerData.reviewToId,
                            reviewFromId: latestManagerData.reviewFromId,
                            firstName: latestManagerData.firstName,
                            lastName: latestManagerData.lastName,
                            managerFirstName: latestManagerData.managerFirstName,
                            managerLastName: latestManagerData.managerLastName,
                            reviewFromEmployeeId: latestManagerData.reviewFromEmployeeId
                        }
                    });
                } else {
                    navigate(`${routeConstants.checkInWithTeamMember}/1/${formatDateRange(data.startDate, data.endDate)}`, {
                        state: { ...state, ...data }
                    });
                }
            } else if (path.includes('add-goals')) {
                navigate(`${routeConstants.checkInWithTeamMember}/1/${formatDateRange(data.startDate, data.endDate)}`, {
                    state: { ...state, ...data, action: 'Edit' }
                });
            }
        },
        [data, navigate, path, latestManagerData]
    );

    return {
        isKrasLoading,
        headings,
        activeIndex,
        setActiveIndex,
        handleAccordionToggle,
        transformedData,
        hasPath,
        ColsIndexToShow,
        managerKey,
        isManagerReview,
        reRouteTo,
        path
    };
};
