import { PageContent } from '@components/layout/PageContent/PageContent.styled';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { FC } from 'react';
import { SelfReviewColumns } from './SelfReviewColumns';
import { useSelfReview } from './useSelfReview';

export const SelfReview: FC = () => {
    const { selfReviewCycles, isLoading, activePage, count, handlePageChange } = useSelfReview();
    return (
        <PageContent>
            <ListHeader title="Self Review" />
            <CustomTable
                columns={SelfReviewColumns}
                data={selfReviewCycles}
                count={count}
                activePage={activePage}
                isLoading={isLoading}
                handlePageChange={handlePageChange}
            />
        </PageContent>
    );
};
