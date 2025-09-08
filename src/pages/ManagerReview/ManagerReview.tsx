import { StyledMultiSelect, StyledSingleSelect } from '@common';
import { PageContent } from '@components/layout/PageContent/PageContent.styled';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { routeConstants } from '@constants';
import { teamMemberReviewStatusOptions } from '@constants/data';
import { EmployeeFilterDiv, FilterDiv, StatusAndCycleFilterDiv } from '@pages/CheckInWithManager/CheckInWithManager.styled';
import { FC } from 'react';
import { ManagerReviewColumns } from './ManagerReviewColumns';
import { useManagerReview } from './useManagerReview';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';

export const ManagerReview: FC = () => {
    const {
        managerReviewCycles,
        isLoading,
        activePage,
        count,
        reviewStatus,
        handlePageChange,
        employeeList,
        selectedEmployees,
        handleSelectEmployee,
        handleReviewStatus,
        searchActivePage,
        path,
        reviewCycleList,
        managersList
    } = useManagerReview();

    return (
        <PageContent>
            <ListHeader title={path === routeConstants.managerReview ? `Team's Review` : 'Manager Review'} />
            <FilterDiv>
                <EmployeeFilterDiv>
                    <StyledMultiSelect
                        data-testid="managerDropdown"
                        options={path === routeConstants.managerReview ? employeeList() : managersList()}
                        variant="outlined"
                        placeholder={path === routeConstants.managerReview ? 'Employee' : 'Manager'}
                        label={path === routeConstants.managerReview ? 'Employee' : 'Manager'}
                        onChange={handleSelectEmployee}
                        values={selectedEmployees}
                        size="M"
                        minWidth="25rem"
                    />
                    <TooltipDropdown
                        dataIds={
                            path === routeConstants.managerReview
                                ? ['employee-input', 'employee-count-chip']
                                : ['manager-input', 'manager-count-chip']
                        }
                        values={(() => {
                            const list = path === routeConstants.managerReview ? employeeList() : managersList();

                            return selectedEmployees?.length && list.length
                                ? list.filter(
                                      (item: OptionsType) =>
                                          typeof item.value === 'number' && (selectedEmployees as number[]).includes(item.value)
                                  )
                                : [];
                        })()}
                    />
                </EmployeeFilterDiv>
                <StatusAndCycleFilterDiv>
                    {path && path.includes(routeConstants.managerReview) && (
                        <>
                            <StyledSingleSelect
                                options={teamMemberReviewStatusOptions}
                                variant="outlined"
                                placeholder="Review Status"
                                label="Review Status"
                                onChange={handleReviewStatus}
                                value={reviewStatus}
                                size="M"
                                minWidth="25rem"
                                data-testid="reviewStatusDropdown"
                            />
                            <TooltipDropdown
                                dataIds={['review status-input']}
                                values={
                                    reviewStatus && teamMemberReviewStatusOptions.length
                                        ? teamMemberReviewStatusOptions.filter((item: OptionsType) => reviewStatus === item.value)
                                        : []
                                }
                            />
                        </>
                    )}
                </StatusAndCycleFilterDiv>
            </FilterDiv>

            <CustomTable
                columns={ManagerReviewColumns(path === routeConstants.managerReview ? 'manager' : 'employee')}
                data={managerReviewCycles || []}
                count={count}
                activePage={selectedEmployees.length || reviewCycleList.length ? searchActivePage : activePage}
                isLoading={isLoading}
                handlePageChange={handlePageChange}
            />
        </PageContent>
    );
};
