const CURRENT_DAY = new Date().setHours(0, 0, 0);
const ONE_DAY = 86400000;
export const checkInWithManagerFormMockData = {
    kpi: {
        url: `https://dummy-api.example.com/api/check-in-with-manager/?reviewCycleId=1&reviewTypeId=3&organisationId=1&reviewToId=72&reviewFromId=72,5,75,3`,
        data: [
            {
                reviewTypeId: 3,
                reviewDetailsId: 5,
                reviewCycleId: 1,
                reviewToId: -1,
                reviewToEmployeeId: 'SR0022',
                reviewFromId: 0,
                reviewFromEmployeeId: 'SR0021',
                draft: true,
                published: true,
                reviewData: [
                    {
                        reviewId: 1,
                        id: 1,
                        kpiTitle: 'Communicate when tasks are taking longer than usual',
                        kpiDescription: '<p>this is a test feedback response</p>',
                        review: '<p>this is a test feedback response</p>',
                        rating: 2
                    },
                    {
                        reviewId: 2,
                        id: 2,
                        kpiTitle: 'Ask when tasks are taking longer than usual',
                        kpiDescription: '<p>this is a test feedback response</p>',
                        review: '<p>this is a test feedback response</p>',
                        rating: 2
                    }
                ],
                actionItem: [
                    {
                        actionItemId: 0,
                        actionItem: '<p>this is a test action item</p>',
                        createdAt: '2023-10-19T08:10:39.053Z',
                        targetDate: '2023-10-19T08:10:39.053Z'
                    }
                ]
            }
        ],
        data2: [
            {
                reviewTypeId: 1,
                reviewDetailsId: 5,
                reviewCycleId: 1,
                reviewToId: -1,
                reviewToEmployeeId: 'SR0022',
                reviewFromId: 0,
                reviewFromEmployeeId: 'SR0021',
                draft: true,
                published: true,
                reviewData: [
                    {
                        reviewId: 1,
                        id: 1,
                        kpiTitle: 'Communicate when tasks are taking longer than usual',
                        kpiDescription: '<p>this is a test feedback response</p>',
                        review: '<p>this is a test feedback response</p>',
                        rating: 2
                    },
                    {
                        reviewId: 2,
                        id: 2,
                        kpiTitle: 'Ask when tasks are taking longer than usual',
                        kpiDescription: '<p>this is a test feedback response</p>',
                        review: '<p>this is a test feedback response</p>',
                        rating: 2
                    }
                ],
                actionItem: [
                    {
                        actionItemId: 0,
                        actionItem: '<p>this is a test action item</p>',
                        createdAt: '2023-10-19T08:10:39.053Z',
                        targetDate: '2023-10-19T08:10:39.053Z'
                    }
                ]
            }
        ]
    },
    selfReview: {
        postUrl: 'https://dummy-api.example.com/api/self-review/',

        url: `https://dummy-api.example.com/api/self-review/?reviewTypeId=1,2,3&reviewCycleId=1&organisationId=1&reviewToId=72&reviewFromId=72,5,75,3`,
        data: [
            {
                reviewTypeId: 2,
                reviewDetailsId: 350,
                reviewCycleId: 136,
                reviewToId: 72,
                reviewToEmployeeId: 'SR0033',
                reviewFromId: 5,
                reviewFromEmployeeId: 'SR021',
                draft: false,
                published: true,
                reviewData: [
                    {
                        reviewId: 1242,
                        id: 2,
                        kpiTitle: 'Communicate when tasks are taking longer than usual',
                        kpiDescription:
                            '<p>this is a test feedback responsethis is a test feedback responsethis is a test feedback response</p>',
                        review: '<p>TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT</p>',
                        rating: 2
                    }
                ]
            },
            {
                reviewTypeId: 2,
                reviewDetailsId: 350,
                reviewCycleId: 136,
                reviewToId: 72,
                reviewToEmployeeId: 'SR0033',
                reviewFromId: 75,
                reviewFromEmployeeId: 'SR021',
                draft: false,
                published: true,
                reviewData: [
                    {
                        reviewId: 1242,
                        id: 2,
                        kpiTitle: 'ask when tasks are taking longer than usual',
                        kpiDescription:
                            '<p>this is a test feedback responsethis is a test feedback responsethis is a test feedback response</p>',
                        review: '<p>TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT</p>',
                        rating: 2
                    }
                ]
            },
            {
                reviewTypeId: 1,
                reviewDetailsId: 346,
                reviewCycleId: 136,
                reviewToId: 72,
                reviewToEmployeeId: 'SR0033',
                reviewFromId: 72,
                reviewFromEmployeeId: 'SR0033',
                draft: false,
                published: true,
                reviewData: [
                    {
                        reviewId: 1234,
                        id: 2,
                        kpiTitle: 'Communicate when tasks are taking longer than usual',
                        kpiDescription:
                            '<p>this is a test feedback responsethis is a test feedback responsethis is a test feedback response</p>',
                        review: '<p>TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT</p>',
                        rating: 3
                    },
                    {
                        reviewId: 1,
                        id: 1,
                        kpiTitle: 'Report when tasks are taking longer than usual',
                        kpiDescription: '<p>this is a test feedback response text</p>',
                        review: '<p>this is a test feedback response text</p>',
                        rating: 2
                    }
                ]
            },
            {
                reviewTypeId: 3,
                reviewDetailsId: 353,
                reviewCycleId: 136,
                reviewToId: 72,
                reviewToEmployeeId: 'SR0033',
                reviewFromId: 5,
                reviewFromEmployeeId: 'SR021',
                draft: false,
                published: true,
                reviewData: [
                    {
                        reviewId: 1247,
                        id: 2,
                        kpiTitle: 'Communicate when tasks are taking longer than usual',
                        kpiDescription:
                            '<p>this is a test feedback responsethis is a test feedback responsethis is a test feedback response</p>',
                        rating: 3
                    },
                    {
                        reviewId: 1,
                        id: 1,
                        kpiTitle: 'Report when tasks are taking longer than usual',
                        kpiDescription: '<p>this is a test feedback response text</p>',
                        review: '<p>this is a test feedback response text</p>',
                        rating: 2
                    }
                ]
            }
        ],
        someData: [
            {
                reviewTypeId: 2,
                reviewDetailsId: 350,
                reviewCycleId: 136,
                reviewToId: 72,
                reviewToEmployeeId: 'SR0033',
                reviewFromId: 72,
                reviewFromEmployeeId: 'SR021',
                draft: false,
                published: true,
                reviewData: [
                    {
                        reviewId: 1242,
                        id: 2,
                        kpiTitle: 'Communicate when tasks are taking longer than usual',
                        kpiDescription:
                            '<p>this is a test feedback responsethis is a test feedback responsethis is a test feedback response</p>',
                        review: '<p>TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT</p>',
                        rating: 2
                    }
                ]
            },
            {
                reviewTypeId: 2,
                reviewDetailsId: 350,
                reviewCycleId: 136,
                reviewToId: 72,
                reviewToEmployeeId: 'SR0033',
                reviewFromId: 72,
                reviewFromEmployeeId: 'SR021',
                draft: false,
                published: true,
                reviewData: [
                    {
                        reviewId: 1242,
                        id: 2,
                        kpiTitle: 'ask when tasks are taking longer than usual',
                        kpiDescription:
                            '<p>this is a test feedback responsethis is a test feedback responsethis is a test feedback response</p>',
                        review: '<p>TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT</p>',
                        rating: 2
                    }
                ]
            },
            {
                reviewTypeId: 1,
                reviewDetailsId: 346,
                reviewCycleId: 136,
                reviewToId: 72,
                reviewToEmployeeId: 'SR0033',
                reviewFromId: 72,
                reviewFromEmployeeId: 'SR0033',
                draft: false,
                published: true,
                reviewData: [
                    {
                        reviewId: 1234,
                        id: 2,
                        kpiTitle: 'Communicate when tasks are taking longer than usual',
                        kpiDescription:
                            '<p>this is a test feedback responsethis is a test feedback responsethis is a test feedback response</p>',
                        review: '<p>TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT</p>',
                        rating: 3
                    },
                    {
                        reviewId: 1,
                        id: 1,
                        kpiTitle: 'Report when tasks are taking longer than usual',
                        kpiDescription: '<p>this is a test feedback response text</p>',
                        review: '<p>this is a test feedback response text</p>',
                        rating: 2
                    }
                ]
            }
        ],
        someData2: [
            {
                reviewTypeId: 2,
                reviewDetailsId: 350,
                reviewCycleId: 136,
                reviewToId: 72,
                reviewToEmployeeId: 'SR0033',
                reviewFromId: 72,
                reviewFromEmployeeId: 'SR021',
                draft: false,
                published: true,
                reviewData: [
                    {
                        reviewId: 1242,
                        id: 2,
                        kpiTitle: 'Communicate when tasks are taking longer than usual',
                        kpiDescription:
                            '<p>this is a test feedback responsethis is a test feedback responsethis is a test feedback response</p>',
                        review: '<p>TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT</p>',
                        rating: 2
                    }
                ]
            },
            {
                reviewTypeId: 2,
                reviewDetailsId: 350,
                reviewCycleId: 136,
                reviewToId: 72,
                reviewToEmployeeId: 'SR0033',
                reviewFromId: 5,
                reviewFromEmployeeId: 'SR021',
                draft: false,
                published: true,
                reviewData: [
                    {
                        reviewId: 1242,
                        id: 2,
                        kpiTitle: 'ask when tasks are taking longer than usual',
                        kpiDescription:
                            '<p>this is a test feedback responsethis is a test feedback responsethis is a test feedback response</p>',
                        review: '<p>TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT</p>',
                        rating: 2
                    }
                ]
            },
            {
                reviewTypeId: 1,
                reviewDetailsId: 346,
                reviewCycleId: 136,
                reviewToId: 72,
                reviewToEmployeeId: 'SR0033',
                reviewFromId: 72,
                reviewFromEmployeeId: 'SR0033',
                draft: false,
                published: true,
                reviewData: [
                    {
                        reviewId: 1234,
                        id: 2,
                        kpiTitle: 'Communicate when tasks are taking longer than usual',
                        kpiDescription:
                            '<p>this is a test feedback responsethis is a test feedback responsethis is a test feedback response</p>',
                        review: '<p>TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT</p>',
                        rating: 3
                    },
                    {
                        reviewId: 1,
                        id: 1,
                        kpiTitle: 'Report when tasks are taking longer than usual',
                        kpiDescription: '<p>this is a test feedback response text</p>',
                        review: '<p>this is a test feedback response text</p>',
                        rating: 2
                    }
                ]
            }
        ]
    },
    mockState: {
        organisationId: 1,
        reviewCycleId: 1,
        startDate: CURRENT_DAY - ONE_DAY,
        endDate: CURRENT_DAY + ONE_DAY * 30,
        publish: true,
        selfReviewStartDate: CURRENT_DAY + ONE_DAY,
        selfReviewEndDate: CURRENT_DAY + ONE_DAY * 5,
        managerReviewStartDate: CURRENT_DAY + ONE_DAY,
        managerReviewEndDate: CURRENT_DAY + ONE_DAY * 5,
        selfReviewDraft: false,
        selfReviewPublish: false,
        selfReviewDate: CURRENT_DAY,
        selfAverageRating: 5,
        firstManagerId: 54,
        firstManagerEmployeeId: 'SR0039',
        firstManagerFirstName: 'Aamir',
        firstManagerLastName: 'Islam',
        firstManagerReviewDraft: false,
        firstManagerReviewPublish: false,
        firstManagerAverageRating: -1,
        secondManagerReviewDraft: false,
        secondManagerReviewPublish: false,
        secondManagerAverageRating: -1,
        checkInWithManagerStartDate: CURRENT_DAY + ONE_DAY * 6,
        checkInWithManagerEndDate: CURRENT_DAY + ONE_DAY * 9,
        checkInWithManagerDraft: false,
        checkInWithManagerPublish: false,
        checkInWithManagerAverageRating: -1,
        isOrWasManager: true
    },
    editMockState: {
        reviewCycleId: 1,
        startDate: CURRENT_DAY - ONE_DAY,
        endDate: CURRENT_DAY + ONE_DAY * 30,
        selfReviewStartDate: CURRENT_DAY + ONE_DAY,
        selfReviewEndDate: CURRENT_DAY + ONE_DAY * 5,
        draft: true,
        publish: false,
        updatedAt: CURRENT_DAY,
        averageRating: 2.3
    },
    editMockState2: {
        reviewCycleId: 1,
        selfReviewStartDate: CURRENT_DAY + ONE_DAY,
        selfReviewEndDate: CURRENT_DAY + ONE_DAY * 5,
        draft: true,
        publish: false,
        updatedAt: CURRENT_DAY,
        averageRating: 2.3
    },
    viewMockState: {
        reviewCycleId: 1,
        startDate: 0,
        endDate: 0,
        selfReviewStartDate: CURRENT_DAY + ONE_DAY,
        selfReviewEndDate: CURRENT_DAY + ONE_DAY * 5,
        draft: true,
        publish: false,
        updatedAt: CURRENT_DAY,
        averageRating: 2.3
    },
    newReviewState: {
        id: 72,
        employeeId: 'SR0022',
        firstName: 'A',
        lastName: 'G',
        firstManagerId: 5,
        selfReviewDraft: false,
        selfReviewPublish: true,
        firstManagerReviewDraft: false,
        firstManagerReviewPublish: true,
        secondManagerReviewDraft: false,
        secondManagerReviewPublish: false,
        secondManagerFirstName: 'TestManager',
        secondManagerLastName: 'Second',
        secondManagerEmployeeId: 6,
        checkInWithManagerDraft: false,
        checkInWithManagerPublish: false,
        managerState: 'disabled',
        checkInState: 'active',
        managerLinkText: 'Abhishek Ghadage (SR0022) - Pending',
        checkInLinkText: 'Abhishek Ghadage (SR0022) - Pending',
        reviewToId: 72,
        secondManagerId: 75,
        checkInFromId: 3
    },
    viewTeamFeedbackMockData: {
        feedback: {
            url: 'https://dummy-api.example.com/api/dashboard/employee-feedback/?id=72&organisationId=1&feedbackTypeId=1&reviewCycleId=1',
            data: {
                positiveFeedbackCount: 2,
                improvementFeedbackCount: 1,
                appreciationFeedbackCount: 3,
                totalFeedbacks: 2,
                feedbacks: [
                    {
                        feedbackType: 'Positive',
                        feedback: '<p>Test text</p>',
                        feedbackFromId: 73,
                        feedbackFromEmployeeId: 'SR0022',
                        feedbackFromFirstName: 'A',
                        feedbackFromLastName: 'G',
                        feedbackFromRoleName: 'Manager',
                        submitDate: 1689754057181,
                        isDraft: false
                    },
                    {
                        feedbackType: 'Positive',
                        feedback:
                            '<p><span style="color: rgb(96, 120, 144);">Positive feedback is a way to recognize and appreciate a job well done. When giving positive feedback:</span></p><ul><li>Be specific: Identify what the person did well and why it was important.</li><li>Use "I" statements: Focus on your own experience and reactions, rather than making judgments or assumptions about the other person.</li></ul><p><br></p>',
                        feedbackFromId: 74,
                        feedbackFromEmployeeId: 'SR0050',
                        feedbackFromFirstName: 'M',
                        feedbackFromLastName: 'A',
                        feedbackFromRoleName: 'Human Resource',
                        submitDate: 1688735276632,
                        isDraft: false
                    }
                ]
            }
        }
    }
};
