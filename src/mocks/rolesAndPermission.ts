export const rolesMockData = {
    roles: {
        get: {
            url: 'https://dummy-api.example.com/api/role/?page=1&organisationId=1&limit=10&searchText=',
            responseCode: 200,
            allData: {
                totalRoles: 11,
                roles: [
                    {
                        organisationId: 1,
                        id: 226,
                        roleId: 'R42',
                        roleName: 'demoTestRole',
                        modulePermission: [
                            {
                                moduleId: 5,
                                moduleName: 'Designations',
                                view: true,
                                edit: false
                            }
                        ],
                        status: true,
                        createdAt: 1691932468007
                    },
                    {
                        organisationId: 1,
                        id: 225,
                        roleId: 'R41',
                        roleName: 'demoROles123',
                        modulePermission: [
                            {
                                moduleId: 5,
                                moduleName: 'Designations',
                                view: true,
                                edit: false
                            }
                        ],
                        status: true,
                        createdAt: 1691932430056
                    },
                    {
                        organisationId: 1,
                        id: 224,
                        roleId: 'R40',
                        roleName: 'DemoTest123213',
                        modulePermission: [
                            {
                                moduleId: 5,
                                moduleName: 'Designations',
                                view: true,
                                edit: false
                            }
                        ],
                        status: true,
                        createdAt: 1691930042906
                    },
                    {
                        organisationId: 1,
                        id: 223,
                        roleId: 'R39',
                        roleName: 'testRoles',
                        modulePermission: [
                            {
                                moduleId: 5,
                                moduleName: 'Designations',
                                view: true,
                                edit: false
                            }
                        ],
                        status: false,
                        createdAt: 1691930014889,
                        updatedAt: 1693999629961
                    },
                    {
                        organisationId: 1,
                        id: 222,
                        roleId: 'R38',
                        roleName: 'testDemoRole',
                        modulePermission: [
                            {
                                moduleId: 5,
                                moduleName: 'Designations',
                                view: false,
                                edit: false
                            }
                        ],
                        status: true,
                        createdAt: 1691929921605
                    },
                    {
                        organisationId: 1,
                        id: 221,
                        roleId: 'R37',
                        roleName: 'demo1223213',
                        modulePermission: [
                            {
                                moduleId: 5,
                                moduleName: 'Designations',
                                view: true,
                                edit: false
                            }
                        ],
                        status: true,
                        createdAt: 1691928938075,
                        updatedAt: 1691929905784
                    },
                    {
                        organisationId: 1,
                        id: 220,
                        roleId: 'R36',
                        roleName: 'testdd',
                        modulePermission: [
                            {
                                moduleId: 5,
                                moduleName: 'Designations',
                                view: true,
                                edit: false
                            }
                        ],
                        status: true,
                        createdAt: 1691928896528
                    },
                    {
                        organisationId: 1,
                        id: 219,
                        roleId: 'R35',
                        roleName: 'testwedasd',
                        modulePermission: [
                            {
                                moduleId: 5,
                                moduleName: 'Designations',
                                view: true,
                                edit: false
                            }
                        ],
                        status: true,
                        createdAt: 1691928771854
                    },
                    {
                        organisationId: 1,
                        id: 218,
                        roleId: 'R34',
                        roleName: 'demo12333',
                        modulePermission: [
                            {
                                moduleId: 5,
                                moduleName: 'Designations',
                                view: true,
                                edit: false
                            }
                        ],
                        status: true,
                        createdAt: 1691928632977,
                        updatedAt: 1691928978889
                    },
                    {
                        organisationId: 1,
                        id: 217,
                        roleId: 'R33',
                        roleName: 'test12321',
                        modulePermission: [
                            {
                                moduleId: 5,
                                moduleName: 'Designations',
                                view: true,
                                edit: false
                            }
                        ],
                        status: true,
                        createdAt: 1691928420964
                    }
                ]
            }
        },
        patch: {
            url: 'https://dummy-api.example.com/api/role/87'
        },
        post: {
            url: 'https://dummy-api.example.com/api/role/'
        }
    },
    module: {
        url: 'https://dummy-api.example.com/api/module/',
        data: [
            {
                moduleId: 5,
                moduleName: 'Designations'
            },
            {
                moduleId: 3,
                moduleName: 'Analytics',
                mainModule: 'Reports'
            }
        ]
    },
    tempState: {
        action: 'Edit',
        edit: true,
        id: 87,
        moduleId: 5,
        modulePermission: [
            {
                moduleId: 5,
                moduleName: 'Designations',
                view: true,
                edit: false
            }
        ],
        tempPermission: [
            {
                moduleId: 5,
                moduleName: 'Designations',
                view: true,
                edit: false
            }
        ],
        roleName: 'demoTestRole',
        status: false,
        view: true
    },
    LocationMockData: {
        pathname: '/',
        state: null,
        search: '',
        hash: '',
        key: ''
    }
};
