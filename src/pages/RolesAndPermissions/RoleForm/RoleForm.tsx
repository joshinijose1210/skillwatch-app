import { StyledTextField, StyledToggle } from '@common';
import { PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { Button } from '@medly-components/core';
import { sliceAndCapitalize } from '@utils/sliceAndCapitalize';
import { FlexStartDiv, StyledGoBackButton } from '../RolesAndPermissions.styled';
import { columns } from './columns';
import { ButtonDiv, TableWrapper, ToggleDiv } from './RoleForm.styled';
import { useRoleForm } from './useRoleForm';

export const RoleForm = () => {
    // TO DO: Identify a way to split up the single hook into more hooks.
    const {
        input,
        inputElement,
        activePage,
        handlePageChange,
        handleToggleClick,
        isToggleDisabled,
        status,
        handleAddRole,
        permissions,
        isLoading,
        action,
        errorText,
        handleInputChange,
        isAddRoleLoading,
        isEditRoleLoading,
        state,
        isDisabled,
        goBackHandle,
        isRoleOrgAdmin
    } = useRoleForm();

    return (
        <PageContent>
            {state && state.from === 'onboardingFlow' && (
                <FlexStartDiv>
                    <StyledGoBackButton variant="flat" onClick={goBackHandle}>
                        &lt; Go Back
                    </StyledGoBackButton>
                </FlexStartDiv>
            )}
            {action && <ListHeader title={`${sliceAndCapitalize(action)} Role & Permissions`} />}
            <StyledTextField
                name="roleName"
                ref={inputElement}
                disabled={action === 'View' || isRoleOrgAdmin}
                variant="outlined"
                size="M"
                label="Role Name"
                placeholder="Example - Subject Matter Expert"
                type="text"
                value={input}
                onChange={handleInputChange}
                errorText={errorText}
                minWidth="54rem"
                data-testid="role-name"
            />
            <TableWrapper>
                <CustomTable
                    columns={columns}
                    count={0}
                    data={permissions || []}
                    isLoading={isLoading}
                    activePage={activePage}
                    handlePageChange={handlePageChange}
                />
            </TableWrapper>
            <ToggleDiv>
                <StyledToggle
                    disabled={isToggleDisabled || isRoleOrgAdmin}
                    label="Active: "
                    onClick={handleToggleClick}
                    checked={status ? true : false}
                    data-testid="status"
                />
            </ToggleDiv>
            {isRoleOrgAdmin ? (
                <></>
            ) : (
                action !== 'View' && (
                    <ButtonDiv>
                        <Button onClick={handleAddRole} disabled={isDisabled} isLoading={isAddRoleLoading || isEditRoleLoading}>
                            {action === 'Edit' ? 'Update' : 'Save'}
                        </Button>
                    </ButtonDiv>
                )
            )}
        </PageContent>
    );
};
