export type GraphColorSchemeType = {
    'Full-time employee': string;
    Consultants: string;
};

export type GraphDataType = {
    label: string;
    id: string;
    value: number;
    color: string;
};

export type IBarGraphData = {
    id: string;
    label: string;
    value: number;
};

export type CategoriesType = 'Full-time employee' | 'Consultants';

export interface IAnalyticsData {
    experienceRangeCount: { range: string; count: number }[];
    employeesType: {
        fullTime: {
            count: number;
            percentage: number;
        };
        consultant: {
            count: number;
            percentage: number;
        };
    };
    teamEmployeeCount: {
        teamName: string;
        employeeCount: number;
    }[];
}

export interface Props {
    analyticsData: IAnalyticsData;
    isLoading: boolean;
}
