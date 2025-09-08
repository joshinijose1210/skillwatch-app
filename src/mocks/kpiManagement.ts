const CURRENT_DAY = new Date().setHours(0, 0, 0);
const ONE_DAY = 86400000;
export const kpiMockData = {
    kpi: {
        get: {
            url: 'https://dummy-api.example.com/api/kpi/?page=undefined&limit=10&organisationId=1&searchText=&kraId=-99&teamId=-99&designationId=-99&departmentId=-99&status=true,false',
            pageUrl:
                'https://dummy-api.example.com/api/kpi/?page=2&limit=10&organisationId=1&searchText=&&kraId=-99teamId=-99&designationId=-99&departmentId=-99&status=true,false',
            searchUrl:
                'https://dummy-api.example.com/api/kpi/?page=undefined&limit=10&organisationId=1&searchText=Test Bug&kraId=-99&teamId=-99&designationId=-99&departmentId=-99&status=true,false',
            filterUrl:
                'https://dummy-api.example.com/api/kpi/?page=1&limit=10&organisationId=1&searchText=&kraId=-99&teamId=1&designationId=-99&departmentId=-99&status=true,false',
            filterKRAUrl:
                'https://dummy-api.example.com/api/kpi/?page=1&limit=10&organisationId=1&searchText=&kraId=-99&teamId=1&designationId=-99&departmentId=-99&status=true,false',
            filterStatusUrl:
                'https://dummy-api.example.com/api/kpi/?page=undefined&limit=10&organisationId=1&searchText=&kraId=-99&teamId=-99&designationId=-99&departmentId=-99&status=false',
            allData: {
                totalKPIs: 64,
                kpis: [
                    {
                        organisationId: 1,
                        id: 108,
                        kpiId: 'K064',
                        title: 'Test Bug',
                        kraId: 7,
                        kraName: 'Results',
                        description:
                            '<p><span style="background-color: rgb(247, 248, 249);">Demo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo Kpi</span></p>',
                        status: true,
                        versionNumber: 1,
                        kpiDepartmentTeamDesignations: [
                            {
                                departmentId: 109,
                                departmentName: 'Eng Department',
                                teamId: 4,
                                designationIds: [252],
                                designationNames: [null]
                            },
                            {
                                departmentId: 109,
                                departmentName: 'Eng Department',
                                teamId: 7,
                                teamName: 'Backend Team',
                                designationIds: [253],
                                designationNames: [null]
                            }
                        ]
                    },
                    {
                        organisationId: 1,
                        id: 106,
                        kpiId: 'K063',
                        title: 'asdddddddddddddddd',
                        kraId: 7,
                        kraName: 'Results',
                        description: '<p>assssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>',
                        status: true,
                        versionNumber: 1,
                        kpiDepartmentTeamDesignations: [
                            {
                                departmentId: 109,
                                departmentName: 'Eng Department',
                                teamId: 7,
                                teamName: 'Backend Team',
                                designationIds: [253],
                                designationNames: [null]
                            }
                        ]
                    },
                    {
                        organisationId: 1,
                        id: 105,
                        kpiId: 'K062',
                        title: 'Demo Kpi',
                        kraId: 7,
                        kraName: 'Results',
                        description: '<p>saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad</p>',
                        status: true,
                        versionNumber: 2,
                        kpiDepartmentTeamDesignations: [
                            {
                                departmentId: 108,
                                departmentName: 'Account Department',
                                teamId: 200,
                                teamName: 'Account Team134',
                                designationIds: [271],
                                designationNames: ['dadasdsssdj']
                            },
                            {
                                departmentId: 109,
                                departmentName: 'Eng Department',
                                teamId: 7,
                                teamName: 'Backend Team',
                                designationIds: [253],
                                designationNames: [null]
                            },
                            {
                                departmentId: 109,
                                departmentName: 'Eng Department',
                                teamId: 173,
                                designationIds: [264],
                                designationNames: [null]
                            }
                        ]
                    },
                    {
                        organisationId: 1,
                        id: 103,
                        kpiId: 'K061',
                        title: 'Demo Kpi',
                        kraId: 7,
                        kraName: 'Results',
                        description: '<p>saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>',
                        status: true,
                        versionNumber: 1,
                        kpiDepartmentTeamDesignations: [
                            {
                                departmentId: 108,
                                departmentName: 'Account Department',
                                teamId: 136,
                                teamName: 'testDemo',
                                designationIds: [187],
                                designationNames: ['sdsaaaaaaaaaa']
                            },
                            {
                                departmentId: 108,
                                departmentName: 'Account Department',
                                teamId: 200,
                                teamName: 'Account Team134',
                                designationIds: [271, 279],
                                designationNames: ['dadasdsssdj', 'SDE1']
                            }
                        ]
                    },
                    {
                        organisationId: 1,
                        id: 99,
                        kpiId: 'K060',
                        title: 'demo',
                        kraId: 7,
                        kraName: 'Results',
                        description: '<p>sdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>',
                        status: true,
                        versionNumber: 2,
                        kpiDepartmentTeamDesignations: [
                            {
                                departmentId: 108,
                                departmentName: 'Account Department',
                                teamId: 200,
                                teamName: 'Account Team134',
                                designationIds: [279],
                                designationNames: ['SDE1']
                            },
                            {
                                departmentId: 109,
                                departmentName: 'Eng Department',
                                teamId: 4,
                                designationIds: [195],
                                designationNames: [null]
                            }
                        ]
                    },
                    {
                        organisationId: 1,
                        id: 98,
                        kpiId: 'K059',
                        title: 'testKpi123',
                        kraId: 7,
                        kraName: 'Results',
                        description: '<p>sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>',
                        status: true,
                        versionNumber: 9,
                        kpiDepartmentTeamDesignations: [
                            {
                                departmentId: 108,
                                departmentName: 'Account Department',
                                teamId: 200,
                                teamName: 'Account Team134',
                                designationIds: [266, 271, 279],
                                designationNames: ['DemoDesignation', 'dadasdsssdj', 'SDE1']
                            },
                            {
                                departmentId: 109,
                                departmentName: 'Eng Department',
                                teamId: 3,
                                designationIds: [267],
                                designationNames: [null]
                            },
                            {
                                departmentId: 109,
                                departmentName: 'Eng Department',
                                teamId: 4,
                                designationIds: [109],
                                designationNames: [null]
                            }
                        ]
                    },
                    {
                        organisationId: 1,
                        id: 79,
                        kpiId: 'K058',
                        title: 'demoKpi123',
                        kraId: 7,
                        kraName: 'Results',
                        description: '<p>wwwwwwwwwwwwwwwwwwwwwwwsssssssssssssaaaaaaaaaaaaaaaaaa</p>',
                        status: true,
                        versionNumber: 1,
                        kpiDepartmentTeamDesignations: [
                            {
                                departmentId: 111,
                                departmentName: 'DemoDepartment',
                                teamId: 207,
                                teamName: 'DempTeam',
                                designationIds: [278],
                                designationNames: ['DemoDesignation']
                            }
                        ]
                    },
                    {
                        organisationId: 1,
                        id: 100,
                        kpiId: 'K057',
                        title: 'DemoKpi',
                        kraId: 7,
                        kraName: 'Results',
                        description: '<p>xssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>',
                        status: true,
                        versionNumber: 3,
                        kpiDepartmentTeamDesignations: [
                            {
                                departmentId: 108,
                                departmentName: 'Account Department',
                                teamId: 200,
                                teamName: 'Account Team134',
                                designationIds: [266, 271],
                                designationNames: ['DemoDesignation', 'dadasdsssdj']
                            }
                        ]
                    },
                    {
                        organisationId: 1,
                        id: 101,
                        kpiId: 'K056',
                        title: 'Level of creativity and innovation',
                        kraId: 7,
                        kraName: 'Results',
                        description:
                            '<p>This KPI checks the level of creativity or innovation a person can bring to his or her projects:</p><p>1. Doing their own research</p><p>2. Not Copying everything from the internet</p><p>3. Proper Execution of the process</p><p>4. Thinking out of the box</p><p>5. New suggestions/improvements given to BA/PM</p><p><br></p>',
                        status: true,
                        versionNumber: 3,
                        kpiDepartmentTeamDesignations: [
                            {
                                departmentId: 107,
                                teamId: 2,
                                designationIds: [235],
                                designationNames: [null]
                            }
                        ]
                    },
                    {
                        organisationId: 1,
                        id: 82,
                        kpiId: 'K055',
                        title: 'Responsiveness knowlegde',
                        kraId: 7,
                        kraName: 'Results',
                        description:
                            "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure th</p>",
                        status: true,
                        versionNumber: 2,
                        kpiDepartmentTeamDesignations: [
                            {
                                departmentId: 107,
                                teamId: 2,
                                designationIds: [235],
                                designationNames: [null]
                            }
                        ]
                    }
                ]
            },
            someData: {
                totalKPIs: 2,
                kpis: [
                    {
                        organisationId: 1,
                        id: 1,
                        kpiId: 'K064',
                        title: 'Test Bug',
                        kraId: 7,
                        kraName: 'Results',
                        description:
                            '<p><span style="background-color: rgb(247, 248, 249);">Demo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo Kpi</span></p>',
                        status: true,
                        versionNumber: 1,
                        kpiDepartmentTeamDesignations: [
                            {
                                departmentId: 1,
                                departmentName: 'Eng Department',
                                teamId: 1,
                                teamName: 'QA Team',
                                designationIds: [1],
                                designationNames: [null]
                            },
                            {
                                departmentId: 1,
                                departmentName: 'Eng Department',
                                teamId: 2,
                                teamName: 'Backend Team',
                                designationIds: [2],
                                designationNames: [null]
                            }
                        ]
                    },
                    {
                        organisationId: 1,
                        id: 106,
                        kpiId: 'K063',
                        title: 'Test Kpi',
                        kraId: 7,
                        kraName: 'Attitude Fitment',
                        description: '<p>assssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>',
                        status: true,
                        versionNumber: 1,
                        kpiDepartmentTeamDesignations: [
                            {
                                departmentId: 1,
                                departmentName: 'Eng Department',
                                teamId: 2,
                                teamName: 'Backend Team',
                                designationIds: [2],
                                designationNames: [null]
                            }
                        ]
                    }
                ]
            },
            filterData: {
                totalKPIs: 1,
                kpis: [
                    {
                        organisationId: 1,
                        id: 1,
                        kpiId: 'K064',
                        title: 'Test Bug',
                        kraId: 7,
                        kraName: 'Results',
                        description:
                            '<p><span style="background-color: rgb(247, 248, 249);">Demo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo Kpi</span></p>',
                        status: true,
                        versionNumber: 1,
                        kpiDepartmentTeamDesignations: [
                            {
                                departmentId: 1,
                                departmentName: 'Eng Department',
                                teamId: 1,
                                teamName: 'QA Team',
                                designationIds: [1],
                                designationNames: [null]
                            },
                            {
                                departmentId: 1,
                                departmentName: 'Eng Department',
                                teamId: 2,
                                teamName: 'Backend Team',
                                designationIds: [2],
                                designationNames: [null]
                            }
                        ]
                    }
                ]
            }
        }
    },
    kra: {
        get: {
            url: 'https://dummy-api.example.com/api/kra/?organisationId=1',
            filterUrl:
                'https://dummy-api.example.com/api/kpi/?page=1&limit=10&organisationId=3&searchText=&kraId=7&teamId=-99&designationId=-99&departmentId=-99&status=true,false',
            allData: [
                {
                    id: 7,
                    kraId: 'KRA01',
                    name: 'Results',
                    weightage: 70,
                    organisationId: 3
                },
                {
                    id: 8,
                    kraId: 'KRA02',
                    name: 'Skill & Knowledge Growth',
                    weightage: 20,
                    organisationId: 3
                },
                {
                    id: 9,
                    kraId: 'KRA03',
                    name: 'Attitude Fitment',
                    weightage: 10,
                    organisationId: 3
                }
            ],
            filterData: [
                {
                    totalKPIs: 1,
                    kpis: [
                        {
                            organisationId: 3,
                            id: 12,
                            kpiId: 'KPI010',
                            title: 'TEST KPI',
                            kraId: 7,
                            kraName: 'Results',
                            description: '<p>asdsadsadasdsadsadasdsadsadasdsadsadasdsadsadasdsadsadasdsadsad</p>',
                            status: false,
                            versionNumber: 1,
                            kpiDepartmentTeamDesignations: [
                                {
                                    departmentId: 9,
                                    departmentName: 'Back Office',
                                    teamId: 11,
                                    teamName: 'Calling Team',
                                    designationIds: [15],
                                    designationNames: ['Junior Executive']
                                }
                            ]
                        },
                        {
                            organisationId: 3,
                            id: 12,
                            kpiId: 'KPI010',
                            title: 'TEST KPI',
                            kraId: 7,
                            kraName: 'Results',
                            description: '<p>asdsadsadasdsadsadasdsadsadasdsadsadasdsadsadasdsadsadasdsadsad</p>',
                            status: false,
                            versionNumber: 1,
                            kpiDepartmentTeamDesignations: [
                                {
                                    departmentId: 9,
                                    departmentName: 'Back Office',
                                    teamId: 11,
                                    teamName: 'Calling Team',
                                    designationIds: [15],
                                    designationNames: ['Junior Executive']
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    teams: {
        get: {
            url: 'https://dummy-api.example.com/api/teams/?organisationId=1&departmentId=1',
            data: {
                unlinkedTeamsCount: 0,
                totalTeams: 4,
                teams: [
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentDisplayId: 'DEP1',
                        departmentName: 'Eng Department',
                        departmentStatus: true,
                        id: 1,
                        teamId: 'T1',
                        teamName: 'QA Team',
                        teamStatus: true,
                        teamCreatedAt: 1693999527466,
                        teamUpdatedAt: 1693999554364
                    },
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentDisplayId: 'DEP1',
                        departmentName: 'Eng Department',
                        departmentStatus: true,
                        id: 2,
                        teamId: 'T2',
                        teamName: 'Backend Team',
                        teamStatus: true,
                        teamCreatedAt: 1693207808752,
                        teamUpdatedAt: 1693999567152
                    },
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentDisplayId: 'DEP1',
                        departmentName: 'Eng Department',
                        departmentStatus: true,
                        id: 3,
                        teamId: 'T3',
                        teamName: 'uat',
                        teamStatus: false,
                        teamCreatedAt: 1693207808752,
                        teamUpdatedAt: 1693999567152
                    },
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentDisplayId: 'DEP1',
                        departmentName: 'Eng Department',
                        departmentStatus: true,
                        id: 4,
                        teamId: 'T4',
                        teamName: 'DevOps',
                        teamStatus: false,
                        teamCreatedAt: 1693207808752,
                        teamUpdatedAt: 1693999567152
                    }
                ]
            }
        }
    },
    designations: {
        get: {
            url: 'https://dummy-api.example.com/api/designation/?organisationId=1&teamId=1',
            responseCode: 200,
            data: {
                unlinkedDesignationsCount: 0,
                totalDesignation: 2,
                designations: [
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentName: 'Eng Departmen',
                        departmentDisplayId: 'DEP1',
                        departmentStatus: true,
                        teamId: 1,
                        teamName: 'QA Team',
                        teamDisplayId: 'T1',
                        teamStatus: true,
                        id: 1,
                        designationId: 'D1',
                        designationName: 'SDE',
                        status: true,
                        createdAt: 1699448401146,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD2',
                        teamsDisplayId: 'TT1'
                    },
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentName: 'Eng Department',
                        departmentDisplayId: 'DEP1',
                        departmentStatus: true,
                        teamId: 2,
                        teamName: 'Backend Team',
                        teamDisplayId: 'T2',
                        teamStatus: true,
                        id: 2,
                        designationId: 'D2',
                        designationName: 'testDeg',
                        status: true,
                        createdAt: 1693402666309,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD1',
                        teamsDisplayId: 'TT2'
                    }
                ]
            }
        }
    },
    activeCycle: {
        get: {
            url: 'https://dummy-api.example.com/api/review-cycle/active?organisationId=1',
            data: {
                organisationId: 1,
                reviewCycleId: 34,
                startDate: CURRENT_DAY - ONE_DAY,
                endDate: CURRENT_DAY + ONE_DAY * 30,
                publish: true,
                lastModified: CURRENT_DAY,
                selfReviewStartDate: CURRENT_DAY,
                selfReviewEndDate: CURRENT_DAY + ONE_DAY * 5,
                managerReviewStartDate: CURRENT_DAY + ONE_DAY * 5,
                managerReviewEndDate: CURRENT_DAY + ONE_DAY * 10,
                checkInWithManagerStartDate: CURRENT_DAY + ONE_DAY * 11,
                checkInWithManagerEndDate: CURRENT_DAY + ONE_DAY * 15
            }
        }
    },
    mockState: {
        state: {
            organisationId: 1,
            id: 1,
            kpiId: 'K064',
            title: 'Test Bug',
            kraId: 7,
            kraName: 'Results',
            description:
                '<p><span style="background-color: rgb(247, 248, 249);">Demo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo Kpi</span></p>',
            status: true,
            versionNumber: 1,
            kpiDepartmentTeamDesignations: [
                {
                    departmentId: 1,
                    departmentName: 'Eng Department',
                    teamId: 1,
                    teamName: 'QA Team',
                    designationIds: [1],
                    designationNames: [null]
                },
                {
                    departmentId: 1,
                    departmentName: 'Eng Department',
                    teamId: 2,
                    teamName: 'Backend Team',
                    designationIds: [2],
                    designationNames: [null]
                }
            ],
            action: 'edit'
        }
    },
    departments: {
        get: {
            url: 'https://dummy-api.example.com/api/departments/?organisationId=1',
            responseCode: 200,
            someData: {
                totalDepartments: 1,
                departments: [
                    {
                        organisationId: 1,
                        id: 1,
                        departmentId: 'DEP1',
                        departmentName: 'Eng Department',
                        departmentStatus: true,
                        departmentCreatedAt: 1693397266597
                    }
                ]
            }
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
