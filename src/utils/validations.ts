import { parsePhoneNumber } from 'libphonenumber-js';

export const performValidation = (name: string, value: any, isOptional = false) => {
    switch (name) {
        case 'emailId':
            if (value === '') {
                return 'Please fill in this field.';
            } else if (
                !value.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            ) {
                return 'Please enter valid email address.';
            } else {
                return '';
            }
        case 'password':
            if (value === '') {
                return 'Please fill in this field.';
            } else if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/)) {
                return 'Password should contain min 8 and max 20 characters with at least 1 capital letter, 1 small letter, 1 special character.';
            } else {
                return '';
            }
        case 'confirmPassword':
            if (value === '') {
                return 'Please fill in this field.';
            } else {
                return '';
            }

        case 'firstName':
            if (value === '') {
                return 'Please fill in this field.';
            } else if (!value.match(/^[A-Z][a-zA-Z]*(\s[A-Z][a-zA-Z]*)*$/)) {
                return 'Please enter valid first name';
            } else {
                return '';
            }

        case 'lastName':
            if (value === '') {
                return 'Please fill in this field.';
            } else if (!value.match(/^[A-Z][a-zA-Z]*(\s[A-Z][a-zA-Z]*)*$/)) {
                return 'Please enter valid last name';
            } else {
                return '';
            }
        case 'contactNo':
            if (value === '') {
                return 'Please fill in this field.';
            } else if ((value.length > 4 && !parsePhoneNumber(`+${value}`).isValid()) || !value.toString().match(/^[0-9]{7,15}$/)) {
                return 'Please enter valid contact number.';
            } else {
                return '';
            }
        case 'companySize':
            if (value === '') {
                return 'Please fill in this field.';
            } else if (!value.toString().match(/^[0-9]{1,6}$/)) {
                return 'Please enter valid company size.';
            } else {
                return '';
            }
        case 'employeeId':
            if (value === '') {
                return 'Please fill in this field.';
            } else {
                return '';
            }
        case 'companyName':
            if (value === '') {
                return 'Please fill in this field';
            } else if (value.length < 3) {
                return 'Please enter at least 3 characters.';
            } else {
                return '';
            }
        case 'loginPassword':
            if (value === '') {
                return 'Please fill in this field';
            } else {
                return '';
            }
        case 'domainName':
            if (value === '') {
                return 'Please fill in this field';
            } else if (!value.match(/^@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/)) {
                return 'Please enter valid domain name';
            } else {
                return '';
            }
        case 'departmentName':
        case 'teamName':
        case 'roleName':
        case 'designationName':
            if (/[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/.test(value)) {
                return 'Special characters are not allowed.';
            }
            // Check for maximum length
            if (value && value.length > 50) {
                return 'Name cannot be more than 50 characters.';
            } else {
                return '';
            }

        case 'teamId':
        case 'genderId':
        case 'experienceInMonths':
        case 'designationId':
        case 'roleId':
        case 'firstManagerId':
        case 'departmentId':
        case 'secondManagerId':
            if (value === -1) {
                return 'Please select an option.';
            } else {
                return '';
            }
        case 'feedback':
        case 'kpi-description':
        case 'kpi-response':
        case 'suggestion':
            if (value === '' && isOptional) {
                return '';
            } else if (value === '' && !isOptional) {
                return 'Please enter a response';
            } else if (value.length < 50) {
                return 'Please enter at least 50 characters';
            } else if (value.length > 1000) {
                return 'Maximum 1000 characters are allowed.';
            } else {
                return '';
            }
        case 'kpi-rating':
            if (value === '') {
                return 'Please select a rating';
            } else {
                return '';
            }
        case 'external-feedback':
            if (value === '' && isOptional) {
                return '';
            } else if (value.length < 50) {
                return 'Please enter at least 50 characters';
            } else if (value.length > 1000) {
                return 'Maximum 1000 characters are allowed.';
            } else {
                return '';
            }

        default:
            return '';
    }
};
