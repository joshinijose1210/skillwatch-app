import { StyledMultiSelect, StyledSingleSelect } from '@common';
import { PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { StyledWrapper } from '@pages/EmployeeManagement/EmployeeManagement.styled';
import { FC } from 'react';
import { SubmittedFeedbackCols as columns } from './columns';
import { SubmittedFeedbackProps } from './types';
import { useSubmittedFeedback } from './useSubmittedFeedback';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';

const SubmittedFeedback: FC<SubmittedFeedbackProps> = () => {
    const {
        isLoading,
        handleButtonClick,
        employeeList,
        handleSelectEmployee,
        selectedEmployees,
        tagsList,
        handleDropdownChange,
        selectedTag,
        data,
        isError,
        handlePageChange,
        ActivePage,
        handleOrderChange
    } = useSubmittedFeedback();

    return (
        <PageContent>
            <ListHeader title="Submitted Feedback" actionButtonLabel="Add Feedback" actionButtonClick={handleButtonClick} />
            <StyledWrapper>
                <StyledMultiSelect
                    options={employeeList()}
                    variant="outlined"
                    placeholder="Select Employee Name"
                    label="Feedback About"
                    data-testid="employeeDropdown"
                    onChange={value => handleSelectEmployee(value)}
                    values={selectedEmployees}
                    size="M"
                    minWidth="25rem"
                />
                <TooltipDropdown
                    dataIds={['feedback to-input', 'feedback to-count-chip']}
                    values={
                        selectedEmployees?.length && employeeList().length
                            ? employeeList().filter(
                                  (item: OptionsType) =>
                                      typeof item.value === 'number' && (selectedEmployees as number[]).includes(item.value)
                              )
                            : []
                    }
                />
                <StyledSingleSelect
                    options={tagsList}
                    label="Feedback Type"
                    placeholder="Select Feedback Type"
                    variant="outlined"
                    data-testid="feedbackTypeDropDown"
                    size="M"
                    onChange={value => handleDropdownChange(value)}
                    value={selectedTag}
                    minWidth="25rem"
                />
                <TooltipDropdown
                    dataIds={['feedback type-input']}
                    values={selectedTag && tagsList.length ? tagsList.filter((item: OptionsType) => selectedTag === item.value) : []}
                />
            </StyledWrapper>
            <CustomTable
                columns={columns}
                count={data?.totalFeedbacks || 0}
                data={isError ? [] : data?.feedbacks?.map((feedback: any) => ({ ...feedback, feedbackCategory: 'submitted' })) || []}
                isLoading={isLoading}
                activePage={parseInt(ActivePage || '1')}
                handlePageChange={handlePageChange}
                setSortOrder={handleOrderChange}
            />
        </PageContent>
    );
};

export default SubmittedFeedback;
