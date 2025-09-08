export const SettingsMockData = {
    initialState: {
        id: 72,
        organisationId: 1,
        firstName: 'ABC',
        lastName: 'DEF',
        email: 'abc@paruluniversity.ac.in',
        phoneNumber: '+917060753645',
        employeeId: 'SR0022',
        roleName: 'Org Admin',
        teamName: 'BA',
        modulePermission: [
            {
                moduleId: 16,
                moduleName: 'Request Feedback',
                view: true,
                edit: true
            },
            {
                moduleId: 3,
                moduleName: 'Feedback',
                view: true,
                edit: true
            },
            {
                moduleId: 10,
                moduleName: 'Performance Review',
                view: true,
                edit: true
            },
            {
                moduleId: 18,
                moduleName: 'Analytics',
                view: true,
                edit: true
            },
            {
                moduleId: 20,
                moduleName: 'Departments',
                view: true,
                edit: true
            },
            {
                moduleId: 4,
                moduleName: 'Teams',
                view: true,
                edit: true
            },
            {
                moduleId: 5,
                moduleName: 'Designations',
                view: true,
                edit: true
            },
            {
                moduleId: 6,
                moduleName: 'Roles & Permissions',
                view: true,
                edit: true
            },
            {
                moduleId: 7,
                moduleName: 'Employees',
                view: true,
                edit: true
            },
            {
                moduleId: 8,
                moduleName: 'KPIs',
                view: true,
                edit: true
            },
            {
                moduleId: 12,
                moduleName: 'Reviews for Team Members',
                view: true,
                edit: true
            },
            {
                moduleId: 13,
                moduleName: 'Check-in with Team Members',
                view: true,
                edit: true
            },
            {
                moduleId: 9,
                moduleName: 'Review Cycles',
                view: true,
                edit: true
            },
            {
                moduleId: 15,
                moduleName: 'Company Information',
                view: true,
                edit: true
            },
            {
                moduleId: 17,
                moduleName: 'Allowed Domains',
                view: true,
                edit: true
            },
            {
                moduleId: 19,
                moduleName: 'Integrations',
                view: true,
                edit: true
            },
            {
                moduleId: 14,
                moduleName: 'User Activity Log',
                view: true,
                edit: true
            },
            {
                moduleId: 2,
                moduleName: 'Settings',
                view: true,
                edit: true
            }
        ],
        designationName: 'BA - Traineee',
        isLoggedIn: true,
        onboardingFlow: true
    },
    domains: [
        {
            id: 342,
            organisationId: 1,
            name: '@test.com',
            isDomainUsed: true
        },
        {
            id: 343,
            organisationId: 1,
            name: '@gmail.com',
            isDomainUsed: false
        },
        {
            id: 344,
            organisationId: 1,
            name: '@scalereal.com',
            isDomainUsed: false
        }
    ],
    organisationData: {
        organisationId: 1,
        isManagerReviewMandatory: false,
        isAnonymousSuggestionAllowed: false,
        isBiWeeklyFeedbackReminderEnabled: true
    },
    timelineData: [
        {
            organisationId: 1,
            reviewCycleId: 40,
            startDate: 1714521600000,
            endDate: 1727654400000,
            publish: true,
            selfReviewStartDate: 1714521600000,
            selfReviewEndDate: 1715212800000,
            managerReviewStartDate: 1715644800000,
            managerReviewEndDate: 1715644800000,
            selfReviewDraft: false,
            selfReviewPublish: false,
            selfAverageRating: -1.0,
            firstManagerId: 69,
            firstManagerEmployeeId: 'C0001',
            firstManagerFirstName: 'Abhinay',
            firstManagerLastName: 'Katta',
            firstManagerReviewDraft: false,
            firstManagerReviewPublish: false,
            firstManagerAverageRating: -1.0,
            secondManagerReviewDraft: false,
            secondManagerReviewPublish: false,
            secondManagerAverageRating: -1.0,
            checkInWithManagerStartDate: 1715731200000,
            checkInWithManagerEndDate: 1715731200000,
            checkInWithManagerDraft: false,
            checkInWithManagerPublish: false,
            checkInWithManagerAverageRating: -1.0,
            isOrWasManager: true,
            empDetails: [
                {
                    id: 70,
                    employeeId: '2qqwihkebjd',
                    firstName: 'ADE',
                    lastName: 'AFS',
                    checkInFromId: 69,
                    firstManagerId: 69,
                    selfReviewDraft: false,
                    selfReviewPublish: true,
                    selfReviewDate: 1715731200000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1715731200000,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: false,
                    checkInFromEmployeeId: 'C0001',
                    checkInFromFirstName: 'Abhinay',
                    checkInFromLastName: 'Katta',
                    checkInWithManagerDraft: false,
                    checkInWithManagerPublish: true,
                    checkInWithManagerDate: 1715731200000
                },
                {
                    id: 71,
                    employeeId: 'JAND',
                    firstName: 'AHJB',
                    lastName: 'ADFA',
                    checkInFromId: 69,
                    firstManagerId: 69,
                    secondManagerId: 70,
                    selfReviewDraft: false,
                    selfReviewPublish: true,
                    selfReviewDate: 1715731200000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1715731200000,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: true,
                    secondManagerReviewDate: 1715731200000,
                    checkInFromEmployeeId: 'C0001',
                    checkInFromFirstName: 'Abhinay',
                    checkInFromLastName: 'Katta',
                    checkInWithManagerDraft: false,
                    checkInWithManagerPublish: true,
                    checkInWithManagerDate: 1715731200000
                },
                {
                    id: 72,
                    employeeId: 'AUSHGDVB',
                    firstName: 'DFG',
                    lastName: 'SDFV',
                    firstManagerId: 69,
                    selfReviewDraft: false,
                    selfReviewPublish: false,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: false,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: false,
                    checkInWithManagerDraft: false,
                    checkInWithManagerPublish: false
                }
            ]
        }
    ],
    companyData: {
        id: 21,
        name: 'CompanyOne',
        size: 20,
        contactNo: '+919182848361',
        activeUsers: 6,
        inactiveUsers: 0
    },
    locationMockData: {
        pathname: '/',
        state: null,
        search: '',
        hash: '',
        key: ''
    }
};
