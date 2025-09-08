export type KpiDropdownItem = {
    designationIds: number[];
    designationList: string[];
    teamsList: string[];
    teamId: string;
    departmentId: string;
    designationRefId: number;
    teamError: string;
    departmentError: string;
    designationError: string;
};

export type KpiDropdownItemList = KpiDropdownItem[];

export type KpiDepartmentTeamDesignation = {
    departmentId: number;
    departmentName: string;
    teamId: number;
    teamName: string;
    designationIds: number[];
    designationNames: string[];
};

export type KpiErrorType = {
    status: number;
    data: {
        errorMessage: string;
    };
};
