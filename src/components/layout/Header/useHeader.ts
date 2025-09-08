import { routeConstants } from '@constants';
import { Option } from '@medly-components/core/dist/es/components/MultiSelect/types';
import { useAppSelector } from '@slice';
import { updateReviewCycleFilter } from '@slice/reviewCycleFilter';
import { dashboardFilter } from '@slice/dashboardFilter';
import { analyticsFilter } from '@slice/analyticsFilter';
import { useGetDesignationsQuery, useGetReviewCycleDataMutation, useGetTimelineMutation } from '@slice/services';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ReviewCycle } from './types';
import { reviewStatusConstants } from '@constants/reviewStatusConstants';

export const useHeader = () => {
    const dispatch = useDispatch();
    const { ActivePage } = useParams();
    const { reviewCycleList } = useAppSelector(state => state.reviewCycleFilter);
    const analyticsReviewCycle = useAppSelector(state => state.analyticsReviewFilter.reviewCycle);
    const dashboardReviewCycle = useAppSelector(state => state.dashboardReviewFilter.reviewCycle);
    const path = useLocation().pathname;
    const [toastMsg, setToastMsg] = useState('');
    const [toastVisible, setToastVisible] = useState(false);

    const [showCycleFilter, setShowCycleFilter] = useState(true);
    const [isSingleReviewCycle, setIsSingleReviewCycle] = useState(false);
    const [selectedReviewCycle, setSelectedReviewCycle] = useState(0);
    const userDetails = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const [filterOptions, setFilterOptions] = useState<Option[]>([]);
    const [getTimeline, { data }] = useGetTimelineMutation();
    const [getReviewCycleData, { data: reviewCyclesData, isSuccess: reviewCyclesLoaded }] = useGetReviewCycleDataMutation();
    const handleToast = (e: any) => {
        if (e.target.id === 'child-element') {
            setToastMsg('');
        } else if (path === '/') {
            toastMsg === reviewStatusConstants.SelfReviewPending
                ? navigate(routeConstants.selfReview)
                : toastMsg === 'Manager review pending'
                ? navigate(routeConstants.managerReview)
                : toastMsg === reviewStatusConstants.CheckInWithManagerPending
                ? navigate(`${routeConstants.myCheckInWithManager}/${1}`)
                : navigate(`${routeConstants.checkInWithTeamMember}/${1}`);
        }
    };

    const { data: designationsData } = useGetDesignationsQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'page', value: 99 },
                { name: 'limit', value: 10 },
                { name: 'searchText', value: '' }
            ]
        },
        { refetchOnMountOrArgChange: true, skip: path !== '/designations' }
    );

    const handleDropdownChange = useCallback(
        (value: any) => {
            const updatedPath = path.replace(/\/\d+$/, '/1');
            let selectedValues = value;
            if (path === '/' || path === '/reports/analytics') {
                selectedValues = [value];
                setSelectedReviewCycle(value);
                if (path === '/') {
                    dispatch(dashboardFilter(String(value)));
                } else {
                    dispatch(analyticsFilter(String(value)));
                }
            } else {
                if (selectedValues.length === 0) {
                    dispatch(updateReviewCycleFilter({ reviewCycleList: [-99] }));
                } else {
                    dispatch(updateReviewCycleFilter({ reviewCycleList: selectedValues }));
                }
            }
            navigate(updatedPath);
        },
        [dispatch, navigate, path]
    );

    useEffect(() => {
        if (reviewCyclesData && reviewCyclesLoaded) {
            let activeReviewCycle = -99;
            const list: Option[] =
                reviewCyclesData?.reviewCycles?.map((cycle: ReviewCycle) => {
                    if (cycle.publish) {
                        activeReviewCycle = cycle.reviewCycleId;
                    }
                    return {
                        value: cycle.reviewCycleId,
                        label: `${format(new Date(cycle.startDate), 'do MMM yyyy')} - ${format(new Date(cycle.endDate), 'do MMM yyyy')}`
                    };
                }) ?? [];
            setFilterOptions(list);
            if (path === '/') {
                setSelectedReviewCycle(Number(dashboardReviewCycle));
                if (!dashboardReviewCycle) {
                    dispatch(dashboardFilter(String(activeReviewCycle)));
                }
            }
            if (path === '/reports/analytics') {
                setSelectedReviewCycle(Number(analyticsReviewCycle));
                if (!analyticsReviewCycle) {
                    dispatch(analyticsFilter(String(activeReviewCycle)));
                }
            }
            if (reviewCycleList.length === 0) {
                dispatch(updateReviewCycleFilter({ reviewCycleList: [activeReviewCycle] }));
            }
        }
    }, [dispatch, reviewCyclesData, reviewCycleList, reviewCyclesLoaded]);

    useEffect(() => {
        if (path === '/' && data?.[0] && Object.keys(data[0]).length) {
            const [{ empDetails }] = data;
            if (
                new Date(data[0].selfReviewStartDate) < new Date() &&
                new Date(data[0].selfReviewEndDate + 86400000) > new Date() &&
                !data[0].selfReviewPublish
            ) {
                setToastMsg('Self Review pending');
            } else if (
                new Date(data[0].managerReviewStartDate) < new Date() &&
                new Date(data[0].managerReviewEndDate + 86400000) > new Date() &&
                data[0].empDetails &&
                data[0].empDetails.length > 0
            ) {
                let showMsg = false;
                for (let i = 0; i < empDetails.length; i++) {
                    let publish = false;
                    if (Number(userDetails.id) === empDetails[i].firstManagerId && !empDetails[i].firstManagerReviewPublish) {
                        publish = empDetails[i].firstManagerReviewPublish;
                    } else if (Number(userDetails.id) === empDetails[i].secondManagerId && !empDetails[i].secondManagerReviewPublish) {
                        publish = empDetails[i].secondManagerReviewPublish;
                    } else {
                        publish = true;
                    }
                    if (!publish) {
                        showMsg = true;
                        break;
                    }
                }

                showMsg && setToastMsg('Manager review pending');
            } else if (
                new Date(data[0].checkInWithManagerStartDate) < new Date() &&
                new Date(data[0].checkInWithManagerEndDate + 86400000) > new Date()
            ) {
                let msg = 'Check-in with Manager pending',
                    flag = false;
                if (data[0].empDetails && data[0].empDetails.length > 0) {
                    for (let i = 0; i < empDetails.length; i++) {
                        if (!empDetails[i].checkInWithManagerPublish) {
                            msg = 'Check-in with Team Members is pending';
                            flag = true;
                            break;
                        }
                    }
                }
                if (!flag && data[0].checkInWithManagerPublish) {
                    msg = '';
                }
                setToastMsg(msg);
            }
        } else if (path === '/designations' && designationsData && designationsData.unlinkedDesignationsCount !== 0) {
            setToastMsg('Please add teams to the existing designations');
        } else {
            setToastMsg('');
        }
    }, [userDetails.id, data, path, designationsData]);

    useEffect(() => {
        if (path === '/') {
            getTimeline({
                path: '',
                params: [
                    { name: 'organisationId', value: userDetails.organisationId },
                    { name: 'reviewToId', value: userDetails.id }
                ]
            });
        }
    }, [path, getTimeline, userDetails.organisationId, userDetails.id]);

    useEffect(() => {
        if (toastMsg.length !== 0) {
            setToastVisible(true);
        }
    }, [path, toastMsg.length]);

    useEffect(() => {
        const clickOutSideDropdown = document.getElementById('click-outside-dropdown');
        setIsSingleReviewCycle(false);
        if (
            path === '/' ||
            path === '/reports/analytics' ||
            path === `${routeConstants.threeSixtyDegreeFeedback}/submitted-feedback/${ActivePage}` ||
            path === `${routeConstants.threeSixtyDegreeFeedback}/received-feedback/${ActivePage}` ||
            path === `/request-Feedback/${ActivePage}` ||
            path === `/reports/feedback/${ActivePage}` ||
            path === `/reports/performance-review/${ActivePage}` ||
            path === `/performance-review/self-review` ||
            path === `/performance-review/team's-review` ||
            path === '/performance-review/manager-review' ||
            path === `/performance-review/manager-check-in/${ActivePage}` ||
            path === `/performance-review/team's-check-in/${ActivePage}` ||
            path === `/suggestions/${ActivePage}` ||
            path === `${routeConstants.threeSixtyDegreeFeedback}/${ActivePage}`
        ) {
            getReviewCycleData({
                path: 'getAll',
                params: [{ name: 'organisationId', value: userDetails.organisationId }]
            });
            clickOutSideDropdown?.click();
            if (path === '/' || path === '/reports/analytics') {
                setIsSingleReviewCycle(true);
            } else {
                setShowCycleFilter(true);
            }
        } else {
            setShowCycleFilter(false);
        }
    }, [ActivePage, getReviewCycleData, path, reviewCycleList, userDetails.organisationId]);

    return {
        path,
        toastMsg,
        data,
        handleToast,
        toastVisible,
        reviewCycleList,
        handleDropdownChange,
        filterOptions,
        showCycleFilter,
        isSingleReviewCycle,
        selectedReviewCycle
    };
};
