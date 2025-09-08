const BASE_URL = 'https://dummy-api.example.com';
const CURRENT_DAY = new Date().setHours(0, 0, 0);
const ONE_DAY = 86400000;
export const managerReviewFormMockData = {
    settings: {
        url: `${BASE_URL}/api/organisation/general-settings/?organisationId=1`,
        data: { isManagerReviewMandatory: true }
    },
    kpi: {
        url: `${BASE_URL}/api/kpi/fetch-by-employee-id?reviewToId=72&organisationId=1&reviewTypeId=2`,
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
        postUrl: `${BASE_URL}/api/self-review/`,

        url: `${BASE_URL}/api/self-review/?reviewTypeId=2&reviewCycleId=1&organisationId=1&reviewToId=3&reviewFromId=72`,
        data: [
            {
                reviewTypeId: 2,
                reviewDetailsId: 2,
                reviewCycleId: 1,
                reviewToId: 75,
                reviewToEmployeeId: 'SR023',
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
        reviewCycleId: 1,
        startDate: CURRENT_DAY - ONE_DAY,
        endDate: CURRENT_DAY + ONE_DAY * 30,
        reviewToEmployeeId: 'SR002',
        reviewToId: 3,
        reviewFromId: 72,
        firstName: 'A',
        lastName: 'S',
        managerFirstName: 'M',
        managerLastName: 'L',
        reviewFromEmployeeId: 'SR004'
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
    fetctKPI: {
        url: `${BASE_URL}/api/kpi/fetch-by-employee-id?reviewToId=3&organisationId=1`,
        data: [
            {
                organisationId: 1,
                id: 2,
                title: 'Communicate when tasks are taking longer than usual',
                description: '<p>this is a test feedback responsethis is a test feedback responsethis is a test feedback response</p>',
                status: true,
                versionNumber: 1,
                ratingError: 'error'
            }
        ]
    }
};
