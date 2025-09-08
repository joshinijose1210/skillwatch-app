export type DepartmentsTypes = { [key: string]: any }[];

export interface DepartmentRowData {
    organisationId: number;
    action: string;
    id: number;
    departmentName: string;
    departmentId: string;
    departmentCreatedAt: Date;
    departmentStatus: boolean;
}
