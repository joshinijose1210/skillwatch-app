export const feedbackFormMockData = {
    employee: {
        url: 'https://dummy-api.example.com/api/employees/?teamId=-99&designationId=-99&organisationId=1&roleId=-99&searchText=&sortOrderId=1&departmentId=-99',
        data: {
            totalEmployees: 2,
            employees: [
                {
                    organisationId: 1,
                    id: 70,
                    employeeId: 'SR0007',
                    firstName: 'T',
                    lastName: 'T',
                    emailId: 'aamirkhan123@scalereal.com',
                    contactNo: '+917060753612',
                    status: true,
                    isConsultant: false,
                    teamName: 'BA',
                    designationName: 'Employee',
                    roleName: 'Admin 4',
                    firstManagerId: 49,
                    firstManagerEmployeeId: 'SR00400',
                    employeeNameWithEmployeeId: ' T T ( SR0007 )'
                },
                {
                    organisationId: 1,
                    id: 72,
                    employeeId: 'SR0003',
                    firstName: 'M',
                    lastName: 'E',
                    emailId: 'aamirkhan123@scalereal.com',
                    contactNo: '+917060753612',
                    status: true,
                    isConsultant: false,
                    teamName: 'BA',
                    designationName: 'Employee',
                    roleName: 'Admin 4',
                    firstManagerId: 49,
                    firstManagerEmployeeId: 'SR00400',
                    employeeNameWithEmployeeId: ' M E ( SR0003 )'
                },
                {
                    organisationId: 1,
                    id: 71,
                    employeeId: '123',
                    firstName: 'aamir',
                    lastName: 'islam',
                    emailId: 'aamiralis@scalereal.com',
                    contactNo: '7060753613',
                    status: true,
                    isConsultant: false,
                    teamName: 'Frontend Team',
                    designationName: 'SDE 1',
                    roleName: 'Employee',
                    firstManagerId: 51,
                    firstManagerEmployeeId: '1234',
                    secondManagerId: 1,
                    secondManagerEmployeeId: 'SR0006',
                    employeeNameWithEmployeeId: ' aamir islam ( 123 )'
                }
            ]
        },
        data2: {
            totalEmployees: 2,
            employees: [
                {
                    organisationId: 1,
                    id: 70,
                    employeeId: 'SR0007',
                    firstName: 'T',
                    lastName: 'S',
                    emailId: 'aamirkhan123@scalereal.com',
                    contactNo: '+917060753612',
                    status: true,
                    isConsultant: false,
                    teamName: 'BA',
                    designationName: 'Employee',
                    roleName: 'Admin 4',
                    firstManagerId: 49,
                    firstManagerEmployeeId: 'SR00400',
                    employeeNameWithEmployeeId: ' T T ( SR0007 )'
                },
                {
                    organisationId: 1,
                    id: 72,
                    employeeId: 'SR0003',
                    firstName: 'M',
                    lastName: 'E',
                    emailId: 'aamirkhan123@scalereal.com',
                    contactNo: '+917060753612',
                    status: true,
                    isConsultant: false,
                    teamName: 'BA',
                    designationName: 'Employee',
                    roleName: 'Admin 4',
                    firstManagerId: 49,
                    firstManagerEmployeeId: 'SR00400',
                    employeeNameWithEmployeeId: ' M E ( SR0003 )'
                },
                {
                    organisationId: 1,
                    id: 71,
                    employeeId: '123',
                    firstName: 'A',
                    lastName: 'S',
                    emailId: 'aamiralis@scalereal.com',
                    contactNo: '7060753613',
                    status: true,
                    isConsultant: false,
                    teamName: 'Frontend Team',
                    designationName: 'SDE 1',
                    roleName: 'Employee',
                    firstManagerId: 51,
                    firstManagerEmployeeId: '1234',
                    secondManagerId: 1,
                    secondManagerEmployeeId: 'SR0006',
                    employeeNameWithEmployeeId: ' A S ( 123 )'
                }
            ]
        }
    },
    actionItems: {
        url: 'https://dummy-api.example.com/api/feedback-request/action-items?organisationId=1&feedbackToId=72',
        data: [
            {
                actionItemId: 1,
                actionItem: 'Test action',
                createdAt: new Date(),
                targetDate: new Date()
            }
        ]
    },
    mockState: {
        organisationId: 1,
        requestId: 1,
        feedbackId: 409,
        isSubmitted: true,
        requestedOn: 1693287068369,
        submittedOn: 1693287177618,
        actionItemId: 1,
        actionItem: 'Test action',
        requestedById: 3,
        requestedByEmployeeId: 'SR0067',
        requestedByFirstName: 'M',
        requestedByLastName: 'A',
        feedbackToId: 4,
        feedbackToEmployeeId: '123',
        feedbackToFirstName: 'aamir',
        feedbackToLastName: 'islam',
        feedbackFromId: 70,
        feedbackFromEmployeeId: 'SR0007',
        feedbackFromFirstName: 'T',
        feedbackFromLastName: 'T',
        request: '<p>Test request</p>',
        feedback: '<p>requested data</p>',
        feedbackTypeId: 3,
        feedbackType: 'Appreciation',
        isDraft: false
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
    }
};
