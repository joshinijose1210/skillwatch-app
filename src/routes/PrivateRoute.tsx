import { Header, PageLayout, SideNav } from '@components/layout';
import { routeConstants } from '@constants';
import { useAppSelector } from '@slice';
import { analyticsResetReviewFilter } from '@slice/analyticsFilter';
import { dashboardResetReviewCycleFilter } from '@slice/dashboardFilter';
import { resetCheckInFilters } from '@slice/checkInWithManager';
import { resetFilters } from '@slice/feedbackFilter';
import { updateFilter, resetFilters as resetEmployeeFilters } from '@slice/filter';
import { updateKPIFilter } from '@slice/kpiFilter';
import { resetReceivedFeedbackFilter } from '@slice/receivedFeedback';
import { resetReqFBFilter } from '@slice/reqFeedbackFilter';
import { updateSearch } from '@slice/search';
import { resetSubFeedbackFilter } from '@slice/submittedFeedback';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PrivateRouteProps } from './types';
import ShowError from '@components/reusableComponents/Error';
import { useAutoLoginLogout } from '@common/hooks/useAutoLoginLogout';

const PrivateRoute: FC<PrivateRouteProps> = ({ moduleName }) => {
    const { ActivePage } = useParams();
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const { isLoggedIn, modulePermission } = useAppSelector(state => state.user);
    const filterData = useAppSelector(state => state.filter);
    const feedbackFilterData = useAppSelector(state => state.feedbackFilter);
    const reqFeedback = useAppSelector(state => state.reqFeedbackFilter);
    const analyticReviewCycle = useAppSelector(state => state.analyticsReviewFilter.reviewCycle);
    const dashboardReviewCycle = useAppSelector(state => state.dashboardReviewFilter.reviewCycle);
    const KpiFilter = useAppSelector(state => state.kpiFilter);
    const searchText = useAppSelector(state => state.search);
    const checkInWithManager = useAppSelector(state => state.checkInWithManager);
    const receivedFeedback = useAppSelector(state => state.receivedFeedback);
    const navigateTo = useNavigate();
    const [loginRoute, setLoginRoute] = useState('/login');
    const validPageNumber = Number(ActivePage);
    useAutoLoginLogout();

    useEffect(() => {
        const module = modulePermission?.find(module => module.moduleName === moduleName);
        const excludedModules = [
            '360-Degree Feedback',
            'Submitted Feedback',
            'Received Feedback',
            'Received Suggestions',
            'Review Timeline',
            'Dashboard',
            'Configuration',
            'Self Review',
            'Performance Guidelines',
            'Manager Review',
            'Check-in with Team Members',
            'Organisations'
        ];

        if (!excludedModules.includes(moduleName || '') && (!module || !module.view)) {
            navigateTo(routeConstants.root, {
                state: {
                    error: true,
                    header: 'Unauthorized Access',
                    message: 'You do not have access to the page, please contact system administrator/HR.'
                }
            });
        }
    }, [moduleName, modulePermission, navigateTo]);
    useEffect(() => {
        if (
            !path.includes(routeConstants.employeeManagement) &&
            !path.includes(routeConstants.kpiManagement) &&
            (filterData.designationName.length > 0 || filterData.roleName.length > 0 || filterData.teamName.length > 0)
        ) {
            dispatch(
                updateFilter({
                    departmentName: [],
                    designationName: [],
                    teamName: [],
                    roleName: []
                })
            );
        }
    }, [dispatch, filterData.designationName.length, filterData.roleName.length, filterData.teamName.length, path]);

    useEffect(() => {
        if (
            !path.includes(routeConstants.employeeFeedback) &&
            !path.includes(`${routeConstants.employeeFeedback}/${ActivePage}/view-feedback`) &&
            feedbackFilterData.dateRange
        ) {
            dispatch(resetFilters());
        }
    }, [ActivePage, dispatch, feedbackFilterData.dateRange, path]);

    useEffect(() => {
        if (!path.includes(KpiFilter.moduleName)) {
            dispatch(
                updateKPIFilter({
                    selectedDepartments: [],
                    selectedTeams: [],
                    selectedDesignations: [],
                    selectedStatus: 'true,false',
                    moduleName: ''
                })
            );
        }
    }, [path, dispatch, KpiFilter.moduleName]);

    useEffect(() => {
        if (!path.includes('Employees')) {
            dispatch(resetEmployeeFilters());
        }
    }, [dispatch, path]);

    // this useeffect resets the state of reqFeedback filter when the user changes the page and filter state has some values
    useEffect(() => {
        if (
            !path.includes(routeConstants.threeSixtyDegreeFeedback) &&
            (reqFeedback.feedbackTo.length > 0 || reqFeedback.reqOrFrom.length > 0 || reqFeedback.status !== 'All')
        ) {
            dispatch(resetReqFBFilter());
        }
    }, [path, dispatch, reqFeedback]);

    useEffect(() => {
        if (!path.includes(searchText.modulePath) && searchText.searchText.length > 0) {
            dispatch(updateSearch({ searchText: '', modulePath: '' }));
        }
    }, [dispatch, path, searchText.modulePath, searchText.searchText]);

    useEffect(() => {
        if (
            !(path.includes('check-in') || path.includes('performance-review')) &&
            (checkInWithManager.employees.length !== 0 ||
                checkInWithManager.filterRatingId !== -1 ||
                checkInWithManager.reviewStatus !== undefined)
        ) {
            dispatch(resetCheckInFilters());
        }
    }, [checkInWithManager, dispatch, path]);

    useEffect(() => {
        if (!path.includes('submitted-feedback')) {
            dispatch(resetSubFeedbackFilter());
        }
    }, [dispatch, path]);

    useEffect(() => {
        if (!path.includes('received-feedback')) {
            dispatch(resetReceivedFeedbackFilter());
        }
    }, [dispatch, path, receivedFeedback]);

    useEffect(() => {
        if (!path.includes(routeConstants.analytics) && analyticReviewCycle) {
            dispatch(analyticsResetReviewFilter());
        }
    }, [dispatch, path, analyticReviewCycle]);

    useEffect(() => {
        if (path !== '/' && dashboardReviewCycle) {
            dispatch(dashboardResetReviewCycleFilter());
        }
    }, [dispatch, path, dashboardReviewCycle]);

    useEffect(() => {
        if (path.includes('/admin')) {
            setLoginRoute('/admin/login');
        }
    }, [path]);

    if (ActivePage && (isNaN(validPageNumber) || validPageNumber <= 0)) {
        return <ShowError />;
    } else {
        return isLoggedIn ? (
            <PageLayout>
                <SideNav />
                <Header />
                <Outlet />
            </PageLayout>
        ) : (
            <Navigate to={loginRoute} />
        );
    }
};
export default PrivateRoute;
