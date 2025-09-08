const url = 'https://dummy-api.example.com/api/review-cycle/timeline/?organisationId=1&reviewToId=72';

const userData = {
    organisationId: 36,
    reviewCycleId: 133,
    startDate: 1690416000000, // 27-07-23
    endDate: 1695772800000, // 27-09-23
    publish: true,
    selfReviewStartDate: 1690675200000, // 30-07-23
    selfReviewEndDate: 1691712000000, // 11-08-23
    managerReviewStartDate: 1692057600000, // 15-08-23
    managerReviewEndDate: 1692835200000, // 30-08-23
    selfReviewDraft: false,
    selfReviewPublish: false,
    selfAverageRating: -1.0,
    firstManagerId: 192,
    firstManagerEmployeeId: 'SR00322',
    firstManagerFirstName: 'Yogesh',
    firstManagerLastName: 'Jadhav',
    secondManagerId: 112,
    firstManagerReviewDraft: false,
    firstManagerReviewPublish: false,
    firstManagerAverageRating: -1.0,
    secondManagerReviewDraft: false,
    secondManagerReviewPublish: false,
    secondManagerAverageRating: -1.0,
    checkInWithManagerStartDate: 1693526400000, // 01-09-23
    checkInWithManagerEndDate: 1695686400000, // 26-09-23
    checkInWithManagerDraft: false,
    checkInWithManagerPublish: false,
    checkInWithManagerAverageRating: -1.0,
    isOrWasManager: true
};

const empDetails = [
    {
        id: 219,
        employeeId: 'SR00224',
        firstName: 'Stephen',
        lastName: 'Thomas',
        firstManagerId: 72,
        secondManagerId: 123,
        selfReviewDraft: false,
        selfReviewPublish: false,
        firstManagerReviewDraft: false,
        firstManagerReviewPublish: false,
        secondManagerReviewDraft: false,
        secondManagerReviewPublish: false,
        checkInWithManagerDraft: false,
        checkInWithManagerPublish: false
    },
    {
        id: 194,
        employeeId: '9987',
        firstName: 'Yo',
        lastName: 'Yo',
        firstManagerId: 143,
        secondManagerId: 72,
        selfReviewDraft: false,
        selfReviewPublish: false,
        firstManagerReviewDraft: false,
        firstManagerReviewPublish: false,
        secondManagerReviewDraft: false,
        secondManagerReviewPublish: false,
        checkInWithManagerDraft: false,
        checkInWithManagerPublish: false
    }
];

const managerReviewDraftEmpDetails = [
    {
        id: 219,
        employeeId: 'SR00224',
        firstName: 'Stephen',
        lastName: 'Thomas',
        firstManagerId: 72,
        secondManagerId: 123,
        selfReviewDraft: false,
        selfReviewPublish: true,
        firstManagerReviewDraft: true,
        firstManagerReviewPublish: false,
        secondManagerReviewDraft: false,
        secondManagerReviewPublish: false,
        checkInWithManagerDraft: false,
        checkInWithManagerPublish: false
    },
    {
        id: 194,
        employeeId: '9987',
        firstName: 'Yo',
        lastName: 'Yo',
        firstManagerId: 143,
        secondManagerId: 72,
        selfReviewDraft: false,
        selfReviewPublish: true,
        firstManagerReviewDraft: false,
        firstManagerReviewPublish: false,
        secondManagerReviewDraft: false,
        secondManagerReviewPublish: false,
        checkInWithManagerDraft: false,
        checkInWithManagerPublish: false
    }
];

const managerReviewPublishEmpDetails = [
    {
        id: 219,
        employeeId: 'SR00224',
        firstName: 'Stephen',
        lastName: 'Thomas',
        firstManagerId: 72,
        secondManagerId: 123,
        selfReviewDraft: false,
        selfReviewPublish: true,
        firstManagerReviewDraft: false,
        firstManagerReviewPublish: true,
        secondManagerReviewDraft: false,
        secondManagerReviewPublish: false,
        checkInWithManagerDraft: false,
        checkInWithManagerPublish: false
    },
    {
        id: 194,
        employeeId: '9987',
        firstName: 'Yo',
        lastName: 'Yo',
        firstManagerId: 143,
        secondManagerId: 72,
        selfReviewDraft: false,
        selfReviewPublish: true,
        firstManagerReviewDraft: false,
        firstManagerReviewPublish: false,
        secondManagerReviewDraft: false,
        secondManagerReviewPublish: true,
        checkInWithManagerDraft: false,
        checkInWithManagerPublish: false
    }
];

const checkInDraftEmp = [
    {
        id: 219,
        employeeId: 'SR00224',
        firstName: 'Stephen',
        lastName: 'Thomas',
        firstManagerId: 72,
        secondManagerId: 123,
        selfReviewDraft: false,
        selfReviewPublish: true,
        firstManagerReviewDraft: false,
        firstManagerReviewPublish: true,
        secondManagerReviewDraft: false,
        secondManagerReviewPublish: false,
        checkInWithManagerDraft: true,
        checkInWithManagerPublish: false
    },
    {
        id: 194,
        employeeId: '9987',
        firstName: 'Yo',
        lastName: 'Yo',
        firstManagerId: 143,
        secondManagerId: 72,
        selfReviewDraft: false,
        selfReviewPublish: true,
        firstManagerReviewDraft: false,
        firstManagerReviewPublish: false,
        secondManagerReviewDraft: false,
        secondManagerReviewPublish: true,
        checkInWithManagerDraft: false,
        checkInWithManagerPublish: false
    }
];

const checkInPublishEmp = [
    {
        id: 219,
        employeeId: 'SR00224',
        firstName: 'Stephen',
        lastName: 'Thomas',
        firstManagerId: 72,
        secondManagerId: 123,
        selfReviewDraft: false,
        selfReviewPublish: true,
        firstManagerReviewDraft: false,
        firstManagerReviewPublish: true,
        secondManagerReviewDraft: false,
        secondManagerReviewPublish: false,
        checkInWithManagerDraft: false,
        checkInWithManagerPublish: true
    },
    {
        id: 194,
        employeeId: '9987',
        firstName: 'Yo',
        lastName: 'Yo',
        firstManagerId: 143,
        secondManagerId: 72,
        selfReviewDraft: false,
        selfReviewPublish: true,
        firstManagerReviewDraft: false,
        firstManagerReviewPublish: false,
        secondManagerReviewDraft: false,
        secondManagerReviewPublish: true,
        checkInWithManagerDraft: false,
        checkInWithManagerPublish: true
    }
];

export const reviewTimelineMockData = {
    reviewTimeline: {
        defaultGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails
                }
            ]
        },
        inactiveReviewCycleGet: {
            url,
            responseCode: 200,
            data: []
        },
        scheduledReviewCycleGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails,
                    startDate: 1698451200000,
                    endDate: 1699228800000
                }
            ]
        },
        startedReviewCycleGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    isReviewCycleActive: true
                }
            ]
        },
        selfReviewStartedGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDraft: false,
                    selfReviewPublish: false,
                    selfAverageRating: -1.0,
                    isReviewCycleActive: true,
                    isSelfReviewActive: true
                }
            ]
        },
        selfReviewPassedGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails,
                    startDate: 1689897600000,
                    endDate: 1693353600000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1692576000000,
                    selfReviewDraft: false,
                    selfReviewPublish: false,
                    selfAverageRating: -1.0,
                    isSelfReviewDatePassed: true
                }
            ]
        },
        finishSelfReviewGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDraft: true,
                    selfReviewPublish: false,
                    selfAverageRating: -1.0
                }
            ]
        },
        selfReviewCompletedGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDraft: true,
                    selfReviewPublish: true,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1693440000000,
                    managerReviewEndDate: 1694390400000,
                    checkInWithManagerStartDate: 1694476800000,
                    checkInWithManagerEndDate: 1696032000000
                }
            ]
        },
        managerReviewPendingGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDraft: false,
                    selfReviewPublish: true,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692748800000, // 23-08
                    managerReviewEndDate: 1694390400000,
                    isOrWasManager: false
                }
            ]
        },
        managerReviewProgressGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692748800000, // 23-08
                    managerReviewEndDate: 1694390400000,
                    firstManagerReviewDraft: true,
                    firstManagerReviewPublish: false,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: false,
                    isOrWasManager: false,
                    isReviewCycleActive: true,
                    isManagerReviewActive: true
                }
            ]
        },
        managerReviewCompletedGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692748800000, // 23-08
                    managerReviewEndDate: 1694390400000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1692748800000,
                    firstManagerAverageRating: 4.3,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: false,
                    secondManagerAverageRating: -1.0,
                    isOrWasManager: false,
                    isReviewCycleActive: true,
                    isManagerReviewActive: true
                }
            ]
        },
        startManagerReviewGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692748800000, // 23-08
                    managerReviewEndDate: 1694390400000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1692748800000,
                    firstManagerAverageRating: 4.3,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: false,
                    secondManagerAverageRating: -1.0,
                    isOrWasManager: false
                }
            ]
        },
        managerReviewPassedGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1691748800000, // 23-08
                    managerReviewEndDate: 1692748800000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1692748800000,
                    firstManagerAverageRating: 4.3,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: false,
                    secondManagerAverageRating: -1.0,
                    isOrWasManager: false,
                    isReviewCycleActive: true,
                    isManagerReviewDatePassed: true
                }
            ]
        },
        finishManagerReviewGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails: managerReviewDraftEmpDetails,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692748800000, // 23-08
                    managerReviewEndDate: 1694390400000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1692748800000,
                    firstManagerAverageRating: 4.3,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: false,
                    secondManagerAverageRating: -1.0,
                    isOrWasManager: false,
                    isReviewCycleActive: true,
                    isManagerReviewActive: true
                }
            ]
        },
        managerReviewCompletedManagerGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails: managerReviewPublishEmpDetails,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692748800000, // 23-08
                    managerReviewEndDate: 1694390400000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1692748800000,
                    firstManagerAverageRating: 4.3,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: true,
                    secondManagerReviewDate: 1692748800000,
                    secondManagerAverageRating: -1.0,
                    isOrWasManager: true,
                    isReviewCycleActive: true,
                    isManagerReviewActive: true
                }
            ]
        },
        checkInPendingGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692748800000, // 23-08
                    managerReviewEndDate: 1694390400000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1692748800000,
                    firstManagerAverageRating: 4.3,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: true,
                    secondManagerReviewDate: 1692748800000,
                    secondManagerAverageRating: -1.0,
                    checkInWithManagerStartDate: 1694476800000, // 12-09-23
                    checkInWithManagerEndDate: 1694822400000, // 16-09-23
                    checkInWithManagerDraft: false,
                    checkInWithManagerPublish: false,
                    checkInWithManagerAverageRating: -1.0,
                    isOrWasManager: false
                }
            ]
        },
        checkInProgressGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692489600000, // 23-08
                    managerReviewEndDate: 1692576000000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1692748800000,
                    firstManagerAverageRating: 4.3,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: true,
                    secondManagerReviewDate: 1692748800000,
                    secondManagerAverageRating: -1.0,
                    checkInWithManagerStartDate: 1692662400000, // 12-09-23
                    checkInWithManagerEndDate: 1694822400000, // 16-09-23
                    checkInWithManagerDraft: true,
                    checkInWithManagerPublish: false,
                    checkInWithManagerAverageRating: -1.0,
                    isOrWasManager: false,
                    isReviewCycleActive: true,
                    isCheckInWithManagerActive: true
                }
            ]
        },
        checkInCompletedGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692489600000, // 23-08
                    managerReviewEndDate: 1692576000000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1692748800000,
                    firstManagerAverageRating: 4.3,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: true,
                    secondManagerReviewDate: 1692748800000,
                    secondManagerAverageRating: -1.0,
                    checkInWithManagerStartDate: 1692662400000, // 12-09-23
                    checkInWithManagerEndDate: 1694822400000, // 16-09-23
                    checkInWithManagerDraft: false,
                    checkInWithManagerPublish: true,
                    checkInWithManagerDate: 1692662400000,
                    checkInWithManagerAverageRating: 4.0,
                    isOrWasManager: false,
                    isReviewCycleActive: true,
                    isCheckInWithManagerActive: true
                }
            ]
        },
        checkInStartGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692489600000, // 23-08
                    managerReviewEndDate: 1692576000000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1692748800000,
                    firstManagerAverageRating: 4.3,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: true,
                    secondManagerReviewDate: 1692748800000,
                    secondManagerAverageRating: -1.0,
                    checkInWithManagerStartDate: 1692662400000,
                    checkInWithManagerEndDate: 1694822400000,
                    checkInWithManagerDraft: false,
                    checkInWithManagerPublish: false,
                    checkInWithManagerDate: 1692662400000,
                    checkInWithManagerAverageRating: -1.0,
                    isOrWasManager: false,
                    isReviewCycleActive: true,
                    isCheckInWithManagerActive: true
                }
            ]
        },
        checkInPassedGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692489600000, // 23-08
                    managerReviewEndDate: 1692576000000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1692748800000,
                    firstManagerAverageRating: 4.3,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: true,
                    secondManagerReviewDate: 1692748800000,
                    secondManagerAverageRating: -1.0,
                    checkInWithManagerStartDate: 1692662400000,
                    checkInWithManagerEndDate: 1692835200000,
                    checkInWithManagerDraft: false,
                    checkInWithManagerPublish: false,
                    checkInWithManagerDate: 1692662400000,
                    checkInWithManagerAverageRating: -1.0,
                    isOrWasManager: false,
                    isReviewCycleActive: true,
                    isCheckInWithManagerActive: false,
                    isCheckInWithManagerDatePassed: true
                }
            ]
        },
        finishCheckInGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails: checkInDraftEmp,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692489600000, // 23-08
                    managerReviewEndDate: 1692576000000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1692748800000,
                    firstManagerAverageRating: 4.3,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: true,
                    secondManagerReviewDate: 1692748800000,
                    secondManagerAverageRating: -1.0,
                    checkInWithManagerStartDate: 1692662400000,
                    checkInWithManagerEndDate: 1694822400000,
                    checkInWithManagerDraft: false,
                    checkInWithManagerPublish: true,
                    checkInWithManagerDate: 1692662400000,
                    checkInWithManagerAverageRating: 4.0,
                    isOrWasManager: false,
                    isReviewCycleActive: true,
                    isSelfReviewActive: false,
                    isManagerReviewActive: false,
                    isCheckInWithManagerActive: true
                }
            ]
        },
        checkInDoneGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails: checkInPublishEmp,
                    startDate: 1692489600000,
                    endDate: 1699228800000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692489600000, // 23-08
                    managerReviewEndDate: 1692576000000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1692748800000,
                    firstManagerAverageRating: 4.3,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: true,
                    secondManagerReviewDate: 1692748800000,
                    secondManagerAverageRating: -1.0,
                    checkInWithManagerStartDate: 1692662400000,
                    checkInWithManagerEndDate: 1694822400000,
                    checkInWithManagerDraft: false,
                    checkInWithManagerPublish: true,
                    checkInWithManagerDate: 1692662400000,
                    checkInWithManagerAverageRating: 4.0,
                    isOrWasManager: false,
                    isReviewCycleActive: true,
                    isSelfReviewActive: false,
                    isManagerReviewActive: false,
                    isCheckInWithManagerActive: true
                }
            ]
        },
        reviewCycleComplete: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    empDetails: checkInPublishEmp,
                    startDate: 1692489600000,
                    endDate: 1692662400000,
                    selfReviewStartDate: 1692489600000,
                    selfReviewEndDate: 1693353600000,
                    selfReviewDate: 1695772800000,
                    selfAverageRating: 4.5,
                    managerReviewStartDate: 1692489600000, // 23-08
                    managerReviewEndDate: 1692576000000,
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: true,
                    firstManagerReviewDate: 1692748800000,
                    firstManagerAverageRating: 4.3,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: true,
                    secondManagerReviewDate: 1692748800000,
                    secondManagerAverageRating: -1.0,
                    checkInWithManagerStartDate: 1692662400000,
                    checkInWithManagerEndDate: 1694822400000,
                    checkInWithManagerDraft: false,
                    checkInWithManagerPublish: true,
                    checkInWithManagerDate: 1692662400000,
                    checkInWithManagerAverageRating: 4.0,
                    isOrWasManager: false
                }
            ]
        },
        orgAdminWithoutEmpGet: {
            url,
            responseCode: 200,
            data: [
                {
                    ...userData,
                    roleName: 'Org Admin',
                    empDetails: undefined
                }
            ]
        }
    }
};
