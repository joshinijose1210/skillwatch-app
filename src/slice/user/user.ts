import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './types';

export const initialState: UserState = {
    id: '0',
    organisationId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    employeeId: '',
    roleName: '',
    teamName: '',
    designationName: '',
    departmentName: '',
    modulePermission: [],
    isLoggedIn: false,
    onboardingFlow: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, { payload }: PayloadAction<UserState>) {
            localStorage.setItem('user', JSON.stringify(payload));
            return payload;
        },
        removeUser() {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return initialState;
        },
        syncUser() {
            if (
                JSON.parse(localStorage.getItem('user') as string) !== undefined &&
                JSON.parse(localStorage.getItem('user') as string) !== null
            ) {
                return JSON.parse(localStorage.getItem('user') as string);
            }
            return initialState;
        }
    }
});
