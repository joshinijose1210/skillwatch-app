export const onboardingFlowMockData = {
    firstDepartment: {
        url: 'https://dummy-api.example.com/api/departments/'
    },
    firstTeam: {
        url: 'https://dummy-api.example.com/api/teams/'
    },
    firstDesignation: {
        url: 'https://dummy-api.example.com/api/designation/'
    },
    firstEmployee: {
        url: 'https://dummy-api.example.com/api/onboarding-flow/1'
    },
    departments: {
        get: {
            url: 'https://dummy-api.example.com/api/departments/?organisationId=1&limit=10',
            someData: {
                totalDepartments: 2,
                departments: [
                    {
                        organisationId: 1,
                        id: 1,
                        departmentId: 'DEP12',
                        departmentName: 'Dep1',
                        departmentStatus: true,
                        departmentCreatedAt: 1693397266597
                    },
                    {
                        organisationId: 1,
                        id: 2,
                        departmentId: 'DEP11',
                        departmentName: 'Dep2',
                        departmentStatus: true,
                        departmentCreatedAt: 1692773271373
                    }
                ]
            }
        }
    },
    teams: {
        get: {
            url: 'https://dummy-api.example.com/api/teams/?organisationId=1&departmentId=1',
            responseCode: 200,
            data: {
                unlinkedTeamsCount: 0,
                totalTeams: 2,
                teams: [
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentDisplayId: 'DEP3',
                        departmentName: 'Dep1',
                        departmentStatus: true,
                        id: 1,
                        teamId: 'T1',
                        teamName: 'Team1',
                        teamStatus: true,
                        teamCreatedAt: 1687865108632,
                        teamUpdatedAt: 1689765743375
                    },
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentDisplayId: 'DEP3',
                        departmentName: 'Dep1',
                        departmentStatus: true,
                        id: 2,
                        teamId: 'T2',
                        teamName: 'Team2',
                        teamStatus: true,
                        teamCreatedAt: 1689711143838
                    }
                ]
            }
        }
    }
};
