import { PageContent } from '@components/layout/PageContent/PageContent.styled';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import { ListHeader } from '@components/reusableComponents/ListHeader/ListHeader';
import { FC } from 'react';
import { reviewCycleCols } from './columns';
import { useReviewCycle } from './useReviewCycle';

export const ReviewCycle: FC = () => {
    const { columnData, isLoading, navigateToForm, activePage, totalItems, handlePageChange } = useReviewCycle();

    return (
        <PageContent>
            <ListHeader
                title="Review Cycles"
                actionButtonLabel="Add Review Cycle"
                actionButtonClick={navigateToForm}
                moduleTitle="Review Cycles"
            />
            <CustomTable
                columns={reviewCycleCols}
                data={columnData}
                count={totalItems}
                isLoading={isLoading}
                activePage={activePage}
                handlePageChange={handlePageChange}
            />
        </PageContent>
    );
};
