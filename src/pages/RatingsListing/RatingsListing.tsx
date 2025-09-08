import { PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { StyledWrapper } from '@pages/EmployeeFeedback/EmployeeFeedback.styled';
import { FC, memo } from 'react';
import { ratingListingCols } from './columns';
import { useRatings } from './useRatingsListing';

export const RatingsListing: FC = memo(() => {
    const {
        columnData,
        isLoading,
        activePage,
        totalItems,
        handlePageChange,
        // handleReviewCycle,
        // reviewCycleList,
        // reviewCycle,
        // employeeList,
        // handleSelectEmployee,
        // selectedEmployees,
        ratingLabel
    } = useRatings();

    return (
        <PageContent>
            <ListHeader title={`Ratings ${ratingLabel && `(${ratingLabel})`}`} />
            <StyledWrapper>
                {/* <StyledMultiSelect
                    options={employeeList()}
                    variant="outlined"
                    placeholder="Select Employee Name"
                    label="Employee"
                    onChange={handleSelectEmployee}
                    values={selectedEmployees}
                    size="M"
                    minWidth="25rem"
                /> */}
                {/* <StyledSingleSelect
                    options={reviewCycleList}
                    label="Review Cycle"
                    placeholder="Select Review Cycle"
                    variant="outlined"
                    size="M"
                    onChange={handleReviewCycle}
                    value={reviewCycle}
                    minWidth="25rem"
                /> */}
            </StyledWrapper>
            <CustomTable
                columns={ratingListingCols}
                data={columnData}
                count={totalItems}
                isLoading={isLoading}
                activePage={activePage}
                handlePageChange={handlePageChange}
            />
        </PageContent>
    );
});

RatingsListing.displayName = 'RatingsListing';
