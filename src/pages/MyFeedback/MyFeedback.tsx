import { FC, memo } from 'react';
import { MyFeedbackFiltersProps, MyFeedbackProps, RequestFeedbackFiltersProps } from './types';
import { PageContent } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import { StyledWrapper } from '@pages/EmployeeManagement/EmployeeManagement.styled';
import { StyledMultiSelect, StyledSingleSelect } from '@common';
import { Tabs } from '@medly-components/core';
import { CallMadeIcon, CallReceivedIcon, NotificationImportantIcon, ViewListIcon } from '@medly-components/icons';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import { useMyFeedback } from './useMyFeedback';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { StyledDiv, StyledSelect, StyledTableWrapper, StyledTabs } from '@pages/RequestedFeedback/RequestedFeedback.style';
import { STATUS_OPTIONS } from '@pages/RequestedFeedback/constants';
import { useRequestedFeedback } from '@pages/RequestedFeedback/useRequestedFeedback';

const RequestFeedbackFilters = memo(
    ({
        activeTab,
        dataIds,
        employeeList,
        ReqOrFromToolTipValues,
        FeedbackToToolTipValues,
        handleDropdownChange,
        reqFeedbackFilter
    }: RequestFeedbackFiltersProps) => {
        return (
            <>
                <StyledDiv>
                    <StyledSelect
                        options={employeeList()}
                        variant="outlined"
                        placeholder="Select Employee Name"
                        data-testid="employeeDropdown"
                        label={activeTab === 'sent' ? 'Feedback From' : 'Requested From'}
                        onChange={value => handleDropdownChange('reqOrFrom', value)}
                        values={reqFeedbackFilter.reqOrFrom}
                        size="M"
                        minWidth="25rem"
                    />
                    <TooltipDropdown dataIds={dataIds} values={ReqOrFromToolTipValues} />
                    <StyledMultiSelect
                        options={employeeList()}
                        variant="outlined"
                        placeholder="Select Employee Name"
                        label="Feedback About"
                        data-testid="feedbackToDropdown"
                        onChange={value => handleDropdownChange('feedbackTo', value)}
                        values={reqFeedbackFilter.feedbackTo}
                        size="M"
                        minWidth="25rem"
                    />
                    <TooltipDropdown dataIds={['feedbackto-input', 'feedbackto-count-chip']} values={FeedbackToToolTipValues} />
                </StyledDiv>

                <StyledSingleSelect
                    options={STATUS_OPTIONS}
                    variant="outlined"
                    placeholder="Select"
                    label="Status"
                    data-testid="statusDropdown"
                    onChange={value => value && handleDropdownChange('status', value)}
                    value={reqFeedbackFilter.status}
                    size="M"
                    minWidth="25rem"
                />
            </>
        );
    }
);

RequestFeedbackFilters.displayName = 'RequestFeedbackFilters';

const MyFeedbackFilters = memo(
    ({
        employeeList,
        handleDropdownChange,
        myFeedbackTooltipValues,
        tagsList,
        dataIds,
        activeTab,
        selectedFeedbackType,
        selectedEmployees
    }: MyFeedbackFiltersProps) => {
        return (
            <>
                <StyledMultiSelect
                    options={employeeList()}
                    variant="outlined"
                    placeholder="Select Employee Name"
                    label={activeTab === 'submitted' ? 'Feedback About' : 'Feedback From'}
                    onChange={value => handleDropdownChange('activeEmployee', value)}
                    values={selectedEmployees}
                    size="M"
                    minWidth="25rem"
                />
                <TooltipDropdown dataIds={dataIds} values={myFeedbackTooltipValues} />
                <StyledSingleSelect
                    options={tagsList}
                    label="Feedback Type"
                    placeholder="Select Feedback Type"
                    variant="outlined"
                    size="M"
                    onChange={value => handleDropdownChange('activeFeedbackType', value)}
                    value={selectedFeedbackType}
                    minWidth="25rem"
                />
            </>
        );
    }
);

MyFeedbackFilters.displayName = 'MyFeedbackFilters';

const MyFeedback: FC<MyFeedbackProps> = () => {
    const {
        handleButtonClick,
        handleTabChange,
        handlePageChange,
        ActivePage,
        activeTab,
        tableData,
        employeeList,
        handleDropdownChange,
        tagsList,
        myFeedbackdataIds,
        myFeedbackTooltipValues,
        selectedFeedbackType,
        selectedEmployees,
        unReadFeedbackCount
    } = useMyFeedback();

    const {
        employeeList: employeeListRequestedFeedback,
        handleDropdownChange: handleRequestedFeedbackDropdownChange,
        reqFeedbackFilter,
        requestPendingCountRequestReceived,
        tableDataRequestedFeedback,
        requestPendingCountRequestSent,
        addRequestPage,
        requestedFeedbackDataIds,
        requestedFeedbackToolTipValues
    } = useRequestedFeedback({ activeTab });

    const isMyFeedback = activeTab === 'submitted' || activeTab === 'received';
    const customTableData = isMyFeedback ? tableData : tableDataRequestedFeedback;
    const { count, isLoading, columns, data, handleSort } = customTableData;

    return (
        <PageContent>
            <ListHeader
                title="360-Degree Feedback"
                actionButtonLabel="Request Feedback"
                actionButtonClick={addRequestPage}
                secondButtonLabel="Add Feedback"
                secondButtonClick={handleButtonClick}
                actionButtonVariant="outlined"
            />
            <StyledWrapper>
                {isMyFeedback ? (
                    <MyFeedbackFilters
                        dataIds={myFeedbackdataIds}
                        myFeedbackTooltipValues={myFeedbackTooltipValues}
                        employeeList={employeeList}
                        handleDropdownChange={handleDropdownChange}
                        activeTab={activeTab}
                        tagsList={tagsList}
                        selectedFeedbackType={selectedFeedbackType}
                        selectedEmployees={selectedEmployees}
                    />
                ) : (
                    <RequestFeedbackFilters
                        ReqOrFromToolTipValues={requestedFeedbackToolTipValues.reqOrFrom}
                        FeedbackToToolTipValues={requestedFeedbackToolTipValues.feedbackTo}
                        dataIds={requestedFeedbackDataIds}
                        activeTab={activeTab}
                        employeeList={employeeListRequestedFeedback}
                        handleDropdownChange={handleRequestedFeedbackDropdownChange}
                        reqFeedbackFilter={reqFeedbackFilter}
                    />
                )}
            </StyledWrapper>
            <StyledTabs aria-label="Closed style tabs" tabSize="M" variant="outlined" onChange={id => handleTabChange(id)}>
                <Tabs.Tab active={activeTab === 'submitted'} id="submitted" label="Feedback Given" helperText="Sent" icon={CallMadeIcon} />
                <Tabs.Tab
                    active={activeTab === 'received'}
                    id="received"
                    label="Feedback Received"
                    helperText="Inbox"
                    icon={CallReceivedIcon}
                    count={unReadFeedbackCount === 0 ? undefined : unReadFeedbackCount}
                />
                <Tabs.Tab
                    active={activeTab === 'sent'}
                    id="sent"
                    label="Request Sent"
                    helperText="Sent"
                    data-testid="sent"
                    icon={ViewListIcon}
                    count={requestPendingCountRequestSent === 0 ? undefined : requestPendingCountRequestSent}
                />
                <Tabs.Tab
                    active={activeTab === 'inbox'}
                    id="inbox"
                    label="Request Received"
                    helperText="Inbox"
                    data-testid="inbox"
                    icon={NotificationImportantIcon}
                    count={requestPendingCountRequestReceived === 0 ? undefined : requestPendingCountRequestReceived}
                />
            </StyledTabs>
            <StyledTableWrapper>
                <CustomTable
                    tableKey={activeTab}
                    columns={columns}
                    count={count}
                    data={data}
                    isLoading={isLoading}
                    activePage={parseInt(ActivePage || '1')}
                    handlePageChange={handlePageChange}
                    setSortOrder={handleSort}
                />
            </StyledTableWrapper>
        </PageContent>
    );
};

export default MyFeedback;
