import { ICheckInWithManagerState } from '@slice/checkInWithManager/types';

export type UserRoles = 'admin';

export type Permission = {
    moduleId?: number;
    moduleName?: string;
    view?: boolean;
    edit?: boolean;
};

export interface UserState {
    id: string;
    organisationId: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    employeeId: string;
    teamName: string;
    designationName: string;
    departmentName: string;
    roleName: string;
    modulePermission?: Permission[];
    isLoggedIn: boolean;
    onboardingFlow: boolean;
    isSuperAdmin?: boolean;
    isOrWasManager?: boolean;
    firstManagerId?: string;
    secondManagerId?: string;
    checkInWithManagerReduxState?: ICheckInWithManagerState;
}
