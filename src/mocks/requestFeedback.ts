export const requestFeedbackMockData = {
    feedback: {
        url: 'https://dummy-api.example.com/api/feedback-request/?organisationId=1&requestedById=-99&feedbackToId=-99&feedbackFromId=72&feedbackTypeId=-99&isSubmitted=true,false&page=undefined&limit=10&id=72&sortBy=dateDesc&isExternalRequest=false&externalFeedbackFromEmail=false&reviewCycleId=',
        url2: 'https://dummy-api.example.com/api/feedback-request/?organisationId=1&requestedById=3&feedbackToId=-99&feedbackFromId=72&feedbackTypeId=-99&isSubmitted=true,false&page=undefined&limit=10&id=72&sortBy=dateDesc&isExternalRequest=false&externalFeedbackFromEmail=false&reviewCycleId=',
        url3: 'https://dummy-api.example.com/api/feedback-request/?organisationId=1&requestedById=3&feedbackToId=5&feedbackFromId=72&feedbackTypeId=-99&isSubmitted=true,false&page=undefined&limit=10&id=72&sortBy=dateDesc&isExternalRequest=false&externalFeedbackFromEmail=false&reviewCycleId=',
        url4: 'https://dummy-api.example.com/api/feedback-request/?organisationId=1&requestedById=3&feedbackToId=5&feedbackFromId=72&feedbackTypeId=-99&isSubmitted=true&page=undefined&limit=10&id=72&sortBy=dateDesc&isExternalRequest=false&externalFeedbackFromEmail=false&reviewCycleId=',
        pageUrl:
            'https://dummy-api.example.com/api/feedback-request/?organisationId=1&requestedById=-99&feedbackToId=-99&feedbackFromId=72&feedbackTypeId=-99&isSubmitted=true,false&page=2&limit=10&id=72&sortBy=dateDesc&isExternalRequest=false&externalFeedbackFromEmail=false&reviewCycleId=',
        sortUrl:
            'https://dummy-api.example.com/api/feedback-request/?organisationId=1&requestedById=-99&feedbackToId=-99&feedbackFromId=72&feedbackTypeId=-99&isSubmitted=true,false&page=undefined&limit=10&id=72&sortBy=dateAsc&isExternalRequest=false&externalFeedbackFromEmail=false&reviewCycleId=',
        data: {
            pendingReceivedRequestCount: 5,
            pendingSentRequestCount: 40,
            totalFeedbackRequestDataCount: 15,
            feedbackRequestData: [
                {
                    organisationId: 1,
                    requestId: 1,
                    feedbackId: 409,
                    isSubmitted: true,
                    requestedOn: 1693287068369,
                    submittedOn: 1693287177618,
                    actionItemId: 128,
                    actionItem: 'Level of Creativity or Innovation',
                    requestedById: 3,
                    requestedByEmployeeId: 'SR0067',
                    requestedByFirstName: 'M',
                    requestedByLastName: 'A',
                    feedbackToId: 4,
                    feedbackToEmployeeId: 'SR0068',
                    feedbackToFirstName: 'R',
                    feedbackToLastName: 'A',
                    feedbackFromId: 2,
                    feedbackFromEmployeeId: 'SR021',
                    feedbackFromFirstName: 'Aamir',
                    feedbackFromLastName: 'Islam',
                    request:
                        '<p><span style="color: rgb(0, 0, 0);">When requested feedback is saved as draft then toast message should be \'</span><strong style="color: rgb(0, 0, 0);"><em>Request Feedback saved as draft successfully</em></strong><span style="color: rgb(0, 0, 0);">\'.When requested feedback is saved as draft then toast message should be \'</span><strong style="color: rgb(0, 0, 0);"><em>Request Feedback saved as draft successfully</em></strong><span style="color: rgb(0, 0, 0);">\'.</span></p>',
                    feedback:
                        '<p><span style="color: rgb(0, 0, 0);">When requested feedback is saved as draft then toast message should be \'</span><strong style="color: rgb(0, 0, 0);"><em>Request Feedback saved as draft successfully</em></strong><span style="color: rgb(0, 0, 0);">\'.When requested feedback is saved as draft then toast message should be \'</span><strong style="color: rgb(0, 0, 0);"><em>Request Feedback saved as draft successfully</em></strong><span style="color: rgb(0, 0, 0);">\'.</span></p>',
                    feedbackTypeId: 3,
                    feedbackType: 'Appreciation',
                    isDraft: false
                },
                {
                    organisationId: 1,
                    requestId: 2,
                    feedbackId: 405,
                    isSubmitted: true,
                    requestedOn: 1693216971921,
                    submittedOn: 1693285571270,
                    actionItemId: 130,
                    actionItem: 'Test action item 1',
                    requestedById: 3,
                    requestedByEmployeeId: 'SR0067',
                    requestedByFirstName: 'M',
                    requestedByLastName: 'A',
                    feedbackToId: 4,
                    feedbackToEmployeeId: 'SR0068',
                    feedbackToFirstName: 'R',
                    feedbackToLastName: 'A',
                    feedbackFromId: 2,
                    feedbackFromEmployeeId: 'SR021',
                    feedbackFromFirstName: 'Aamir',
                    feedbackFromLastName: 'Islam',
                    request: '<p>this is a test feedback</p>',
                    feedback:
                        '<p><strong>Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.Give feedback for my task in las week.</strong></p>',
                    feedbackTypeId: 1,
                    feedbackType: 'Positive',
                    isDraft: false
                }
            ]
        }
    },
    singleRequestedFeedback: {
        url: 'https://dummy-api.example.com/api/feedback-request/1',
        data: {
            organisationId: 1,
            requestId: 1,
            feedbackId: 409,
            isSubmitted: true,
            requestedOn: 1693287068369,
            submittedOn: 1693287177618,
            actionItemId: 128,
            actionItem: 'Level of Creativity or Innovation',
            requestedById: 3,
            requestedByEmployeeId: 'SR0067',
            requestedByFirstName: 'M',
            requestedByLastName: 'A',
            feedbackToId: 4,
            feedbackToEmployeeId: 'SR0068',
            feedbackToFirstName: 'R',
            feedbackToLastName: 'A',
            feedbackFromId: 2,
            feedbackFromEmployeeId: 'SR021',
            feedbackFromFirstName: 'Aamir',
            feedbackFromLastName: 'Islam',
            request:
                '<p><span style="color: rgb(0, 0, 0);">When requested feedback is saved as draft then toast message should be \'</span><strong style="color: rgb(0, 0, 0);"><em>Request Feedback saved as draft successfully</em></strong><span style="color: rgb(0, 0, 0);">\'.When requested feedback is saved as draft then toast message should be \'</span><strong style="color: rgb(0, 0, 0);"><em>Request Feedback saved as draft successfully</em></strong><span style="color: rgb(0, 0, 0);">\'.</span></p>',
            feedbackData: {
                feedbackText:
                    '<p><span style="color: rgb(0, 0, 0);">When requested feedback is saved as draft then toast message should be \'</span><strong style="color: rgb(0, 0, 0);"><em>Request Feedback saved as draft successfully</em></strong><span style="color: rgb(0, 0, 0);">\'.When requested feedback is saved as draft then toast message should be \'</span><strong style="color: rgb(0, 0, 0);"><em>Request Feedback saved as draft successfully</em></strong><span style="color: rgb(0, 0, 0);">\'.</span></p>',
                feedbackTypeId: 3,
                feedbackType: 'Appreciation'
            },
            isDraft: false
        }
    },
    employee: {
        url: 'https://dummy-api.example.com/api/employees/?teamId=-99&designationId=-99&organisationId=1&roleId=-99&searchText=&sortOrderId=1&departmentId=-99',
        data: {
            totalEmployees: 3,
            employees: [
                {
                    organisationId: 1,
                    id: 3,
                    employeeId: 'SR0067',
                    firstName: 'M',
                    lastName: 'A',
                    emailId: 'TP@yahoo.com',
                    contactNo: '+916673738828',
                    genderId: 2,
                    dateOfBirth: 1533168000000,
                    dateOfJoining: 1690848000000,
                    experienceInMonths: 2,
                    status: true,
                    isConsultant: true,
                    teamName: 'BA Team',
                    designationName: 'dev team 14',
                    roleName: 'Manager',
                    firstManagerId: 143,
                    firstManagerEmployeeId: 'SR0100',
                    employeeNameWithEmployeeId: 'M A (SR0067)'
                },
                {
                    organisationId: 1,
                    id: 4,
                    employeeId: 'SR0068',
                    firstName: 'R',
                    lastName: 'A',
                    emailId: 'rushad.shaikh1@scalereal.com',
                    contactNo: '+914555555555',
                    status: true,
                    isConsultant: false,
                    departmentName: 'Executive Leadership',
                    teamName: 'Org Admin',
                    designationName: 'SDE - 1',
                    roleName: 'Org Admin',
                    firstManagerId: 124,
                    firstManagerEmployeeId: 'SR022',
                    employeeNameWithEmployeeId: 'R A (SR0068)'
                },
                {
                    organisationId: 1,
                    id: 5,
                    employeeId: 'SR0069',
                    firstName: 'U',
                    lastName: 'H',
                    emailId: 'rushad.shaikh1@scalereal.com',
                    contactNo: '+914555555555',
                    status: true,
                    isConsultant: false,
                    departmentName: 'Executive Leadership',
                    teamName: 'Org Admin',
                    designationName: 'SDE - 1',
                    roleName: 'Org Admin',
                    firstManagerId: 124,
                    firstManagerEmployeeId: 'SR022',
                    employeeNameWithEmployeeId: 'U H (SR0069)'
                }
            ]
        }
    },
    navigationState: {
        state: {
            organisationId: 1,
            requestId: 1,
            feedbackId: 409,
            isSubmitted: true,
            requestedOn: 1693287068369,
            submittedOn: 1693287177618,
            actionItemId: 128,
            actionItem: 'Level of Creativity or Innovation',
            requestedById: 3,
            requestedByEmployeeId: 'SR0067',
            requestedByFirstName: 'M',
            requestedByLastName: 'A',
            feedbackToId: 4,
            feedbackToEmployeeId: 'SR0068',
            feedbackToFirstName: 'R',
            feedbackToLastName: 'A',
            feedbackFromId: 2,
            feedbackFromEmployeeId: 'SR021',
            feedbackFromFirstName: 'Aamir',
            feedbackFromLastName: 'Islam',
            request:
                '<p><span style="color: rgb(0, 0, 0);">When requested feedback is saved as draft then toast message should be \'</span><strong style="color: rgb(0, 0, 0);"><em>Request Feedback saved as draft successfully</em></strong><span style="color: rgb(0, 0, 0);">\'.When requested feedback is saved as draft then toast message should be \'</span><strong style="color: rgb(0, 0, 0);"><em>Request Feedback saved as draft successfully</em></strong><span style="color: rgb(0, 0, 0);">\'.</span></p>',
            feedback:
                '<p><span style="color: rgb(0, 0, 0);">When requested feedback is saved as draft then toast message should be \'</span><strong style="color: rgb(0, 0, 0);"><em>Request Feedback saved as draft successfully</em></strong><span style="color: rgb(0, 0, 0);">\'.When requested feedback is saved as draft then toast message should be \'</span><strong style="color: rgb(0, 0, 0);"><em>Request Feedback saved as draft successfully</em></strong><span style="color: rgb(0, 0, 0);">\'.</span></p>',
            feedbackTypeId: 3,
            feedbackType: 'Appreciation',
            isDraft: false
        }
    }
};
