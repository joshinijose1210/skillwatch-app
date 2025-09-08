import { Loader } from '@components';
import { routeConstants } from '@constants';
import {
    BulkImport,
    Configuration,
    Dashboard,
    DeactivateManager,
    DepartmentManagement,
    DesignationManagement,
    EmployeeForm,
    EmployeeManagement,
    FeedbackForm,
    ForgotPassword,
    KpiManagement,
    KraManagement,
    Login,
    OrgAdminSignUp,
    ResetPassword,
    RolesAndPermissions,
    TeamManagement,
    VerificationMail,
    ViewFeedback,
    SuperAdminLogin,
    Settings
} from '@pages';

import { CheckInWithManager } from '@pages/CheckInWithManager';
import { CheckInWithManagerForm } from '@pages/CheckInWithManager/CheckInWithManagerForm';
import EmployeeFeedback from '@pages/EmployeeFeedback/EmployeeFeedback';
import Error500 from '@pages/Error500';
import { KPIForm } from '@pages/KpiManagement/KPIForm';
import { KRAForm } from '@pages/KraManagement/KRAForm';

import MaintenancePage from '@pages/MaintenancePage/MaintenancePage';
import NotFound404 from '@pages/NotFound404';
import { CompanyInfo } from '@pages/OrgAdminSignUp/CompanyInfo';
import { ReviewCycleActionItems } from '@pages/ReviewCycleActionItems';
import { RoleForm } from '@pages/RolesAndPermissions/RoleForm';
import SetPassword from '@pages/SetPassword';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { ExternalFeedbackForm } from '@pages/ExternalFeedbackForm/ExternalFeedbackForm';
import PerformanceGuidelines from '@pages/SelfReview/PerformanceGuidelines';
import MyFeedbackRedirect from '@pages/MyFeedbackRedirect';
import Tutorial from '@pages/Tutorial';

const ReviewCycles = lazy(() => import('@pages/ReviewCycle')),
    ReviewCycleForm = lazy(() => import('@pages/ReviewCycle/ReviewCycleForm')),
    SelfReview = lazy(() => import('@pages/SelfReview')),
    ManagerReview = lazy(() => import('@pages/ManagerReview')),
    ManagerReviewForm = lazy(() => import('@pages/ManagerReview/ManagerReviewForm')),
    MyFeedback = lazy(() => import('@pages/MyFeedback')),
    SelfReviewForm = lazy(() => import('@pages/SelfReview/SelfReviewForm')),
    ReviewTimeline = lazy(() => import('@pages/ReviewTimeline')),
    ViewTeamFeedback = lazy(() => import('@pages/ViewTeamFeedback')),
    ViewPreviousGoals = lazy(() => import('@pages/ViewPreviousGoals')),
    UserActivityLog = lazy(() => import('@pages/UserActivityLog')),
    RequestFeedbackForm = lazy(() => import('@pages/RequestedFeedback/RequestFeedbackForm')),
    RequestedFeedbackForm = lazy(() => import('@pages/RequestedFeedback/RequestedFeedbackForm')),
    RequestedFeedback = lazy(() => import('@pages/RequestedFeedback')),
    ReportsAnalytics = lazy(() => import('@pages/ReportsAnalytics')),
    Integrations = lazy(() => import('@pages/Integrations')),
    RatingsListing = lazy(() => import('@pages/RatingsListing')),
    Suggestions = lazy(() => import('@pages/Suggestions')),
    SuggestionForm = lazy(() => import('@pages/Suggestions/SuggestionForm')),
    Organisations = lazy(() => import('@pages/Organisations'));

export const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route element={<PrivateRoute moduleName="Dashboard" />}>
                    <Route path={routeConstants.root} element={<Dashboard />} />

                    {/* "Temporarily commented out as per requirement, might be added back later" */}

                    {/* <Route path={routeConstants.firstDepartment} element={<FirstDepartment />} />
                    <Route path={routeConstants.firstTeam} element={<FirstTeam />} />
                    <Route path={routeConstants.firstDesignation} element={<FirstDesignation />} />
                    <Route path={routeConstants.firstEmployee} element={<FirstEmployee />} />
                    <Route path={routeConstants.firstRole} element={<FirstRole />} /> */}

                    <Route path={routeConstants.firstRoleRedirectWithActivePage} element={<RolesAndPermissions />} />
                    <Route path={routeConstants.addFirstRole} element={<RoleForm />} />
                    <Route path={routeConstants.editFirstRole} element={<RoleForm />} />
                    <Route path={routeConstants.firstEmployeeRedirectWithActivePage} element={<EmployeeManagement />} />
                    <Route path={routeConstants.firstEmployeeRedirect} element={<EmployeeForm />} />
                    <Route path={routeConstants.firstEmployeeBulkImportRedirect} element={<BulkImport />} />
                    <Route path={routeConstants.viewTeamFeedback} element={<ViewTeamFeedback />} />
                    <Route path={routeConstants.viewTeamFeedbackEmployee} element={<ViewTeamFeedback />} />
                    <Route path={routeConstants.viewTeamFeedbackFromSelfReview} element={<ViewTeamFeedback />} />
                    <Route path={routeConstants.viewTeamFeedbackFromManagerReview} element={<ViewTeamFeedback />} />
                    <Route path={routeConstants.viewTeamFeedbackFromCheckInWithManagerReview} element={<ViewTeamFeedback />} />
                    <Route path={routeConstants.viewTeamFeedbackFromReviewsForTeamMembers} element={<ViewTeamFeedback />} />
                    <Route path={routeConstants.viewTeamFeedbackFromCheckInWithTeamMembers} element={<ViewTeamFeedback />} />
                    <Route path={routeConstants.viewTeamFeedbackFromPerformanceReview} element={<ViewTeamFeedback />} />
                    <Route path={routeConstants.viewPreviousGoals} element={<ViewPreviousGoals />} />
                </Route>

                {/* Commenting sub modules of my feedback for now, might need it in future */}

                {/* <Route element={<PrivateRoute moduleName="Submitted Feedback" />}>
                    <Route path={routeConstants.submittedFeedbackWithActivePage} element={<SubmittedFeedback />} />
                    <Route path={routeConstants.viewSubmittedFeedbackWithActivePage} element={<ViewFeedback />} />
                    <Route path={routeConstants.editSubmittedFeedback} element={<FeedbackForm />} />
                    <Route path={routeConstants.viewAppreciation} element={<ViewFeedback />} />
                    <Route path={routeConstants.newFeedback} element={<FeedbackForm />} />
                    <Route path={routeConstants.newFeedbackFromDashboard} element={<FeedbackForm />} />
                </Route> */}

                <Route element={<PrivateRoute moduleName="Received Feedback" />}>
                    {/* <Route path={routeConstants.receivedFeedbackWithActivePage} element={<ReceivedFeedback />} /> */}
                    {/* <Route path={routeConstants.viewReceivedFeedbackWithActivePage} element={<ViewFeedback />} /> */}
                    {/* <Route path={routeConstants.newFeedback} element={<FeedbackForm />} /> */}
                    <Route path={routeConstants.viewFeedbackFromDashboard} element={<ViewFeedback />} />
                </Route>

                {/* this is now inside 360-Degree Feedback page */}
                <Route element={<PrivateRoute moduleName="360-Degree Feedback" />}>
                    {/* this is only a temporary redirection page */}
                    <Route path={`/my-feedback/:ActivePage`} element={<MyFeedbackRedirect />} />

                    <Route path={routeConstants.myFeedbackWithActivePage} element={<MyFeedback />} />
                    <Route path={routeConstants.viewMyFeedbackWithActivePage} element={<ViewFeedback />} />
                    <Route path={routeConstants.editFeedback} element={<FeedbackForm />} />
                    <Route path={routeConstants.viewAppreciation} element={<ViewFeedback />} />
                    <Route path={routeConstants.addFeedback} element={<FeedbackForm />} />
                    <Route path={routeConstants.newFeedbackFromDashboard} element={<FeedbackForm />} />
                </Route>

                {/* this is now inside 360-Degree Feedback page */}
                <Route element={<PrivateRoute moduleName="360-Degree Feedback" />}>
                    <Route path={routeConstants.requestFeedbackWithActivePage} element={<RequestedFeedback />} />
                    <Route path={routeConstants.AddRequestedFeedback} element={<RequestedFeedbackForm />} />
                    <Route path={routeConstants.viewRequestedFeedback} element={<RequestedFeedbackForm />} />
                    <Route path={routeConstants.editRequestedFeedback} element={<RequestedFeedbackForm />} />
                    <Route path={routeConstants.AddRequestFeedback} element={<RequestFeedbackForm />} />
                    <Route path={routeConstants.viewRequestFeedback} element={<RequestFeedbackForm />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Received Suggestions" />}>
                    <Route path={routeConstants.suggestionBoxWithActivePage} element={<Suggestions />} />
                    <Route path={routeConstants.addSuggestion} element={<SuggestionForm />} />
                    <Route path={routeConstants.editSuggestion} element={<SuggestionForm />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Feedback" />}>
                    <Route path={routeConstants.reportWithActivePage} element={<EmployeeFeedback />} />
                    <Route path={routeConstants.viewFeedback} element={<ViewFeedback />} />
                    <Route path={routeConstants.performanceReviewWithActivePage} element={<CheckInWithManager />} />
                    <Route path={routeConstants.performanceReviewPerformanceGuidelines} element={<PerformanceGuidelines />} />
                    <Route path={routeConstants.performanceReviewWithReviewCycle} element={<CheckInWithManagerForm />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Analytics" />}>
                    <Route path={routeConstants.analytics} element={<ReportsAnalytics />} />
                    <Route path={routeConstants.ratings} element={<RatingsListing />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Teams" />}>
                    <Route path={routeConstants.teamManagementWithActivePage} element={<TeamManagement />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Departments" />}>
                    <Route path={routeConstants.departmentManagementWithActivePage} element={<DepartmentManagement />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Designations" />}>
                    <Route path={routeConstants.designationManagementWithActivePage} element={<DesignationManagement />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Roles & Permissions" />}>
                    <Route path={routeConstants.rolesAndPermissionsWithActivePage} element={<RolesAndPermissions />} />
                    <Route path={routeConstants.addRole} element={<RoleForm />} />
                    <Route path={routeConstants.viewRole} element={<RoleForm />} />
                    <Route path={routeConstants.editRole} element={<RoleForm />} />
                </Route>

                <Route element={<PrivateRoute moduleName="KRAs" />}>
                    <Route path={routeConstants.kraManagementWithActivePage} element={<KraManagement />} />
                    <Route path={routeConstants.editKRA} element={<KRAForm />} />
                </Route>

                <Route element={<PrivateRoute moduleName="KPIs" />}>
                    <Route path={routeConstants.addNewKPI} element={<KPIForm />} />
                    <Route path={routeConstants.editKPI} element={<KPIForm />} />
                    <Route path={routeConstants.viewKPI} element={<KPIForm />} />
                    <Route path={routeConstants.kpiManagementWithActivePage} element={<KpiManagement />} />
                    <Route path={routeConstants.bulkImportKPIs} element={<BulkImport />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Employees" />}>
                    <Route path={routeConstants.employeeManagementWithActivePage} element={<EmployeeManagement />} />
                    <Route path={routeConstants.addNewEmployee} element={<EmployeeForm />} />
                    <Route path={routeConstants.editEmployeeWithId} element={<EmployeeForm />} />
                    <Route path={routeConstants.viewEmployeeWithId} element={<EmployeeForm />} />
                    <Route path={routeConstants.bulkImportEmployee} element={<BulkImport />} />
                    <Route path={routeConstants.deactivateManager} element={<DeactivateManager />} />
                    <Route path={routeConstants.managerRoleChange} element={<DeactivateManager />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Review Cycles" />}>
                    <Route path={routeConstants.reviewCycleConfiguration} element={<ReviewCycles />} />
                    <Route path={routeConstants.addReviewCycle} element={<ReviewCycleForm />} />
                    <Route path={routeConstants.editReviewCycle} element={<ReviewCycleForm />} />
                    <Route path={routeConstants.viewReviewCycle} element={<ReviewCycleForm />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Review Timeline" />}>
                    <Route path={routeConstants.reviewTimeline} element={<ReviewTimeline />} />
                    <Route path={routeConstants.performanceReviewBothManagersOnly} element={<ReviewCycleActionItems />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Self Review" />}>
                    <Route path={routeConstants.selfReview} element={<SelfReview />} />
                    <Route path={routeConstants.selfReviewPerformanceGuidelines} element={<PerformanceGuidelines />} />
                    <Route path={routeConstants.selfReviewFromDashboard} element={<SelfReview />} />
                    <Route path={routeConstants.selfReviewWithReviewCycle} element={<SelfReviewForm />} />
                    <Route path={routeConstants.viewFeedback} element={<ViewFeedback />} />
                    <Route path={routeConstants.selfReviewCycleReviewSummary} element={<ReviewCycleActionItems />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Manager Review" />}>
                    <Route path={routeConstants.managerReview} element={<ManagerReview />} />
                    <Route path={routeConstants.myManagerReview} element={<ManagerReview />} />
                    <Route path={routeConstants.managerReviewPerformanceGuidelines} element={<PerformanceGuidelines />} />
                    <Route path={routeConstants.managerReviewWithReviewCycle} element={<ManagerReviewForm />} />
                    <Route path={routeConstants.myManagerReviewPerformanceGuidelines} element={<PerformanceGuidelines />} />
                    <Route path={routeConstants.myManagerReviewWithReviewCycle} element={<ManagerReviewForm />} />
                    <Route path={routeConstants.managerReviewCycleReviewSummary} element={<ReviewCycleActionItems />} />
                    <Route path={routeConstants.myManagerReviewCycleReviewSummary} element={<ReviewCycleActionItems />} />
                    <Route path={routeConstants.viewPreviousGoals} element={<ViewPreviousGoals />} />
                </Route>

                <Route element={<PrivateRoute moduleName="User Activity Log" />}>
                    <Route path={routeConstants.userActivityLog} element={<UserActivityLog />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Check-in with Team Members" />}>
                    <Route path={routeConstants.myCheckInWithManagerWithActivePage} element={<CheckInWithManager />} />
                    <Route path={routeConstants.myCheckInWithManagerWithReviewCycle} element={<CheckInWithManagerForm />} />
                    <Route path={routeConstants.checkInWithTeamMemberWithActivePage} element={<CheckInWithManager />} />
                    <Route path={routeConstants.checkInWithTeamMemberReviewCycle} element={<CheckInWithManagerForm />} />
                    <Route path={routeConstants.checkInWithTeamMemberPerformanceGuidelines} element={<PerformanceGuidelines />} />
                    <Route path={routeConstants.managerReviewCycleActionItems} element={<ReviewCycleActionItems />} />
                    <Route path={routeConstants.checkInReviewCycleReviewSummary} element={<ReviewCycleActionItems />} />
                    <Route path={routeConstants.myCheckInReviewCycleReviewSummary} element={<ReviewCycleActionItems />} />
                    <Route path={routeConstants.performanceReviewReviewSummary} element={<ReviewCycleActionItems />} />
                    <Route path={routeConstants.hrReviewCycleActionItems} element={<ReviewCycleActionItems />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Company Information" />}>
                    <Route path={routeConstants.companyInformation} element={<Configuration />} />
                </Route>
                <Route element={<PrivateRoute moduleName="Settings" />}>
                    <Route path={routeConstants.settings} element={<Settings />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Integrations" />}>
                    <Route path={routeConstants.integrations} element={<Integrations />} />
                </Route>

                <Route element={<PrivateRoute moduleName="Organisations" />}>
                    <Route path={routeConstants.superAdminRoot} element={<Organisations />} />
                </Route>

                <Route path="*" element={<NotFound404 />} />

                <Route path={routeConstants.error500} element={<Error500 />} />
                <Route path={routeConstants.error502} element={<MaintenancePage />} />
                <Route path={routeConstants.externalFeedbackForm} element={<ExternalFeedbackForm />} />
                {/* <Route element={<PrivateRouteWithoutLayout />}>
                    <Route path={routeConstants.details} element={<LoginForm />} />
                </Route> */}

                <Route element={<PrivateRoute moduleName="Tutorial Videos" />}>
                    <Route path={routeConstants.tutorial} element={<Tutorial />} />
                </Route>

                <Route element={<PublicRoute />}>
                    <Route path={routeConstants.superAdminLogin} element={<SuperAdminLogin />} />
                    <Route path={routeConstants.login} element={<Login />} />
                    <Route path={routeConstants.resetPassword} element={<ResetPassword />} />
                    <Route path={routeConstants.resetPasswordWithId} element={<ResetPassword />} />
                    <Route path={routeConstants.orgAdminSignUp} element={<OrgAdminSignUp />} />
                    <Route path={routeConstants.companyInfoPage} element={<CompanyInfo />} />
                    <Route path={routeConstants.orgAdminVerification} element={<VerificationMail />} />
                    <Route path={routeConstants.resetPasswordVerification} element={<VerificationMail />} />
                    <Route path={routeConstants.setPassword} element={<SetPassword />} />
                    <Route path={routeConstants.forgotPassword} element={<ForgotPassword />} />
                </Route>
            </Routes>
        </Suspense>
    );
};
