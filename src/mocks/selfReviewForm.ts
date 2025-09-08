const BASE_URL = process.env.API_URL;
const CURRENT_DAY = new Date().setHours(0, 0, 0);
const ONE_DAY = 86400000;
export const selfReviewFormMockData = {
    kpi: {
        url: `${BASE_URL}/api/kpi/fetch-by-employee-id?reviewToId=72&organisationId=1&reviewTypeId=1`,
        data: [
            {
                organisationId: 1,
                id: 2,
                title: 'Communicate when tasks are taking longer than usual',
                description: '<p>this is a test feedback response</p>',
                status: true,
                versionNumber: 1
            },
            {
                organisationId: 1,
                id: 4,
                title: 'Ask when tasks are taking longer than usual 2',
                description: '<p>this is a test feedback response 2</p>',
                status: true,
                versionNumber: 1
            },
            {
                organisationId: 1,
                id: 3,
                title: 'Tell when tasks are taking longer than usual 2',
                description: '<p>this is a test feedback response 2</p>',
                status: true,
                versionNumber: 2
            }
        ]
    },
    selfReview: {
        postUrl: 'https://dummy-api.example.com/api/self-review/',

        url: `https://dummy-api.example.com/api/self-review/?reviewTypeId=1&reviewCycleId=1&organisationId=1&reviewToId=72&reviewFromId=72`,
        data: [
            {
                reviewTypeId: 1,
                reviewDetailsId: 2,
                reviewCycleId: 1,
                reviewToId: 72,
                reviewToEmployeeId: 'SR021',
                reviewFromId: 72,
                reviewFromEmployeeId: 'SR021',
                draft: false,
                published: false,
                reviewData: [
                    {
                        reviewId: 1,
                        id: 2,
                        kpiTitle: 'Communicate when tasks are taking longer than usual',
                        kpiDescription: '<p>this is a test feedback</p>',
                        review: '<p><span>This is test response, we are checking response form of self review.</span></p>',
                        rating: -1
                    },
                    {
                        reviewId: 1,
                        id: 4,
                        kpiTitle: 'Ask when tasks are taking longer than usual',
                        kpiDescription: '<p>this is a test feedback</p>',
                        review: '<p><span>This is test response, we are checking response form of self review.</span></p>',
                        rating: 3
                    },
                    {
                        reviewId: 1,
                        id: 3,
                        kpiTitle: 'Tell when tasks are taking longer than usual',
                        kpiDescription: '<p>this is a test feedback</p>',
                        review: '<p><span>This is test response, we are checking response form of self review.</span></p>',
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
        // "empDetails": [
        //   {
        //     "id": 95,
        //     "employeeId": "SR0056",
        //     "firstName": "Rahil",
        //     "lastName": "Khan",
        //     "firstManagerId": 54,
        //     "secondManagerId": 44,
        //     "selfReviewDraft": false,
        //     "selfReviewPublish": false,
        //     "firstManagerReviewDraft": false,
        //     "firstManagerReviewPublish": false,
        //     "secondManagerReviewDraft": false,
        //     "secondManagerReviewPublish": false,
        //     "checkInWithManagerDraft": false,
        //     "checkInWithManagerPublish": false
        //   },
        // ]
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
