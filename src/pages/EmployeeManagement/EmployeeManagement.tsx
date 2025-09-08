import { StyledMultiSelect, StyledSearchBox } from '@common';
import { PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { routeConstants } from '@constants';
import { FlexStartDiv, StyledGoBackButton } from '@pages/RolesAndPermissions/RolesAndPermissions.styled';
import { EmployeeListSchema as columns } from './columns';
import { FilterContainer, StyledWrapper } from './EmployeeManagement.styled';
import useEmployeeManagement from './useEmployeeManagement';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';

const EmployeeManagement = () => {
    const {
        addEmployeePage,
        ActivePage,
        departmentList,
        searchText,
        isLoading,
        filterData,
        onSearchClear,
        rolesList,
        handleDropdownChange,
        designationsList,
        teamsList,
        handlePageChange,
        bulkImportPage,
        data,
        handleOrderChange,
        employees,
        search,
        onSearchChange,
        path,
        goBackHandle
    } = useEmployeeManagement();

    return (
        <PageContent>
            {path.includes(routeConstants.firstEmployeeRedirect) && (
                <FlexStartDiv>
                    <StyledGoBackButton variant="flat" onClick={goBackHandle}>
                        &lt; Go Back
                    </StyledGoBackButton>
                </FlexStartDiv>
            )}
            <ListHeader
                title="Employees"
                secondButtonLabel="Add Employee"
                actionButtonLabel="Bulk Import"
                actionButtonClick={bulkImportPage}
                secondButtonClick={addEmployeePage}
                actionButtonVariant="outlined"
            />

            <StyledWrapper>
                <StyledSearchBox
                    onInputChange={onSearchChange}
                    isLoading={search.searchText !== '' && isLoading}
                    onClear={onSearchClear}
                    value={searchText}
                    size="M"
                    minWidth="25rem"
                    placeholder="Search Employee"
                    data-testid="employeeSearch"
                />

                <FilterContainer>
                    <StyledMultiSelect
                        options={departmentList}
                        label="Department"
                        placeholder="Select Department"
                        variant="outlined"
                        size="M"
                        onChange={val => val && handleDropdownChange('departmentName', val)}
                        values={filterData.departmentName}
                        minWidth="25rem"
                        data-testid="departmentDropdown"
                    />
                    <TooltipDropdown
                        dataIds={['department-input', 'department-count-chip']}
                        values={
                            filterData.departmentName?.length && departmentList.length
                                ? departmentList.filter(
                                      (item: OptionsType) =>
                                          typeof item.value === 'number' && (filterData.departmentName as number[]).includes(item.value)
                                  )
                                : []
                        }
                    />
                    <StyledMultiSelect
                        options={teamsList}
                        label="Team"
                        placeholder="Select Team"
                        variant="outlined"
                        size="M"
                        onChange={val => val && handleDropdownChange('teamName', val)}
                        values={filterData.teamName}
                        disabled={filterData?.departmentName?.length === 0}
                        minWidth="25rem"
                        data-testid="teamDropdown"
                    />
                    <TooltipDropdown
                        dataIds={['team-input', 'team-count-chip']}
                        values={
                            filterData?.departmentName?.length && teamsList.length
                                ? teamsList.filter(
                                      (item: OptionsType) =>
                                          typeof item.value === 'number' && (filterData?.departmentName as number[]).includes(item.value)
                                  )
                                : []
                        }
                    />
                    <StyledMultiSelect
                        options={designationsList}
                        placeholder="Select Designation"
                        label="Designation"
                        variant="outlined"
                        size="M"
                        minWidth="25rem"
                        onChange={val => val && handleDropdownChange('designationName', val)}
                        values={filterData.designationName}
                        disabled={filterData?.teamName?.length === 0}
                        data-testid="designationDropdown"
                    />
                    <TooltipDropdown
                        dataIds={['designation-input', 'designation-count-chip']}
                        values={
                            filterData.designationName?.length && designationsList.length
                                ? designationsList.filter(
                                      (item: OptionsType) =>
                                          typeof item.value === 'number' && (filterData.designationName as number[]).includes(item.value)
                                  )
                                : []
                        }
                    />
                    <StyledMultiSelect
                        options={rolesList}
                        label="Role"
                        placeholder="Select Role"
                        variant="outlined"
                        size="M"
                        minWidth="25rem"
                        onChange={val => val && handleDropdownChange('roleName', val)}
                        values={filterData.roleName}
                        data-testid="rolesDropdown"
                    />
                    <TooltipDropdown
                        dataIds={['role-input', 'role-count-chip']}
                        values={
                            filterData.roleName?.length && rolesList.length
                                ? rolesList.filter(
                                      (item: OptionsType) =>
                                          typeof item.value === 'number' && (filterData.roleName as number[]).includes(item.value)
                                  )
                                : []
                        }
                    />
                </FilterContainer>
            </StyledWrapper>

            <CustomTable
                data={employees}
                columns={columns}
                isLoading={isLoading}
                handlePageChange={handlePageChange}
                count={data?.totalEmployees || 0}
                activePage={parseInt(ActivePage || '1')}
                setSortOrder={handleOrderChange}
            />
        </PageContent>
    );
};

export default EmployeeManagement;
