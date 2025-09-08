export const AddFeedbackMockData = {
    feedbackData: {
        get: {
            url: 'https://dummy-api.example.com/api/feedback-type/',
            responseCode: 200,
            data: [
                { feedbackTypeId: 1, feedbackType: 'Positive' },
                { feedbackTypeId: 2, feedbackType: 'Improvement' },
                { feedbackTypeId: 3, feedbackType: 'Appreciation' }
            ]
        }
    },
    employeesListData: {
        get: {
            url: 'https://dummy-api.example.com/api/employees/?teamId=-99&designationId=-99&organisationId=1&roleId=-99&sortOrderId=1&departmentId=-99',
            responseCode: 200,
            data: {
                isSuccess: true,
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
                        employeeNameWithEmployeeId: 'User Test (SR003)'
                    },
                    {
                        organisationId: 1,
                        id: 1,
                        employeeId: 'SR004',
                        firstName: 'User2',
                        lastName: 'Test2',
                        emailId: 'meet.2p1atel@scalereal.com',
                        contactNo: '+913233253222',
                        genderId: 2,
                        dateOfBirth: 1689811200000,
                        dateOfJoining: 1683849600000,
                        experienceInMonths: 16,
                        status: true,
                        isConsultant: false,
                        departmentName: 'De2p1',
                        teamName: 'Team2',
                        designationName: 'QA1',
                        roleName: 'Org Admin2',
                        firstManagerId: 1,
                        firstManagerEmployeeId: 'SR001',
                        secondManagerId: 2,
                        secondManagerEmployeeId: 'SR002',
                        employeeNameWithEmployeeId: 'User Test (SR004)'
                    }
                ]
            }
        }
    },
    post: {
        save: {
            url: 'https://dummy-api.example.com/api/feedback/'
        },
        saveAsDraft: {
            url: 'https://dummy-api.example.com/api/feedback/1'
        }
    }
};
