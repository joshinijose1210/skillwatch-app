import {
    StyledEmptyText,
    StyledModal,
    StyledModalActions,
    StyledModalContent,
    StyledModalHeader,
    StyledModalTitle,
    StyledTextField,
    StyledToggle,
    StyledToggleWrapper
} from '@common';
import { PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';
import { Button, Text } from '@medly-components/core';
import { StyledSingleSelect } from '@pages/EmployeeManagement/EmployeeForm/EmployeeForm.styled';
import { StyledSearchBox, StyledWrapper } from '@pages/EmployeeManagement/EmployeeManagement.styled';
import { StyledModalContentFlex } from '@pages/TeamManagement/TeamManagement.styled';
import { designationColumns as columns } from './columns';

import { NameChip } from '@components/reusableComponents/NameChip/NameChip';
import { useDesignationManagement } from './useDesignationManagement';

export const DesignationManagement = () => {
    const {
        state,
        openModal,
        closeModal,
        modalState,
        input,
        errorText,
        designations,
        isLoading,
        handleSubmitDesignation,
        handleToggleClick,
        handleDesignationChange,
        handleKeyDown,
        handleRemoveChip,
        ActivePage,
        totalItems,
        handlePageChange,
        isAddDesignationLoading,
        isEditDesignationLoading,
        onSearchClear,
        isDisabled,
        handleDropdownChange,
        inputDisabled,
        searchText,
        handleDepartmentChange,
        departmentList,
        newDesignationList,
        search,
        onSearchChange
    } = useDesignationManagement();

    return (
        <PageContent>
            <ListHeader title="Designations" actionButtonLabel="Add Designation" actionButtonClick={openModal} />
            <StyledWrapper>
                <StyledSearchBox
                    onInputChange={onSearchChange}
                    isLoading={search.searchText !== '' && isLoading}
                    data-testid="searchBar"
                    onClear={onSearchClear}
                    value={searchText}
                    size="M"
                    minWidth="25rem"
                    placeholder="Search Designations, Department and Team"
                />
            </StyledWrapper>

            <StyledModal open={modalState} onCloseModal={closeModal} data-testid="designationModal">
                <StyledModalHeader>
                    <StyledModalTitle textVariant="h2"> {state?.action || 'Add'} Designation</StyledModalTitle>
                </StyledModalHeader>
                <StyledModalContent>
                    <StyledModalContentFlex>
                        <StyledSingleSelect
                            disabled={inputDisabled.departmentId}
                            options={departmentList}
                            data-testid="departmentDropdown"
                            variant="outlined"
                            size="M"
                            placeholder="Select Department"
                            label="Department"
                            value={input.departmentId}
                            isSearchable
                            minWidth="100%"
                            onChange={val => val && handleDepartmentChange(val)}
                        />
                        <TooltipDropdown
                            dataIds={[`department-input`]}
                            values={
                                input.departmentId && departmentList.length
                                    ? departmentList.filter((item: OptionsType) => input.departmentId === item.value)
                                    : []
                            }
                        />
                        <StyledSingleSelect
                            disabled={(input.teamsList.length === 0 && !input.teamsError) || inputDisabled.teamId}
                            options={input.teamsList}
                            data-testid="teamDropdown"
                            variant="outlined"
                            size="M"
                            placeholder="Select Team"
                            label="Team"
                            value={input.teamId}
                            isSearchable
                            minWidth="100%"
                            onChange={val => val && handleDropdownChange(val)}
                            errorText={input.teamsError}
                        />
                        <TooltipDropdown
                            dataIds={[`team-input`]}
                            values={
                                input.teamId && input.teamsList.length
                                    ? input.teamsList.filter((item: OptionsType) => input.teamId === item.value)
                                    : []
                            }
                        />
                        <StyledTextField
                            data-testid="designationName"
                            name="designationName"
                            disabled={inputDisabled.status}
                            variant="outlined"
                            size="M"
                            label="Designation Name"
                            placeholder={
                                state?.action === 'Edit'
                                    ? 'Enter the new designation name'
                                    : !state
                                    ? 'You can enter multiple designations separated by commas'
                                    : ''
                            }
                            type="text"
                            value={input.designationName}
                            onChange={handleDesignationChange}
                            onKeyDown={handleKeyDown}
                            errorText={errorText}
                            minWidth="100%"
                        />

                        <NameChip chipColor={errorText ? '#F64D6E' : ''} labels={newDesignationList} handleRemove={handleRemoveChip} />

                        {state && state.action === 'Edit' && !state.departmentId && (
                            <Text textVariant="body2" textColor="red">
                                Kindly link the above mentioned team with the department.
                            </Text>
                        )}

                        <StyledEmptyText style={{ fontStyle: 'italic' }}>
                            Examples: <br />
                            {'Department: Engineering > Team: Backend > Designations: SDE-Intern,'} <br />
                            {'SDE-1, SDE-Lead, Solution Architect, etc.'}
                        </StyledEmptyText>
                        <StyledEmptyText style={{ fontStyle: 'italic' }}>
                            {'Department: Human Resource > Team: People Experience > Designations: '}
                            <br />
                            {'People Experience Executive, People Experience Lead, Chief People Officer, etc.'}
                        </StyledEmptyText>
                        <StyledToggleWrapper>
                            <StyledToggle
                                data-testid="activeToggle"
                                disabled={inputDisabled.status}
                                label="Active: "
                                onClick={handleToggleClick}
                                checked={input.status}
                            />
                        </StyledToggleWrapper>
                    </StyledModalContentFlex>
                </StyledModalContent>
                <StyledModalActions>
                    {state && state.action === 'Edit' && (
                        <Button
                            data-testid="updateBtn"
                            onClick={handleSubmitDesignation}
                            disabled={isDisabled}
                            isLoading={isEditDesignationLoading}
                        >
                            Update
                        </Button>
                    )}
                    {!state && (
                        <Button
                            data-testid="saveBtn"
                            onClick={handleSubmitDesignation}
                            disabled={
                                !((input.designationName.trim().length > 0 || newDesignationList.length > 0) && input.teamId && !errorText)
                            }
                            isLoading={isAddDesignationLoading || isEditDesignationLoading}
                        >
                            Save
                        </Button>
                    )}
                </StyledModalActions>
            </StyledModal>

            <CustomTable
                columns={columns}
                count={totalItems}
                data={designations || []}
                isLoading={isLoading}
                activePage={parseInt(ActivePage || '1')}
                handlePageChange={handlePageChange}
            />
        </PageContent>
    );
};
