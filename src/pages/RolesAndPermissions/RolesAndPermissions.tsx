import { PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { routeConstants } from '@constants';
import { StyledWrapper } from '@pages/EmployeeManagement/EmployeeManagement.styled';
import { FlexStartDiv, StyledGoBackButton } from './RolesAndPermissions.styled';
import { roleColumns as columns } from './columns';
import { useRolesAndPermissions } from './useRolesAndPermissions';
import { StyledSearchBox } from '@common';

export const RolesAndPermissions = () => {
    const {
        openAddRole,
        roles,
        isLoading,
        ActivePage,
        totalItems,
        handlePageChange,
        path,
        goBackHandle,
        onSearchClear,
        debouncedOnChange,
        searchText,
        roleSearch,
        onSearchChange
    } = useRolesAndPermissions();
    return (
        <PageContent>
            {path.includes(routeConstants.firstRoleRedirect) && (
                <FlexStartDiv>
                    <StyledGoBackButton variant="flat" data-testid="go-back" onClick={goBackHandle}>
                        &lt; Go Back
                    </StyledGoBackButton>
                </FlexStartDiv>
            )}

            <ListHeader
                moduleTitle="Roles & Permissions"
                title="Roles & Permissions"
                actionButtonLabel="Add Role & Permissions"
                actionButtonClick={openAddRole}
            />
            <StyledWrapper>
                <StyledSearchBox
                    data-testid="searchBar"
                    onInputChange={onSearchChange}
                    isLoading={roleSearch.searchText !== '' && isLoading}
                    onClear={onSearchClear}
                    value={searchText}
                    size="M"
                    minWidth="25rem"
                    placeholder="Search Role"
                />
            </StyledWrapper>

            <CustomTable
                columns={columns}
                count={totalItems}
                data={roles || []}
                isLoading={isLoading}
                activePage={parseInt(ActivePage || '1')}
                handlePageChange={handlePageChange}
            />
        </PageContent>
    );
};
