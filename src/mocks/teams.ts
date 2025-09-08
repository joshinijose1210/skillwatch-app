export const teamsMockData = {
    teams: {
        get: {
            url: 'https://dummy-api.example.com/api/teams/?page=undefined&organisationId=1&limit=10&searchText=',
            responseCode: 200,
            allData: {
                unlinkedTeamsCount: 4,
                totalTeams: 15,
                teams: [
                    {
                        organisationId: 1,
                        departmentId: 116,
                        departmentDisplayId: 'DEP9',
                        departmentName: 'D2',
                        departmentStatus: true,
                        id: 227,
                        teamId: 'T120',
                        teamName: 'uat-1',
                        teamStatus: true,
                        teamCreatedAt: 1693999527466,
                        teamUpdatedAt: 1693999554364
                    },
                    {
                        organisationId: 1,
                        departmentId: 117,
                        departmentDisplayId: 'DEP10',
                        departmentName: 'D3',
                        departmentStatus: true,
                        id: 218,
                        teamId: 'T119',
                        teamName: 'D3team',
                        teamStatus: true,
                        teamCreatedAt: 1693207808752,
                        teamUpdatedAt: 1693999567152
                    },
                    {
                        organisationId: 1,
                        departmentId: 110,
                        departmentDisplayId: 'DEP5',
                        departmentName: 'demoDEp',
                        departmentStatus: true,
                        id: 217,
                        teamId: 'T118',
                        teamName: 'testTeam123',
                        teamStatus: true,
                        teamCreatedAt: 1692773626028
                    },
                    {
                        organisationId: 1,
                        departmentId: 115,
                        departmentDisplayId: 'DEP8',
                        departmentName: 'D1',
                        departmentStatus: false,
                        id: 216,
                        teamId: 'T117',
                        teamName: 'dataTeams123',
                        teamStatus: false,
                        teamCreatedAt: 1692772563573,
                        teamUpdatedAt: 1693298138629
                    },
                    {
                        organisationId: 1,
                        departmentId: 115,
                        departmentDisplayId: 'DEP8',
                        departmentName: 'D1',
                        departmentStatus: false,
                        id: 215,
                        teamId: 'T116',
                        teamName: 'DataTeam',
                        teamStatus: false,
                        teamCreatedAt: 1692772069300,
                        teamUpdatedAt: 1693298138632
                    },
                    {
                        organisationId: 1,
                        departmentId: 108,
                        departmentDisplayId: 'DEP3',
                        departmentName: 'Account Department',
                        departmentStatus: true,
                        id: 214,
                        teamId: 'T115',
                        teamName: 'DemoT1',
                        teamStatus: true,
                        teamCreatedAt: 1692771920194
                    },
                    {
                        organisationId: 1,
                        departmentId: 115,
                        departmentDisplayId: 'DEP8',
                        departmentName: 'D1',
                        departmentStatus: false,
                        id: 213,
                        teamId: 'T114',
                        teamName: 'DemoTeam',
                        teamStatus: false,
                        teamCreatedAt: 1692771362654,
                        teamUpdatedAt: 1693298138634
                    },
                    {
                        organisationId: 1,
                        departmentId: 115,
                        departmentDisplayId: 'DEP8',
                        departmentName: 'D1',
                        departmentStatus: false,
                        id: 212,
                        teamId: 'T113',
                        teamName: 'Demo',
                        teamStatus: false,
                        teamCreatedAt: 1692771362586,
                        teamUpdatedAt: 1693298138638
                    },
                    {
                        organisationId: 1,
                        departmentId: 114,
                        departmentDisplayId: 'DEP7',
                        departmentName: 'Sales Department',
                        departmentStatus: false,
                        id: 211,
                        teamId: 'T112',
                        teamName: 'Sales Executive',
                        teamStatus: false,
                        teamCreatedAt: 1692723232550,
                        teamUpdatedAt: 1693300632768
                    },
                    {
                        organisationId: 1,
                        departmentId: 63,
                        departmentDisplayId: 'DEP1',
                        departmentName: 'Executive Leadership',
                        departmentStatus: true,
                        id: 210,
                        teamId: 'T111',
                        teamName: 'Test',
                        teamStatus: true,
                        teamCreatedAt: 1692721572495
                    }
                ]
            },
            someData: {
                unlinkedTeamsCount: 0,
                totalTeams: 3,
                teams: [
                    {
                        organisationId: 1,
                        departmentId: 116,
                        departmentDisplayId: 'DEP9',
                        departmentName: 'D2',
                        departmentStatus: true,
                        id: 227,
                        teamId: 'T120',
                        teamName: 'uat',
                        teamStatus: true,
                        teamCreatedAt: 1693999527466,
                        teamUpdatedAt: 1693999554364
                    },
                    {
                        organisationId: 1,
                        departmentId: 117,
                        departmentDisplayId: 'DEP10',
                        departmentName: 'D3',
                        departmentStatus: true,
                        id: 218,
                        teamId: 'T119',
                        teamName: 'D3team',
                        teamStatus: true,
                        teamCreatedAt: 1693207808752,
                        teamUpdatedAt: 1693999567152
                    },
                    {
                        organisationId: 1,
                        departmentId: 116,
                        departmentDisplayId: 'DEP9',
                        departmentName: 'D2',
                        departmentStatus: true,
                        id: 225,
                        teamId: 'T119',
                        teamName: 'uat-test',
                        teamStatus: true,
                        teamCreatedAt: 1693207808752,
                        teamUpdatedAt: 1693999567152
                    }
                ]
            },
            searchData: [
                200,
                {
                    unlinkedTeamsCount: 0,
                    totalTeams: 1,
                    teams: [
                        {
                            organisationId: 1,
                            departmentId: 116,
                            departmentDisplayId: 'DEP9',
                            departmentName: 'D2',
                            departmentStatus: true,
                            id: 227,
                            teamId: 'T120',
                            teamName: 'D3team',
                            teamStatus: true,
                            teamCreatedAt: 1693999527466,
                            teamUpdatedAt: 1693999554364
                        }
                    ]
                }
            ]
        }
    },
    departments: {
        get: {
            url: 'https://dummy-api.example.com/api/departments/?organisationId=1',
            responseCode: 200,
            allData: {
                totalDepartments: 12,
                departments: [
                    {
                        organisationId: 1,
                        id: 129,
                        departmentId: 'DEP12',
                        departmentName: 'test Department1',
                        departmentStatus: true,
                        departmentCreatedAt: 1693397266597
                    },
                    {
                        organisationId: 1,
                        id: 118,
                        departmentId: 'DEP11',
                        departmentName: 'NewDep',
                        departmentStatus: true,
                        departmentCreatedAt: 1692773271373
                    },
                    {
                        organisationId: 1,
                        id: 117,
                        departmentId: 'DEP10',
                        departmentName: 'D3',
                        departmentStatus: true,
                        departmentCreatedAt: 1692771303636
                    },
                    {
                        organisationId: 1,
                        id: 116,
                        departmentId: 'DEP9',
                        departmentName: 'D2',
                        departmentStatus: true,
                        departmentCreatedAt: 1692771303586
                    },
                    {
                        organisationId: 1,
                        id: 115,
                        departmentId: 'DEP8',
                        departmentName: 'D1',
                        departmentStatus: false,
                        departmentCreatedAt: 1692771287876,
                        departmentUpdatedAt: 1693298138621
                    },
                    {
                        organisationId: 1,
                        id: 114,
                        departmentId: 'DEP7',
                        departmentName: 'Sales Department',
                        departmentStatus: false,
                        departmentCreatedAt: 1692723171693,
                        departmentUpdatedAt: 1693300632761
                    },
                    {
                        organisationId: 1,
                        id: 111,
                        departmentId: 'DEP6',
                        departmentName: 'DemoDepartment',
                        departmentStatus: true,
                        departmentCreatedAt: 1692560425995
                    },
                    {
                        organisationId: 1,
                        id: 110,
                        departmentId: 'DEP5',
                        departmentName: 'demoDEp',
                        departmentStatus: true,
                        departmentCreatedAt: 1692181235591
                    },
                    {
                        organisationId: 1,
                        id: 109,
                        departmentId: 'DEP4',
                        departmentName: 'Eng Department',
                        departmentStatus: true,
                        departmentCreatedAt: 1692167372904,
                        departmentUpdatedAt: 1693317600744
                    },
                    {
                        organisationId: 1,
                        id: 108,
                        departmentId: 'DEP3',
                        departmentName: 'Account Department',
                        departmentStatus: true,
                        departmentCreatedAt: 1692167358549
                    },
                    {
                        organisationId: 1,
                        id: 107,
                        departmentId: 'DEP2',
                        departmentName: 'Human Resource',
                        departmentStatus: true,
                        departmentCreatedAt: 1691761775347,
                        departmentUpdatedAt: 1693315193451
                    },
                    {
                        organisationId: 1,
                        id: 63,
                        departmentId: 'DEP1',
                        departmentName: 'Executive Leadership',
                        departmentStatus: true,
                        departmentCreatedAt: 1691761775347
                    }
                ]
            },
            someData: {
                totalDepartments: 2,
                departments: [
                    {
                        organisationId: 1,
                        id: 116,
                        departmentId: 'DEP12',
                        departmentName: 'Test Dep1',
                        departmentStatus: true,
                        departmentCreatedAt: 1693397266597
                    },
                    {
                        organisationId: 1,
                        id: 117,
                        departmentId: 'DEP11',
                        departmentName: 'NewDep',
                        departmentStatus: true,
                        departmentCreatedAt: 1692773271373
                    },
                    {
                        organisationId: 1,
                        id: 107,
                        departmentId: 'DEP2',
                        departmentName: 'Human Resource',
                        departmentStatus: true,
                        departmentCreatedAt: 1691761775347,
                        departmentUpdatedAt: 1693315193451
                    },
                    {
                        organisationId: 1,
                        id: 107,
                        departmentId: 'DEP2',
                        departmentName: 'Engineering',
                        departmentStatus: true,
                        departmentCreatedAt: 1691761775347,
                        departmentUpdatedAt: 1693315193451
                    }
                ]
            }
        }
    },
    organization: {
        get: {
            url: 'https://dummy-api.example.com/api/organisation/?id=1',
            responseCode: 200,
            data: {
                id: 1,
                name: 'TCS',
                size: 51,
                contactNo: '+917276693262',
                activeUsers: 89,
                inactiveUsers: 12,
                managerReviewMandatory: true
            }
        }
    }
};
