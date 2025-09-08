export const designationMockData = {
    teams: {
        get: {
            url: 'https://dummy-api.example.com/api/teams/?organisationId=1&departmentId=108',
            responseCode: 200,
            data: {
                unlinkedTeamsCount: 0,
                totalTeams: 1,
                teams: [
                    {
                        organisationId: 1,
                        departmentId: 108,
                        departmentDisplayId: 'DEP3',
                        departmentName: 'BA Department',
                        departmentStatus: true,
                        id: 11,
                        teamId: 'T9',
                        teamName: 'BA Team',
                        teamStatus: true,
                        teamCreatedAt: 1687865108632,
                        teamUpdatedAt: 1689765743375
                    },
                    {
                        organisationId: 1,
                        departmentId: 108,
                        departmentDisplayId: 'DEP3',
                        departmentName: 'BA Department',
                        departmentStatus: true,
                        id: 12,
                        teamId: 'T22',
                        teamName: 'New Team',
                        teamStatus: true,
                        teamCreatedAt: 1689711143838
                    }
                ]
            }
        }
    },
    departments: {
        get: {
            url: 'https://dummy-api.example.com/api/departments/?organisationId=1',
            responseCode: 200,
            data: {
                totalDepartments: 2,
                departments: [
                    {
                        organisationId: 1,
                        id: 108,
                        departmentId: 'DEP3',
                        departmentName: 'BA Department',
                        departmentStatus: true,
                        departmentCreatedAt: 1693459162296,
                        departmentUpdatedAt: 1693459202605
                    },
                    {
                        organisationId: 36,
                        id: 188,
                        departmentId: 'DEP13',
                        departmentName: 'new Depart',
                        departmentStatus: true,
                        departmentCreatedAt: 1693393197376
                    }
                ]
            }
        }
    },
    designations: {
        get: {
            url: 'https://dummy-api.example.com/api/designation/?organisationId=1&page=undefined&limit=10&searchText=',
            responseCode: 200,
            data: {
                unlinkedDesignationsCount: 0,
                totalDesignation: 2,
                designations: [
                    {
                        organisationId: 1,
                        departmentId: 108,
                        departmentName: 'BA Department',
                        departmentDisplayId: 'DEP3',
                        departmentStatus: true,
                        teamId: 12,
                        teamName: 'BA Team',
                        teamDisplayId: 'T10',
                        teamStatus: true,
                        id: 242,
                        designationId: 'D123',
                        designationName: 'ABC',
                        status: true,
                        createdAt: 1699448401146,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD92',
                        teamsDisplayId: 'TT53'
                    },
                    {
                        organisationId: 1,
                        departmentId: 108,
                        departmentName: 'BA Department',
                        departmentDisplayId: 'DEP3',
                        departmentStatus: true,
                        teamId: 13,
                        teamName: 'BA',
                        teamDisplayId: 'T9',
                        teamStatus: true,
                        id: 243,
                        designationId: 'D114',
                        designationName: 'testDeg',
                        status: true,
                        createdAt: 1693402666309,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD92',
                        teamsDisplayId: 'TT53'
                    }
                ]
            },
            allData: {
                unlinkedDesignationsCount: 0,
                totalDesignation: 15,
                designations: [
                    {
                        organisationId: 1,
                        departmentId: 116,
                        departmentName: 'D2',
                        departmentDisplayId: 'DEP9',
                        departmentStatus: true,
                        teamId: 227,
                        teamName: 'UAT',
                        teamDisplayId: 'T120',
                        teamStatus: true,
                        id: 299,
                        designationId: 'D140',
                        designationName: 'SDE-Test',
                        status: true,
                        createdAt: 1693999616152,
                        departmentsDisplayId: 'DEPDEP9',
                        designationsDisplayId: 'DD140',
                        teamsDisplayId: 'TT120'
                    },
                    {
                        organisationId: 1,
                        departmentId: 116,
                        departmentName: 'D2',
                        departmentDisplayId: 'DEP9',
                        departmentStatus: true,
                        teamId: 227,
                        teamName: 'uat',
                        teamDisplayId: 'T120',
                        teamStatus: true,
                        id: 298,
                        designationId: 'D139',
                        designationName: 'uat',
                        status: true,
                        createdAt: 1693999589964,
                        departmentsDisplayId: 'DEPDEP9',
                        designationsDisplayId: 'DD139',
                        teamsDisplayId: 'TT120'
                    },
                    {
                        organisationId: 1,
                        departmentId: 111,
                        departmentName: 'DemoDepartment',
                        departmentDisplayId: 'DEP6',
                        departmentStatus: true,
                        teamId: 207,
                        teamName: 'DempTeam',
                        teamDisplayId: 'T110',
                        teamStatus: true,
                        id: 297,
                        designationId: 'D138',
                        designationName: 'DemoDesignatio n',
                        status: true,
                        createdAt: 1693988942961,
                        departmentsDisplayId: 'DEPDEP6',
                        designationsDisplayId: 'DD138',
                        teamsDisplayId: 'TT110'
                    },
                    {
                        organisationId: 1,
                        departmentId: 108,
                        departmentName: 'Account Department',
                        departmentDisplayId: 'DEP3',
                        departmentStatus: true,
                        teamId: 214,
                        teamName: 'DemoT1',
                        teamDisplayId: 'T115',
                        teamStatus: true,
                        id: 296,
                        designationId: 'D137',
                        designationName: 'jjjjjjjjjjjj',
                        status: true,
                        createdAt: 1693988640456,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD137',
                        teamsDisplayId: 'TT115'
                    },
                    {
                        organisationId: 1,
                        departmentId: 108,
                        departmentName: 'Account Department',
                        departmentDisplayId: 'DEP3',
                        departmentStatus: true,
                        teamId: 200,
                        teamName: 'Account Team134',
                        teamDisplayId: 'T103',
                        teamStatus: true,
                        id: 295,
                        designationId: 'D136',
                        designationName: 'Test - D',
                        status: true,
                        createdAt: 1693893658660,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD136',
                        teamsDisplayId: 'TT103'
                    },
                    {
                        organisationId: 1,
                        departmentId: 114,
                        departmentName: 'Sales Department',
                        departmentDisplayId: 'DEP7',
                        departmentStatus: false,
                        teamId: 211,
                        teamName: 'Sales Executive',
                        teamDisplayId: 'T112',
                        teamStatus: false,
                        id: 294,
                        designationId: 'D135',
                        designationName: 'Junior Executive',
                        status: false,
                        createdAt: 1693300613951,
                        updatedAt: 1693300632795,
                        departmentsDisplayId: 'DEPDEP7',
                        designationsDisplayId: 'DD135',
                        teamsDisplayId: 'TT112'
                    },
                    {
                        organisationId: 1,
                        departmentId: 114,
                        departmentName: 'Sales Department',
                        departmentDisplayId: 'DEP7',
                        departmentStatus: false,
                        teamId: 211,
                        teamName: 'Sales Executive',
                        teamDisplayId: 'T112',
                        teamStatus: false,
                        id: 293,
                        designationId: 'D134',
                        designationName: 'Manager',
                        status: false,
                        createdAt: 1693300546761,
                        updatedAt: 1693300632800,
                        departmentsDisplayId: 'DEPDEP7',
                        designationsDisplayId: 'DD134',
                        teamsDisplayId: 'TT112'
                    },
                    {
                        organisationId: 1,
                        departmentId: 115,
                        departmentName: 'D1',
                        departmentDisplayId: 'DEP8',
                        departmentStatus: false,
                        teamId: 213,
                        teamName: 'DemoTeam',
                        teamDisplayId: 'T114',
                        teamStatus: false,
                        id: 280,
                        designationId: 'D133',
                        designationName: 'DS3',
                        status: true,
                        createdAt: 1692771418952,
                        departmentsDisplayId: 'DEPDEP8',
                        designationsDisplayId: 'DD133',
                        teamsDisplayId: 'TT114'
                    },
                    {
                        organisationId: 1,
                        departmentId: 108,
                        departmentName: 'Account Department',
                        departmentDisplayId: 'DEP3',
                        departmentStatus: true,
                        teamId: 200,
                        teamName: 'Account Team134',
                        teamDisplayId: 'T103',
                        teamStatus: true,
                        id: 279,
                        designationId: 'D132',
                        designationName: 'SDE1',
                        status: true,
                        createdAt: 1692723658413,
                        updatedAt: 1693162228965,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD132',
                        teamsDisplayId: 'TT103'
                    },
                    {
                        organisationId: 1,
                        departmentId: 111,
                        departmentName: 'DemoDepartment',
                        departmentDisplayId: 'DEP6',
                        departmentStatus: true,
                        teamId: 207,
                        teamName: 'DempTeam',
                        teamDisplayId: 'T110',
                        teamStatus: true,
                        id: 278,
                        designationId: 'D131',
                        designationName: 'DemoDesignation',
                        status: true,
                        createdAt: 1692679959124,
                        departmentsDisplayId: 'DEPDEP6',
                        designationsDisplayId: 'DD131',
                        teamsDisplayId: 'TT110'
                    }
                ]
            }
        }
    }
};
