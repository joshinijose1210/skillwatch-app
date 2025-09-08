const BASE_URL = 'https://dummy-api.example.com';
export const OrganisationsMockData = {
    url: `${BASE_URL}/api/organisation/fetchAll?limit=10&page=1`,
    paginationUrl: `${BASE_URL}/api/organisation/fetchAll?limit=10&page=2`,
    responseCode: 200,
    data: {
        totalCount: 44,
        users: [
            {
                date: 1715040000000,
                adminFirstName: 'Test1',
                adminLastName: 'User1',
                adminEmailId: 'test1@test.in',
                organisationId: 21,
                organisationName: 'CompanyOne',
                organisationSize: 20,
                contactNo: '+915898834098'
            },
            {
                date: 1714608000000,
                adminFirstName: 'Test2',
                adminLastName: 'User2',
                adminEmailId: 'test2@test.in',
                organisationId: 20,
                organisationName: 'CompanyTwo',
                organisationSize: 456,
                contactNo: '+918849474792'
            },
            {
                date: 1714521600000,
                adminFirstName: 'AXios',
                adminLastName: 'AXios',
                adminEmailId: 'axio@comapny.com'
            },
            {
                date: 1714521600000,
                adminFirstName: 'Dsa',
                adminLastName: 'Dsa',
                adminEmailId: 'dsa@comasd.com'
            },
            {
                date: 1714435200000,
                adminFirstName: 'Joohn',
                adminLastName: 'Smith',
                adminEmailId: 'lastfirst@company.com'
            },
            {
                date: 1714089600000,
                adminFirstName: 'This',
                adminLastName: 'That',
                adminEmailId: 'thisthat@gg1.com'
            },
            {
                date: 1714089600000,
                adminFirstName: 'This',
                adminLastName: 'That',
                adminEmailId: 'thisthat@gg.com'
            },
            {
                date: 1714089600000,
                adminFirstName: 'First',
                adminLastName: 'Last',
                adminEmailId: 'firstlast3@company.com'
            },
            {
                date: 1714089600000,
                adminFirstName: 'First',
                adminLastName: 'Last',
                adminEmailId: 'firstlast2@company.com'
            },
            {
                date: 1714089600000,
                adminFirstName: 'First',
                adminLastName: 'Last',
                adminEmailId: 'firstlast1@company.com'
            }
        ]
    },
    paginationData: {
        totalCount: 2,
        users: [
            {
                date: 1715040000000,
                adminFirstName: 'Test3',
                adminLastName: 'User3',
                adminEmailId: 'test3@test.in',
                organisationId: 21,
                organisationName: 'CompanyThree',
                organisationSize: 20,
                contactNo: '+915898834098'
            },
            {
                date: 1714608000000,
                adminFirstName: 'Test4',
                adminLastName: 'User4',
                adminEmailId: 'test4@test.in',
                organisationId: 20,
                organisationName: 'CompanyFour',
                organisationSize: 456,
                contactNo: '+918849474792'
            }
        ]
    }
};
