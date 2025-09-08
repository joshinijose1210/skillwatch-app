export const ManagerReviewMockData = {
    managers: {
        get: {
            url: 'https://dummy-api.example.com/api/employees/managers/?organisationId=1',
            responseCode: 200,
            someData: {
                totalManagers: 2,
                managers: [
                    {
                        organisationId: 1,
                        id: 3,
                        employeeId: 'SR003',
                        firstName: 'T',
                        lastName: 'P',
                        emailId: 'TP@yahoo.com',
                        contactNo: '+916673738828',
                        status: true,
                        teamName: 'HR',
                        designationName: 'SDE',
                        roleName: 'Org Admin',
                        firstManagerId: 1,
                        firstManagerEmployeeId: 'SR001'
                    },
                    {
                        organisationId: 1,
                        id: 2,
                        employeeId: 'SR002',
                        firstName: 'R',
                        lastName: 'S',
                        emailId: 'r.s@scalereal.com',
                        contactNo: '+914555555555',
                        status: true,
                        departmentName: 'HR',
                        teamName: 'Org Admin',
                        designationName: 'SDE',
                        roleName: 'Org Admin',
                        firstManagerId: 1,
                        firstManagerEmployeeId: 'SR001'
                    }
                ]
            }
        }
    },
    employee: {
        get: {
            url: 'https://dummy-api.example.com/api/employees/by-manager/?managerId=72&organisationId=1',
            someData: {
                reporteesCount: 14,
                managerId: 72,
                reporteesData: [
                    {
                        organisationId: 1,
                        id: 3,
                        employeeId: 'SR005',
                        firstName: 'Ab',
                        lastName: 'G',
                        emailId: 'abhishek.ghadge@scalereal.com',
                        firstManagerId: 1
                    },
                    {
                        organisationId: 1,
                        id: 4,
                        employeeId: 'SR007',
                        firstName: 'Ak',
                        lastName: 'Sr',
                        emailId: 'aksh1@scalereal.com',
                        firstManagerId: 1,
                        secondManagerId: 2
                    }
                ]
            }
        }
    },

    myMangaerReviewCycles: {
        get: {
            url: 'https://dummy-api.example.com/api/review-cycle/my-manager-review?reviewTypeId=2&reviewFromId=-99&organisationId=1&page=1&limit=10&reviewToId=72&reviewCycleId=-99',
            responseCode: 200,
            allData: {
                totalManagerReviewCycles: 16,
                myManagerReviewCycles: [
                    {
                        reviewCycleId: 136,
                        startDate: 1693353600000,
                        endDate: 1693612800000,
                        managerReviewStartDate: 1693353600000,
                        managerReviewEndDate: 1693353600000,
                        team: 'QA TEAM',
                        reviewToId: 3,
                        reviewToEmployeeId: 'SR003',
                        firstName: 'A',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR007',
                        managerFirstName: 'TS',
                        managerLastName: 'P',
                        averageRating: -1
                    },
                    {
                        reviewCycleId: 136,
                        startDate: 1693353600000,
                        endDate: 1693612800000,
                        managerReviewStartDate: 1693353600000,
                        managerReviewEndDate: 1693353600000,
                        team: 'Test Team',
                        reviewToId: 3,
                        reviewToEmployeeId: 'SR021',
                        firstName: 'A',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR004',
                        managerFirstName: 'RS',
                        managerLastName: 'D',
                        averageRating: -1
                    },
                    {
                        reviewCycleId: 133,
                        startDate: 1692835200000,
                        endDate: 1693008000000,
                        managerReviewStartDate: 1692921600000,
                        managerReviewEndDate: 1692921600000,
                        team: 'Test Team',
                        reviewToId: 3,
                        reviewToEmployeeId: 'SR021',
                        firstName: 'A',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR0033',
                        managerFirstName: 'M',
                        managerLastName: 'P',
                        draft: false,
                        publish: true,
                        averageRating: 3.2
                    },
                    {
                        reviewCycleId: 133,
                        startDate: 1692835200000,
                        endDate: 1693008000000,
                        managerReviewStartDate: 1692921600000,
                        managerReviewEndDate: 1692921600000,
                        team: 'QA TEAM',
                        reviewToId: 3,
                        reviewToEmployeeId: 'SR021',
                        firstName: 'A',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR0033',
                        managerFirstName: 'M',
                        managerLastName: 'P',
                        draft: false,
                        publish: true,
                        averageRating: 3.2
                    },
                    {
                        reviewCycleId: 132,
                        startDate: 1692576000000,
                        endDate: 1692748800000,
                        managerReviewStartDate: 1692662400000,
                        managerReviewEndDate: 1692662400000,
                        team: 'QA TEAM',
                        reviewToId: 3,
                        reviewToEmployeeId: 'SR021',
                        firstName: 'A',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR0033',
                        managerFirstName: 'M',
                        managerLastName: 'P',
                        draft: false,
                        publish: true,
                        averageRating: 2.8
                    },
                    {
                        reviewCycleId: 132,
                        startDate: 1692576000000,
                        endDate: 1692748800000,
                        managerReviewStartDate: 1692662400000,
                        managerReviewEndDate: 1692662400000,
                        team: 'Test Team',
                        reviewToId: 3,
                        reviewToEmployeeId: 'SR021',
                        firstName: 'A',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR0033',
                        managerFirstName: 'M',
                        managerLastName: 'P',
                        draft: false,
                        publish: true,
                        averageRating: 2.8
                    },
                    {
                        reviewCycleId: 127,
                        startDate: 1692144000000,
                        endDate: 1692403200000,
                        managerReviewStartDate: 1692144000000,
                        managerReviewEndDate: 1692144000000,
                        team: 'Test Team',
                        reviewToId: 3,
                        reviewToEmployeeId: 'SR021',
                        firstName: 'A',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR0033',
                        managerFirstName: 'M',
                        managerLastName: 'P',
                        averageRating: -1
                    },
                    {
                        reviewCycleId: 127,
                        startDate: 1692144000000,
                        endDate: 1692403200000,
                        managerReviewStartDate: 1692144000000,
                        managerReviewEndDate: 1692144000000,
                        team: 'QA TEAM',
                        reviewToId: 3,
                        reviewToEmployeeId: 'SR021',
                        firstName: 'A',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR0033',
                        managerFirstName: 'M',
                        managerLastName: 'P',
                        averageRating: -1
                    },
                    {
                        reviewCycleId: 124,
                        startDate: 1691020800000,
                        endDate: 1692057600000,
                        managerReviewStartDate: 1691971200000,
                        managerReviewEndDate: 1691971200000,
                        team: 'QA TEAM',
                        reviewToId: 3,
                        reviewToEmployeeId: 'SR021',
                        firstName: 'A',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR0033',
                        managerFirstName: 'M',
                        managerLastName: 'P',
                        draft: true,
                        publish: false,
                        averageRating: -1
                    },
                    {
                        reviewCycleId: 124,
                        startDate: 1691020800000,
                        endDate: 1692057600000,
                        managerReviewStartDate: 1691971200000,
                        managerReviewEndDate: 1691971200000,
                        team: 'Test Team',
                        reviewToId: 3,
                        reviewToEmployeeId: 'SR021',
                        firstName: 'A',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR0033',
                        managerFirstName: 'M',
                        managerLastName: 'P',
                        draft: true,
                        publish: false,
                        averageRating: -1
                    }
                ]
            },
            someData: {
                totalManagerReviewCycles: 16,
                myManagerReviewCycles: [
                    {
                        reviewCycleId: 1,
                        startDate: 1692576000000,
                        endDate: 1692748800000,
                        managerReviewStartDate: 1692662400000,
                        managerReviewEndDate: 1692662400000,
                        team: 'Team1',
                        reviewToId: 72,
                        reviewToEmployeeId: 'SR003',
                        firstName: 'A',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR002',
                        managerFirstName: 'M',
                        managerLastName: 'P',
                        draft: false,
                        publish: true,
                        averageRating: 2.8
                    },
                    {
                        reviewCycleId: 2,
                        startDate: 1692835200000,
                        endDate: 1693008000000,
                        managerReviewStartDate: 1692921600000,
                        managerReviewEndDate: 1692921600000,
                        team: 'Team1',
                        reviewToId: 72,
                        reviewToEmployeeId: 'SR003',
                        firstName: 'AR',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR002',
                        managerFirstName: 'MJ',
                        managerLastName: 'P',
                        draft: false,
                        publish: true,
                        averageRating: 3.2
                    },
                    {
                        reviewCycleId: 124,
                        startDate: 1691020800000,
                        endDate: 1692057600000,
                        managerReviewStartDate: 1691971200000,
                        managerReviewEndDate: 1691971200000,
                        team: 'Test Team',
                        reviewToId: 3,
                        reviewToEmployeeId: 'SR021',
                        firstName: 'A',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR004',
                        managerFirstName: 'AJ',
                        managerLastName: 'P',
                        draft: true,
                        publish: false,
                        averageRating: -1
                    }
                ]
            },
            filterData: {
                totalManagerReviewCycles: 1,
                myManagerReviewCycles: [
                    {
                        reviewCycleId: 1,
                        startDate: 1692576000000,
                        endDate: 1692748800000,
                        managerReviewStartDate: 1692662400000,
                        managerReviewEndDate: 1692662400000,
                        team: 'Team1',
                        reviewToId: 72,
                        reviewToEmployeeId: 'SR003',
                        firstName: 'A',
                        lastName: 'I',
                        reviewFromId: 2,
                        reviewFromEmployeeId: 'SR002',
                        managerFirstName: 'M',
                        managerLastName: 'P',
                        draft: false,
                        publish: true,
                        averageRating: 2.8
                    }
                ]
            }
        }
    },
    managerReviewCycle: {
        get: {
            url: 'https://dummy-api.example.com/api/review-cycle/manager-review?reviewTypeId=2&reviewFromId=72&organisationId=1&page=1&limit=10&reviewToId=-99&reviewCycleId=-99',
            someData: {
                totalManagerReviewCycles: 12,
                managerReviewCycles: [
                    {
                        reviewCycleId: 136,
                        startDate: 1693353600000,
                        endDate: 1693612800000,
                        managerReviewStartDate: 1693353600000,
                        managerReviewEndDate: 1693353600000,
                        team: 'BA Team',
                        reviewToId: 212,
                        reviewToEmployeeId: 'SR007',
                        firstName: 'Ak',
                        lastName: 'Sr',
                        draft: false,
                        publish: true,
                        averageRating: 4.2
                    },
                    {
                        reviewCycleId: 136,
                        startDate: 1693353600000,
                        endDate: 1693612800000,
                        managerReviewStartDate: 1693353600000,
                        managerReviewEndDate: 1693353600000,
                        team: 'Test Team',
                        reviewToId: 192,
                        reviewToEmployeeId: 'SR006',
                        firstName: 'Y',
                        lastName: 'J',
                        averageRating: -1
                    },
                    {
                        reviewCycleId: 136,
                        startDate: 1693353600000,
                        endDate: 1693612800000,
                        managerReviewStartDate: 1693353600000,
                        managerReviewEndDate: 1693353600000,
                        team: 'QA 1',
                        reviewToId: 92,
                        reviewToEmployeeId: 'SR003',
                        firstName: 'M',
                        lastName: 'P',
                        draft: false,
                        publish: true,
                        averageRating: 2
                    }
                ]
            },
            filterData: {
                totalManagerReviewCycles: 1,
                managerReviewCycles: [
                    {
                        reviewCycleId: 136,
                        startDate: 1693353600000,
                        endDate: 1693612800000,
                        managerReviewStartDate: 1693353600000,
                        managerReviewEndDate: 1693353600000,
                        team: 'BA Team',
                        reviewToId: 212,
                        reviewToEmployeeId: 'SR007',
                        firstName: 'Ak',
                        lastName: 'Sr',
                        draft: false,
                        publish: true,
                        averageRating: 4.2
                    }
                ]
            }
        }
    },
    globalReviewCycle: {
        get: {
            url: 'https://dummy-api.example.com/api/review-cycle/getAll?organisationId=1',
            responseCode: 200,
            data: {
                totalReviewCycles: 9,
                reviewCycles: [
                    {
                        organisationId: 1,
                        reviewCycleId: 136,
                        startDate: 1693353600000,
                        endDate: 1693612800000,
                        publish: true,
                        lastModified: 1693460037990,
                        selfReviewStartDate: 1693353600000,
                        selfReviewEndDate: 1693353600000,
                        managerReviewStartDate: 1693353600000,
                        managerReviewEndDate: 1693353600000,
                        checkInWithManagerStartDate: 1693440000000,
                        checkInWithManagerEndDate: 1693526400000
                    },
                    {
                        organisationId: 1,
                        reviewCycleId: 133,
                        startDate: 1692835200000,
                        endDate: 1693008000000,
                        publish: false,
                        lastModified: 1693023056369,
                        selfReviewStartDate: 1692921600000,
                        selfReviewEndDate: 1692921600000,
                        managerReviewStartDate: 1692921600000,
                        managerReviewEndDate: 1692921600000,
                        checkInWithManagerStartDate: 1693008000000,
                        checkInWithManagerEndDate: 1693008000000
                    },
                    {
                        organisationId: 1,
                        reviewCycleId: 132,
                        startDate: 1692576000000,
                        endDate: 1692748800000,
                        publish: false,
                        lastModified: 1692859435871,
                        selfReviewStartDate: 1692662400000,
                        selfReviewEndDate: 1692662400000,
                        managerReviewStartDate: 1692662400000,
                        managerReviewEndDate: 1692662400000,
                        checkInWithManagerStartDate: 1692748800000,
                        checkInWithManagerEndDate: 1692748800000
                    },
                    {
                        organisationId: 1,
                        reviewCycleId: 127,
                        startDate: 1692144000000,
                        endDate: 1692403200000,
                        publish: false,
                        lastModified: 1692170570383,
                        selfReviewStartDate: 1692144000000,
                        selfReviewEndDate: 1692144000000,
                        managerReviewStartDate: 1692144000000,
                        managerReviewEndDate: 1692144000000,
                        checkInWithManagerStartDate: 1692230400000,
                        checkInWithManagerEndDate: 1692230400000
                    },
                    {
                        organisationId: 1,
                        reviewCycleId: 124,
                        startDate: 1691020800000,
                        endDate: 1692057600000,
                        publish: false,
                        lastModified: 1692170552679,
                        selfReviewStartDate: 1691020800000,
                        selfReviewEndDate: 1691971200000,
                        managerReviewStartDate: 1691971200000,
                        managerReviewEndDate: 1691971200000,
                        checkInWithManagerStartDate: 1692057600000,
                        checkInWithManagerEndDate: 1692057600000
                    },
                    {
                        organisationId: 1,
                        reviewCycleId: 120,
                        startDate: 1690329600000,
                        endDate: 1690934400000,
                        publish: false,
                        lastModified: 1691069101332,
                        selfReviewStartDate: 1690761600000,
                        selfReviewEndDate: 1690934400000,
                        managerReviewStartDate: 1690848000000,
                        managerReviewEndDate: 1690934400000,
                        checkInWithManagerStartDate: 1690934400000,
                        checkInWithManagerEndDate: 1690934400000
                    },
                    {
                        organisationId: 1,
                        reviewCycleId: 116,
                        startDate: 1689724800000,
                        endDate: 1690156800000,
                        publish: false,
                        lastModified: 1690376256242,
                        selfReviewStartDate: 1689724800000,
                        selfReviewEndDate: 1689897600000,
                        managerReviewStartDate: 1689724800000,
                        managerReviewEndDate: 1689984000000,
                        checkInWithManagerStartDate: 1690070400000,
                        checkInWithManagerEndDate: 1690156800000
                    },
                    {
                        organisationId: 1,
                        reviewCycleId: 109,
                        startDate: 1688774400000,
                        endDate: 1689206400000,
                        publish: false,
                        lastModified: 1689167004538,
                        selfReviewStartDate: 1688774400000,
                        selfReviewEndDate: 1688774400000,
                        managerReviewStartDate: 1688774400000,
                        managerReviewEndDate: 1688774400000,
                        checkInWithManagerStartDate: 1688860800000,
                        checkInWithManagerEndDate: 1688947200000
                    },
                    {
                        organisationId: 1,
                        reviewCycleId: 102,
                        startDate: 1685577600000,
                        endDate: 1686614400000,
                        publish: false,
                        lastModified: 1687326728706,
                        selfReviewStartDate: 1685750400000,
                        selfReviewEndDate: 1686355200000,
                        managerReviewStartDate: 1685577600000,
                        managerReviewEndDate: 1686268800000,
                        checkInWithManagerStartDate: 1686441600000,
                        checkInWithManagerEndDate: 1686614400000
                    }
                ]
            }
        }
    },
    FromUrl:
        'https://dummy-api.example.com/api/review-cycle/my-manager-review?reviewTypeId=2&reviewFromId=3&organisationId=1&page=1&limit=10&reviewToId=72&reviewCycleId=-99',
    FromUrl2:
        'https://dummy-api.example.com/api/review-cycle/my-manager-review?reviewTypeId=2&reviewFromId=3,2&organisationId=1&page=1&limit=10&reviewToId=72&reviewCycleId=-99',
    page2Url:
        'https://dummy-api.example.com/api/review-cycle/my-manager-review?reviewTypeId=2&reviewFromId=-99&organisationId=1&page=2&limit=10&reviewToId=72&reviewCycleId=-99',
    reviewStatusUrl:
        'https://dummy-api.example.com/api/review-cycle/manager-review?reviewTypeId=2&reviewFromId=72&organisationId=1&page=1&limit=10&reviewToId=-99&reviewCycleId=-99&managerReviewDraft=false&managerReviewPublished=true',
    reviewToIdUrl:
        'https://dummy-api.example.com/api/review-cycle/manager-review?reviewTypeId=2&reviewFromId=72&organisationId=1&page=1&limit=10&reviewToId=4&reviewCycleId=-99',

    LocationMockData: {
        pathname: '/request-Feedback/1/Add-Requested-Feedback',
        state: null,
        search: '',
        hash: '',
        key: ''
    }
};
