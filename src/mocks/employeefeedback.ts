const BASE_URL = 'https://dummy-api.example.com';
export const EmployeeFeedbackMockData = {
    get: {
        initialData: {
            url: `${BASE_URL}/api/feedback/?page=undefined&organisationId=1&limit=10&searchText=&feedbackTypeId=-99&reviewCycleId=&sortBy=dateDesc`,
            sortUrl: `${BASE_URL}/api/feedback/?page=undefined&organisationId=1&limit=10&searchText=&feedbackTypeId=-99&reviewCycleId=&sortBy=dateAsc`,
            responseCode: 200,
            data: {
                totalFeedbacks: 2,
                feedbacks: [
                    {
                        date: 1694390400000,
                        isExternalFeedback: false,
                        feedback:
                            '<ul><li>Think back on the previous review cycle and note any accomplishments or achievements you’re proud of.</li><li>When you can, try to be as specific as possible, using numbers and figures to back up your statements.</li><li>Think of your personal goals for your career development and how they may align with your company’s goals and values.</li><li>Prepare any questions you might have for your manager.</li><li>Be ready to lead the conversation. This is your performance review, after all!</li></ul><p><br></p>',
                        feedbackToId: 161,
                        feedbackToEmployeeId: 'asdsadsad',
                        feedbackFromId: 21,
                        feedbackFromEmployeeId: 'SR0051',
                        feedbackTypeId: 1,
                        feedbackType: 'Positive',
                        toEmpName: 'Demo Name',
                        fromEmpName: 'Rushad Eliyas Shaikh',
                        toRoleName: 'Admin 3',
                        fromRoleName: 'Org Admin',
                        organisationId: 1,
                        isDraft: false
                    },
                    {
                        date: 1694390400000,
                        isExternalFeedback: false,
                        feedback:
                            '<ul><li>Think back on the previous review cycle and note any accomplishments or achievements you’re proud of.</li><li>When you can, try to be as specific as possible, using numbers and figures to back up your statements.</li><li>Think of your personal goals for your career development and how they may align with your company’s goals and values.</li><li>Prepare any questions you might have for your manager.</li><li>Be ready to lead the conversation. This is your performance review, after all!</li></ul><p><br></p>',
                        feedbackToId: 111,
                        feedbackToEmployeeId: 'SR0044wqd',
                        feedbackFromId: 21,
                        feedbackFromEmployeeId: 'SR0051',
                        feedbackTypeId: 1,
                        feedbackType: 'Positive',
                        toEmpName: 'P Jm',
                        fromEmpName: 'Rushad Eliyas Shaikh',
                        toRoleName: 'Org Admin',
                        fromRoleName: 'Org Admin',
                        organisationId: 1,
                        isDraft: false
                    }
                ]
            }
        },
        feedbackTypeData: {
            url: `${BASE_URL}/api/feedback-type/`,
            responseCode: 200,
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
        searchEmployeeFromData: {
            url: `${BASE_URL}/api/feedback/?page=undefined&organisationId=1&limit=10&searchText=Moly%20Agarwal&feedbackTypeId=-99&reviewCycleId=&sortBy=dateDesc`,
            responseCoe: 200,
            data: {
                totalFeedbacks: 1,
                feedbacks: [
                    {
                        date: 1693267200000,
                        feedback: '<p>aaaaaaa/p>',
                        feedbackToId: 23,
                        feedbackToEmployeeId: 'SR0052',
                        feedbackFromId: 73,
                        feedbackFromEmployeeId: 'SR0050',
                        feedbackTypeId: 3,
                        feedbackType: 'Appreciation',
                        toEmpName: 'Chetan Varade',
                        fromEmpName: 'Moly Agarwal',
                        toRoleName: 'Employee',
                        fromRoleName: 'Human Resource',
                        organisationId: 1,
                        isDraft: false
                    }
                ]
            }
        },
        postiveFeedbackData: {
            url: `${BASE_URL}/api/feedback/?page=undefined&organisationId=1&limit=10&searchText=&feedbackTypeId=-99&reviewCycleId=&sortBy=dateDesc`,
            responseCode: 200,
            data: {
                totalFeedbacks: 1,
                feedbacks: [
                    {
                        date: 1694390400000,
                        feedback: '<p>This is a positive feedback</p>',
                        feedbackToId: 161,
                        feedbackToEmployeeId: 'asdsadsad',
                        feedbackFromId: 21,
                        feedbackFromEmployeeId: 'SR0051',
                        feedbackTypeId: 1,
                        feedbackType: 'Positive',
                        toEmpName: 'Demo Name',
                        fromEmpName: 'Rushad Eliyas Shaikh',
                        toRoleName: 'Admin 3',
                        fromRoleName: 'Org Admin',
                        organisationId: 1,
                        isDraft: false
                    }
                ]
            }
        },
        appreciationFeedbackData: {
            url: `${BASE_URL}/api/feedback/?page=undefined&organisationId=1&limit=10&searchText=&feedbackTypeId=-99&reviewCycleId=&sortBy=dateDesc`,
            responseCode: 200,
            data: {
                totalFeedbacks: 1,
                feedbacks: [
                    {
                        date: 1694044800000,
                        feedback: '<p>This is an appreciation feedback</p>',
                        feedbackToId: 44,
                        feedbackToEmployeeId: 'SR0390',
                        feedbackFromId: 54,
                        feedbackFromEmployeeId: 'SR0039',
                        feedbackTypeId: 3,
                        feedbackType: 'Appreciation',
                        toEmpName: 'Aamir Islam',
                        fromEmpName: 'Aamir Islam',
                        toRoleName: 'Org Admin',
                        fromRoleName: 'Org Admin',
                        organisationId: 1,
                        isDraft: false
                    }
                ]
            }
        },
        dateBasedTestData: {
            url: `${BASE_URL}/api/feedback/?page=undefined&limit=10&organisationId=1&searchText=Rushad&feedbackTypeId=-99&sortBy=dateDesc&fromDate=2023-10-11&toDate=2023-10-15&reviewCycleId=`,
            responseCode: 200,
            data: {
                totalFeedbacks: 2,
                feedbacks: [
                    {
                        date: 1696962600000, // 11-10-2023
                        isExternalFeedback: false,
                        feedback: '<p>Feedback 1</p>',
                        feedbackToId: 161,
                        feedbackToEmployeeId: 'asdsadsad',
                        feedbackFromId: 21,
                        feedbackFromEmployeeId: 'SR0051',
                        feedbackTypeId: 1,
                        feedbackType: 'Positive',
                        toEmpName: 'Demo Name',
                        fromEmpName: 'Rushad Eliyas Shaikh',
                        toRoleName: 'Admin 3',
                        fromRoleName: 'Org Admin',
                        organisationId: 1,
                        isDraft: false
                    },
                    {
                        date: 1697221800000, // 14-10-2023
                        isExternalFeedback: false,
                        feedback: '<p>Feedback 2</p>',
                        feedbackToId: 111,
                        feedbackToEmployeeId: 'SR0044wqd',
                        feedbackFromId: 21,
                        feedbackFromEmployeeId: 'SR0051',
                        feedbackTypeId: 1,
                        feedbackType: 'Positive',
                        toEmpName: 'P Jm',
                        fromEmpName: 'Rushad Eliyas Shaikh',
                        toRoleName: 'Org Admin',
                        fromRoleName: 'Org Admin',
                        organisationId: 1,
                        isDraft: false
                    }
                ]
            }
        },
        repeatedData: {
            url: `${BASE_URL}/api/feedback/?page=undefined&organisationId=1&limit=10&searchText=&feedbackTypeId=-99&reviewCycleId=&sortBy=dateDesc`,
            responseCode: 200,
            data: {
                totalFeedbacks: 11,
                feedbacks: [
                    ...Array.from({ length: 11 }).map(() => ({
                        date: 1696962600000,
                        feedback: '<p>Feedback 1</p>',
                        feedbackToId: 161,
                        feedbackToEmployeeId: 'asdsadsad',
                        feedbackFromId: 21,
                        feedbackFromEmployeeId: 'SR0051',
                        feedbackTypeId: 1,
                        feedbackType: 'Positive',
                        toEmpName: 'Demo Employee',
                        fromEmpName: 'Random Name',
                        toRoleName: 'Admin 3',
                        fromRoleName: 'Org Admin',
                        organisationId: 1,
                        isDraft: false
                    }))
                ]
            }
        },
        paginatedData: {
            url: `${BASE_URL}/api/feedback/?page=2&organisationId=1&limit=10&searchText=&feedbackTypeId=-99&reviewCycleId=&sortBy=dateDesc`,
            responseCode: 200,
            data: {
                totalFeedbacks: 11,
                feedbacks: [
                    {
                        date: 1696962600000,
                        feedback: '<p>Feedback 2</p>',
                        feedbackToId: 161,
                        feedbackToEmployeeId: 'asdsadsad',
                        feedbackFromId: 21,
                        feedbackFromEmployeeId: 'SR0052',
                        feedbackTypeId: 1,
                        feedbackType: 'Positive',
                        toEmpName: 'Demo Employee 2',
                        fromEmpName: 'Random Name 2',
                        toRoleName: 'Admin 3',
                        fromRoleName: 'Org Admin',
                        organisationId: 1,
                        isDraft: false
                    }
                ]
            }
        },
        viewFeedbackState: {
            date: 1694390400000,
            isExternalFeedback: false,
            feedback:
                '<ul><li>Think back on the previous review cycle and note any accomplishments or achievements you’re proud of.</li><li>When you can, try to be as specific as possible, using numbers and figures to back up your statements.</li><li>Think of your personal goals for your career development and how they may align with your company’s goals and values.</li><li>Prepare any questions you might have for your manager.</li><li>Be ready to lead the conversation. This is your performance review, after all!</li></ul><p><br></p>',
            feedbackToId: 161,
            feedbackToEmployeeId: 'asdsadsad',
            feedbackFromId: 21,
            feedbackFromEmployeeId: 'SR0051',
            feedbackTypeId: 1,
            feedbackType: 'Positive',
            toEmpName: 'Demo Name',
            fromEmpName: 'Rushad Eliyas Shaikh',
            toRoleName: 'Admin 3',
            fromRoleName: 'Org Admin',
            organisationId: 1,
            isDraft: false
        }
    }
};
