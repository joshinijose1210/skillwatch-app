import { StyledSearchBox, StyledSingleSelect } from '@common';
import { PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { CancelIcon } from '@medly-components/icons';
import { FilterDiv } from '@pages/CheckInWithManager/CheckInWithManager.styled';
import { DatePickerDiv, FilterContainer, StyledDateRangePicker } from './EmployeeFeedback.styled';
import { EmployeeFeedbackSchema } from './EmployeeFeedbackSchema';
import { useEmployeeFeedback } from './useEmployeeFeedback';

const EmployeeFeedback = () => {
    const {
        onSearchClear,
        handleDateChange,
        handlePageChange,
        data,
        isError,
        isLoading,
        ActivePage,
        searchText,
        handleDatePickerClear,
        tagsList,
        handleDropdownChange,
        handleOrderChange,
        search,
        onSearchChange,
        feedbackFilterData
    } = useEmployeeFeedback();

    return (
        <PageContent>
            <ListHeader title="Feedback" />

            <FilterDiv>
                <StyledSearchBox
                    onInputChange={onSearchChange}
                    isLoading={search.searchText !== '' && isLoading}
                    onClear={onSearchClear}
                    value={searchText}
                    size="M"
                    minWidth="25rem"
                    placeholder="Search Employee"
                    data-testid="search-employee"
                />
                <FilterContainer>
                    <StyledSingleSelect
                        options={tagsList}
                        label="Feedback Type"
                        placeholder="Select Feedback Type"
                        variant="outlined"
                        size="M"
                        onChange={value => handleDropdownChange(value)}
                        value={feedbackFilterData.feedbackType}
                    />

                    <DatePickerDiv>
                        <StyledDateRangePicker
                            displayFormat={'dd-MM-yyyy'}
                            variant="outlined"
                            size="M"
                            value={feedbackFilterData.dateRange}
                            onChange={value => handleDateChange(value)}
                            maxSelectableDate={new Date()}
                            popoverPlacement={'bottom-end'}
                            autoComplete="off"
                            data-testid="date-picker"
                        />
                        {feedbackFilterData.dateRange &&
                            (feedbackFilterData.dateRange.startDate || feedbackFilterData.dateRange.endDate) && (
                                <CancelIcon onClick={handleDatePickerClear} />
                            )}
                    </DatePickerDiv>
                </FilterContainer>
            </FilterDiv>

            <CustomTable
                data={isError ? [] : data?.feedbacks || []}
                columns={EmployeeFeedbackSchema}
                isLoading={isLoading}
                activePage={parseInt(ActivePage || '1')}
                handlePageChange={handlePageChange}
                count={data?.totalFeedbacks || 0}
                setSortOrder={handleOrderChange}
            />
        </PageContent>
    );
};

export default EmployeeFeedback;
