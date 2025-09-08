export const SuperAdminLoginMockData = {
    get: {
        url: 'https://dummy-api.example.com/api/employees/email?emailId=superadmin@company.com',
        responseData: {
            id: 13,
            emailId: 'superadmin@company.com',
            firstName: 'First',
            lastName: 'Last',
            modulePermission: [
                {
                    moduleId: 1,
                    moduleName: 'Organisations',
                    view: true,
                    edit: true
                }
            ]
        }
    },
    post: {
        url: 'https://dummy-api.example.com/login/super-admin',
        responseData: {
            authentication: {
                name: 'superadmin@company.com',
                attributes: {
                    access_token: 'test_access_token',
                    refresh_token: 'test_refresh_token',
                    login_flow: 'Username,Password',
                    token_type: 'Bearer',
                    expires_in: 86400,
                    roles: ['SUPER_ADMIN']
                }
            },
            authenticated: true
        }
    },
    initialState: { isLoggedIn: false }
};
