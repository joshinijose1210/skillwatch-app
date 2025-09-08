import {
    StyledEmptyText,
    StyledModalActions,
    StyledModalContent,
    StyledModalHeader,
    StyledModalTitle,
    StyledSearchBox,
    StyledSingleSelect,
    StyledTextField,
    StyledToggle,
    StyledToggleWrapper
} from '@common';
import { PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { NameChip } from '@components/reusableComponents/NameChip/NameChip';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';
import { Button, Text } from '@medly-components/core';
import { StyledWrapper } from '@pages/EmployeeManagement/EmployeeManagement.styled';
import { StyledModalContentFlex, StyledPopup } from './TeamManagement.styled';
import { teamColumns as columns } from './columns';
import { useTeamManagement } from './useTeamManagement';

export const TeamManagement = () => {
    const {
        openModal,
        isLoading,
        modalState,
        closeModal,
        state,
        teamName,
        errorText,
        teams,
        handleAddTeam,
        handleToggleClick,
        handleDropdownChange,
        handleTeamNameChange,
        handleKeyDown,
        handleRemoveChip,
        status,
        departmentId,
        ActivePage,
        totalItems,
        handlePageChange,
        isAddLoading,
        isEditLoading,
        isDisabled,
        onSearchClear,
        searchText,
        departmentList,
        newTeamList,
        isInputDisabled,
        debouncedOnChange
    } = useTeamManagement();

    return (
        <PageContent>
            <ListHeader title="Teams" actionButtonLabel="Add Team" actionButtonClick={openModal} />
            <StyledWrapper>
                <StyledSearchBox
                    onInputChange={debouncedOnChange}
                    isLoading={searchText !== '' && isLoading}
                    onClear={onSearchClear}
                    data-testid="teamSearch"
                    size="M"
                    minWidth="25rem"
                    placeholder="Search Team, Department"
                />
            </StyledWrapper>

            <StyledPopup open={modalState} onCloseModal={closeModal} data-testid="addTeamModal">
                <StyledModalHeader>
                    <StyledModalTitle textVariant="h2">{state ? state.action : 'Add'} Team</StyledModalTitle>
                </StyledModalHeader>
                <StyledModalContent>
                    <StyledModalContentFlex>
                        <StyledSingleSelect
                            disabled={state && state.action === 'Edit' && Boolean(state.departmentId)}
                            options={departmentList}
                            variant="outlined"
                            size="M"
                            placeholder="Select Department"
                            label="Department"
                            value={departmentId}
                            isSearchable
                            data-testid="departmentDropdown"
                            minWidth="100%"
                            onChange={val => val && handleDropdownChange(val)}
                        />
                        <TooltipDropdown
                            dataIds={[`department-input`]}
                            values={
                                departmentId && departmentList.length
                                    ? departmentList.filter((item: OptionsType) => departmentId === item.value)
                                    : []
                            }
                        />
                        <StyledTextField
                            name="teamName"
                            disabled={isInputDisabled}
                            variant="outlined"
                            size="M"
                            label="Team Name"
                            placeholder={
                                state?.action === 'Edit'
                                    ? 'Enter the new team name'
                                    : !state
                                    ? 'You can enter multiple teams separated by commas'
                                    : ''
                            }
                            data-testid="teamInput"
                            type="text"
                            value={teamName}
                            onChange={handleTeamNameChange}
                            onKeyDown={handleKeyDown}
                            errorText={errorText}
                            minWidth="100%"
                        />

                        <NameChip chipColor={errorText ? '#F64D6E' : ''} labels={newTeamList} handleRemove={handleRemoveChip} />

                        <StyledEmptyText style={{ fontStyle: 'italic' }}>
                            Examples: <br />
                            {'Department: Engineering > Teams: Backend, Frontend, Mobile, DevOps, etc.'}
                        </StyledEmptyText>
                        <StyledEmptyText style={{ fontStyle: 'italic' }}>
                            {'Department: Human Resource > Teams: People Experience, Recruitment, Payroll, Employee Onboarding, etc.'}
                        </StyledEmptyText>

                        <StyledToggleWrapper>
                            <StyledToggle
                                disabled={isInputDisabled}
                                label="Active: "
                                data-testid="teamToggle"
                                onClick={handleToggleClick}
                                checked={status ? true : false}
                            />
                        </StyledToggleWrapper>
                        {state && state.action === 'Edit' && state.teamStatus === true && !status && (
                            <Text textVariant="body2" textColor="red">
                                When the team status is changed to inactive, designation linked with the team will also be deactivated.
                            </Text>
                        )}
                        {state && state.action === 'Edit' && !state.departmentId && (
                            <Text textVariant="body2" textColor="red">
                                Please link Designation and Team to continue with any changes on existing Teams.
                            </Text>
                        )}
                    </StyledModalContentFlex>
                </StyledModalContent>
                <StyledModalActions>
                    {state && state.action === 'Edit' && (
                        <Button data-testid="updateBtn" onClick={handleAddTeam} disabled={isDisabled} isLoading={isEditLoading}>
                            Update
                        </Button>
                    )}
                    {!state && (
                        <Button
                            data-testid="saveBtn"
                            onClick={handleAddTeam}
                            disabled={!!errorText || departmentId === -1 || (!teamName?.trim() && newTeamList.length === 0)}
                            isLoading={isAddLoading || isEditLoading}
                        >
                            Save
                        </Button>
                    )}
                </StyledModalActions>
            </StyledPopup>

            <CustomTable
                columns={columns}
                count={totalItems}
                data={teams || []}
                isLoading={isLoading}
                activePage={parseInt(ActivePage || '1')}
                handlePageChange={handlePageChange}
            />
        </PageContent>
    );
};
