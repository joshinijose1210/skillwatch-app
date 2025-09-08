import { useAppSelector } from '@slice';
import { useGetEmployeeListQuery } from '@slice/services';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useSelectEmployee = () => {
    const userDetails = useAppSelector(state => state.user);
    const path = useLocation().pathname;

    const { data: employees, isSuccess: isEmployeeListReceived } = useGetEmployeeListQuery({
        path: '',
        params: [
            { name: 'teamId', value: -99 },
            { name: 'designationId', value: -99 },
            { name: 'organisationId', value: userDetails.organisationId },
            { name: 'roleId', value: -99 },
            { name: 'sortOrderId', value: 1 },
            { name: 'departmentId', value: -99 }
        ]
    });
    const employeeList = useCallback(() => {
        const filteredList = isEmployeeListReceived ? employees?.employees.filter((employee: any) => employee.status === true) : [];
        let list = filteredList
            ? filteredList.map((employee: any) => {
                  return {
                      value: employee.id,
                      label: `${employee.firstName} ${employee.lastName} (${employee.employeeId})`
                  };
              })
            : [];

        list = path.includes('dashboard/view-appreciation') ? list : list.filter((employee: any) => employee.value !== userDetails.id);
        list.sort((a: any, b: any) => a.label.localeCompare(b.label));
        return list;
    }, [isEmployeeListReceived, employees?.employees, path, userDetails.id]);

    return { employeeList };
};
