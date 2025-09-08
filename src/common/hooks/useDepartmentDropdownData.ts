import { Department } from '@common';
import { Option } from '@medly-components/core/dist/es/components/SearchBox/types';
import { useAppSelector } from '@slice';
import { useGetDepartmentQuery } from '@slice/services';
import { useMemo } from 'react';

export const useDepartmentDropdownData = () => {
    const userDetails = useAppSelector(state => state.user);
    const {
        data: department,
        isSuccess: isDepartmentReceived,
        isLoading: isDepartmentLoading
    } = useGetDepartmentQuery(
        {
            path: '',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        },
        { refetchOnMountOrArgChange: true }
    );

    const departmentList = useMemo(
        () =>
            isDepartmentReceived
                ? department?.departments
                      .filter((department: Department) => department.departmentStatus === true)
                      .map((department: Department) => {
                          return { value: department.id, label: department.departmentName };
                      })
                      .sort((a: Option, b: Option) => a.label.localeCompare(b.label))
                : [],
        [isDepartmentReceived, department?.departments]
    );
    return { departmentList, department, isDepartmentReceived, isDepartmentLoading };
};
