export const dashboardMockData = {
    reviewCycle: {
        url: 'https://dummy-api.example.com/api/review-cycle/getAll?organisationId=1',
        data: {
            totalReviewCycles: 2,
            reviewCycles: [
                {
                    organisationId: 1,
                    reviewCycleId: 1,
                    startDate: 1693699200000,
                    endDate: 1696032000000,
                    publish: true,
                    lastModified: 1694673262129,
                    selfReviewStartDate: 1693785600000,
                    selfReviewEndDate: 1693958400000,
                    managerReviewStartDate: 1693958400000,
                    managerReviewEndDate: 1694131200000,
                    checkInWithManagerStartDate: 1694304000000,
                    checkInWithManagerEndDate: 1694736000000
                },
                {
                    organisationId: 1,
                    reviewCycleId: 2,
                    startDate: 1693353600000,
                    endDate: 1693612800000,
                    publish: false,
                    lastModified: 1693460037990,
                    selfReviewStartDate: 1693353600000,
                    selfReviewEndDate: 1693353600000,
                    managerReviewStartDate: 1693353600000,
                    managerReviewEndDate: 1693353600000,
                    checkInWithManagerStartDate: 1693440000000,
                    checkInWithManagerEndDate: 1693526400000
                }
            ]
        }
    },
    feedBackOverview: {
        url: 'https://dummy-api.example.com/api/dashboard/feedback-overview/?organisationId=1&id=72',
        data: [
            {
                reviewCycleId: 1,
                firstName: 'Aamir',
                startDate: 1693699200000,
                endDate: 1696032000000,
                selfReviewStartDate: 1693785600000,
                selfReviewEndDate: 1693958400000,
                selfReviewDraft: false,
                selfReviewPublish: false,
                positive: 0,
                improvement: 0,
                appreciation: 0
            }
        ],
        selfReviewData: [
            {
                reviewCycleId: 1,
                firstName: 'AA',
                startDate: new Date().setHours(0, 0, 0),
                endDate: new Date().setHours(0, 0, 0) + 86400000 * 30,
                selfReviewStartDate: new Date().setHours(0, 0, 0) - 86400000,
                selfReviewEndDate: new Date().setHours(0, 0, 0) + 86400000 * 3,
                selfReviewDraft: false,
                selfReviewPublish: false,
                positive: 0,
                improvement: 0,
                appreciation: 0
            }
        ]
    },
    actionItem: {
        url: 'https://dummy-api.example.comapi/dashboard/action-item/?organisationId=1&id=72&reviewCycleId=1',
        data: {
            totalActionItems: 1,
            actionItems: []
        }
    },
    averageRating: {
        url: 'https://dummy-api.example.com/api/dashboard/average-ratings?organisationId=1&reviewToId=72&reviewCycleId=',
        data: {
            avgSelfReviewRating: 2,
            avgFirstManagerRating: 0,
            avgSecondManagerReviewRating: 0,
            avgCheckInReviewRating: 3.44
        }
    },
    employeeFeedback: {
        url: 'https://dummy-api.example.com/api/dashboard/employee-feedback/?id=-99&organisationId=1&feedbackTypeId=3&reviewCycleId=1',
        data: {
            positiveFeedbackCount: 0,
            improvementFeedbackCount: 0,
            appreciationFeedbackCount: 0,
            totalFeedbacks: 0
        }
    },
    feedBackGraph: {
        url: 'https://dummy-api.example.com/api/dashboard/feedback-graph?organisationId=1&id=72&reviewCycleId=',
        data: {
            feedbackCounts: {
                submittedPositiveCount: 3,
                submittedImprovementCount: 4,
                submittedAppreciationCount: 2,
                receivedPositiveCount: 13,
                receivedImprovementCount: 0,
                receivedAppreciationCount: 15
            },
            feedbackPercentages: {
                submittedPositivePercentage: 30,
                submittedImprovementPercentage: 20,
                submittedAppreciationPercentage: 20,
                receivedPositivePercentage: 30.4,
                receivedImprovementPercentage: 0,
                receivedAppreciationPercentage: 0
            }
        }
    },
    LocationMockData: {
        pathname: '/',
        state: null,
        search: '',
        hash: '',
        key: ''
    }
};
