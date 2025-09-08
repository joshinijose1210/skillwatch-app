export const submitFeedbackMockData = {
    submitted: {
        url: 'https://dummy-api.example.com/api/feedback/submitted/?page=undefined&limit=10&organisationId=1&feedbackToId=-99&feedbackFromId=72&feedbackTypeId=-99&sortBy=dateDesc&reviewCycleId=',
        url2: 'https://dummy-api.example.com/api/feedback/submitted/?page=1&limit=10&organisationId=1&feedbackToId=73&feedbackFromId=72&feedbackTypeId=-99&sortBy=dateDesc&reviewCycleId=',
        url3: 'https://dummy-api.example.com/api/feedback/submitted/?page=1&limit=10&organisationId=1&feedbackToId=73&feedbackFromId=72&feedbackTypeId=2&sortBy=dateDesc&reviewCycleId=',
        pageUrl:
            'https://dummy-api.example.com/api/feedback/submitted/?page=2&limit=10&organisationId=1&feedbackToId=-99&feedbackFromId=72&feedbackTypeId=-99&sortBy=dateDesc&reviewCycleId=',
        sortUrl:
            'https://dummy-api.example.com/api/feedback/submitted/?page=undefined&limit=10&organisationId=1&feedbackToId=-99&feedbackFromId=72&feedbackTypeId=-99&sortBy=dateAsc&reviewCycleId=',
        data: {
            totalFeedbacks: 26,
            feedbacks: [
                {
                    srNo: 1,
                    date: 1693403738026,
                    organisationId: 1,
                    feedbackToId: 33,
                    feedbackToEmployeeId: 'SR0033',
                    feedbackFromId: 72,
                    feedbackFromEmployeeId: 'SR0072',
                    empFirstName: 'Manoj',
                    empLastName: 'Patil',
                    empRoleName: 'Org Admin',
                    feedback: '<p>Test Message</p>',
                    feedbackTypeId: 2,
                    feedbackType: 'Improvement',
                    isDraft: false
                },
                {
                    srNo: 2,
                    date: 1693403705811,
                    organisationId: 1,
                    feedbackToId: 34,
                    feedbackToEmployeeId: 'SR0034',
                    feedbackFromId: 72,
                    feedbackFromEmployeeId: 'SR0072',
                    empFirstName: 'Manoj',
                    empLastName: 'Patil',
                    empRoleName: 'Org Admin',
                    feedback: '<p>Test Message 2</p>',
                    feedbackTypeId: 1,
                    feedbackType: 'Positive',
                    isDraft: false
                }
            ]
        },
        filterData: {
            totalFeedbacks: 1,
            feedbacks: [
                {
                    srNo: 1,
                    date: 1693403738026,
                    organisationId: 1,
                    feedbackToId: 33,
                    feedbackToEmployeeId: 'SR0033',
                    feedbackFromId: 72,
                    feedbackFromEmployeeId: 'SR0072',
                    empFirstName: 'Manoj',
                    empLastName: 'Patil',
                    empRoleName: 'Org Admin',
                    feedback: '<p>Test Message</p>',
                    feedbackTypeId: 2,
                    feedbackType: 'Improvement',
                    isDraft: false
                }
            ]
        }
    },
    feedbackType: {
        url: 'https://dummy-api.example.com/api/feedback-type/',
        data: [
            {
                feedbackTypeId: 1,
                feedbackType: 'Positive'
            },
            {
                feedbackTypeId: 2,
                feedbackType: 'Improvement'
            },
            {
                feedbackTypeId: 3,
                feedbackType: 'Appreciation'
            }
        ]
    },
    employees: {
        url: 'https://dummy-api.example.com/api/employees/?teamId=-99&designationId=-99&roleId=-99&organisationId=1&searchText=&departmentId=-99',
        data: {
            totalEmployees: 2,
            employees: [
                {
                    organisationId: 1,
                    id: 73,
                    employeeId: 'SR0023',
                    firstName: 'M',
                    lastName: 'P',
                    emailId: 'Manoj.patil7@scalereal.com',
                    contactNo: '+915368679798',
                    genderId: 1,
                    dateOfBirth: 1059696000000,
                    dateOfJoining: 1690848000000,
                    experienceInMonths: 3,
                    status: true,
                    isConsultant: true,
                    departmentName: 'Engineering',
                    teamName: 'XYZZZ',
                    designationName: 'test designation 48738',
                    roleName: 'Employee',
                    firstManagerId: 123,
                    firstManagerEmployeeId: 'SR021',
                    employeeNameWithEmployeeId: ' M P ( SR0023 )'
                },
                {
                    organisationId: 1,
                    id: 74,
                    employeeId: 'SR0024',
                    firstName: 'R',
                    lastName: 'P',
                    emailId: 'Manoj.patil4@user45.in',
                    contactNo: '+919874567335',
                    genderId: 1,
                    dateOfBirth: 1693353600000,
                    dateOfJoining: 1690934400000,
                    experienceInMonths: 0,
                    status: true,
                    isConsultant: false,
                    departmentName: 'Engineering',
                    teamName: 'Test1234',
                    designationName: 'Test designation',
                    roleName: 'Employee',
                    firstManagerId: 124,
                    firstManagerEmployeeId: 'SR022',
                    employeeNameWithEmployeeId: ' R P ( SR0024 )'
                }
            ]
        }
    }
};
