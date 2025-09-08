import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useEditEmployeeMutation, usePostDeactivateManagerMutation } from '@slice/services';
import { setManagerList } from '@slice/updateManager';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const useDeactivateManager = () => {
    const dispatch = useDispatch(),
        navigate = useNavigate(),
        { employeeDetails, managerData, isLoading, heading } = useLocation().state as any,
        { managerUpdateDataList } = useAppSelector(state => state.updateManager);
    const [activePage, setActivePage] = useState(1),
        [columnData, setColumnData] = useState([]);

    const [editEmployee, { isLoading: editEmployeeLoading, error: editEmployeeError, isSuccess: editEmployeeSuccess }] =
            useEditEmployeeMutation(),
        [postDeactivateManager, { isLoading: editManagerLoading }] = usePostDeactivateManagerMutation();
    const isDisabled = useMemo(
        () => managerUpdateDataList.some(data => data.newManagerId === '' || data.currentManagerId === data.newManagerId),
        [managerUpdateDataList]
    );

    const handlePageChange = (page: number) => {
            setActivePage(page);
        },
        handelSubmit = () => {
            if (isDisabled) return;
            const updatedDetails = employeeDetails;
            employeeDetails.secondManagerId === -1 && delete updatedDetails['secondManagerId'];
            if (heading === 'Change Manager') {
                updatedDetails.status = false;
            }
            editEmployee({ path: employeeDetails.id, data: { updatedDetails } });
            postDeactivateManager({
                managerUpdateDataList
            });
        };

    useEffect(() => {
        if (managerData && managerData.managerId) {
            setColumnData(
                managerData.reporteesData.map((element: any) => ({
                    ...element,
                    showDotIndication: heading.toLowerCase() !== 'change role',
                    currentManagerId: managerData.managerId
                }))
            );
            const newManagerData = managerData.reporteesData.map((element: any) => ({
                currentManagerId: managerData.managerId,
                employeeId: element.id,
                newManagerId: ''
            }));
            dispatch(setManagerList(newManagerData));
        }
    }, [managerData, dispatch]);

    useEffect(() => {
        if (typeof editEmployeeError === 'object') {
            const errorObj = editEmployeeError as ErrorType;
            addToast({
                variant: 'error',
                header: errorObj.data.errorMessage || 'Something went wrong',
                timer: 3000
            });
        } else if (editEmployeeSuccess === true) {
            navigate(`${routeConstants.employeeManagement}/${1}`);
            addToast({
                variant: 'success',
                header: 'Employee updated successfully',
                timer: 3000
            });
        }
    }, [dispatch, editEmployeeError, editEmployeeSuccess, managerUpdateDataList, navigate]);

    return {
        handlePageChange,
        columnData,
        activePage,
        handelSubmit,
        isLoading,
        isDisabled,
        editManagerLoading,
        editEmployeeLoading,
        heading
    };
};

export default useDeactivateManager;
