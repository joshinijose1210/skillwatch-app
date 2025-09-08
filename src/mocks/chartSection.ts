export const ChartSectionMockData = {
    reviewCycleId: '46',
    get: {
        reviewStatus: {
            url: 'https://dummy-api.example.com/api/analytics/review-status/?organisationId=1&reviewCycleId=46',
            data: {
                self: {
                    completed: 1,
                    inProgress: 0,
                    pending: 5
                },
                manager1: {
                    completed: 0,
                    inProgress: 0,
                    pending: 6
                },
                manager2: {
                    completed: 0,
                    inProgress: 0,
                    pending: 6
                },
                checkIn: {
                    completed: 0,
                    inProgress: 0,
                    pending: 6
                }
            }
        },
        feedbackGraph: {
            url: 'https://dummy-api.example.com/api/analytics/feedback-graph/?organisationId=1&reviewCycleId=46',
            data: {
                analyticsFeedbackCount: {
                    positive: 1,
                    improvement: 0,
                    appreciation: 1
                },
                analyticsFeedbackPercentage: {
                    positive: 50.0,
                    improvement: 0.0,
                    appreciation: 50.0
                }
            }
        }
    }
};
