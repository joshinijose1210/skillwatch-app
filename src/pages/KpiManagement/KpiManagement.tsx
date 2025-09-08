import { StyledSearchBox, StyledSingleSelect, StyledModalHeader, StyledModalContent, StyledModalTitle } from '@common';
import { PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { Button, Modal, Text } from '@medly-components/core';
import { DownloadIcon } from '@medly-components/icons';
import {
    StyledMultiSelect,
    FilterContainer,
    HeaderButtonsContainer,
    ListHeaderButton,
    SampleKpiLinksWrapper,
    StyledWrapper
} from './KpiManagement.styled';
import { TableColumns as columns } from './columns';
import { useKpiManagement } from './useKpiManagement';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';

export const KpiManagement = () => {
    const {
        openAddNewKPI,
        isLoading,
        kpis,
        onSearch,
        onSearchClear,
        ActivePage,
        handlePageChange,
        totalItems,
        searchText,
        openSampleKpiModal,
        sampleKpiModal,
        DownloadKpiTemplate,
        enableAddKpi,
        handleDropdownChange,
        handleBulkImportClick,
        onSearchChange,
        search,
        kpiStatusOptions,
        krasList,
        departmentList,
        teamsList,
        designationsList,
        filterData,
        module
    } = useKpiManagement();

    return (
        <PageContent>
            <ListHeader
                title="KPIs (Key Performance Indicators)"
                moduleTitle="KPI"
                rightSection={
                    <HeaderButtonsContainer>
                        {/* <ListHeaderButton variant="outlined" onClick={openSampleKpiModal}>
                            {'View Sample KPI'}
                        </ListHeaderButton> */}
                        {module?.edit && (
                            <>
                                <ListHeaderButton
                                    variant="outlined"
                                    data-testid="importBtn"
                                    onClick={handleBulkImportClick}
                                    disabled={!enableAddKpi}
                                >
                                    {'Bulk Import'}
                                </ListHeaderButton>
                                <ListHeaderButton
                                    data-testid="addKpiBtn"
                                    variant="solid"
                                    title={!enableAddKpi ? 'You cannot add KPI when self review start date has passed.' : ''}
                                    onClick={openAddNewKPI}
                                    disabled={!enableAddKpi}
                                >
                                    {'Add KPI'}
                                </ListHeaderButton>
                            </>
                        )}
                    </HeaderButtonsContainer>
                }
            />
            <StyledWrapper>
                <StyledSearchBox
                    onInputChange={onSearchChange}
                    onSearch={onSearch}
                    isLoading={search.searchText !== '' && isLoading}
                    onClear={onSearchClear}
                    value={searchText}
                    size="M"
                    minWidth="25rem"
                    placeholder="Search KPI"
                    data-testid="searchKpi"
                />
                <FilterContainer>
                    <StyledMultiSelect
                        options={krasList}
                        label="KRA"
                        variant="outlined"
                        size="M"
                        placeholder="Select KRAs"
                        onChange={val => handleDropdownChange('selectedKRAs', val)}
                        values={filterData.selectedKRAs}
                        minWidth="25rem"
                        data-testid="KraDropdown"
                    />
                    <TooltipDropdown
                        dataIds={['kra-input', 'kra-count-chip']}
                        values={
                            filterData.selectedKRAs?.length && krasList.length
                                ? krasList.filter(
                                      (item: OptionsType) =>
                                          typeof item.value === 'number' && (filterData.selectedKRAs as number[]).includes(item.value)
                                  )
                                : []
                        }
                    />
                    <StyledMultiSelect
                        options={departmentList}
                        label="Department"
                        variant="outlined"
                        size="M"
                        placeholder="Select Department"
                        onChange={val => val && handleDropdownChange('selectedDepartments', val)}
                        values={filterData.selectedDepartments}
                        minWidth="25rem"
                        data-testid="departmentDropdown"
                    />
                    <TooltipDropdown
                        dataIds={['department-input', 'department-count-chip']}
                        values={
                            filterData.selectedDepartments?.length && departmentList.length
                                ? departmentList.filter(
                                      (item: OptionsType) =>
                                          typeof item.value === 'number' &&
                                          (filterData.selectedDepartments as number[]).includes(item.value)
                                  )
                                : []
                        }
                    />
                    <StyledMultiSelect
                        options={teamsList}
                        label="Team"
                        variant="outlined"
                        size="M"
                        placeholder="Select Team"
                        onChange={val => val && handleDropdownChange('selectedTeams', val)}
                        values={filterData.selectedTeams}
                        disabled={filterData?.selectedDepartments?.length === 0}
                        minWidth="25rem"
                        data-testid="teamDropdown"
                    />
                    <TooltipDropdown
                        dataIds={['team-input', 'team-count-chip']}
                        values={
                            filterData.selectedTeams?.length && teamsList.length
                                ? teamsList.filter(
                                      (item: OptionsType) =>
                                          typeof item.value === 'number' && (filterData.selectedTeams as number[]).includes(item.value)
                                  )
                                : []
                        }
                    />
                    <StyledMultiSelect
                        options={designationsList}
                        label="Designation"
                        variant="outlined"
                        size="M"
                        placeholder="Select Designation"
                        onChange={val => val && handleDropdownChange('selectedDesignations', val)}
                        values={filterData.selectedDesignations}
                        disabled={filterData?.selectedTeams?.length === 0}
                        minWidth="25rem"
                        data-testid="designationDropdown"
                    />
                    <TooltipDropdown
                        dataIds={['designation-input', 'designation-count-chip']}
                        values={
                            filterData.selectedDesignations?.length && designationsList.length
                                ? designationsList.filter(
                                      (item: OptionsType) =>
                                          typeof item.value === 'number' &&
                                          (filterData.selectedDesignations as number[]).includes(item.value)
                                  )
                                : []
                        }
                    />
                    <StyledSingleSelect
                        options={kpiStatusOptions}
                        label="Status"
                        variant="outlined"
                        size="M"
                        placeholder="Select Status"
                        onChange={val => val && handleDropdownChange('selectedStatus', val)}
                        value={filterData.selectedStatus}
                        minWidth="25rem"
                        data-testid="statusDropdown"
                    />
                    <TooltipDropdown
                        dataIds={['status-input']}
                        values={
                            filterData.selectedStatus && kpiStatusOptions.length
                                ? kpiStatusOptions.filter((item: OptionsType) => filterData.selectedStatus === item.value)
                                : []
                        }
                    />
                </FilterContainer>
            </StyledWrapper>
            <CustomTable
                columns={columns}
                count={totalItems}
                data={kpis || []}
                isLoading={isLoading}
                activePage={parseInt(ActivePage || '1')}
                handlePageChange={handlePageChange}
                defaultSortField="kpiID"
                defaultSortOrder="desc"
            />

            <Modal open={sampleKpiModal} onCloseModal={openSampleKpiModal}>
                <StyledModalHeader>
                    <StyledModalTitle textVariant="h2">Sample KPI</StyledModalTitle>
                </StyledModalHeader>
                <StyledModalContent>
                    <SampleKpiLinksWrapper>
                        <Button variant="flat" data-testid="ba-kpiDownload" onClick={() => DownloadKpiTemplate('ba-template')}>
                            <DownloadIcon />
                            BA KPIs template
                        </Button>
                        <Button variant="flat" data-testid="eng-kpiDownload" onClick={() => DownloadKpiTemplate('engineering-template')}>
                            <DownloadIcon />
                            Engineering KPIs template
                        </Button>
                        <Button variant="flat" data-testid="qa-kpiDownload" onClick={() => DownloadKpiTemplate('qa-template')}>
                            <DownloadIcon />
                            QA KPIs template
                        </Button>
                        <Button variant="flat" data-testid="hr-kpiDownload" onClick={() => DownloadKpiTemplate('hr-template')}>
                            <DownloadIcon />
                            HR KPIs template
                        </Button>
                    </SampleKpiLinksWrapper>
                </StyledModalContent>
            </Modal>
        </PageContent>
    );
};
