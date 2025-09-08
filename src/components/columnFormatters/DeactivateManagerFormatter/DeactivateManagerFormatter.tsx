import { TableColumnConfig } from '@medly-components/core';
import { FiberManualRecordIcon } from '@medly-components/icons';
import { useAppSelector } from '@slice';
import { useGetManagersListQuery } from '@slice/services';
import { updateManagerList } from '@slice/updateManager';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleDiv } from './DeactivateManagerFormatter.styled';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';
import { StyledSingleSelect } from '@common';

export const DeactivateManagerFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const dispatch = useDispatch();

    const userDetails = useAppSelector(state => state.user);
    const [newManager, setNewManager] = useState(rowData?.currentManagerId);
    const { data: managers, isSuccess: isManagersReceived } = useGetManagersListQuery(
        {
            path: '',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        },
        { refetchOnMountOrArgChange: true }
    );

    const handleDropdownChange = (val: string) => {
        const updateRowData = {
            currentManagerId: rowData?.firstManagerId,
            employeeId: rowData?.id,
            newManagerId: val
        };
        dispatch(updateManagerList(updateRowData));
        setNewManager(val);
    };

    const managersList = useCallback(() => {
        const filteredList =
            isManagersReceived && managers?.managers ? managers?.managers.filter((manager: any) => manager.status === true) : [];
        let list = filteredList
            ? filteredList.map((manager: any) => {
                  return {
                      value: manager.id,
                      label: `${manager.firstName} ${manager.lastName} (${manager.employeeId})`
                  };
              })
            : [];
        list = list.filter((manager: any) => manager.value !== rowData?.id);
        list.sort((a: any, b: any) => a.label.localeCompare(b.label));
        return list;
    }, [isManagersReceived, managers?.managers, rowData?.id]);

    return (
        <StyleDiv>
            <StyledSingleSelect
                options={managersList()}
                variant="outlined"
                size="S"
                placeholder="Manager"
                label="Manager"
                value={newManager}
                isSearchable
                minWidth="30rem"
                onChange={val => val && handleDropdownChange(val)}
                data-testid="deactiveManager"
            />
            <TooltipDropdown
                dataIds={[`manager-input`]}
                values={newManager && managersList().length ? managersList().filter((item: OptionsType) => newManager === item.value) : []}
            />

            <FiberManualRecordIcon
                data-testid="iconColor"
                iconColor={newManager !== rowData?.currentManagerId ? 'green' : 'red'}
                size="XS"
            />
        </StyleDiv>
    );
};
