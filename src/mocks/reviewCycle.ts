export const reviewCycleMockData = {
    post: {
        url: 'https://dummy-api.example.com/api/review-cycle/',
        responseCode: 200,
        data: {
            startDate: '2023-10-15',
            endDate: '2023-11-15',
            selfReviewStartDate: '2023-10-15',
            selfReviewEndDate: '2023-10-28',
            managerReviewStartDate: '2023-11-01',
            managerReviewEndDate: '2023-11-07',
            checkInWithManagerStartDate: '2023-11-08',
            checkInWithManagerEndDate: '2023-11-15',
            publish: false,
            organisationId: 1,
            actionBy: 72,
            ipAddress: '216.24.57.253:443'
        }
    },
    put: {
        url: 'https://dummy-api.example.com/api/review-cycle/14',
        responseCode: 200
    },
    editLocationMockState: {
        organisationId: 1,
        reviewCycleId: 14,
        startDate: 1698451200000,
        endDate: 1699228800000,
        publish: false,
        lastModified: 1695363098884,
        selfReviewStartDate: 1698451200000,
        selfReviewEndDate: 1698624000000,
        managerReviewStartDate: 1698451200000,
        managerReviewEndDate: 1698710400000,
        checkInWithManagerStartDate: 1698796800000,
        checkInWithManagerEndDate: 1699228800000,
        reviewCycle: '28th Oct 2023 - 6th Nov 2023',
        action: 'Edit'
    },
    getAll: {
        url: 'https://dummy-api.example.com/api/review-cycle/getAll?page=1&organisationId=1&limit=10',
        data: {
            totalReviewCycles: 12,
            reviewCycles: [
                {
                    organisationId: 1,
                    reviewCycleId: 46,
                    startDate: 1716249600000,
                    endDate: 1716336000000,
                    publish: true,
                    lastModified: 1716297927875,
                    selfReviewStartDate: 1716249600000,
                    selfReviewEndDate: 1716249600000,
                    managerReviewStartDate: 1716249600000,
                    managerReviewEndDate: 1716249600000,
                    checkInWithManagerStartDate: 1716336000000,
                    checkInWithManagerEndDate: 1716336000000
                },
                {
                    organisationId: 1,
                    reviewCycleId: 46,
                    startDate: 1716249600000,
                    endDate: 1716336000000,
                    publish: true,
                    lastModified: 1716297927875,
                    selfReviewStartDate: 1716249600000,
                    selfReviewEndDate: 1716249600000,
                    managerReviewStartDate: 1716249600000,
                    managerReviewEndDate: 1716249600000,
                    checkInWithManagerStartDate: 1716336000000,
                    checkInWithManagerEndDate: 1716336000000
                },
                {
                    organisationId: 1,
                    reviewCycleId: 46,
                    startDate: 1716249600000,
                    endDate: 1716336000000,
                    publish: true,
                    lastModified: 1716297927875,
                    selfReviewStartDate: 1716249600000,
                    selfReviewEndDate: 1716249600000,
                    managerReviewStartDate: 1716249600000,
                    managerReviewEndDate: 1716249600000,
                    checkInWithManagerStartDate: 1716336000000,
                    checkInWithManagerEndDate: 1716336000000
                },
                {
                    organisationId: 1,
                    reviewCycleId: 46,
                    startDate: 1716249600000,
                    endDate: 1716336000000,
                    publish: true,
                    lastModified: 1716297927875,
                    selfReviewStartDate: 1716249600000,
                    selfReviewEndDate: 1716249600000,
                    managerReviewStartDate: 1716249600000,
                    managerReviewEndDate: 1716249600000,
                    checkInWithManagerStartDate: 1716336000000,
                    checkInWithManagerEndDate: 1716336000000
                },
                {
                    organisationId: 1,
                    reviewCycleId: 46,
                    startDate: 1716249600000,
                    endDate: 1716336000000,
                    publish: true,
                    lastModified: 1716297927875,
                    selfReviewStartDate: 1716249600000,
                    selfReviewEndDate: 1716249600000,
                    managerReviewStartDate: 1716249600000,
                    managerReviewEndDate: 1716249600000,
                    checkInWithManagerStartDate: 1716336000000,
                    checkInWithManagerEndDate: 1716336000000
                },
                {
                    organisationId: 1,
                    reviewCycleId: 46,
                    startDate: 1716249600000,
                    endDate: 1716336000000,
                    publish: true,
                    lastModified: 1716297927875,
                    selfReviewStartDate: 1716249600000,
                    selfReviewEndDate: 1716249600000,
                    managerReviewStartDate: 1716249600000,
                    managerReviewEndDate: 1716249600000,
                    checkInWithManagerStartDate: 1716336000000,
                    checkInWithManagerEndDate: 1716336000000
                },
                {
                    organisationId: 1,
                    reviewCycleId: 46,
                    startDate: 1716249600000,
                    endDate: 1716336000000,
                    publish: true,
                    lastModified: 1716297927875,
                    selfReviewStartDate: 1716249600000,
                    selfReviewEndDate: 1716249600000,
                    managerReviewStartDate: 1716249600000,
                    managerReviewEndDate: 1716249600000,
                    checkInWithManagerStartDate: 1716336000000,
                    checkInWithManagerEndDate: 1716336000000
                },
                {
                    organisationId: 1,
                    reviewCycleId: 46,
                    startDate: 1716249600000,
                    endDate: 1716336000000,
                    publish: true,
                    lastModified: 1716297927875,
                    selfReviewStartDate: 1716249600000,
                    selfReviewEndDate: 1716249600000,
                    managerReviewStartDate: 1716249600000,
                    managerReviewEndDate: 1716249600000,
                    checkInWithManagerStartDate: 1716336000000,
                    checkInWithManagerEndDate: 1716336000000
                },
                {
                    organisationId: 1,
                    reviewCycleId: 46,
                    startDate: 1716249600000,
                    endDate: 1716336000000,
                    publish: true,
                    lastModified: 1716297927875,
                    selfReviewStartDate: 1716249600000,
                    selfReviewEndDate: 1716249600000,
                    managerReviewStartDate: 1716249600000,
                    managerReviewEndDate: 1716249600000,
                    checkInWithManagerStartDate: 1716336000000,
                    checkInWithManagerEndDate: 1716336000000
                },

                {
                    organisationId: 1,
                    reviewCycleId: 40,
                    startDate: 1714521600000,
                    endDate: 1715904000000,
                    publish: false,
                    lastModified: 1716297892486,
                    selfReviewStartDate: 1714521600000,
                    selfReviewEndDate: 1715212800000,
                    managerReviewStartDate: 1715126400000,
                    managerReviewEndDate: 1715299200000,
                    checkInWithManagerStartDate: 1715385600000,
                    checkInWithManagerEndDate: 1715904000000
                }
            ]
        }
    },
    paginatedData: {
        url: 'https://dummy-api.example.com/api/review-cycle/getAll?page=2&organisationId=1&limit=10',
        data: {
            totalReviewCycles: 12,
            reviewCycles: [
                {
                    organisationId: 1,
                    reviewCycleId: 41,
                    startDate: 1714521600000,
                    endDate: 1815904000000,
                    publish: false,
                    lastModified: 1716297892486,
                    selfReviewStartDate: 1714521600000,
                    selfReviewEndDate: 1715212800000,
                    managerReviewStartDate: 1715126400000,
                    managerReviewEndDate: 1715299200000,
                    checkInWithManagerStartDate: 1715385600000,
                    checkInWithManagerEndDate: 1715904000000
                },
                {
                    organisationId: 1,
                    reviewCycleId: 41,
                    startDate: 1714521600000,
                    endDate: 1715904000000,
                    publish: false,
                    lastModified: 1716297892486,
                    selfReviewStartDate: 1714521600000,
                    selfReviewEndDate: 1715212800000,
                    managerReviewStartDate: 1715126400000,
                    managerReviewEndDate: 1715299200000,
                    checkInWithManagerStartDate: 1715385600000,
                    checkInWithManagerEndDate: 1715904000000
                }
            ]
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
