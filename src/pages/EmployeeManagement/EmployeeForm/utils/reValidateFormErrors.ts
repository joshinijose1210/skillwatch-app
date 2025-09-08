import { performValidation } from '@utils/validations';

export const reValidateFormErrors = (employeeDetails: any, err: any) => {
    err.lastName = performValidation('lastName', employeeDetails.lastName);
    err.firstName = performValidation('firstName', employeeDetails.firstName);
    err.emailId = performValidation('emailId', employeeDetails.emailId);
    err.employeeId = performValidation('employeeId', employeeDetails.employeeId);
    err.contactNo = performValidation('contactNo', parseInt(employeeDetails.contactNo));
    err.designationId = performValidation('designationId', employeeDetails.designationId);
    err.departmentId = performValidation('departmentId', employeeDetails.departmentId);
    err.roleId = performValidation('roleId', employeeDetails.roleId);
    err.teamId = performValidation('teamId', employeeDetails.teamId);
    err.firstManagerId = performValidation('firstManagerId', employeeDetails.firstManagerId);
    return err;
};
