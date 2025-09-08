const BASE_URL = 'https://dummy-api.example.com';
export const RatingsListingMockData = {
    get: {
        ratingListing: {
            url: `${BASE_URL}/api/analytics/rating-listing/?organisationId=1&reviewCycleId=150&ratingType=meetsExpectations&employeeId=-99&page=undefined&limit=10`,
            urlWithPage: `${BASE_URL}/api/analytics/rating-listing/?organisationId=1&reviewCycleId=150&ratingType=meetsExpectations&employeeId=-99&page=1&limit=10`,
            responseCode: 200,
            data: {
                ratingListingCount: 11,
                ratingListing: Array.from({ length: 11 }).map((_, i) => ({
                    reviewCycleId: 150,
                    id: 110 + i,
                    employeeId: `SR00${i + 1}`,
                    firstName: 'Moly',
                    lastName: 'Agarwal',
                    checkInRating: 3.0
                }))
            }
        },
        reviewCycle: {
            url: `${BASE_URL}/api/review-cycle/getAll?organisationId=1`,
            responseCode: 200,
            data: {
                totalReviewCycles: 1,
                reviewCycles: [
                    {
                        organisationId: 1,
                        reviewCycleId: 150,
                        startDate: 1698796800000,
                        endDate: 1701302400000,
                        publish: true,
                        lastModified: 1699718185091,
                        selfReviewStartDate: 1699574400000,
                        selfReviewEndDate: 1700438400000,
                        managerReviewStartDate: 1700006400000,
                        managerReviewEndDate: 1700870400000,
                        checkInWithManagerStartDate: 1700956800000,
                        checkInWithManagerEndDate: 1701302400000
                    }
                ]
            }
        },
        employeesData: {
            url: `${BASE_URL}/api/super-admin/employees/?teamId=-99&designationId=-99&organisationId=1&roleId=-99&searchText=&departmentId=-99`,
            responseCode: 200,
            data: {
                totalEmployees: 11,
                employees: Array.from({ length: 11 }).map((_, i) => ({
                    organisationId: 1,
                    id: 100 + i,
                    employeeId: `SR00${i + 1}`,
                    firstName: 'Moly',
                    lastName: 'Agarwal',
                    status: true
                }))
            }
        },
        searchEmployeeData: {
            url: `${BASE_URL}/api/analytics/rating-listing/?organisationId=1&reviewCycleId=150&ratingType=meetsExpectations&employeeId=134&page=undefined&limit=10`,
            responseCode: 200,
            data: {
                ratingListingCount: 1,
                ratingListing: [
                    {
                        reviewCycleId: 150,
                        id: 134,
                        employeeId: 'SR001',
                        firstName: 'Moly',
                        lastName: 'Agarwal',
                        checkInRating: 3.0
                    }
                ]
            }
        },
        newReviewCycleData: {
            url: `${BASE_URL}/api/analytics/rating-listing/?organisationId=1&reviewCycleId=150&ratingType=meetsExpectations&employeeId=-99&page=1&limit=10`,
            responseCode: 200,
            data: {
                ratingListingCount: 1,
                ratingListing: [
                    {
                        reviewCycleId: 155,
                        id: 134,
                        employeeId: 'SR0090',
                        firstName: 'Moly',
                        lastName: 'Agarwal',
                        checkInRating: 3.0
                    }
                ]
            }
        },
        paginationData: {
            url: `${BASE_URL}/api/analytics/rating-listing/?organisationId=1&reviewCycleId=150&ratingType=meetsExpectations&employeeId=-99&page=2&limit=10`,
            responseCode: 200,
            data: {
                ratingListingCount: 1,
                ratingListing: [
                    {
                        reviewCycleId: 150,
                        id: 110,
                        employeeId: `SR00100`,
                        firstName: 'Moly ',
                        lastName: 'Agarwal',
                        checkInRating: 3.0
                    }
                ]
            }
        }
    },

    LocationMockData: {
        pathname: '/reports/analytics/Ratings',
        state: {
            title: 'meetsExpectations',
            reviewCycle: 150,
            ratingLabel: 'Meets Expectations'
        },
        search: '',
        hash: '',
        key: ''
    },
    someLocationMockData: {
        pathname: '/reports/analytics/Ratings',
        state: {
            title: 'meetsExpectations',
            ratingLabel: 'Meets Expectations'
        },
        search: '',
        hash: '',
        key: ''
    }
};
