export interface EmployeeData {
    id?: string;
    organisationId: number;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    genderId?: number;
    emailId?: string;
    employeeId?: string;
    contactNo?: string;
    teamId?: number;
    departmentId?: number;
    designationId?: number;
    roleId?: number;
    uniqueRoleId?: string;
    firstManagerId?: number;
    secondManagerId?: number;
    dateOfJoining?: string;
    experienceInMonths?: number;
    status?: boolean;
    action?: string;
    actionBy?: string;
    ipAddress?: string;
    isConsultant?: boolean;
}

export interface InputErrors {
    firstName: string;
    lastName: string;
    emailId: string;
    employeeId: string;
    contactNo: string;
    designationId: string;
    roleId: string;
    teamId: string;
    departmentId: string;
    firstManagerId: string;
    dateOfJoining: string;
    experienceInMonths: string;
    dateOfBirth: string;
    genderId: string;
}
export interface Item {
    value: number;
    label: string;
}

export interface ManagerData {
    organisationId?: number;
    id?: number;
    employeeId?: string;
    firstName?: string;
    lastName?: string;
    emailId?: string;
    contactNo?: string;
    status?: boolean;
    teamName?: string;
    designationName?: string;
    roleName?: string;
    firstManagerId?: number;
    firstManagerEmployeeId: string;
    isSelf?: boolean;
}
export interface RoleData {
    organisationId: number;
    id: number;
    roleId: number;
    roleName: string;
    modulePermission: ModulePermission[];
    status: boolean;
    createdAt: number;
    updatedAt?: number;
}

export interface ModulePermission {
    moduleId: number;
    moduleName: string;
    view: boolean;
    edit: boolean;
}
export interface SelfData {
    id: number;
    isSelf: boolean;
    status: boolean;
    organisationId: number;
    employeeId: string;
    firstName: string;
    lastName: string;
    emailId: string;
    contactNo: string;
    teamName: string;
    designationName: string;
    roleName: string;
    firstManagerId: number;
    firstManagerEmployeeId: string;
}
