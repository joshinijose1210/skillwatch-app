import { KpiDepartmentTeamDesignations } from '@common';
import { TableColumnConfig, Text } from '@medly-components/core';
import React from 'react';

export const KpiTeamDesignationFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const validTeams = rowData?.kpiDepartmentTeamDesignations?.filter((team: KpiDepartmentTeamDesignations) => team.teamName !== undefined);
    const teamDesignationComponents = validTeams?.map((team: KpiDepartmentTeamDesignations, index: number) => {
        const designationNames = team.designationNames.filter((designation: any) => designation).join(', ');
        const designationDisplay = designationNames || '-';
        const comma = index !== validTeams.length - 1 ? ', ' : '';

        return (
            <React.Fragment key={index}>
                <Text>{`${team.teamName} (${designationDisplay})`}</Text>
                {comma}
            </React.Fragment>
        );
    });

    return <>{teamDesignationComponents || '-'}</>;
};
