import { Logo, LogoWrapper, StyledSingleSelect } from '@common';
import { ContactNoWithCode } from '@components';
import { Text, TextField } from '@medly-components/core';
import { StyleButton } from '@pages/Login/Login.styled';
import Lottie from 'lottie-react';
import 'react-phone-input-2/lib/style.css';
import companyInfo from '../../../constants/images/animations/companyinfo.json';
import { ReactComponent as SkillWatchLogo } from '../../../constants/images/logos/Skillwatch.svg';
import {
    ColumWrapper,
    StyleContentWrapper,
    StylePageContent,
    StyleSignUpBox,
    StyledBox,
    StyledSpan,
    TitleWrapper
} from '../OrgAdminSignUp.styled';
import { useCompanyInfo } from './useCompanyInfo';

export const CompanyInfo: React.FC = () => {
    const {
        handelSubmit,
        isLoading,
        handleTextField,
        data,
        isDisabled,
        handlePhoneNumber,
        departmentOptions,
        teamOptions,
        designationOptions,
        selectedDepartment,
        selectedTeam,
        selectedDesignation,
        handleDepartmentChange,
        handleTeamChange,
        handleDesignationChange
    } = useCompanyInfo();

    return (
        <StylePageContent>
            <LogoWrapper>
                <Logo href={process.env.LOGIN_URL}>
                    <SkillWatchLogo />
                </Logo>
            </LogoWrapper>
            <StyledBox>
                <Lottie animationData={companyInfo} loop />
                <StyleSignUpBox>
                    <TitleWrapper>
                        <Text textAlign="center" textVariant="h2" textWeight="Medium">
                            Company Information
                        </Text>
                    </TitleWrapper>
                    <ColumWrapper>
                        <ContactNoWithCode
                            componentName="CompanyInfo"
                            inputProps={{
                                id: 'contact-input',
                                name: 'contactNumber',
                                autoComplete: 'off'
                            }}
                            country="in"
                            placeholder="Contact Number"
                            value={data.contactNumber}
                            onChange={handlePhoneNumber}
                            isError={!!data.errors.contactNumber}
                        />
                        <StyledSpan id="contact-error">{data.errors.contactNumber}</StyledSpan>

                        <TextField
                            size="M"
                            variant="outlined"
                            name="companySize"
                            label="Company Size"
                            data-testid="companySize"
                            fullWidth
                            value={data.companySize}
                            onChange={handleTextField}
                            errorText={data.errors.companySize}
                        />

                        <TextField
                            size="M"
                            variant="outlined"
                            name="companyName"
                            label="Company Name"
                            data-testid="companyName"
                            fullWidth
                            value={data.companyName}
                            onChange={handleTextField}
                            errorText={data.errors.companyName}
                        />

                        <StyledSingleSelect
                            className="no-max-height"
                            label="Department"
                            name="departmentId"
                            placeholder="Select Department"
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            options={departmentOptions}
                            isSearchable
                            minWidth="100%"
                            variant="outlined"
                            size="M"
                            data-testid="departmentDropdown"
                        />

                        <StyledSingleSelect
                            className="no-max-height"
                            label="Team"
                            name="teamId"
                            placeholder="Select Team"
                            value={selectedTeam}
                            onChange={handleTeamChange}
                            options={teamOptions}
                            isSearchable
                            minWidth="100%"
                            variant="outlined"
                            size="M"
                            data-testid="teamDropdown"
                            disabled={!selectedDepartment}
                        />

                        <StyledSingleSelect
                            className="no-max-height"
                            label="Designation"
                            name="designationId"
                            placeholder="Select Designation"
                            value={selectedDesignation}
                            onChange={handleDesignationChange}
                            options={designationOptions}
                            isSearchable
                            minWidth="100%"
                            variant="outlined"
                            size="M"
                            data-testid="designationDropdown"
                            disabled={!selectedTeam}
                        />
                    </ColumWrapper>

                    <StyleContentWrapper>
                        <StyleButton type="submit" size="M" onClick={handelSubmit} disabled={isDisabled} fullWidth isLoading={isLoading}>
                            Submit
                        </StyleButton>
                    </StyleContentWrapper>
                </StyleSignUpBox>
            </StyledBox>
        </StylePageContent>
    );
};
