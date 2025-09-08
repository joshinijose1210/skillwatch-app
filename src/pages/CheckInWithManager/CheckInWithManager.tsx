import { StyledMultiSelect, StyledSingleSelect } from '@common';
import { PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { routeConstants } from '@constants';
import { ratingOptions, reviewStatusOptions } from '@constants/data';
import { EmployeeFilterDiv, FilterDiv, StatusAndCycleFilterDiv } from './CheckInWithManager.styled';
import { ManagerReviewColumns } from './columns';
import { useCheckInWithManager } from './useCheckInWithManager';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';
export const CheckInWithManager = () => {
    const {
        handlePageChange,
        isLoading,
        checkInWithManagerData,
        ActivePage,
        count,
        employeeList,
        filters,
        handleDropdownChange,
        path,
        employeesByManagerList,
        handleOrderChange
    } = useCheckInWithManager();

    return (
        <PageContent>
            <ListHeader
                title={
                    path && path.includes(routeConstants.myCheckInWithManager)
                        ? 'Manager Check-in'
                        : path.includes(routeConstants.checkInWithTeamMember)
                        ? `Team's Check-in`
                        : 'Performance Review'
                }
                moduleTitle="Check-In with Manager"
            />
            {path && path.includes(routeConstants.myCheckInWithManager) ? (
                ''
            ) : (
                <FilterDiv>
                    <EmployeeFilterDiv>
                        {path &&
                            (path.includes(routeConstants.checkInWithTeamMember) || path.includes(routeConstants.performanceReview)) && (
                                <>
                                    <StyledMultiSelect
                                        options={
                                            path.includes(routeConstants.checkInWithTeamMember) ? employeesByManagerList : employeeList
                                        }
                                        variant="outlined"
                                        placeholder="Select Employee Name"
                                        label="Employee Name"
                                        onChange={val => val && handleDropdownChange('employees', val)}
                                        values={filters.employees}
                                        size="M"
                                        minWidth="25rem"
                                        data-testid="employeefilter"
                                    />
                                    <TooltipDropdown
                                        dataIds={['employeename-input', 'employeename-count-chip']}
                                        values={(() => {
                                            const list = path.includes(routeConstants.checkInWithTeamMember)
                                                ? employeesByManagerList
                                                : employeeList;

                                            return filters.employees?.length && list.length
                                                ? list.filter(
                                                      (item: OptionsType) =>
                                                          typeof item.value === 'number' &&
                                                          (filters.employees as number[]).includes(item.value)
                                                  )
                                                : [];
                                        })()}
                                    />
                                </>
                            )}
                    </EmployeeFilterDiv>
                    <StatusAndCycleFilterDiv>
                        {path &&
                            (path.includes(routeConstants.checkInWithTeamMember) || path.includes(routeConstants.performanceReview)) && (
                                <>
                                    <StyledSingleSelect
                                        options={ratingOptions}
                                        variant="outlined"
                                        size="M"
                                        placeholder="Select Check-in Rating"
                                        label="Check-in Rating"
                                        value={filters.filterRatingId}
                                        onChange={val => val && handleDropdownChange('filterRatingId', val)}
                                        minWidth="25rem"
                                        isSearchable
                                        data-testid="checkinratingfilter"
                                    />
                                    <TooltipDropdown
                                        dataIds={['check-in rating-input']}
                                        values={
                                            filters.filterRatingId && ratingOptions.length
                                                ? ratingOptions.filter((item: OptionsType) => filters.filterRatingId === item.value)
                                                : []
                                        }
                                    />
                                </>
                            )}

                        {path &&
                            (path.includes(routeConstants.performanceReview) || path.includes(routeConstants.checkInWithTeamMember)) && (
                                <>
                                    <StyledSingleSelect
                                        options={reviewStatusOptions}
                                        variant="outlined"
                                        placeholder="Select Status"
                                        label="Overall Status"
                                        onChange={val => val && handleDropdownChange('reviewStatus', val)}
                                        value={filters.reviewStatus}
                                        size="M"
                                        minWidth="25rem"
                                        data-testid="overallstatusfilter"
                                    />
                                    <TooltipDropdown
                                        dataIds={['overall status-input']}
                                        values={
                                            filters.reviewStatus && reviewStatusOptions.length
                                                ? reviewStatusOptions.filter((item: OptionsType) => filters.reviewStatus === item.value)
                                                : []
                                        }
                                    />
                                </>
                            )}
                    </StatusAndCycleFilterDiv>
                </FilterDiv>
            )}

            <CustomTable
                columns={ManagerReviewColumns(
                    path && path.includes(routeConstants.myCheckInWithManager)
                        ? 'employee'
                        : path.includes(routeConstants.checkInWithTeamMember)
                        ? 'manager'
                        : 'hr'
                )}
                count={count}
                data={checkInWithManagerData || []}
                isLoading={isLoading}
                activePage={parseInt(ActivePage || '1')}
                handlePageChange={handlePageChange}
                setSortOrder={handleOrderChange}
            />
        </PageContent>
    );
};
