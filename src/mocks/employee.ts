export const employeeMockData = {
    departments: {
        get: {
            url: 'https://dummy-api.example.com/api/departments/?organisationId=1',
            responseCode: 200,
            someData: {
                totalDepartments: 2,
                departments: [
                    {
                        organisationId: 1,
                        id: 1,
                        departmentId: 'DEP1',
                        departmentName: 'Dep1',
                        departmentStatus: true,
                        departmentCreatedAt: 1693397266597
                    },
                    {
                        organisationId: 1,
                        id: 2,
                        departmentId: 'DEP2',
                        departmentName: 'Dep2',
                        departmentStatus: true,
                        departmentCreatedAt: 1692773271373
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
    },
    teams: {
        get: {
            url: 'https://dummy-api.example.com/api/teams/?organisationId=1&departmentId=1',
            responseCode: 200,
            someData: {
                unlinkedTeamsCount: 0,
                totalTeams: 2,
                teams: [
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentDisplayId: 'DEP1',
                        departmentName: 'Dep1',
                        departmentStatus: true,
                        id: 1,
                        teamId: 'T1',
                        teamName: 'Team1',
                        teamStatus: true,
                        teamCreatedAt: 1693999527466,
                        teamUpdatedAt: 1693999554364
                    },
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentDisplayId: 'DEP1',
                        departmentName: 'Dep1',
                        departmentStatus: true,
                        id: 2,
                        teamId: 'T2',
                        teamName: 'Team2',
                        teamStatus: true,
                        teamCreatedAt: 1693207808752,
                        teamUpdatedAt: 1693999567152
                    },
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentDisplayId: 'DEP1',
                        departmentName: 'Dep1',
                        departmentStatus: true,
                        id: 3,
                        teamId: 'T3',
                        teamName: 'Team3',
                        teamStatus: true,
                        teamCreatedAt: 1693207808752,
                        teamUpdatedAt: 1693999567152
                    }
                ]
            }
        }
    },
    roles: {
        get: {
            url: 'https://dummy-api.example.com/api/role/?organisationId=1',
            responseCode: 200,
            someData: {
                totalRoles: 2,
                roles: [
                    {
                        organisationId: 1,
                        id: 2,
                        roleId: 'R2',
                        roleName: 'HR',
                        modulePermission: [
                            {
                                moduleId: 19,
                                moduleName: 'Integrations',
                                view: true,
                                edit: false
                            },
                            {
                                moduleId: 14,
                                moduleName: 'User Activity Log',
                                view: true,
                                edit: false
                            },
                            {
                                moduleId: 16,
                                moduleName: 'Request Feedback',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 3,
                                moduleName: 'Feedback',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 10,
                                moduleName: 'Performance Review',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 18,
                                moduleName: 'Analytics',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 20,
                                moduleName: 'Departments',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 4,
                                moduleName: 'Teams',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 5,
                                moduleName: 'Designations',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 6,
                                moduleName: 'Roles & Permissions',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 7,
                                moduleName: 'Employees',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 8,
                                moduleName: 'KPIs',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 12,
                                moduleName: 'Reviews for Team Members',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 13,
                                moduleName: 'Check-in with Team Members',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 9,
                                moduleName: 'Review Cycles',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 15,
                                moduleName: 'Company Information',
                                view: true,
                                edit: false
                            },
                            {
                                moduleId: 17,
                                moduleName: 'Allowed Domains',
                                view: true,
                                edit: false
                            }
                        ],
                        status: true,
                        createdAt: 1678885516918,
                        updatedAt: 1693999647969
                    },
                    {
                        organisationId: 1,
                        id: 1,
                        roleId: 'R1',
                        roleName: 'Org Admin',
                        modulePermission: [
                            {
                                moduleId: 3,
                                moduleName: 'Feedback',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 4,
                                moduleName: 'Teams',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 5,
                                moduleName: 'Designations',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 6,
                                moduleName: 'Roles & Permissions',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 7,
                                moduleName: 'Employees',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 8,
                                moduleName: 'KPIs',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 9,
                                moduleName: 'Review Cycles',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 12,
                                moduleName: 'Reviews for Team Members',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 13,
                                moduleName: 'Check-in with Team Members',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 10,
                                moduleName: 'Performance Review',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 16,
                                moduleName: 'Request Feedback',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 14,
                                moduleName: 'User Activity Log',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 15,
                                moduleName: 'Company Information',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 17,
                                moduleName: 'Allowed Domains',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 18,
                                moduleName: 'Analytics',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 19,
                                moduleName: 'Integrations',
                                view: true,
                                edit: true
                            },
                            {
                                moduleId: 20,
                                moduleName: 'Departments',
                                view: true,
                                edit: true
                            }
                        ],
                        status: true,
                        createdAt: 1678885516710
                    }
                ]
            }
        }
    },
    designations: {
        get: {
            url: 'https://dummy-api.example.com//api/designation/?organisationId=1',
            responseCode: 200,
            someData: {
                unlinkedDesignationsCount: 0,
                totalDesignation: 3,
                designations: [
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentName: 'Dep1',
                        departmentDisplayId: 'DEP1',
                        departmentStatus: true,
                        teamId: 1,
                        teamName: 'Team1',
                        teamDisplayId: 'T1',
                        teamStatus: true,
                        id: 1,
                        designationId: 'D1',
                        designationName: 'SDE',
                        status: true,
                        createdAt: 1693999616152,
                        departmentsDisplayId: 'DEPDEP1',
                        designationsDisplayId: 'DD1',
                        teamsDisplayId: 'TT1'
                    },
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentName: 'Dep2',
                        departmentDisplayId: 'DEP2',
                        departmentStatus: true,
                        teamId: 1,
                        teamName: 'Team1',
                        teamDisplayId: 'T1',
                        teamStatus: true,
                        id: 2,
                        designationId: 'D3',
                        designationName: 'QA',
                        status: true,
                        createdAt: 1693999589964,
                        departmentsDisplayId: 'DEPDEP1',
                        designationsDisplayId: 'DD2',
                        teamsDisplayId: 'TT1'
                    },
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentName: 'Dep2',
                        departmentDisplayId: 'DEP2',
                        departmentStatus: true,
                        teamId: 2,
                        teamName: 'Team2',
                        teamDisplayId: 'T2',
                        teamStatus: true,
                        id: 3,
                        designationId: 'D3',
                        designationName: 'DevOps',
                        status: true,
                        createdAt: 1693988942961,
                        departmentsDisplayId: 'DEPDEP1',
                        designationsDisplayId: 'DD3',
                        teamsDisplayId: 'TT2'
                    }
                ]
            }
        }
    },
    employee: {
        get: {
            url: 'https://dummy-api.example.com/api/employees/?teamId=-99&designationId=-99&roleId=-99&departmentId=-99&searchText=&organisationId=1&page=1&limit=10&sortOrderId=2',
            responseCode: 200,
            allData: {
                totalEmployees: 11,
                employees: [
                    {
                        organisationId: 1,
                        id: 1,
                        employeeId: 'SR003',
                        firstName: 'User',
                        lastName: 'Test',
                        emailId: 'meet.p1atel@scalereal.com',
                        contactNo: '+913243253222',
                        genderId: 1,
                        dateOfBirth: 1689811200000,
                        dateOfJoining: 1683849600000,
                        experienceInMonths: 6,
                        status: true,
                        isConsultant: false,
                        departmentName: 'Dep1',
                        teamName: 'Team1',
                        designationName: 'QA',
                        roleName: 'Org Admin',
                        firstManagerId: 1,
                        firstManagerEmployeeId: 'SR001',
                        secondManagerId: 2,
                        secondManagerEmployeeId: 'SR002',
                        employeeNameWithEmployeeId: ' User Test ( ESR003 )'
                    },
                    {
                        organisationId: 1,
                        id: 3,
                        employeeId: 'SR004',
                        firstName: 'User3',
                        lastName: 'Test',
                        emailId: 'Tm233@gmail.com',
                        contactNo: '+912111111111',
                        status: false,
                        isConsultant: false,
                        departmentName: 'Dep2',
                        teamName: 'Team2',
                        designationName: 'DevOps',
                        roleName: 'Org Admin',
                        firstManagerId: 1,
                        firstManagerEmployeeId: 'SR001',
                        employeeNameWithEmployeeId: ' User2 Test ( SR004 )'
                    },
                    {
                        organisationId: 1,
                        id: 124,
                        employeeId: 'Tm121233',
                        firstName: 'Tm',
                        lastName: 'Tm',
                        emailId: 'Tm@gmail.com',
                        contactNo: '+911231232222',
                        genderId: 1,
                        dateOfBirth: 1691452800000,
                        dateOfJoining: 1691452800000,
                        experienceInMonths: 0,
                        status: true,
                        isConsultant: false,
                        departmentName: 'Executive Leadership',
                        teamName: 'Frontend Team',
                        designationName: 'SDE1',
                        roleName: 'Org Admin',
                        firstManagerId: 54,
                        firstManagerEmployeeId: 'SR0039',
                        employeeNameWithEmployeeId: ' Tm Tm ( Tm121233 )'
                    },
                    {
                        organisationId: 1,
                        id: 122,
                        employeeId: 'TestName001',
                        firstName: 'TestName',
                        lastName: 'TestName',
                        emailId: 'TestName@scalereal.com',
                        contactNo: '+919876789887',
                        genderId: 3,
                        dateOfBirth: 1690934400000,
                        dateOfJoining: 1691020800000,
                        experienceInMonths: 4,
                        status: true,
                        isConsultant: false,
                        departmentName: 'Executive Leadership',
                        teamName: 'Backend',
                        designationName: 'New',
                        roleName: 'Org Admin',
                        firstManagerId: 119,
                        firstManagerEmployeeId: 'SR004423',
                        secondManagerId: 44,
                        secondManagerEmployeeId: 'SR0390',
                        employeeNameWithEmployeeId: ' TestName TestName ( TestName001 )'
                    },
                    {
                        organisationId: 1,
                        id: 96,
                        employeeId: 'test123',
                        firstName: 'Batman',
                        lastName: 'Bale',
                        emailId: 'test@gmail.com',
                        contactNo: '+919832423894',
                        status: false,
                        isConsultant: false,
                        teamName: 'BA',
                        designationName: 'Org Admin',
                        roleName: 'Admin 3',
                        firstManagerId: 54,
                        firstManagerEmployeeId: 'SR0039',
                        secondManagerId: 44,
                        secondManagerEmployeeId: 'SR0390',
                        employeeNameWithEmployeeId: ' Batman Bale ( test123 )'
                    },
                    {
                        organisationId: 1,
                        id: 140,
                        employeeId: 'SR9876',
                        firstName: 'Test',
                        lastName: 'User',
                        emailId: 'user1234@scalereal.com',
                        contactNo: '+919874563258',
                        genderId: 2,
                        dateOfBirth: 1533686400000,
                        dateOfJoining: 1690934400000,
                        experienceInMonths: 5,
                        status: true,
                        isConsultant: false,
                        teamName: 'BA Team',
                        designationName: 'sddddddddddddddd',
                        roleName: 'Admin 3',
                        firstManagerId: 54,
                        firstManagerEmployeeId: 'SR0039',
                        employeeNameWithEmployeeId: ' Test User ( SR9876 )'
                    },
                    {
                        organisationId: 1,
                        id: 105,
                        employeeId: 'SR33345',
                        firstName: 'Temp',
                        lastName: 'Data',
                        emailId: 'TempData@scalereal.com',
                        contactNo: '+913244325555',
                        status: true,
                        isConsultant: false,
                        departmentName: 'Executive Leadership',
                        teamName: 'Org Admin',
                        designationName: 'Org Admin',
                        roleName: 'Org Admin',
                        firstManagerId: 44,
                        firstManagerEmployeeId: 'SR0390',
                        employeeNameWithEmployeeId: ' Temp Data ( SR33345 )'
                    },
                    {
                        organisationId: 1,
                        id: 126,
                        employeeId: 'sr233',
                        firstName: 'Temp',
                        lastName: 'Data',
                        emailId: 'tep123@gmail.com',
                        contactNo: '+914243423332',
                        status: true,
                        isConsultant: false,
                        teamName: 'Org Admin',
                        designationName: 'Org Admin',
                        roleName: 'Batman',
                        firstManagerId: 121,
                        firstManagerEmployeeId: 'AG112233',
                        employeeNameWithEmployeeId: ' Temp Data ( sr233 )'
                    },
                    {
                        organisationId: 1,
                        id: 128,
                        employeeId: 'sr231312',
                        firstName: 'Test',
                        lastName: 'Flow',
                        emailId: 'test12321@gmail.com',
                        contactNo: '+913244441100',
                        status: true,
                        isConsultant: false,
                        teamName: 'BA Team',
                        designationName: 'designation111',
                        roleName: 'Employee',
                        firstManagerId: 54,
                        firstManagerEmployeeId: 'SR0039',
                        employeeNameWithEmployeeId: ' Test Flow ( sr231312 )'
                    },
                    {
                        organisationId: 1,
                        id: 115,
                        employeeId: 'sr13124',
                        firstName: 'TEST',
                        lastName: 'NAME',
                        emailId: 'tes2333t@gmail.com',
                        contactNo: '+912342343243',
                        genderId: 2,
                        dateOfBirth: 1691020800000,
                        dateOfJoining: 1690848000000,
                        experienceInMonths: 0,
                        status: true,
                        isConsultant: false,
                        departmentName: 'Executive Leadership',
                        teamName: 'Org Admin',
                        designationName: 'Org Admin',
                        roleName: 'Org Admin',
                        firstManagerId: 121,
                        firstManagerEmployeeId: 'AG112233',
                        employeeNameWithEmployeeId: ' TEST NAME ( sr13124 )'
                    }
                ]
            },
            someData: {
                totalEmployees: 11,
                employees: [
                    {
                        organisationId: 1,
                        id: 1,
                        employeeId: 'SR003',
                        firstName: 'User',
                        lastName: 'Test',
                        emailId: 'meet.p1atel@scalereal.com',
                        contactNo: '+913243253222',
                        genderId: 1,
                        dateOfBirth: 1689811200000,
                        dateOfJoining: 1683849600000,
                        experienceInMonths: 6,
                        status: true,
                        isConsultant: false,
                        departmentName: 'Dep1',
                        teamName: 'Team1',
                        designationName: 'QA',
                        roleName: 'Org Admin',
                        firstManagerId: 1,
                        firstManagerEmployeeId: 'SR001',
                        secondManagerId: 2,
                        secondManagerEmployeeId: 'SR002',
                        employeeNameWithEmployeeId: ' User Test ( ESR003 )'
                    },
                    {
                        organisationId: 1,
                        id: 2,
                        employeeId: 'SR004',
                        firstName: 'User2',
                        lastName: 'Test',
                        emailId: 'Tm233@gmail.com',
                        contactNo: '+912111111111',
                        status: false,
                        isConsultant: false,
                        departmentName: 'Dep2',
                        teamName: 'Team2',
                        designationName: 'DevOps',
                        roleName: 'Org Admin',
                        firstManagerId: 1,
                        firstManagerEmployeeId: 'SR001',
                        employeeNameWithEmployeeId: ' User2 Test ( SR004 )'
                    }
                ]
            },
            searchData: {
                totalEmployees: 1,
                employees: [
                    {
                        organisationId: 1,
                        id: 1,
                        employeeId: 'SR003',
                        firstName: 'User',
                        lastName: 'Test',
                        emailId: 'meet.p1atel@scalereal.com',
                        contactNo: '+913243253222',
                        genderId: 1,
                        dateOfBirth: 1689811200000,
                        dateOfJoining: 1683849600000,
                        experienceInMonths: 6,
                        status: true,
                        isConsultant: false,
                        departmentName: 'Dep1',
                        teamName: 'Team1',
                        designationName: 'QA',
                        roleName: 'Org Admin',
                        firstManagerId: 1,
                        firstManagerEmployeeId: 'SR001',
                        secondManagerId: 2,
                        secondManagerEmployeeId: 'SR002',
                        employeeNameWithEmployeeId: ' User Test ( ESR003 )'
                    }
                ]
            }
        }
    }
};

export const URLs = {
    empDepUrl:
        'https://dummy-api.example.com/api/employees/?teamId=-99&designationId=-99&roleId=-99&departmentId=1&searchText=&organisationId=1&page=1&limit=10&sortOrderId=2',
    empDepTeamUrl:
        'https://dummy-api.example.com/api/employees/?teamId=1&designationId=-99&roleId=-99&departmentId=1&searchText=&organisationId=1&page=1&limit=10&sortOrderId=2',
    empDepTeamDesUrl:
        'https://dummy-api.example.com/api/employees/?teamId=1&designationId=1&roleId=-99&departmentId=1&searchText=&organisationId=1&page=1&limit=10&sortOrderId=2',
    searchUrl:
        'https://dummy-api.example.com/api/employees/?teamId=-99&designationId=-99&roleId=-99&departmentId=-99&searchText=User Test&organisationId=1&page=1&limit=10&sortOrderId=2',
    page2Url:
        'https://dummy-api.example.com/api/employees/?teamId=-99&designationId=-99&roleId=-99&departmentId=-99&searchText=&organisationId=1&page=2&limit=10&sortOrderId=2',
    sortUrl:
        'https://dummy-api.example.com/api/employees/?teamId=-99&designationId=-99&roleId=-99&departmentId=-99&searchText=&organisationId=1&page=2&limit=10&sortOrderId=1'
};
