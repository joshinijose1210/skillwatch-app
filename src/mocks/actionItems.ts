const BASE_URL = 'https://dummy-api.example.com';
export const actionItemsMockData = {
    checkInData: {
        url: `${BASE_URL}/api/check-in-with-manager/?reviewCycleId=1&reviewTypeId=3&organisationId=1&reviewToId=72&reviewFromId=73`,
        postUrl: `${BASE_URL}/api/check-in-with-manager/`,
        data: [
            {
                reviewTypeId: 3,
                reviewDetailsId: 367,
                reviewCycleId: 1,
                reviewToId: 72,
                reviewToEmployeeId: 'SR021',
                reviewFromId: 73,
                reviewFromEmployeeId: 'SR0033',
                draft: true,
                published: false,
                reviewData: [
                    {
                        reviewId: 1268,
                        id: 2,
                        kpiTitle: 'Communicate when tasks are taking longer than usual',
                        kpiDescription:
                            '<p>this is a test feedback responsethis is a test feedback responsethis is a test feedback response</p>',
                        review: '<p>his is a test feedback response this is a test feedback response this is a test feedback response</p>',
                        rating: 3
                    }
                ]
            }
        ],
        dataWithAction: [
            {
                reviewTypeId: 3,
                reviewDetailsId: 367,
                reviewCycleId: 1,
                reviewToId: 72,
                reviewToEmployeeId: 'SR021',
                reviewFromId: 73,
                reviewFromEmployeeId: 'SR0033',
                draft: true,
                published: false,
                reviewData: [
                    {
                        reviewId: 1268,
                        id: 2,
                        kpiTitle: 'Communicate when tasks are taking longer than usual',
                        kpiDescription:
                            '<p>this is a test feedback responsethis is a test feedback responsethis is a test feedback response</p>',
                        review: '<p>his is a test feedback response this is a test feedback response this is a test feedback response</p>',
                        rating: 3
                    }
                ],
                actionItem: [
                    {
                        actionItemId: 1,
                        actionItem: 'test action item',
                        targetDate: '2023-11-03'
                    }
                ]
            }
        ]
    },
    employeeDetails: {
        url: `${BASE_URL}/api/employees/by-id/?id=72`,
        data: {
            organisationId: 1,
            id: 72,
            employeeId: 'SR021',
            firstName: 'A',
            lastName: 'I',
            emailId: 'test.user@scalereal.com',
            contactNo: '+918847746363',
            genderId: 1,
            dateOfBirth: 808531200000,
            dateOfJoining: 1627862400000,
            experienceInMonths: 2,
            status: true,
            isConsultant: false,
            departmentId: 172,
            departmentName: 'Testingg',
            teamId: 311,
            teamName: 'QA 1',
            designationId: 419,
            designationName: 'D1',
            roleId: 151,
            roleName: 'Org Admin',
            firstManagerId: 92,
            firstManagerEmployeeId: 'SR0033',
            firstManagerFirstName: 'M',
            firstManagerLastName: 'P',
            employeeNameWithEmployeeId: 'A I (SR021)'
        }
    },
    averageRating: {
        url: `${BASE_URL}/api/dashboard/average-ratings?organisationId=1&reviewToId=72&reviewCycleId=1`,
        data: {
            avgSelfReviewRating: 3,
            avgFirstManagerRating: 3,
            avgSecondManagerReviewRating: 0,
            avgCheckInReviewRating: 0
        }
    },
    mockState: {
        reviewTypeId: 3,
        reviewCycleId: 1,
        reviewToId: 72,
        reviewToEmployeeId: 'SR021',
        reviewFromId: 73,
        firstManagerId: 73,
        draft: true,
        organisationId: 1,
        published: false,
        reviewData: [
            {
                id: 612,
                review: '<p>his is a test feedback response this is a test feedback response this is a test feedback response</p>',
                rating: 3
            }
        ],
        reviewDetailsId: 367,
        actionItem: []
    },
    LocationMockData: {
        pathname: '/',
        state: null,
        search: '',
        hash: '',
        key: ''
    }
};
