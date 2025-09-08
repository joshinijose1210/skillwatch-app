import { StyledSingleSelect } from '@common';
import * as Styled from './SelectEmployee.styled';
import { SearchEmployeeProps } from './types';
import { useSelectEmployee } from './useSelectEmployee';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';

export const SelectEmployee = ({
    value,
    onChange,
    disabled = false,
    placeholder = 'Select Employee Name',
    label = 'Employee Name'
}: SearchEmployeeProps) => {
    const { employeeList } = useSelectEmployee();

    return (
        <Styled.SelectEmployeeWrapper>
            <StyledSingleSelect
                disabled={disabled}
                options={employeeList()}
                value={value}
                onChange={val => val && onChange(val)}
                variant="outlined"
                isSearchable={true}
                size="M"
                placeholder={placeholder}
                label={label}
                minWidth="100%"
            />
            <TooltipDropdown
                dataIds={[`${label.toLowerCase()}-input`]}
                values={value && employeeList().length ? employeeList().filter((item: OptionsType) => value === item.value) : []}
            />
        </Styled.SelectEmployeeWrapper>
    );
};
