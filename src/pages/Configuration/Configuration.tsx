import { ContactNoWithCode, DropZone, Loader, PageContent } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import { Button, Link, Modal, Text } from '@medly-components/core';
import { EventNoteIcon } from '@medly-components/icons';
import { CancelButton } from '@pages/SelfReview/SelfReviewForm/SelfReviewForm.styled';
import {
    InfoContainer,
    InfoWrapper,
    LogoNoteHeader,
    LogoNotes,
    LogoUpload,
    LogoUploadLabel,
    LogoUploadWrapper,
    Notes,
    StyleContactInput,
    StyledButton,
    StyledInput,
    StyledButtonWrapper,
    StyledScreenWidthWrapper,
    StyledErrorText,
    StyledRemoveButton,
    StyledLabel,
    StyledSingleSelect
} from './Configuration.styled';

import { StyledModalHeader, StyledModalContent, StyledModalActions, StyledModalTitle, StyledTipsTitle } from '@common';

import { useConfiguration } from './useConfiguration';

export const Configuration = () => {
    const {
        companyName,
        hasEditPermission,
        isLoading,
        contactNumber,
        companyLogo,
        handleFileChange,
        handleSaveClick,
        addCompanyInfoLoading,
        organisationId,
        handleCompanyNameChange,
        handleCompanyNumberChange,
        userRoleName,
        errors,
        disableSaveButton,
        data,
        logoUploadError,
        isModalOpen,
        handleRemoveLogo,
        removeLogoLoading,
        companyLogoImg,
        logoStatus,
        isLogoRemoved,
        onCloseModal,
        onOpenModal,
        timeZone,
        allTimeZones,
        setTimeZone
    } = useConfiguration();

    if (isLoading || logoStatus) return <Loader />;
    return (
        <PageContent>
            <ListHeader title="Company" />
            <StyledScreenWidthWrapper>
                <InfoContainer>
                    <InfoWrapper>
                        <StyledLabel>
                            Organisation Id: <Text textWeight="Medium">{organisationId}</Text>
                        </StyledLabel>
                        <StyledLabel>
                            Active Users: <Text textWeight="Medium">{data?.activeUsers}</Text>
                        </StyledLabel>
                        <StyledLabel>
                            Inactive Users: <Text textWeight="Medium">{data?.inactiveUsers}</Text>
                        </StyledLabel>
                    </InfoWrapper>
                </InfoContainer>
                <StyledInput
                    id="COMPANY_NAME"
                    variant="outlined"
                    label="Company Name"
                    fullWidth={true}
                    onChange={handleCompanyNameChange}
                    value={companyName}
                    data-testid="companyNameInput"
                    disabled={userRoleName !== 'Org Admin'}
                    errorText={errors.companyName}
                />
                <StyleContactInput>
                    <ContactNoWithCode
                        inputProps={{
                            name: 'contactNo',
                            autoComplete: 'off'
                        }}
                        country={'in'}
                        componentName={'Configuration'}
                        placeholder="Contact Number"
                        value={contactNumber}
                        onChange={handleCompanyNumberChange}
                        disabled={userRoleName !== 'Org Admin'}
                        isError={errors.contactNumber.length > 0}
                    />
                    <StyledErrorText>{errors.contactNumber}</StyledErrorText>
                </StyleContactInput>
                <StyledSingleSelect
                    options={allTimeZones}
                    label="Timezone"
                    placeholder="Select Company's Timezone"
                    variant="outlined"
                    size="M"
                    onChange={setTimeZone}
                    value={timeZone}
                    isSearchable
                    minWidth="25rem"
                />
                {hasEditPermission && (
                    <>
                        <LogoUploadWrapper>
                            <LogoUpload>
                                <LogoUploadLabel textVariant="h4">Upload Company Logo :</LogoUploadLabel>
                                <DropZone
                                    supportedFiles={['.svg', '.png']}
                                    onDrop={handleFileChange}
                                    file={companyLogo}
                                    accept={{ 'image/svg': ['.svg', '.png'] }}
                                />
                            </LogoUpload>
                            <LogoNotes>
                                <LogoNoteHeader>
                                    <EventNoteIcon iconColor="#000" />
                                    <StyledTipsTitle>Notes:</StyledTipsTitle>
                                </LogoNoteHeader>

                                <Notes>
                                    <Text as="li">The logo should only be in SVG and PNG format.</Text>
                                    <Text as="li">
                                        The logo in PNG or SVG format should be of minimum height of 25px and a minimum width of 25px.
                                    </Text>
                                    <Text as="li">The File size should be maximum 512 KB.</Text>
                                    <Text as="li">Make sure the logo is landscape, and has no whitespace around it.</Text>
                                    <Text as="li">
                                        The logo that will be uploaded, will reflect on the top left corner of the page, throughout the
                                        application, instead of Organisation Name.
                                    </Text>
                                    <Text as="li">
                                        If you have whitespace in the logo, remove it by using{' '}
                                        <Link href="https://svgcrop.com/" target="_blank">
                                            svgcrop tool
                                        </Link>{' '}
                                        for SVG and{' '}
                                        <Link href="https://www.remove.bg/" target="_blank">
                                            remove.bg tool
                                        </Link>{' '}
                                        for PNG format.
                                    </Text>
                                </Notes>
                            </LogoNotes>
                        </LogoUploadWrapper>
                        <StyledButtonWrapper>
                            {!isLogoRemoved && companyLogoImg && companyLogoImg.logoUrl && (
                                <StyledRemoveButton variant="outlined" onClick={onOpenModal} disabled={false} isLoading={false}>
                                    Remove Logo
                                </StyledRemoveButton>
                            )}
                            <StyledButton
                                variant="solid"
                                onClick={handleSaveClick}
                                data-testid="saveButton"
                                disabled={disableSaveButton || logoUploadError.length > 0}
                                isLoading={addCompanyInfoLoading}
                            >
                                Save
                            </StyledButton>
                        </StyledButtonWrapper>
                    </>
                )}
            </StyledScreenWidthWrapper>
            <Modal open={isModalOpen} onCloseModal={onCloseModal}>
                <StyledModalHeader>
                    <StyledModalTitle textVariant="h2">Confirm</StyledModalTitle>
                </StyledModalHeader>
                <StyledModalContent>
                    <Text textVariant="body1" textWeight="Medium">
                        Are you sure you want to remove the logo?
                    </Text>
                </StyledModalContent>
                <StyledModalActions>
                    <CancelButton isLoading={removeLogoLoading} onClick={handleRemoveLogo} variant="outlined">
                        Yes
                    </CancelButton>
                    <Button onClick={onCloseModal} variant="outlined">
                        No
                    </Button>
                </StyledModalActions>
            </Modal>
        </PageContent>
    );
};
