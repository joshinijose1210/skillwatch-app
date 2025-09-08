export const receivedFeedbackMockData = {
    received: {
        url: 'https://dummy-api.example.com/api/feedback/received/?page=1&limit=10&organisationId=1&feedbackFromId=-99&feedbackToId=72&sortBy=dateDesc&feedbackTypeId=-99&reviewCycleId=',
        url2: 'https://dummy-api.example.com/api/feedback/received/?page=1&limit=10&organisationId=1&feedbackFromId=73&feedbackToId=72&sortBy=dateDesc&feedbackTypeId=-99&reviewCycleId=',
        url3: 'https://dummy-api.example.com/api/feedback/received/?page=1&limit=10&organisationId=1&feedbackFromId=73&feedbackToId=72&sortBy=dateDesc&feedbackTypeId=2&reviewCycleId=',
        pageUrl:
            'https://dummy-api.example.com/api/feedback/received/?page=2&limit=10&organisationId=1&feedbackFromId=-99&feedbackToId=72&sortBy=dateDesc&feedbackTypeId=-99&reviewCycleId=',
        sortUrl:
            'https://dummy-api.example.com/api/feedback/received/?page=1&limit=10&organisationId=1&feedbackFromId=-99&feedbackToId=72&sortBy=dateAsc&feedbackTypeId=-99&reviewCycleId=',
        data: {
            totalFeedbacks: 32,
            feedbacks: [
                {
                    srNo: 2,
                    date: 1693461730099,
                    organisationId: 1,
                    feedbackToId: 72,
                    feedbackToEmployeeId: 'SR0022',
                    feedbackFromId: 134,
                    feedbackFromEmployeeId: 'SR0067',
                    empFirstName: 'A',
                    empLastName: 'D',
                    empRoleName: 'Manager',
                    feedback:
                        '<p><span style="color: rgb(96, 120, 144);">Positive feedback is a way to recognize and appreciate a job well done. When giving positive feedback:</span></p><ul><li>Be specific: Identify what the person did well and why it was important.</li><li>Use "I" statements: Focus on your own experience and reactions, rather than making judgments or assumptions about the other person.</li><li>Be timely: Give positive feedback as soon as possible after the behavior or action you want to reinforce.</li><li>Be sincere: Authenticity is key. Make sure your positive feedback comes from a place of genuine appreciation.</li></ul><p><br></p>',
                    feedbackTypeId: 1,
                    feedbackType: 'Positive',
                    isDraft: false
                },
                {
                    srNo: 1,
                    date: 1693461720948,
                    organisationId: 1,
                    feedbackToId: 72,
                    feedbackToEmployeeId: 'SR0022',
                    feedbackFromId: 73,
                    feedbackFromEmployeeId: 'SR0023',
                    empFirstName: 'B',
                    empLastName: 'E',
                    empRoleName: 'Manager',
                    feedback:
                        '<p><span style="color: rgb(96, 120, 144);">Positive feedback is a way to recognize and appreciate a job well done. When giving positive feedback:</span></p><ul><li>Be specific: Identify what the person did well and why it was important.</li><li>Use "I" statements: Focus on your own experience and reactions, rather than making judgments or assumptions about the other person.</li><li>Be timely: Give positive feedback as soon as possible after the behavior or action you want to reinforce.</li><li>Be sincere: Authenticity is key. Make sure your positive feedback comes from a place of genuine appreciation.</li></ul><p><br></p>',
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
                    date: 1693461720948,
                    organisationId: 1,
                    feedbackToId: 72,
                    feedbackToEmployeeId: 'SR0022',
                    feedbackFromId: 73,
                    feedbackFromEmployeeId: 'SR0023',
                    empFirstName: 'B',
                    empLastName: 'E',
                    empRoleName: 'Manager',
                    feedback:
                        '<p><span style="color: rgb(96, 120, 144);">Positive feedback is a way to recognize and appreciate a job well done. When giving positive feedback:</span></p><ul><li>Be specific: Identify what the person did well and why it was important.</li><li>Use "I" statements: Focus on your own experience and reactions, rather than making judgments or assumptions about the other person.</li><li>Be timely: Give positive feedback as soon as possible after the behavior or action you want to reinforce.</li><li>Be sincere: Authenticity is key. Make sure your positive feedback comes from a place of genuine appreciation.</li></ul><p><br></p>',
                    feedbackTypeId: 1,
                    feedbackType: 'Positive',
                    isDraft: false
                }
            ]
        }
    },
    employees: {
        url: 'https://dummy-api.example.com/api/employees/?teamId=-99&designationId=-99&organisationId=1&roleId=-99&searchText=&departmentId=-99',
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
    navigationState: {
        state: {
            srNo: 2,
            date: 1693461730099,
            organisationId: 1,
            feedbackToId: 72,
            feedbackToEmployeeId: 'SR0022',
            feedbackFromId: 134,
            feedbackFromEmployeeId: 'SR0067',
            empFirstName: 'A',
            empLastName: 'D',
            empRoleName: 'Manager',
            feedback:
                '<p><span style="color: rgb(96, 120, 144);">Positive feedback is a way to recognize and appreciate a job well done. When giving positive feedback:</span></p><ul><li>Be specific: Identify what the person did well and why it was important.</li><li>Use "I" statements: Focus on your own experience and reactions, rather than making judgments or assumptions about the other person.</li><li>Be timely: Give positive feedback as soon as possible after the behavior or action you want to reinforce.</li><li>Be sincere: Authenticity is key. Make sure your positive feedback comes from a place of genuine appreciation.</li></ul><p><br></p>',
            feedbackTypeId: 1,
            feedbackType: 'Positive',
            isDraft: false,
            action: 'View',
            actionFrom: 'ReceivedFeedback',
            feedbackCategory: 'received',
            fromEmpName: 'A D',
            fromRoleName: 'Manager',
            toEmpName: 'ABC DEF',
            toRoleName: 'Manager'
        }
    }
};
