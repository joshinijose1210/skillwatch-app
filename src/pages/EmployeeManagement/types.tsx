export interface EmployeeListTypes {
    [key: string]: any;
}

export interface Team {
    organisationId: number;
    id: number;
    teamId: string;
    teamName: string;
    teamStatus: boolean;
    teamCreatedAt: Date;
    departmentName?: string;
}

export interface Role {
    createdAt: Date;
    id: number;
    modulePermission: {
        moduleId: number;
        moduleName: string;
        view: boolean;
        edit: boolean;
    }[];
    organisationId: number;
    roleId: string;
    roleName: string;
    status: boolean;
}

export interface Designation {
    organisationId: number;
    teamId: string;
    teamName: string;
    teamDisplayId: string;
    teamStatus: true;
    id: number;
    designationId: string;
    designationName: string;
    status: boolean;
    createdAt: Date;
}

export interface Employee {
    organisationId: number;
    id: number;
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
