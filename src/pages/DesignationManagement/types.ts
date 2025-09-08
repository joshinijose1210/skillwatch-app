export type DesignationTypes = { [key: string]: any }[];

export type ActionType = 'Edit' | 'View';

export interface DesignationRowData {
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
    departmentId: string;
    action: ActionType;
}

export interface TeamsLabelData {
    value: string;
    label: string;
}

export interface DesignationFormInput {
    designationName: string;
    teamId: string;
    departmentId: string;
    teamsList: TeamsLabelData[];
    teamsError: string;
    status: boolean;
}
