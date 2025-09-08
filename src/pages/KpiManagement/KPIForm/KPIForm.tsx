import { Loader, PageContent, RichTextEditor, TextField } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import { routeConstants } from '@constants';
import { Button, Modal, Text } from '@medly-components/core';
import { DeleteForeverIcon } from '@medly-components/icons';
import { StyledAddTeam } from '@pages/FirstTeam/FirstTeam.styled';
import { StyledModalHeader, StyledModalContent, StyledModalActions, StyledModalTitle, StyledToggle } from '@common';
import { Navigate } from 'react-router-dom';
import { ToggleWrapper } from '../KpiManagement.styled';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';
import {
    AddTeamBtnWrapper,
    ClearButton,
    FlexDropDown,
    MultiSelect,
    RedButton,
    SingleSelect,
    StyledButtonDiv,
    KRATitleWrapper,
    Container,
    FormSection,
    TipsSection
} from './KPIForm.styled';
import { useKPIForm } from './useKPIForm';
import KPITips from './KPITips';

export const KPIForm = () => {
    const {
        kpiData,
        description,
        setDescription,
        handleToggleClick,
        handleAddKpi,
        state,
        handleOnChange,
        isAddLoading,
        isEditLoading,
        isStateMapping,
        showModal,
        setShowModal,
        kpiDropDown,
        handleTeamChange,
        handleDesignationChange,
        handleAddAnotherDropDowns,
        disableUpdateBtn,
        handleRemoveField,
        handleDepartmentChange,
        departmentList,
        krasList,
        kraId,
        handleKraOnChange,
        isEditOptionsDisabled
    } = useKPIForm();

    if (!state) {
        return (
            <Navigate
                to={routeConstants.root}
                state={{
                    error: true,
                    header: 'Unauthorized Access',
                    message: 'You do not have access to the page, please contact system administrator/HR.'
                }}
            />
        );
    }

    if (isStateMapping) {
        return <Loader />;
    }

    return (
        <PageContent>
            <ListHeader title={state.action === 'view' ? 'View KPI' : state.action === 'edit' ? 'Edit KPI' : 'Add KPI'} />
            <Container>
                <FormSection>
                    {kpiDropDown &&
                        kpiDropDown.length > 0 &&
                        kpiDropDown.map((input: any, index: number) => {
                            return (
                                <FlexDropDown key={input.designationRefId}>
                                    <SingleSelect
                                        id={`department${index}`}
                                        disabled={(state && state.action === 'view') || isEditOptionsDisabled}
                                        options={departmentList}
                                        variant="outlined"
                                        title={isEditOptionsDisabled ? 'Cannot edit Department as review cycle has started.' : ''}
                                        name="departmentId"
                                        data-testid={`departmentId-${index}`}
                                        size="M"
                                        placeholder="Select Department"
                                        label="Department"
                                        value={input.departmentId}
                                        isSearchable
                                        minWidth="24rem"
                                        onChange={value => handleDepartmentChange(value, input.designationRefId)}
                                        errorText={input.departmentError}
                                    />
                                    <TooltipDropdown
                                        dataIds={[`department${index}-input`]}
                                        values={
                                            input.departmentId && departmentList.length
                                                ? departmentList.filter((item: OptionsType) => input.departmentId === item.value)
                                                : []
                                        }
                                    />
                                    <SingleSelect
                                        id={`team${index}`}
                                        disabled={
                                            (state && state.action === 'view') || input.teamsList.length === 0 || isEditOptionsDisabled
                                        }
                                        options={input.teamsList}
                                        variant="outlined"
                                        name="teamId"
                                        data-testid={`teamId-${index}`}
                                        title={isEditOptionsDisabled ? 'Cannot edit Team as review cycle has started.' : ''}
                                        size="M"
                                        placeholder="Select Team"
                                        label="Team"
                                        value={input.teamId}
                                        isSearchable
                                        minWidth="24rem"
                                        onChange={value => handleTeamChange(value, input.designationRefId)}
                                        errorText={input.teamError}
                                    />
                                    <TooltipDropdown
                                        dataIds={[`team${index}-input`]}
                                        values={
                                            input.teamId && input.teamsList.length
                                                ? input.teamsList.filter((item: OptionsType) => input.teamId === item.value)
                                                : []
                                        }
                                    />
                                    <MultiSelect
                                        id={`designation${index}`}
                                        disabled={
                                            (state && state.action === 'view') ||
                                            input.designationList.length === 0 ||
                                            isEditOptionsDisabled
                                        }
                                        options={input.designationList}
                                        label="Designation"
                                        variant="outlined"
                                        placeholder="Select Designation"
                                        title={isEditOptionsDisabled ? 'Cannot edit Designation as review cycle has started.' : ''}
                                        name="designationIds"
                                        data-testid={`designationId-${index}`}
                                        size="M"
                                        minWidth="24rem"
                                        values={input.designationIds}
                                        errorText={input.designationError}
                                        onChange={value => handleDesignationChange(value, input.designationRefId)}
                                    />
                                    <TooltipDropdown
                                        dataIds={[`designation${index}-input`, `designation${index}-count-chip`]}
                                        values={
                                            input.designationIds?.length && input.designationList.length
                                                ? input.designationList.filter(
                                                      (item: OptionsType) =>
                                                          typeof item.value === 'number' &&
                                                          (input.designationIds as number[]).includes(item.value)
                                                  )
                                                : []
                                        }
                                    />
                                    {state && state.action !== 'view' && kpiDropDown.length !== 1 && (
                                        <ClearButton
                                            data-testid={`clearField-${index}`}
                                            type="button"
                                            onClick={() => requestAnimationFrame(() => handleRemoveField(input.designationRefId))}
                                        >
                                            <DeleteForeverIcon iconColor="red" />
                                        </ClearButton>
                                    )}
                                </FlexDropDown>
                            );
                        })}
                    {state && state.action !== 'view' && (
                        <AddTeamBtnWrapper>
                            <StyledAddTeam
                                isDisabled={isEditOptionsDisabled}
                                title={isEditOptionsDisabled ? 'Cannot add Team as review cycle has started.' : ''}
                                textVariant="h4"
                                data-testid="addField"
                                disabled={isEditOptionsDisabled}
                                onClick={() => handleAddAnotherDropDowns(isEditOptionsDisabled)}
                                textAlign="center"
                            >
                                + Add Team
                            </StyledAddTeam>
                        </AddTeamBtnWrapper>
                    )}
                    <KRATitleWrapper>
                        <SingleSelect
                            disabled={(state && state.action === 'view') || isEditOptionsDisabled}
                            options={krasList}
                            variant="outlined"
                            name="kraId"
                            title={isEditOptionsDisabled ? 'Cannot edit KRA as self review has started.' : ''}
                            data-testid="kraId"
                            size="M"
                            placeholder="Select KRA"
                            label="KRA"
                            isSearchable
                            value={kraId}
                            minWidth="24rem"
                            onChange={e => handleKraOnChange(e)}
                        />
                        <TooltipDropdown
                            dataIds={[`kra-input`]}
                            values={kraId && krasList.length ? krasList.filter((item: OptionsType) => kraId === item.value) : []}
                        />
                        <TextField
                            dataTestid="kpiTitle"
                            disabled={state && state.action === 'view'}
                            variant="outlined"
                            size="M"
                            label="KPI Title"
                            placeholder="Example - Communication"
                            type="text"
                            value={kpiData.title}
                            onChange={handleOnChange}
                        />
                    </KRATitleWrapper>
                    <RichTextEditor
                        placeholder={'Write KPI description here...'}
                        editor={'kpi'}
                        marginBottom={0.1}
                        input={description}
                        setInput={setDescription}
                        disabled={state && state.action === 'view'}
                        data-testid="textEditor"
                    />

                    <ToggleWrapper>
                        <StyledToggle
                            disabled={state && state.action == 'view'}
                            label="Active: "
                            onClick={handleToggleClick}
                            checked={kpiData.status ? true : false}
                            data-testid="activeToggle"
                        />
                    </ToggleWrapper>
                    {state && state.action !== 'view' && (
                        <StyledButtonDiv>
                            <Button
                                data-testid="saveBtn"
                                onClick={handleAddKpi}
                                disabled={disableUpdateBtn}
                                isLoading={isAddLoading || isEditLoading}
                            >
                                {state.action == 'edit' ? 'Update' : 'Save'}
                            </Button>
                        </StyledButtonDiv>
                    )}
                </FormSection>
                <TipsSection>
                    <KPITips />
                </TipsSection>
            </Container>

            <Modal open={showModal} onCloseModal={() => setShowModal(false)}>
                <StyledModalHeader>
                    <StyledModalTitle textVariant="h2">Confirm</StyledModalTitle>
                </StyledModalHeader>
                <StyledModalContent>
                    <Text textVariant="body1" textWeight="Medium">
                        Are you sure you want to edit KPI, as it will impact the current review cycle?
                    </Text>
                </StyledModalContent>
                <StyledModalActions>
                    <RedButton data-testid="modal-yes" isLoading={isAddLoading || isEditLoading} variant="outlined" onClick={handleAddKpi}>
                        Yes
                    </RedButton>
                    <Button data-testid="modal-no" onClick={() => setShowModal(false)} variant="outlined">
                        No
                    </Button>
                </StyledModalActions>
            </Modal>
        </PageContent>
    );
};
