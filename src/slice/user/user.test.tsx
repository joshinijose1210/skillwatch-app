import userReducer, { addUser, removeUser } from '.';
import { UserState } from './types';
import { initialState } from './user';

describe('User reducer', () => {
    it('should return initial on first load', () => {
        expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
    });

    it('should handle ADD_USER action', () => {
        const expected: UserState = {
            id: '62',
            organisationId: 1,
            email: 'dummy@dummy.com',
            phoneNumber: '+913434398394834',
            firstName: 'Demo username',
            lastName: 'demo username',
            teamName: 'marketing',
            designationName: 'abc',
            departmentName: 'sales & marketing',
            employeeId: 'demo0044',
            isLoggedIn: false,
            roleName: 'demo role',
            onboardingFlow: false
        };
        expect(
            userReducer(
                initialState,
                addUser({
                    id: '62',
                    organisationId: 1,
                    email: 'dummy@dummy.com',
                    phoneNumber: '+913434398394834',
                    firstName: 'Demo username',
                    lastName: 'demo username',
                    employeeId: 'demo0044',
                    teamName: 'marketing',
                    designationName: 'abc',
                    departmentName: 'sales & marketing',
                    isLoggedIn: false,
                    roleName: 'demo role',
                    onboardingFlow: false
                })
            )
        ).toEqual(expected);
    });

    it('should handle REMOVE_USER action', () => {
        const userState: UserState = {
            id: '62',
            organisationId: 1,
            email: 'dummy@dummy.com',
            phoneNumber: '+913434398394834',
            firstName: 'Demo username',
            lastName: 'demo username',
            employeeId: 'demo0044',
            teamName: 'marketing',
            designationName: 'abc',
            departmentName: 'sales & marketing',
            isLoggedIn: false,
            roleName: 'demo role',
            onboardingFlow: false
        };
        expect(userReducer(userState, removeUser())).toEqual(initialState);
    });
});
