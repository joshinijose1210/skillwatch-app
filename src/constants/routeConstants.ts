const enum routeConstants {
    login = '/login',
    details = '/details',

    //feedback
    threeSixtyDegreeFeedback = '/360-degree-feedback',

    myFeedback = `${routeConstants.threeSixtyDegreeFeedback}`,
    //TODO : Need to change ActivePage to camel case
    myFeedbackWithActivePage = `${routeConstants.threeSixtyDegreeFeedback}/:ActivePage`,
    addFeedback = `${routeConstants.threeSixtyDegreeFeedback}/:ActivePage/add-feedback`,
    editFeedback = `${routeConstants.threeSixtyDegreeFeedback}/:ActivePage/edit-feedback`,
    viewMyFeedbackWithActivePage = `${routeConstants.threeSixtyDegreeFeedback}/:ActivePage/view-feedback`,

    receivedFeedback = `${routeConstants.threeSixtyDegreeFeedback}/received-feedback`,
    receivedFeedbackWithActivePage = `${routeConstants.threeSixtyDegreeFeedback}/received-feedback/:ActivePage`,
    submittedFeedback = `${routeConstants.threeSixtyDegreeFeedback}/submitted-feedback`,
    submittedFeedbackWithActivePage = `${routeConstants.threeSixtyDegreeFeedback}/submitted-feedback/:ActivePage`,
    newFeedback = `${routeConstants.threeSixtyDegreeFeedback}/submitted-feedback/:ActivePage/add-feedback`,
    newFeedbackFromDashboard = '/dashboard/add-feedback',
    viewFeedbackFromDashboard = '/dashboard/view-feedback',
    viewSubmittedFeedbackWithActivePage = `${routeConstants.threeSixtyDegreeFeedback}/submitted-feedback/:ActivePage/view-feedback`,
    editSubmittedFeedback = `${routeConstants.threeSixtyDegreeFeedback}/submitted-feedback/:ActivePage/edit-feedback`,
    viewReceivedFeedback = `${routeConstants.threeSixtyDegreeFeedback}/received-feedback/view-feedback`,
    viewReceivedFeedbackWithActivePage = `${routeConstants.threeSixtyDegreeFeedback}/received-feedback/:ActivePage/view-feedback`,
    viewTeamFeedback = '/performance-review/view-team-feedback',
    viewTeamFeedbackEmployee = '/performance-review/view-team-feedback:employee',
    viewAppreciation = 'dashboard/view-appreciation',

    //request feedback

    requestFeedback = '/request-Feedback',
    requestFeedbackWithActivePage = 'request-Feedback/:ActivePage',
    AddRequestedFeedback = `${routeConstants.threeSixtyDegreeFeedback}/request-Feedback/:ActivePage/Add-Requested-Feedback`,
    editRequestedFeedback = `${routeConstants.threeSixtyDegreeFeedback}/request-Feedback/:ActivePage/Edit-Requested-Feedback`,
    viewRequestedFeedback = `${routeConstants.threeSixtyDegreeFeedback}/request-Feedback/:ActivePage/View-Submitted-Feedback`,
    AddRequestFeedback = `${routeConstants.threeSixtyDegreeFeedback}/request-Feedback/:ActivePage/Request`,
    viewRequestFeedback = `${routeConstants.threeSixtyDegreeFeedback}/request-Feedback/:ActivePage/View-Requested-Feedback`,

    //team, role and designation
    teamManagement = '/teams',
    teamManagementWithActivePage = '/teams/:ActivePage',
    rolesAndPermissions = '/roles-&-permissions',
    rolesAndPermissionsWithActivePage = '/roles-&-permissions/:ActivePage',
    addRole = '/roles-&-permissions/:ActivePage/add-role-&-permissions',
    viewRole = '/roles-&-permissions/:ActivePage/view-role-&-permissions',
    editRole = '/roles-&-permissions/:ActivePage/edit-role-&-permissions',
    designationManagement = '/designations',
    designationManagementWithActivePage = '/designations/:ActivePage',
    departmentManagement = '/departments',
    departmentManagementWithActivePage = '/departments/:ActivePage',

    //employees
    employeeManagement = '/employees',
    employeeManagementWithActivePage = '/employees/:ActivePage',
    addNewEmployee = '/employees/:ActivePage/add-employee',
    editEmployee = '/employees/edit-employee',
    viewEmployee = '/employees/view-employee',
    editEmployeeWithId = '/employees/:ActivePage/edit-employee/:id',
    viewEmployeeWithId = '/employees/:ActivePage/view-employee/:id',
    bulkImportEmployee = '/employees/:ActivePage/bulk-import',
    deactivateManager = '/employees/:ActivePage/edit-employee/:id/deactivate-manager',
    managerRoleChange = '/employees/:ActivePage/edit-employee/:id/change-role',

    //kpi
    kpiManagement = '/KPIs',
    kpiManagementWithActivePage = '/KPIs/:ActivePage',
    addNewKPI = '/KPIs/:ActivePage/add-KPI',
    editKPI = '/KPIs/:ActivePage/edit-KPI',
    viewKPI = '/KPIs/:ActivePage/view-KPI',
    bulkImportKPIs = '/KPIs/:ActivePage/bulk-import',

    //kra
    kraManagement = '/KRAs',
    kraManagementWithActivePage = '/KRAs/:ActivePage',
    editKRA = '/KRAs/:ActivePage/edit-KRA',

    //reports
    report = '/reports',
    employeeFeedback = '/reports/feedback',
    reportWithActivePage = '/reports/feedback/:ActivePage',
    viewFeedback = '/reports/feedback/:ActivePage/view-feedback',
    performanceReview = '/reports/performance-review',
    performanceReviewWithActivePage = '/reports/performance-review/:ActivePage',
    performanceReviewPerformanceGuidelines = '/reports/performance-review/performance-guidelines',
    performanceReviewReviewSummary = '/reports/performance-review/:reviewCycle/review-summary',
    performanceReviewWithReviewCycle = '/reports/performance-review/:ActivePage/:reviewCycle',
    analytics = '/reports/analytics',
    ratings = '/reports/analytics/Ratings',

    //reviewCycle
    reviewTimeline = '/performance-review/review-timeline',
    reviewCycleConfiguration = '/performance-review/review-cycles',
    addReviewCycle = '/performance-review/review-cycles/add-review-cycle',
    editReviewCycle = '/performance-review/review-cycles/edit-review-cycle',
    viewReviewCycle = '/performance-review/review-cycles/view-review-cycle',

    // user activity log
    userActivityLog = '/user-activity-log',

    //selfReview
    selfReview = '/performance-review/self-review',
    selfReviewFromDashboard = '/dashboard/self-reviews',
    selfReviewPerformanceGuidelines = '/performance-review/self-review/performance-guidelines',
    managerReviewPerformanceGuidelines = `/performance-review/team's-review/performance-guidelines`,
    selfReviewWithReviewCycle = '/performance-review/self-review/:reviewCycle',
    viewTeamFeedbackFromSelfReview = '/performance-review/self-review/:reviewCycle/:view-team-feedback:employee',
    viewTeamFeedbackFromManagerReview = '/performance-review/manager-review/:reviewCycle/:view-team-feedback:employee',
    viewTeamFeedbackFromCheckInWithManagerReview = '/performance-review/manager-check-in/:reviewCycle/:view-team-feedback:employee',
    viewTeamFeedbackFromReviewsForTeamMembers = `/performance-review/team's-review/:reviewCycle/:view-team-feedback:employee`,
    viewTeamFeedbackFromCheckInWithTeamMembers = `/performance-review/team's-check-in/:ActivePage/:reviewCycle/:view-team-feedback:employee`,
    viewTeamFeedbackFromPerformanceReview = '/reports/performance-review/:ActivePage/:reviewCycle/:view-team-feedback:employee',
    //managerReview
    managerReview = `/performance-review/team's-review`,
    myManagerReview = '/performance-review/manager-review',
    myManagerReviewPerformanceGuidelines = '/performance-review/manager-review/performance-guidelines',
    myManagerReviewWithReviewCycle = '/performance-review/manager-review/:reviewCycle',
    managerReviewWithReviewCycle = `/performance-review/team's-review/:reviewCycle`,

    //check-in
    myCheckInWithManager = '/performance-review/manager-check-in',
    myCheckInWithManagerWithActivePage = '/performance-review/manager-check-in/:ActivePage',
    myCheckInWithManagerWithReviewCycle = '/performance-review/manager-check-in/:ActivePage/:reviewCycle',
    checkInWithTeamMember = `/performance-review/team's-check-in`,
    performanceReviewBothManagersOnly = '/performance-review/both-managers/:reviewCycle/review-summary',
    checkInWithTeamMemberPerformanceGuidelines = `/performance-review/team's-check-in/performance-guidelines`,

    checkInWithTeamMemberWithActivePage = `/performance-review/team's-check-in/:ActivePage`,
    checkInWithTeamMemberReviewCycle = `/performance-review/team's-check-in/:ActivePage/:reviewCycle`,

    //previous goals
    viewPreviousGoals = `/performance-review/team's-check-in/:ActivePage/:reviewCycle/view-previous-goals:employee`,

    // review summary screens
    selfReviewCycleReviewSummary = `/performance-review/self-review/:reviewCycle/review-summary`,
    managerReviewCycleReviewSummary = `/performance-review/team's-review/:reviewCycle/review-summary`,
    checkInReviewCycleReviewSummary = `/performance-review/team's-check-in/:reviewCycle/review-summary`,
    myManagerReviewCycleReviewSummary = '/performance-review/manager-review/:reviewCycle/review-summary',
    bothManagerReviewCycleReviewSummary = `/performance-review/both-manager-review/:reviewCycle/review-summary`,
    myCheckInReviewCycleReviewSummary = `/performance-review/manager-check-in/:ActivePage/:reviewCycle/review-summary`,

    managerReviewCycleActionItems = `/performance-review/team's-check-in/:reviewCycle/add-goals`,
    hrReviewCycleActionItems = '/performance-review/employee-reviews/:reviewCycle/add-goals',

    resetPassword = '/login/reset-password',
    resetPasswordWithId = '/login/reset-password?id=',
    resetPasswordVerification = '/login/reset-password/verification',
    setPassword = '/signup/set-password',
    forgotPassword = '/login/forgot-password',

    error500 = '/500',
    error502 = '/502',
    tags = '/feedback-type/',
    root = '/',
    superAdminRoot = '/admin',

    // editRole = '/roles-&-permissions/:ActivePage/edit-role-&-permissions',
    // Org admin
    orgAdminSignUp = '/sign-up/org-admin',
    companyInfoPage = '/sign-up/org-admin/company-info',
    orgAdminVerification = '/sign-up/org-admin/verification',
    setOrgAdminPassword = '/login/set-password',
    firstDepartment = '/set-up-department',
    firstTeam = '/set-up-team',
    firstDesignation = '/set-up-designation',
    firstRole = '/set-up-role',
    firstRoleRedirect = '/set-up-roles-&-permissions',
    firstRoleRedirectWithActivePage = '/set-up-roles-&-permissions/:ActivePage',
    addFirstRole = '/set-up-roles-&-permissions/:ActivePage/add-role-&-permissions',
    editFirstRole = '/set-up-roles-&-permissions/:ActivePage/edit-role-&-permissions',
    firstRoleFormRedirect = '/set-up-add-role-&-permissions',
    firstEmployee = '/set-up-employee',
    firstEmployeeRedirect = '/set-up-add-employee',
    firstEmployeeRedirectWithActivePage = '/set-up-add-employee/:ActivePage',
    firstEmployeeBulkImportRedirect = '/set-up-bulk-import',

    // Configuration
    configuration = '/configuration',
    companyInformation = '/configuration/company',
    settings = '/configuration/settings',
    integrations = '/configuration/integrations',

    // Suggestion
    suggestionBox = '/suggestions',
    suggestionBoxWithActivePage = '/suggestions/:ActivePage',
    addSuggestion = '/suggestions/:ActivePage/add-suggestion',
    editSuggestion = '/suggestions/:ActivePage/edit-suggestion',

    // External feedback form
    externalFeedbackForm = '/submit-feedback',

    // SuperAdmin
    superAdminLogin = '/admin/login',
    superAdminOrganisations = '/admin/organisations',

    // Tutorial
    helpAndTraining = '/help-and-training',
    tutorial = `${helpAndTraining}/tutorial-videos`
}

export default routeConstants;
