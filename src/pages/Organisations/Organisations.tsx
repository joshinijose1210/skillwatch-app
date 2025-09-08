import { Loader, PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { Text } from '@medly-components/core';
import { OrganisationsListSchema as columns } from './columns';
import { useOrganisations } from './useOrganisations';

export const Organisations = () => {
    const { data, isLoading, handlePageChange, activePage } = useOrganisations();
    if (isLoading) {
        return <Loader />;
    }
    return (
        <PageContent>
            <ListHeader
                title={
                    <Text textVariant="h3" textWeight="Medium">
                        Organisations
                    </Text>
                }
            />
            <CustomTable
                data={data?.users || []}
                columns={columns}
                isLoading={isLoading}
                handlePageChange={handlePageChange}
                count={data?.totalCount}
                activePage={activePage}
            />
        </PageContent>
    );
};
