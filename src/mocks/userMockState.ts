export const userMockState = {
    id: 72,
    organisationId: 1,
    firstName: 'ABC',
    lastName: 'DEF',
    email: 'abc@scalereal.com',
    phoneNumber: '+917060753645',
    employeeId: 'SR0022',
    roleName: 'Manager',
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
            edit: false
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
            moduleId: 19,
            moduleName: 'KRAs',
            view: true,
            edit: true
        },
        {
            moduleId: 18,
            moduleName: 'Received Suggestions',
            view: true,
            edit: true
        }
    ],
    designationName: 'BA - Traineee',
    isLoggedIn: true,
    onboardingFlow: true
};

export const empUserState = {
    ...userMockState,
    roleName: 'Employee',
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
            view: false,
            edit: false
        },
        {
            moduleId: 18,
            moduleName: 'Analytics',
            view: false,
            edit: false
        },
        {
            moduleId: 20,
            moduleName: 'Departments',
            view: false,
            edit: false
        },
        {
            moduleId: 4,
            moduleName: 'Teams',
            view: false,
            edit: false
        },
        {
            moduleId: 5,
            moduleName: 'Designations',
            view: false,
            edit: false
        },
        {
            moduleId: 6,
            moduleName: 'Roles & Permissions',
            view: false,
            edit: false
        },
        {
            moduleId: 7,
            moduleName: 'Employees',
            view: false,
            edit: false
        },
        {
            moduleId: 8,
            moduleName: 'KPIs',
            view: false,
            edit: false
        },
        {
            moduleId: 12,
            moduleName: 'Reviews for Team Members',
            view: false,
            edit: false
        },
        {
            moduleId: 13,
            moduleName: 'Check-in with Team Members',
            view: false,
            edit: false
        },
        {
            moduleId: 9,
            moduleName: 'Review Cycles',
            view: false,
            edit: false
        },
        {
            moduleId: 15,
            moduleName: 'Company Information',
            view: false,
            edit: false
        },
        {
            moduleId: 17,
            moduleName: 'Allowed Domains',
            view: false,
            edit: false
        },
        {
            moduleId: 19,
            moduleName: 'Integrations',
            view: false,
            edit: false
        },
        {
            moduleId: 14,
            moduleName: 'User Activity Log',
            view: false,
            edit: false
        }
    ]
};

export const orgAdminMockState = {
    id: 1,
    organisationId: 1,
    firstName: 'ABC',
    lastName: 'DEF',
    email: 'abc@scalereal.com',
    phoneNumber: '+917060753645',
    employeeId: 'SR0002',
    roleName: 'Org Admin',
    teamName: 'Org Admin',
    modulePermission: [
        {
            moduleId: 6,
            moduleName: 'Feedback',
            view: true,
            edit: false
        },
        {
            moduleId: 7,
            moduleName: 'Teams',
            view: true,
            edit: true
        },
        {
            moduleId: 8,
            moduleName: 'Designations',
            view: true,
            edit: true
        },
        {
            moduleId: 9,
            moduleName: 'Roles & Permissions',
            view: true,
            edit: true
        },
        {
            moduleId: 10,
            moduleName: 'Employees',
            view: true,
            edit: true
        },
        {
            moduleId: 11,
            moduleName: 'KPIs',
            view: true,
            edit: true
        },
        {
            moduleId: 14,
            moduleName: 'Review Cycles',
            view: true,
            edit: true
        },
        {
            moduleId: 17,
            moduleName: 'Performance Review',
            view: true,
            edit: false
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
            moduleId: 16,
            moduleName: 'User Activity Log',
            view: true,
            edit: false
        },
        {
            moduleId: 15,
            moduleName: 'Company Information',
            view: true,
            edit: true
        },
        {
            moduleId: 1,
            moduleName: 'Request Feedback',
            view: true,
            edit: true
        },
        {
            moduleId: 2,
            moduleName: 'Settings',
            view: true,
            edit: true
        },
        {
            moduleId: 4,
            moduleName: 'Integrations',
            view: true,
            edit: true
        },
        {
            moduleId: 3,
            moduleName: 'Analytics',
            view: true,
            edit: true
        },
        {
            moduleId: 5,
            moduleName: 'Departments',
            view: true,
            edit: true
        },
        {
            moduleId: 18,
            moduleName: 'Received Suggestions',
            view: true,
            edit: true
        },
        {
            moduleId: 19,
            moduleName: 'KRAs',
            view: true,
            edit: true
        }
    ],
    designationName: 'Org Admin',
    isLoggedIn: true,
    onboardingFlow: true
};
