import { Loader, PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { Button } from '@medly-components/core';
import { ButtonDiv } from '@pages/RolesAndPermissions/RoleForm/RoleForm.styled';
import { FC } from 'react';
import { DeactivateManagerSchema } from './columns';

import useDeactivateManager from './useDeactivateManager';
const DeactivateManager: FC = () => {
    const {
        activePage,
        handlePageChange,
        isDisabled,
        columnData,
        handelSubmit,
        isLoading,
        editEmployeeLoading,
        editManagerLoading,
        heading
    } = useDeactivateManager();

    if (isLoading) {
        return <Loader />;
    } else
        return (
            <PageContent>
                <ListHeader title={heading || 'Change Manager'} />
                <CustomTable
                    count={columnData.length}
                    isLoading={isLoading}
                    data={columnData}
                    itemsPerPage={100}
                    columns={DeactivateManagerSchema}
                    handlePageChange={handlePageChange}
                    activePage={activePage}
                />
                <ButtonDiv>
                    <Button
                        data-testid="saveBtn"
                        disabled={isDisabled}
                        isLoading={editEmployeeLoading || editManagerLoading}
                        onClick={handelSubmit}
                    >
                        Save
                    </Button>
                </ButtonDiv>
            </PageContent>
        );
};
export default DeactivateManager;
