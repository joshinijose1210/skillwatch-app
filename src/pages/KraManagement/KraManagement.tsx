import { PageContent } from '@components/layout/PageContent/PageContent.styled';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { FC } from 'react';
import { KraManagementColumns } from './KraManagementColumns';
import { useKraManagement } from './useKraManagement';
import { ListHeaderButton } from '@components/reusableComponents/ListHeader/ListHeader.styled';
export const KraManagement: FC = () => {
    const { openAddNewKRA, kras, error, module, isLoading, enableEditKra } = useKraManagement();
    return (
        <PageContent>
            {module?.edit ? (
                <ListHeader
                    title="KRAs (Key Responsibility Areas)"
                    moduleTitle="KRA"
                    rightSection={
                        <div>
                            <ListHeaderButton
                                variant="solid"
                                title={!enableEditKra ? 'You cannot edit KRA when self review start date has passed.' : ''}
                                onClick={openAddNewKRA}
                                disabled={!enableEditKra}
                            >
                                Edit KRA
                            </ListHeaderButton>
                        </div>
                    }
                />
            ) : (
                <ListHeader title="KRAs (Key Responsibility Areas)" />
            )}
            <CustomTable
                columns={KraManagementColumns}
                data={kras || []}
                count={0}
                activePage={1}
                isLoading={isLoading}
                handlePageChange={() => null}
            />
        </PageContent>
    );
};
