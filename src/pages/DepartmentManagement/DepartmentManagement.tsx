import {
    StyledEmptyText,
    StyledSearchBox,
    StyledTextField,
    StyledModalHeader,
    StyledModalContent,
    StyledModalActions,
    StyledModalTitle,
    StyledToggle,
    StyledToggleWrapper
} from '@common';
import { PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { NameChip } from '@components/reusableComponents/NameChip/NameChip';
import { Button, Text } from '@medly-components/core';
import { StyledWrapper } from '@pages/EmployeeManagement/EmployeeManagement.styled';
import { StyledModalContentFlex, StyledPopup } from '@pages/TeamManagement/TeamManagement.styled';
import { teamColumns as columns } from './columns';
import { useDepartmentManagement } from './useDepartmentManagement';

export const DepartmentManagement = () => {
    const {
        openModal,
        isLoading,
        modalState,
        closeModal,
        state,
        departmentName,
        errorText,
        departments,
        newDepartmentsList,
        handleAddDepartment,
        handleToggleClick,
        handleDepartmentNameChange,
        handleKeyDown,
        handleRemoveChip,
        status,
        ActivePage,
        totalItems,
        handlePageChange,
        isAddLoading,
        isEditLoading,
        isDisabled,
        onSearchClear,
        searchText,
        isInputDisabled,
        debouncedOnChange
    } = useDepartmentManagement();

    return (
        <PageContent>
            <ListHeader title="Departments" actionButtonLabel="Add Department" actionButtonClick={openModal} />
            <StyledWrapper>
                <StyledSearchBox
                    onInputChange={debouncedOnChange}
                    isLoading={searchText !== '' && isLoading}
                    onClear={onSearchClear}
                    size="M"
                    minWidth="25rem"
                    placeholder="Search Department"
                    data-testid="searchbox"
                />
            </StyledWrapper>

            <StyledPopup open={modalState} onCloseModal={closeModal} data-testid="departmentModal">
                <StyledModalHeader>
                    <StyledModalTitle textVariant="h2">{state ? state.action : 'Add'} Department</StyledModalTitle>
                </StyledModalHeader>
                <StyledModalContent>
                    <StyledModalContentFlex>
                        <StyledTextField
                            name="departmentName"
                            autoFocus
                            disabled={isInputDisabled}
                            variant="outlined"
                            size="M"
                            label="Department Name"
                            placeholder={
                                !state
                                    ? 'You can enter multiple departments separated by commas'
                                    : state?.action === 'Edit'
                                    ? 'Enter the new department name'
                                    : ''
                            }
                            type="text"
                            value={departmentName}
                            onChange={handleDepartmentNameChange}
                            onKeyDown={handleKeyDown}
                            errorText={errorText}
                            minWidth="100%"
                            data-testid="modalinput"
                        />

                        <NameChip chipColor={errorText ? '#F64D6E' : ''} labels={newDepartmentsList} handleRemove={handleRemoveChip} />

                        {!state && (
                            <StyledEmptyText textVariant="body2" style={{ fontStyle: 'italic' }}>
                                Example: <br /> Department: Human Resource, Engineering, Project Management, Finance, Business Development,
                                Executive Leadership, etc.
                            </StyledEmptyText>
                        )}
                        <StyledToggleWrapper>
                            <StyledToggle
                                disabled={isInputDisabled}
                                label="Active: "
                                onClick={handleToggleClick}
                                checked={status ? true : false}
                                data-testid="toggleswicth"
                            />
                        </StyledToggleWrapper>
                        {state && state.action === 'Edit' && state.departmentStatus === true && !status && (
                            <Text textVariant="body2" textColor="red">
                                When the department status is changed to inactive, teams linked with the department will also be
                                deactivated.
                            </Text>
                        )}
                    </StyledModalContentFlex>
                </StyledModalContent>
                <StyledModalActions>
                    {state && state.action === 'Edit' && (
                        <Button onClick={handleAddDepartment} disabled={isDisabled} isLoading={isEditLoading} data-testid="updateBtn">
                            Update
                        </Button>
                    )}
                    {!state && (
                        <Button
                            onClick={handleAddDepartment}
                            disabled={!!errorText || (!departmentName?.trim() && newDepartmentsList.length === 0)}
                            isLoading={isAddLoading || isEditLoading}
                            data-testid="saveBtn"
                        >
                            Save
                        </Button>
                    )}
                </StyledModalActions>
            </StyledPopup>

            <CustomTable
                columns={columns}
                count={totalItems}
                data={departments || []}
                isLoading={isLoading}
                activePage={parseInt(ActivePage || '1')}
                handlePageChange={handlePageChange}
            />
        </PageContent>
    );
};
