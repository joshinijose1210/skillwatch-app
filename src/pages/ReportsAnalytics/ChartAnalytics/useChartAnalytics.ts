import { useMemo } from 'react';
import { employeeExperienceGraphData, employeeTeamCountGraphData, graphColorScheme } from './constants';
import { IAnalyticsData, IBarGraphData } from './types';

export const useChartAnalytics = (analyticsData: IAnalyticsData) => {
    const employeeTypeGraphData = useMemo(() => {
        if (analyticsData?.employeesType?.fullTime?.count || analyticsData?.employeesType?.consultant?.count) {
            const empType = analyticsData?.employeesType;
            return [
                {
                    label: `${empType.fullTime.percentage.toFixed(1)}%`,
                    id: 'Full-time employee',
                    value: empType.fullTime.count,
                    color: graphColorScheme['Full-time employee']
                },
                {
                    label: `${empType.consultant.percentage.toFixed(1)}%`,
                    id: 'Consultant',
                    value: empType.consultant.count,
                    color: graphColorScheme.Consultants
                }
            ];
        }
        return [
            {
                label: `0%`,
                id: 'No Data',
                value: 1,
                color: '#cfd4dc'
            }
        ];
    }, [analyticsData]);

    const employeeExperienceGraph = useMemo((): IBarGraphData[] => {
        const graphData = employeeExperienceGraphData;

        if (analyticsData?.experienceRangeCount) {
            return analyticsData?.experienceRangeCount.map(item => ({ id: item.range, label: item.range, value: item.count }));
        }
        return graphData;
    }, [analyticsData]);

    const employeeTeamCountGraph = useMemo((): IBarGraphData[] => {
        const graphData = employeeTeamCountGraphData;

        if (analyticsData?.teamEmployeeCount?.length) {
            return analyticsData?.teamEmployeeCount.map(item => ({ id: item.teamName, label: item.teamName, value: item.employeeCount }));
        }
        return graphData;
    }, [analyticsData]);

    const { value: employeeExperienceMaxValue = 0 } = employeeExperienceGraph?.reduce((prev, current) =>
        prev.value > current.value ? prev : current
    );

    const employeeExperienceYMax = Math.round(employeeExperienceMaxValue + (employeeExperienceMaxValue % 4));

    const maxEmployeeInTeam = useMemo(() => {
        if (analyticsData?.teamEmployeeCount?.length) {
            const data = analyticsData?.teamEmployeeCount;
            const count = [...data].sort((a, b) => b.employeeCount - a.employeeCount)[0].employeeCount;
            return count;
        }
        return 0;
    }, [analyticsData]);

    return {
        employeeTypeGraphData,
        employeeExperienceGraph,
        employeeExperienceYMax,
        employeeTeamCountGraph,
        maxEmployeeInTeam
    };
};
