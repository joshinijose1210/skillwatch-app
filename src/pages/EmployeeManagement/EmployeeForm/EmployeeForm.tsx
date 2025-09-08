import { ContactNoWithCode, Loader, PageContent } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import { routeConstants } from '@constants';
import { Button, Modal, Text } from '@medly-components/core';
import { FlexStartDiv, StyledGoBackButton } from '@pages/RolesAndPermissions/RolesAndPermissions.styled';
import { CancelButton } from '@pages/SelfReview/SelfReviewForm/SelfReviewForm.styled';
import { checkPermission } from '@utils/checkPermission';
import { FC } from 'react';
import 'react-phone-input-2/lib/style.css';
import { Navigate } from 'react-router-dom';
import { StyledModalHeader, StyledModalContent, StyledModalActions, StyledModalTitle, StyledToggle } from '@common';
import {
    Container,
    FormContainer,
    FormInput,
    FormLayer,
    StyleContactInput,
    StyledButtonWrapper,
    StyledDatePicker,
    StyledErrorText,
    StyledSingleSelect,
    StyledText,
    StyledTextField,
    ToggleWrapper,
    Wrapper
} from './EmployeeForm.styled';
import useEmployeeForm from './useEmployeeForm';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';
import EmployeeTips from './EmployeeTips';

const EmployeeForm: FC = () => {
    const {
        openModal,
        manager2List,
        isDataLoading,
        saveData,
        isSaveLoading,
        rolesList,
        designationsList,
        teamsList,
        toggleEmployeeStatus,
        handleDropdownChange,
        handleInputChange,
        action,
        employeeDetails,
        managersList,
        goBackHandle,
        path,
        handlePhoneNumber,
        setOpenModal,
        handleModalProceedClick,
        modulePermission,
        inputErrors,
        state,
        isSaveDisabled,
        handleDateChange,
        experienceList,
        genderList,
        disableManagerField,
        toggleCheckbox,
        description,
        enableUpdate,
        departmentList,
        disableEdit
    } = useEmployeeForm();

    if (!checkPermission('Employees', modulePermission)) {
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
    if (isDataLoading) {
        return <Loader />;
    }

    return (
        <PageContent>
            {path.includes(routeConstants.firstEmployeeRedirect) && (
                <FlexStartDiv>
                    <StyledGoBackButton variant="flat" onClick={goBackHandle}>
                        &lt; Go Back
                    </StyledGoBackButton>
                </FlexStartDiv>
            )}
            <ListHeader title={`${action} Employee`} />
            <Wrapper>
                <Container>
                    <FormContainer>
                        <StyledText textVariant="h4" textWeight="Regular">
                            Personal Information
                        </StyledText>
                        <FormLayer>
                            <FormInput>
                                <StyledTextField
                                    disabled={action === 'View'}
                                    variant="outlined"
                                    size="M"
                                    name="firstName"
                                    label="First name"
                                    value={employeeDetails.firstName}
                                    onChange={handleInputChange}
                                    errorText={inputErrors.firstName}
                                    minWidth="30rem"
                                    data-testid="nameInput"
                                />
                            </FormInput>

                            <FormInput>
                                <StyledTextField
                                    disabled={action === 'View'}
                                    variant="outlined"
                                    size="M"
                                    name="lastName"
                                    label="Last name"
                                    value={employeeDetails.lastName}
                                    onChange={handleInputChange}
                                    errorText={inputErrors.lastName}
                                    minWidth="30rem"
                                    data-testid="lastNameInput"
                                />
                            </FormInput>
                            <StyleContactInput>
                                <ContactNoWithCode
                                    inputProps={{
                                        name: 'contactNo',
                                        autoComplete: 'off'
                                    }}
                                    country={'in'}
                                    componentName={'employee'}
                                    placeholder="Contact Number"
                                    value={employeeDetails.contactNo}
                                    onChange={handlePhoneNumber}
                                    disabled={false}
                                    isError={inputErrors.contactNo ? true : false}
                                    data-testid="contactInput"
                                />
                                <StyledErrorText>{inputErrors.contactNo}</StyledErrorText>
                            </StyleContactInput>
                            <FormInput>
                                <StyledDatePicker
                                    id="dob"
                                    displayFormat="dd-MM-yyyy"
                                    value={
                                        employeeDetails.dateOfBirth && employeeDetails.dateOfBirth !== ''
                                            ? new Date(employeeDetails?.dateOfBirth)
                                            : null
                                    }
                                    onChange={(value: any) => handleDateChange('dateOfBirth', value)}
                                    size="M"
                                    maxSelectableDate={new Date()}
                                    label="Date of Birth"
                                    variant="outlined"
                                    showCalendarIcon={true}
                                    data-testid="dateInput"
                                />
                            </FormInput>
                            <FormInput>
                                <StyledSingleSelect
                                    disabled={action === 'View'}
                                    options={genderList}
                                    variant="outlined"
                                    size="M"
                                    placeholder="Select Gender"
                                    label="Gender"
                                    value={employeeDetails.genderId}
                                    onChange={val => val && handleDropdownChange('genderId', val)}
                                    errorText={inputErrors.genderId}
                                    minWidth="30rem"
                                    isSearchable
                                    data-testid="genderDropdown"
                                />
                                <TooltipDropdown
                                    dataIds={[`gender-input`]}
                                    values={
                                        employeeDetails.genderId && genderList.length
                                            ? genderList.filter((item: OptionsType) => employeeDetails.genderId === item.value)
                                            : []
                                    }
                                />
                            </FormInput>
                        </FormLayer>
                    </FormContainer>

                    <FormContainer>
                        <StyledText textVariant="h4" textWeight="Regular">
                            Professional Information
                        </StyledText>
                        <FormLayer>
                            <FormInput>
                                <StyledTextField
                                    disabled={action === 'View'}
                                    variant="outlined"
                                    size="M"
                                    name="emailId"
                                    label="Email"
                                    value={employeeDetails.emailId}
                                    onChange={handleInputChange}
                                    errorText={inputErrors.emailId}
                                    minWidth="30rem"
                                    data-testid="emailInput"
                                />
                            </FormInput>

                            <FormInput>
                                <StyledTextField
                                    disabled={action === 'View'}
                                    variant="outlined"
                                    size="M"
                                    name="employeeId"
                                    label="Employee ID"
                                    value={employeeDetails.employeeId}
                                    onChange={handleInputChange}
                                    errorText={inputErrors.employeeId}
                                    minWidth="30rem"
                                    data-testid="employeeIdInput"
                                />
                            </FormInput>

                            <FormInput>
                                <StyledSingleSelect
                                    disabled={action === 'View' || disableEdit}
                                    options={departmentList}
                                    variant="outlined"
                                    size="M"
                                    placeholder="Select Department"
                                    label="Department"
                                    value={employeeDetails.departmentId}
                                    onChange={val => val && handleDropdownChange('departmentId', val)}
                                    errorText={inputErrors.departmentId}
                                    minWidth="30rem"
                                    isSearchable
                                    data-testid="departmentDropdown"
                                />
                                <TooltipDropdown
                                    dataIds={[`department-input`]}
                                    values={
                                        employeeDetails.departmentId && departmentList.length
                                            ? departmentList.filter((item: OptionsType) => employeeDetails.departmentId === item.value)
                                            : []
                                    }
                                />
                            </FormInput>

                            <FormInput>
                                <StyledSingleSelect
                                    disabled={
                                        action === 'View' ||
                                        employeeDetails.departmentId === -1 ||
                                        !!inputErrors.departmentId ||
                                        disableEdit
                                    }
                                    options={teamsList}
                                    variant="outlined"
                                    size="M"
                                    placeholder="Select Team"
                                    label="Team"
                                    value={employeeDetails.teamId}
                                    onChange={val => val && handleDropdownChange('teamId', val)}
                                    errorText={inputErrors.teamId}
                                    minWidth="30rem"
                                    isSearchable
                                    data-testid="teamDropdown"
                                />
                                <TooltipDropdown
                                    dataIds={[`team-input`]}
                                    values={
                                        employeeDetails.teamId && teamsList.length
                                            ? teamsList.filter((item: OptionsType) => employeeDetails.teamId === item.value)
                                            : []
                                    }
                                />
                            </FormInput>

                            <FormInput>
                                <StyledSingleSelect
                                    disabled={action === 'View' || employeeDetails.teamId === -1 || !!inputErrors.teamId || disableEdit}
                                    options={designationsList}
                                    variant="outlined"
                                    size="M"
                                    placeholder="Select Designation"
                                    label="Designation"
                                    value={employeeDetails.designationId}
                                    onChange={val => val && handleDropdownChange('designationId', val)}
                                    errorText={inputErrors.teamId ? '' : inputErrors.designationId}
                                    minWidth="30rem"
                                    isSearchable
                                    data-testid="designationDropdown"
                                />
                                <TooltipDropdown
                                    dataIds={[`designation-input`]}
                                    values={
                                        employeeDetails.designationId && designationsList.length
                                            ? designationsList.filter((item: OptionsType) => employeeDetails.designationId === item.value)
                                            : []
                                    }
                                />
                            </FormInput>
                            <FormInput>
                                <StyledSingleSelect
                                    disabled={
                                        action === 'View' || (action === 'Edit' && state && state.roleName === 'Org Admin') || disableEdit
                                    }
                                    options={rolesList}
                                    variant="outlined"
                                    size="M"
                                    placeholder="Select Role"
                                    label="Role"
                                    value={employeeDetails.roleId}
                                    onChange={val => val && handleDropdownChange('roleId', val)}
                                    errorText={inputErrors.roleId}
                                    minWidth="30rem"
                                    isSearchable
                                    data-testid="rolesDropdown"
                                />
                                <TooltipDropdown
                                    dataIds={[`role-input`]}
                                    values={
                                        employeeDetails.roleId && rolesList.length
                                            ? rolesList.filter((item: OptionsType) => employeeDetails.roleId === item.value)
                                            : []
                                    }
                                />
                            </FormInput>
                            <FormInput>
                                <StyledSingleSelect
                                    id="manager1"
                                    disabled={action === 'View' || disableManagerField || disableEdit}
                                    options={managersList}
                                    variant="outlined"
                                    size="M"
                                    placeholder="Select Manager 1"
                                    label="Manager 1"
                                    value={employeeDetails.firstManagerId}
                                    isSearchable
                                    onChange={val => val && handleDropdownChange('firstManagerId', val)}
                                    errorText={inputErrors.firstManagerId}
                                    minWidth="30rem"
                                    title={disableManagerField ? 'Manager 1 could not be edited as Self Review has started' : ''}
                                    data-testid="managerOneDropdown"
                                />
                                <TooltipDropdown
                                    dataIds={[`manager1-input`]}
                                    values={
                                        employeeDetails.firstManagerId && managersList.length
                                            ? managersList.filter((item: OptionsType) => employeeDetails.firstManagerId === item.value)
                                            : []
                                    }
                                />
                            </FormInput>

                            <FormInput>
                                <StyledSingleSelect
                                    id="manager2"
                                    options={manager2List}
                                    variant="outlined"
                                    size="M"
                                    placeholder="Select Manager 2 (optional)"
                                    label="Manager 2 (optional)"
                                    value={employeeDetails.secondManagerId}
                                    isSearchable
                                    onChange={val => val && handleDropdownChange('secondManagerId', val)}
                                    disabled={
                                        (action === 'Add' && !employeeDetails.firstManagerId) ||
                                        employeeDetails.firstManagerId === -99 ||
                                        action === 'View' ||
                                        disableManagerField ||
                                        disableEdit
                                    }
                                    minWidth="30rem"
                                    title={disableManagerField ? 'Manager 2 could not be edited as Self Review has started' : ''}
                                    data-testid="managerTwoDropdown"
                                />
                                <TooltipDropdown
                                    dataIds={[`manager2-input`]}
                                    values={
                                        employeeDetails.secondManagerId && manager2List.length
                                            ? manager2List.filter((item: OptionsType) => employeeDetails.secondManagerId === item.value)
                                            : []
                                    }
                                />
                            </FormInput>
                            <FormInput>
                                <StyledDatePicker
                                    id="doj"
                                    displayFormat="dd-MM-yyyy"
                                    value={
                                        employeeDetails.dateOfJoining && employeeDetails.dateOfJoining !== ''
                                            ? new Date(employeeDetails?.dateOfJoining)
                                            : null
                                    }
                                    onChange={(value: any) => handleDateChange('dateOfJoining', value)}
                                    size="M"
                                    label="Date of Joining"
                                    variant="outlined"
                                    maxSelectableDate={new Date()}
                                    showCalendarIcon={true}
                                    data-testid="joinDate"
                                />
                            </FormInput>
                            <FormInput>
                                <StyledSingleSelect
                                    options={experienceList}
                                    variant="outlined"
                                    size="M"
                                    label="Years Of Experience"
                                    placeholder="Select Experience"
                                    value={employeeDetails.experienceInMonths}
                                    onChange={val => val && handleDropdownChange('experienceInMonths', val)}
                                    isSearchable
                                    minWidth="30rem"
                                    data-testid="experienceDropdown"
                                />
                                <TooltipDropdown
                                    dataIds={[`years of experience-input`]}
                                    values={
                                        employeeDetails.experienceInMonths && experienceList.length
                                            ? experienceList.filter(
                                                  (item: OptionsType) => employeeDetails.experienceInMonths === item.value
                                              )
                                            : []
                                    }
                                />
                            </FormInput>
                            <ToggleWrapper colSpan={2}>
                                <StyledToggle
                                    disabled={action === 'View'}
                                    label="Is a Consultant/Contractor?"
                                    name="contractor"
                                    onClick={toggleCheckbox}
                                    checked={employeeDetails.isConsultant}
                                    data-testid="consultantToggle"
                                />
                            </ToggleWrapper>

                            <ToggleWrapper colSpan={1}>
                                <StyledToggle
                                    disabled={action === 'View'}
                                    label="Active:"
                                    labelPosition="left"
                                    onClick={toggleEmployeeStatus}
                                    checked={employeeDetails.status}
                                    data-testid="activeToggle"
                                />
                            </ToggleWrapper>
                            {action !== 'View' && (
                                <StyledButtonWrapper>
                                    <Button
                                        onClick={saveData}
                                        data-testid="saveBtn"
                                        variant="solid"
                                        isLoading={isSaveLoading}
                                        disabled={action === 'Edit' ? !enableUpdate : isSaveDisabled}
                                    >
                                        {action === 'Edit' ? 'Update' : 'Save'}
                                    </Button>
                                </StyledButtonWrapper>
                            )}
                        </FormLayer>

                        <Modal open={Boolean(openModal)} onCloseModal={() => setOpenModal('')}>
                            <StyledModalHeader>
                                <StyledModalTitle textVariant="h2">Confirm</StyledModalTitle>
                            </StyledModalHeader>
                            <StyledModalContent>
                                <Text textVariant="body1" textWeight="Medium">
                                    {description}
                                </Text>
                            </StyledModalContent>
                            <StyledModalActions>
                                <CancelButton variant="outlined" onClick={handleModalProceedClick}>
                                    {state && employeeDetails.roleId !== state.roleId ? 'Proceed' : 'Yes'}
                                </CancelButton>
                                <Button onClick={() => setOpenModal('')} variant="outlined">
                                    No
                                </Button>
                            </StyledModalActions>
                        </Modal>
                    </FormContainer>
                </Container>
                <EmployeeTips />
            </Wrapper>
        </PageContent>
    );
};

export default EmployeeForm;
