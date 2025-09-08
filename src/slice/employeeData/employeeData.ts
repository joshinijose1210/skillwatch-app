import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    organisationId: 0,
    id: '',
    employeeId: '',
    firstName: '',
    lastName: '',
    emailId: '',
    contactNo: '',
    status: true,
    teamName: '',
    designationName: '',
    roleName: '',
    firstManagerId: '',
    firstManagerEmployeeId: '',
    teamId: '',
    designationId: '',
    roleId: '',
    secondManagerId: '',
    uniqueRoleId: '',
    action: '',
    actionBy: '',
    ipAddress: '216.24.57.253:443'
};

export const employeeDataSlice = createSlice({
    name: 'employeeData',
    initialState,
    reducers: {
        addEmployeeData(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        removeEmployeeData(state) {
            return {
                ...state,
                ...initialState
            };
        }
    }
});
