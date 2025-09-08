import { StyledMultiSelect, StyledSingleSelect } from '@common';
import { PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { StyledWrapper } from '@pages/EmployeeManagement/EmployeeManagement.styled';
import { FC } from 'react';
import { ReceivedFeedbackCols as columns } from './columns';
import { ReceivedFeedbackProps } from './types';
import { useReceivedFeedback } from './useReceivedfeedback';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';

export const ReceivedFeedback: FC<ReceivedFeedbackProps> = () => {
    const {
        data,
        isLoading,
        employeeList,
        handleSelectEmployee,
        selectedEmployees,
        tagsList,
        handleDropdownChange,
        selectedTag,
        isError,
        ActivePage,
        handlePageChange,
        handleOrderChange
    } = useReceivedFeedback();

    return (
        <PageContent>
            <ListHeader title="Received Feedback" />
            <StyledWrapper>
                <StyledMultiSelect
                    options={employeeList()}
                    variant="outlined"
                    placeholder="Select Employee Name"
                    label="Feedback From"
                    data-testid="feedbackFromDropDown"
                    onChange={value => handleSelectEmployee(value)}
                    values={selectedEmployees}
                    size="M"
                    minWidth="25rem"
                />
                <TooltipDropdown
                    dataIds={['feedback from-input', 'feedback from-count-chip']}
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
                    data-testid="feedbackTypeDropDown"
                    placeholder="Select Feedback Type"
                    variant="outlined"
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
                data={isError ? [] : data?.feedbacks?.map((feedback: any) => ({ ...feedback, feedbackCategory: 'received' })) || []}
                isLoading={isLoading}
                activePage={parseInt(ActivePage || '1')}
                handlePageChange={handlePageChange}
                setSortOrder={handleOrderChange}
            />
        </PageContent>
    );
};
