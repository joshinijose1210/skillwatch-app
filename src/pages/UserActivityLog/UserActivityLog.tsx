import { Loader, PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { EmployeeListSchema as columns } from './columns';
import { useUserActivityLog } from './useUserActivityLog';

export const UserActivityLog = () => {
    const { data, isLoading, handlePageChange, activePage } = useUserActivityLog();
    if (isLoading) {
        return <Loader />;
    }
    return (
        <PageContent>
            <ListHeader title={'User Activity Log'} />
            <CustomTable
                data={data.userActivities || []}
                columns={columns}
                isLoading={isLoading}
                handlePageChange={handlePageChange}
                count={data.totalUserActivities}
                activePage={activePage}
            />
        </PageContent>
    );
};
