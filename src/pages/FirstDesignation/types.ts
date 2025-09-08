export interface InputField {
    teamsList: [];
    designationName: string;
    status: boolean;
    designationRefId: number;
    error: string;
    teamRefId: number;
    teamId: number;
    organisationId: number;
    departmentId: number;
    teamError: string;
}

export type InputFieldsState = InputField[];

export interface TeamsLabelData {
    label: string;
}
