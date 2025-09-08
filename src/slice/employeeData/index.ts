import { employeeDataSlice } from './employeeData';
export const { addEmployeeData, removeEmployeeData } = employeeDataSlice.actions;
export default employeeDataSlice.reducer;
