export const LoginMockData = {
    login: {
        post: {
            url: 'https://dummy-api.example.com/login/username',
            responseCode: 200,
            allData: {
                authentication: {
                    name: 'test.user@scalereal.com',
                    attributes: {
                        access_token:
                            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2x5LmFnYXJ3YWxAc2NhbGVyZWFsLmNvbSIsIm5iZiI6MTY5ODMwMjkyMSwicm9sZXMiOlsiSFVNQU4gUkVTT1VSQ0UiXSwiaXNzIjoic2FtcGxlLXNlcnZpY2UiLCJleHAiOjE3MDYxOTI5MjEsImlhdCI6MTY5ODMwMjkyMX0.kNzPYV4nXmdM_A5yy9-FFUu1AuLbW9skY8-yM5OBe-g',
                        refresh_token:
                            'eyJhbGciOiJIUzI1NiJ9.MTgwM2IyOGYtMDFkYS00NjZjLTkwMTgtOWNkZjhkMGI1Mzlh.7efCQbHZde_5ygCc6XnrYZ9KIZ3nB228Yu9UVNbwCN8',
                        login_flow: 'Username,Password',
                        token_type: 'Bearer',
                        expires_in: 7890000,
                        roles: ['HUMAN RESOURCE']
                    }
                },
                authenticated: true
            }
        }
    },
    userDetails: {
        get: {
            url: 'https://dummy-api.example.com/api/employees/email?emailId=test.user@scalereal.com',
            userData: {
                organisationId: 1,
                id: 73,
                employeeId: 'SR0050',
                firstName: 'Test',
                lastName: 'User',
                emailId: 'test.user@scalereal.com',
                contactNo: '+7839999999',
                departmentName: 'Human Resource',
                teamName: 'BA',
                designationName: 'BA - Traineee',
                roleName: 'Human Resource',
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
                onboardingFlow: true,
                employeeNameWithEmployeeId: ' Moly Agarwal ( SR0050 )'
            },
            userDataWithoutModulePermission: {
                organisationId: 1,
                id: 73,
                employeeId: 'SR0050',
                firstName: 'Test',
                lastName: 'User',
                emailId: 'test.user@scalereal.com',
                contactNo: '+7839999999',
                departmentName: 'Human Resource',
                teamName: 'BA',
                designationName: 'BA - Traineee',
                roleName: 'Human Resource'
            }
        }
    },
    googleLogin: {
        post: {
            url: 'https://dummy-api.example.com/login/social',
            responseCode: 200,
            googleData: {
                authentication: {
                    name: 'aamir.islam@scalereal.com',
                    attributes: {
                        access_token:
                            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYW1pci5pc2xhbUBzY2FsZXJlYWwuY29tIiwibmJmIjoxNjk4NjY5MTYxLCJyb2xlcyI6WyJPUkcgQURNSU4iXSwiaXNzIjoic2FtcGxlLXNlcnZpY2UiLCJleHAiOjE3MDY1NTkxNjEsImlhdCI6MTY5ODY2OTE2MX0.CPGfhGX25_Vrz3vlF783FaNRC2dsoGet2T-RqkfE54o',
                        refresh_token:
                            'eyJhbGciOiJIUzI1NiJ9.MTk0NjU3MmEtMWEyNC00MTkwLWE0ZTUtMTJjZjM0MTA2Y2Q5.2hTp8GA8TL0BQiVGaqtblgnvgFEiAgineBZwGFNfFjc',
                        token_type: 'Bearer',
                        expires_in: 7890000,
                        roles: ['ORG ADMIN']
                    }
                },
                authenticated: true
            }
        }
    }
};
