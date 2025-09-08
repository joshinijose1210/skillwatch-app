import { performValidation } from '@utils/validations';

export const employeeFormValidations = (name: string, value: any, errors: any) => {
    const err = errors;
    switch (name) {
        case 'firstName':
            err.firstName = performValidation('firstName', value);
            break;
        case 'lastName':
            err.lastName = performValidation('lastName', value);
            break;
        case 'emailId':
            err.emailId = performValidation('emailId', value);
            break;
        case 'employeeId':
            err.employeeId = performValidation('employeeId', value);
            break;
        case 'contactNo':
            err.contactNo = performValidation('contactNo', value);
            break;
        case 'teamId':
            err.teamId = performValidation('teamId', value);
            break;
        case 'designationId':
            err.designationId = performValidation('designationId', value);
            break;
        case 'roleId':
            err.roleId = performValidation('roleId', value);
            break;
        case 'firstManagerId':
            err.firstManagerId = performValidation('firstManagerId', value);
            break;
        case 'experienceInMonths':
            err.experience = performValidation('experienceInMonths', value);
            break;
        case 'genderId':
            err.gender = performValidation('genderId', value);
            break;
    }
    return err;
};
