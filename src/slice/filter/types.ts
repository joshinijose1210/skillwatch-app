export interface FilterState {
    designationName: string[] | number[];
    departmentName: [];
    teamName: string[] | number[];
    roleName: string[] | number[];
    search: string;
}

export type Partial<T> = { [P in keyof T]?: T[P] };
