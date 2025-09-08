const BASE_URL = 'https://dummy-api.example.com';
export const ReportsAnalyticsMockData = {
    get: {
        analyticsCards: {
            url: `${BASE_URL}/api/analytics/ratings/?organisationId=1&reviewCycleId=14`,
            responseCode: 200,
            data: {
                unsatisfactory: 0,
                needsImprovement: 0,
                meetsExpectations: 0,
                exceedsExpectations: 0,
                outstanding: 0
            }
        },
        reviewCycles: {
            url: `${BASE_URL}/api/review-cycle/getAll?organisationId=1`,
            responseCode: 200,
            data: {
                totalReviewCycles: 2,
                reviewCycles: [
                    {
                        organisationId: 1,
                        reviewCycleId: 14,
                        startDate: 1696982400000,
                        endDate: 1699660800000,
                        publish: true,
                        lastModified: 1697093562855,
                        selfReviewStartDate: 1697068800000,
                        selfReviewEndDate: 1697414400000,
                        managerReviewStartDate: 1697500800000,
                        managerReviewEndDate: 1698105600000,
                        checkInWithManagerStartDate: 1698192000000,
                        checkInWithManagerEndDate: 1699142400000
                    },
                    {
                        organisationId: 1,
                        reviewCycleId: 55,
                        startDate: 1700006400000,
                        endDate: 1702598400000,
                        publish: false,
                        lastModified: 1697016535720,
                        selfReviewStartDate: 1701129600000,
                        selfReviewEndDate: 1701129600000,
                        managerReviewStartDate: 1701388800000,
                        managerReviewEndDate: 1701734400000,
                        checkInWithManagerStartDate: 1701820800000,
                        checkInWithManagerEndDate: 1702598400000
                    }
                ]
            }
        },
        rankingsData: {
            url: `${BASE_URL}/api/analytics/rankings/?organisationId=1&reviewCycleId=`,
            responseCode: 200,
            data: [
                {
                    reviewCycleId: 14,
                    id: 121,
                    employeeId: 'DU112233',
                    firstName: 'Dummy',
                    lastName: 'User',
                    checkInRating: 4.5
                }
            ]
        },
        employeeData: {
            url: `${BASE_URL}/api/employees/get-all/by-review-cycle?organisationId=1&reviewCycleId=`,
            responseCode: 200,
            data: 89
        },
        demographicData: {
            url: `${BASE_URL}/api/analytics/employees-data/?organisationId=1&reviewCycleId=`,
            responseCode: 200,
            data: {
                gendersData: {
                    gendersCount: {
                        malesCount: 27,
                        femalesCount: 9,
                        othersCount: 53
                    },
                    gendersPercentage: {
                        malesPercentage: 30.337078651685395,
                        femalesPercentage: 10.112359550561797,
                        othersPercentage: 59.55056179775281
                    }
                },
                averageTenure: {
                    years: 0,
                    months: 3
                },
                averageAge: {
                    years: 4,
                    months: 9
                },
                experienceRangeCount: [
                    {
                        range: '0-1 year',
                        count: 72
                    },
                    {
                        range: '1-3 years',
                        count: 15
                    },
                    {
                        range: '3-7 years',
                        count: 2
                    },
                    {
                        range: '7-10 years',
                        count: 0
                    },
                    {
                        range: '10-15 years',
                        count: 0
                    },
                    {
                        range: '15-20 years',
                        count: 0
                    },
                    {
                        range: '20+ years',
                        count: 0
                    }
                ],
                employeesType: {
                    fullTime: {
                        count: 82,
                        percentage: 92.13483146067416
                    },
                    consultant: {
                        count: 7,
                        percentage: 7.865168539325842
                    }
                },
                teamEmployeeCount: [
                    {
                        teamName: 'Org Admin',
                        employeeCount: 16
                    },
                    {
                        teamName: 'Human Resources',
                        employeeCount: 2
                    },
                    {
                        teamName: 'BA Team',
                        employeeCount: 32
                    },
                    {
                        teamName: 'BA',
                        employeeCount: 13
                    },
                    {
                        teamName: 'DempTeam',
                        employeeCount: 1
                    },
                    {
                        teamName: 'Frontend Team',
                        employeeCount: 8
                    },
                    {
                        teamName: 'Backend Team',
                        employeeCount: 3
                    },
                    {
                        teamName: 'Account Team134',
                        employeeCount: 2
                    },
                    {
                        teamName: 'Backend',
                        employeeCount: 2
                    },
                    {
                        teamName: 'DemoTeam',
                        employeeCount: 1
                    },
                    {
                        teamName: 'QA',
                        employeeCount: 1
                    },
                    {
                        teamName: 'BA-123',
                        employeeCount: 2
                    },
                    {
                        teamName: 'AI-ML',
                        employeeCount: 3
                    },
                    {
                        teamName: 'ABCDEQED',
                        employeeCount: 1
                    },
                    {
                        teamName: 'Admin',
                        employeeCount: 2
                    }
                ]
            }
        },
        feedbackAnalytics: {
            url: `${BASE_URL}/api/analytics/feedback-graph/?organisationId=1&reviewCycleId=14`,
            responseCode: 200,
            data: {
                analyticsFeedbackCount: {
                    positive: 17,
                    improvement: 5,
                    appreciation: 22
                },
                analyticsFeedbackPercentage: {
                    positive: 38.63636363636363,
                    improvement: 11.363636363636363,
                    appreciation: 50
                }
            }
        }
    }
};
