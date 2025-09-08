export interface SelectedRowProps {
    [key: string]: string;
}

export type KpiTypes = {
    [key: string]: any[];
}[];
export interface Team {
    organisationId: number;
    id: number;
    teamId: string;
    teamName: string;
    teamStatus: boolean;
    teamCreatedAt: Date;
    departmentName?: string;
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

export type KPIDepartmentTeamDesignation = {
    departmentId: number;
    departmentName: string;
    teamId: number;
    teamName: string;
    designationIds: number[];
    designationNames: string[];
};

export type KPI = {
    organisationId: number;
    id: number;
    kpiId: string;
    title: string;
    description: string;
    status: boolean;
    versionNumber: number;
    kraId: number;
    kraName: string;
    kpiDepartmentTeamDesignations: KPIDepartmentTeamDesignation[];
};

export type KPIResponse = {
    totalKPIs: number;
    kpis: KPI[];
};

export type OptionType = {
    value: number;
    label: string;
};
