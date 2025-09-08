import { KpiDepartmentTeamDesignations } from '@common';
import { TableColumnConfig } from '@medly-components/core';

export const KpiDepartmentNameFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const uniqueDepartmentNames = [
        ...new Set(rowData?.kpiDepartmentTeamDesignations.map((item: KpiDepartmentTeamDesignations) => item.departmentName))
    ];
    const filteredDepartmentNames = uniqueDepartmentNames.filter(name => name !== undefined);
    const formattedDepartmentNames = filteredDepartmentNames.join(', ');
    return <>{formattedDepartmentNames || '-'} </>;
};
