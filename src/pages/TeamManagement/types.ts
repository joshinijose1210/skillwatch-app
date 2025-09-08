export type TeamsTypes = { [key: string]: any }[];

export interface TeamsRowData {
    organisationId: number;
    departmentId: number;
    action: string;
    id: number;
    teamName: string;
    teamId: string;
    teamCreatedAt: Date;
    teamStatus: boolean;
}
