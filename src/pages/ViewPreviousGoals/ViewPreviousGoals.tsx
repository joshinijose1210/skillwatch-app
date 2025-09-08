import { PageContent } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import { Tabs } from '@medly-components/core';
import { TimelineIcon } from '@medly-components/icons';
import { FC } from 'react';
import { useViewPreviousGoals } from './useViewPreviousGoals';
import { StyledTableWrapper, StyledTabs } from './ViewPreviousGoals.styled';
import { format } from 'date-fns';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import { GoalColumns } from './columns';
import { GoalModal } from './GoalsModal';

export const ViewPreviousGoals: FC = () => {
    const { isLoading, data, handleBackClick, activeTab, onChangeHandle, refetchPreviousGoalsOnEditSuccess } = useViewPreviousGoals();

    return (
        <PageContent>
            <ListHeader
                title={'Previous Goals (Last 3 Review Cycles)'}
                actionButtonVariant="flat"
                actionButtonLabel={'Go Back'}
                actionButtonClick={handleBackClick}
                moduleTitle="Manager Review"
            />

            <StyledTabs
                data-testid="tabs"
                aria-label="Closed style tabs"
                tabSize="M"
                active={activeTab}
                variant="outlined"
                onChange={onChangeHandle}
            >
                <Tabs.Tab
                    active={activeTab === 1}
                    id={1}
                    label={
                        data?.[0]
                            ? `${format(new Date(data?.[0]?.startDate), 'do MMM yyyy')} - ${format(
                                  new Date(data?.[0]?.endDate),
                                  'do MMM yyyy'
                              )}`
                            : ''
                    }
                    helperText="Goal Cycle 1"
                    icon={TimelineIcon}
                    count={
                        data?.[0]?.actionItems?.length && data?.[0]?.actionItems?.length > 0 ? data?.[0]?.actionItems?.length : undefined
                    }
                    data-testid="goalCycle1"
                />
                <Tabs.Tab
                    active={activeTab === 2}
                    id={2}
                    label={
                        data?.[1]
                            ? `${format(new Date(data?.[1]?.startDate), 'do MMM yyyy')} - ${format(
                                  new Date(data?.[1]?.endDate),
                                  'do MMM yyyy'
                              )}`
                            : ''
                    }
                    helperText="Goal Cycle 2"
                    icon={TimelineIcon}
                    count={
                        data?.[1]?.actionItems?.length && data?.[1]?.actionItems?.length > 0 ? data?.[1]?.actionItems?.length : undefined
                    }
                    data-testid="goalCycle2"
                />
                <Tabs.Tab
                    active={activeTab === 3}
                    id={3}
                    label={
                        data?.[2]
                            ? `${format(new Date(data?.[2]?.startDate), 'do MMM yyyy')} - ${format(
                                  new Date(data?.[2]?.endDate),
                                  'do MMM yyyy'
                              )}`
                            : ''
                    }
                    helperText="Goal Cycle 3"
                    icon={TimelineIcon}
                    count={
                        data?.[2]?.actionItems?.length && data?.[2]?.actionItems?.length > 0 ? data?.[2]?.actionItems?.length : undefined
                    }
                    data-testid="goalCycle3"
                />
            </StyledTabs>

            <GoalModal refetchData={refetchPreviousGoalsOnEditSuccess} />

            <StyledTableWrapper>
                <CustomTable
                    data={data?.[activeTab - 1]?.actionItems || []}
                    tableKey={activeTab.toString()}
                    columns={GoalColumns}
                    isLoading={isLoading}
                    activePage={1}
                    count={10}
                    itemsPerPage={10}
                    withPagination={false}
                />
            </StyledTableWrapper>
        </PageContent>
    );
};
