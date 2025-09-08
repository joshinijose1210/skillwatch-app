export interface ActionItems {
    actionItemId: string;
    actionItem: string;
    targetDate: string;
    createdAt: string;
}

export interface Employee {
    organisationId: number;
    id: string;
    employeeId: string;
    firstName: string;
    lastName: string;
    emailId: string;
    contactNo: string;
    status: true;
    teamName: string;
    designationName: string;
    roleName: string;
    firstManagerId: number;
    firstManagerEmployeeId: string;
    secondManagerId: number;
    teamAndDesignation: string;
    secondManagerEmployeeId: string;
    employeeNameWithEmployeeId: string;
}

export interface EmployeList {
    value: string;
    label: string;
}
