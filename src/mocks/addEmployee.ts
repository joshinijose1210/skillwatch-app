export const addEmployeeMockData = {
    experience: {
        get: {
            // TODO: Extract or derive the URLs for mocks to make it easier to update
            url: 'https://dummy-api.example.com/api/employees/experience-list/?organisationId=1',
            data: [
                {
                    id: 1,
                    experienceString: '0 years 0 months',
                    totalMonths: 0
                },
                {
                    id: 2,
                    experienceString: '0 years 1 month',
                    totalMonths: 1
                },
                {
                    id: 3,
                    experienceString: '0 years 2 months',
                    totalMonths: 2
                }
            ]
        }
    },
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
                    },
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentDisplayId: 'DEP1',
                        departmentName: 'Dep1',
                        departmentStatus: true,
                        id: 4,
                        teamId: 'a-T2',
                        teamName: 'a-Team2',
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
                        id: 5,
                        teamId: 'b-T3',
                        teamName: 'b-Team3',
                        teamStatus: false,
                        teamCreatedAt: 1693207808752,
                        teamUpdatedAt: 1693999567152
                    },
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentDisplayId: 'DEP1',
                        departmentName: 'Dep1',
                        departmentStatus: true,
                        id: 6,
                        teamId: 'c-T2',
                        teamName: 'c-Team2',
                        teamStatus: false,
                        teamCreatedAt: 1693207808752,
                        teamUpdatedAt: 1693999567152
                    },
                    {
                        organisationId: 1,
                        departmentId: 1,
                        departmentDisplayId: 'DEP1',
                        departmentName: 'Dep1',
                        departmentStatus: true,
                        id: 7,
                        teamId: 'd-T3',
                        teamName: 'd-Team3',
                        teamStatus: true,
                        teamCreatedAt: 1693207808752,
                        teamUpdatedAt: 1693999567152
                    }
                ]
            }
        }
    },
    designations: {
        get: {
            url: 'https://dummy-api.example.com/api/designation/?organisationId=1&teamId=1&searchText=',
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
            },
            inactiveDesignationsData: {
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
                        status: false,
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
                        status: false,
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
                        status: false,
                        createdAt: 1693988942961,
                        departmentsDisplayId: 'DEPDEP1',
                        designationsDisplayId: 'DD3',
                        teamsDisplayId: 'TT2'
                    }
                ]
            }
        }
    },
    managers: {
        get: {
            url: 'https://dummy-api.example.com/api/employees/managers/?organisationId=1',
            someData: {
                totalManagers: 23,
                managers: [
                    {
                        organisationId: 1,
                        id: 170,
                        employeeId: 'SR001',
                        firstName: 'T',
                        lastName: 'P',
                        emailId: 'TP@yahoo.com',
                        contactNo: '+916673738828',
                        status: true,
                        teamName: 'BA Team',
                        designationName: 'dev team 14',
                        roleName: 'Manager',
                        firstManagerId: 143,
                        firstManagerEmployeeId: 'SR0100'
                    },
                    {
                        organisationId: 1,
                        id: 135,
                        employeeId: 'SR002',
                        firstName: 'R',
                        lastName: 'S',
                        emailId: 'rushad.shaikh1@scalereal.com',
                        contactNo: '+914555555555',
                        status: true,
                        departmentName: 'Executive Leadership',
                        teamName: 'Org Admin',
                        designationName: 'SDE - 1',
                        roleName: 'Org Admin',
                        firstManagerId: 124,
                        firstManagerEmployeeId: 'SR022'
                    },
                    {
                        organisationId: 1,
                        id: 2,
                        employeeId: 'SR002',
                        firstName: 'R',
                        lastName: 'P',
                        emailId: 'r.p4@user.in',
                        contactNo: '+914555555555',
                        status: true,
                        teamName: 'Org Admin',
                        roleName: 'Org Admin',
                        firstManagerId: 124,
                        firstManagerEmployeeId: 'SR022',
                        departmentName: 'Dep1',
                        designationName: 'SDE'
                    }
                ]
            }
        }
    },
    genderList: {
        get: {
            url: 'https://dummy-api.example.com/api/employees/gender-list/?organisationId=1',
            someData: [
                {
                    genderId: 1,
                    genderName: 'Male'
                },
                {
                    genderId: 2,
                    genderName: 'Female'
                },
                {
                    genderId: 3,
                    genderName: 'Others'
                }
            ]
        }
    },
    employeeById: {
        get: {
            url: 'https://dummy-api.example.com/api/employees/by-id/?id=2',
            someData: {
                organisationId: 1,
                id: 2,
                employeeId: 'SR002',
                firstName: 'R',
                lastName: 'P',
                emailId: 'r.p4@user.in',
                contactNo: '+919874567335',
                genderId: 1,
                dateOfBirth: 1693353600000,
                dateOfJoining: 1690934400000,
                experienceInMonths: 0,
                status: true,
                isConsultant: false,
                departmentId: 1,
                departmentName: 'Dep1',
                teamId: 1,
                teamName: 'Team1',
                designationId: 1,
                designationName: 'SDE',
                roleId: 2,
                roleName: 'HR',
                firstManagerId: 1,
                firstManagerEmployeeId: 'SR001',
                firstManagerFirstName: 'R',
                firstManagerLastName: 'S',
                secondManagerId: 1,
                secondManagerEmployeeId: 'SR001',
                secondManagerFirstName: 'R',
                secondManagerLastName: 'S',
                employeeNameWithEmployeeId: 'R P (SR002)'
            }
        }
    },
    reviewCycle: {
        get: {
            url: 'https://dummy-api.example.com/api/review-cycle/timeline/?organisationId=1&reviewToId=72',
            data: [
                {
                    organisationId: 1,
                    reviewCycleId: 141,
                    startDate: 1693699200000,
                    endDate: 1696032000000,
                    publish: true,
                    selfReviewStartDate: 1693785600000,
                    selfReviewEndDate: 1693958400000,
                    managerReviewStartDate: 1693958400000,
                    managerReviewEndDate: 1694131200000,
                    selfReviewDraft: false,
                    selfReviewPublish: true,
                    selfReviewDate: 1694673030770,
                    selfAverageRating: 2,
                    firstManagerId: 92,
                    firstManagerEmployeeId: 'SR0033',
                    firstManagerFirstName: 'Manoj',
                    firstManagerLastName: 'Patil',
                    firstManagerReviewDraft: false,
                    firstManagerReviewPublish: false,
                    firstManagerAverageRating: -1,
                    secondManagerReviewDraft: false,
                    secondManagerReviewPublish: false,
                    secondManagerAverageRating: -1,
                    checkInWithManagerStartDate: 1694304000000,
                    checkInWithManagerEndDate: 1694736000000,
                    checkInWithManagerDraft: false,
                    checkInWithManagerPublish: false,
                    checkInWithManagerAverageRating: -1,
                    isOrWasManager: true,
                    empDetails: [
                        {
                            id: 219,
                            employeeId: 'SR00224',
                            firstName: 'Stephen',
                            lastName: 'Thomas',
                            firstManagerId: 143,
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
                            id: 244,
                            employeeId: '45453',
                            firstName: 'Test',
                            lastName: 'Uesr',
                            firstManagerId: 123,
                            secondManagerId: 143,
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
                            id: 212,
                            employeeId: 'A000099977',
                            firstName: 'Aksh',
                            lastName: 'Srivastava',
                            firstManagerId: 123,
                            secondManagerId: 143,
                            selfReviewDraft: false,
                            selfReviewPublish: false,
                            firstManagerReviewDraft: false,
                            firstManagerReviewPublish: false,
                            secondManagerReviewDraft: false,
                            secondManagerReviewPublish: false,
                            checkInWithManagerDraft: false,
                            checkInWithManagerPublish: false
                        }
                    ]
                }
            ]
        }
    },
    reportees: {
        get: {
            url: 'https://dummy-api.example.com/api/employees/by-manager?organisationId=1&managerId=2',
            data: {
                reporteesCount: 1,
                managerId: 2,
                reporteesData: [
                    {
                        organisationId: 1,
                        id: 6,
                        employeeId: 'SR006',
                        firstName: 'A',
                        lastName: 'S',
                        emailId: 'ajit.singh@scalereal.com',
                        firstManagerId: 2
                    }
                ]
            }
        }
    },
    navigationMockdata: {
        state: {
            employeeDetails: {
                actionBy: 72,
                contactNo: '+919874567335',
                dateOfBirth: 1693353600000,
                dateOfJoining: 1690934400000,
                departmentId: 1,
                departmentName: 'Dep1',
                designationId: 1,
                designationName: 'SDE',
                emailId: 'r.p4@user.in',
                employeeId: 'SR002',
                employeeNameWithEmployeeId: 'R P (SR002)',
                experienceInMonths: 0,
                firstManagerEmployeeId: 'SR001',
                firstManagerFirstName: 'R',
                firstManagerId: 1,
                firstManagerLastName: 'S',
                firstName: 'R',
                genderId: 1,
                id: 2,
                ipAddress: '216.24.57.253:443',
                isConsultant: false,
                lastName: 'P',
                organisationId: 1,
                roleId: 2,
                roleName: 'HR',
                secondManagerId: 1,
                secondManagerEmployeeId: 'SR001',
                secondManagerFirstName: 'R',
                secondManagerLastName: 'S',
                status: false,
                teamId: 1,
                teamName: 'Team1'
            },
            heading: 'Change Manager',
            isLoading: false,
            managerData: {
                managerId: 2,
                reporteesCount: 1,
                reporteesData: [
                    {
                        emailId: 'ajit.singh@scalereal.com',
                        employeeId: 'SR006',
                        firstManagerId: 2,
                        firstName: 'A',
                        id: 6,
                        lastName: 'S',
                        organisationId: 1
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
    },
    navigationRoleState: {
        state: {
            employeeDetails: {
                actionBy: 72,
                contactNo: '+919874567335',
                dateOfBirth: 1693353600000,
                dateOfJoining: 1690934400000,
                departmentId: 1,
                departmentName: 'Dep1',
                designationId: 1,
                designationName: 'SDE',
                emailId: 'r.p4@user.in',
                employeeId: 'SR002',
                employeeNameWithEmployeeId: 'R P (SR002)',
                experienceInMonths: 0,
                firstManagerEmployeeId: 'SR001',
                firstManagerFirstName: 'R',
                firstManagerId: -99,
                firstManagerLastName: 'S',
                firstName: 'R',
                genderId: 1,
                id: 2,
                ipAddress: '216.24.57.253:443',
                isConsultant: false,
                lastName: 'P',
                organisationId: 1,
                roleId: 1,
                roleName: 'HR',
                secondManagerId: undefined,
                secondManagerEmployeeId: 'SR001',
                secondManagerFirstName: 'R',
                secondManagerLastName: 'S',
                status: true,
                teamId: 1,
                teamName: 'Team1'
            },
            heading: 'Change Role',
            isLoading: false,
            managerData: {
                managerId: 2,
                reporteesCount: 1,
                reporteesData: [
                    {
                        emailId: 'ajit.singh@scalereal.com',
                        employeeId: 'SR006',
                        firstManagerId: 2,
                        firstName: 'A',
                        id: 6,
                        lastName: 'S',
                        organisationId: 1
                    }
                ]
            }
        }
    }
};
