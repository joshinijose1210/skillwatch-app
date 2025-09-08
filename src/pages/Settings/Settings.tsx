import { Loader, PageContent } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import { NoteMessage } from '@constants/data';
import { Button, Modal, Text } from '@medly-components/core';
import { EventNoteIcon, DeleteForeverIcon } from '@medly-components/icons';
import { AddTeamButtonDiv } from '@pages/FirstTeam/FirstTeam.styled';
import { ClearButton } from '@pages/ReviewCycleActionItems/ReviewCycleActionItems.styled';
import { CancelButton } from '@pages/SelfReview/SelfReviewForm/SelfReviewForm.styled';
import {
    Container,
    DomainAndDeleteButtonDiv,
    LeftWrapper,
    NoteBox,
    StyleButtonWrapper,
    StyledAddDomain,
    TipHeader,
    StyledText,
    ToggleWrapper,
    GeneralSettingsContainer,
    StyledTextField
} from './Settings.style';
import { useSettings } from './useSettings';
import { Step, StepsList } from '@pages/FeedbackForm/FeedbackTipsDesc.styles';
import { StyledModalHeader, StyledModalContent, StyledModalActions, StyledToggle, StyledTipsTitle } from '@common';

export const Settings = () => {
    const {
        actionFrom,
        handleRemoveField,
        inputFields,
        handleAddAnotherDomain,
        handleInputChange,
        existDomain,
        addNewDomainLoading,
        buttonDisabled,
        isLoading,
        isModalOpen,
        setModalOpen,
        deleteId,
        hasEditPermission,
        settingStatus,
        handleDisableDomain,
        handleToggleClick,
        handleSubmit,
        settingLading,
        updateSettingLoading,
        isManagerReviewStart
    } = useSettings();

    if (isLoading || settingLading) {
        return <Loader />;
    }
    return (
        <PageContent>
            <ListHeader title="Settings" />
            <GeneralSettingsContainer>
                <LeftWrapper>
                    <StyledText hasTopMargin={false} textVariant="h4" textWeight="Regular">
                        General Settings
                    </StyledText>
                    <ToggleWrapper>
                        <StyledToggle
                            label="Manager Response Mandatory for Manager Review: "
                            data-testid="toggleManagerReview"
                            disabled={isManagerReviewStart}
                            checked={settingStatus.isManagerReviewMandatory}
                            onClick={() => handleToggleClick('isManagerReviewMandatory')}
                        />
                    </ToggleWrapper>
                    <ToggleWrapper>
                        <StyledToggle
                            label="Employees can submit suggestions Anonymously: "
                            data-testid="toggleAnonymousSuggestion"
                            checked={settingStatus.isAnonymousSuggestionAllowed}
                            onClick={() => handleToggleClick('isAnonymousSuggestionAllowed')}
                        />
                    </ToggleWrapper>
                    <ToggleWrapper>
                        <StyledToggle
                            label="Send Bi-weekly feedback reminders to slack channel: "
                            data-testid="isBiWeeklyFeedbackReminderEnabled"
                            checked={settingStatus.isBiWeeklyFeedbackReminderEnabled}
                            onClick={() => handleToggleClick('isBiWeeklyFeedbackReminderEnabled')}
                        />
                    </ToggleWrapper>
                </LeftWrapper>
                <NoteBox>
                    <TipHeader>
                        <EventNoteIcon iconColor="#000" size="S" />
                        <StyledTipsTitle>Notes</StyledTipsTitle>
                    </TipHeader>
                    <StepsList>
                        <Step>
                            <Text style={{ fontSize: '14px' }}>
                                <strong>Manager Response Mandatory:</strong> When enabled, managers must provide both a review and a rating
                                during the review process. If disabled, only a rating is required during the review process.
                            </Text>
                        </Step>
                        <Step>
                            <Text style={{ fontSize: '14px' }}>
                                <strong>Anonymous Suggestions:</strong> When enabled, employees have the option to submit their
                                suggestions/feedback to Suggestion Box anonymously, ensuring privacy and encouraging open feedback.
                            </Text>
                        </Step>
                        <Step>
                            <Text style={{ fontSize: '14px' }}>
                                <strong>Bi-weekly reminders:</strong> When enabled, reminders will be sent to the integrated slack channel
                                every alternate Monday at 12 pm to share feedback and keep 1:1 conversations active.
                            </Text>
                        </Step>
                        {/* TODO: uncomment after backend changes are deployed */}
                        {/* <Step>
                            <Text style={{ fontSize: '14px' }}>
                                <strong>Bi-weekly reminders:</strong> When enabled, reminders will be sent to the integrated slack channel
                                every alternate Monday at 12 pm to share feedback and keep 1:1 conversations active.
                            </Text>
                        </Step> */}
                    </StepsList>
                </NoteBox>
            </GeneralSettingsContainer>

            <Container>
                <LeftWrapper>
                    <StyledText hasTopMargin={false} textVariant="h4" textWeight="Regular">
                        Allowed Domains
                    </StyledText>
                    {existDomain &&
                        existDomain.length > 0 &&
                        existDomain.map((domain: any, index: number) => {
                            return (
                                <DomainAndDeleteButtonDiv key={domain.id}>
                                    <StyledTextField
                                        disabled={true}
                                        variant="outlined"
                                        name="name"
                                        label="Domain Name"
                                        data-testid="domain"
                                        value={domain.name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, domain.id)}
                                    />
                                    {index !== 0 && hasEditPermission && (
                                        <ClearButton
                                            disabled={domain.isDomainUsed}
                                            title={
                                                domain.isDomainUsed
                                                    ? 'Employees are added from the mentioned domain name. So it cannot be deleted.'
                                                    : ''
                                            }
                                            onClick={() => handleDisableDomain(domain.id)}
                                        >
                                            <DeleteForeverIcon
                                                data-testid="deleteDomainButton"
                                                disabled={domain.isDomainUsed}
                                                iconColor="red"
                                            />
                                        </ClearButton>
                                    )}
                                </DomainAndDeleteButtonDiv>
                            );
                        })}
                    {hasEditPermission &&
                        inputFields &&
                        inputFields.length > 0 &&
                        inputFields.map((input: any) => {
                            return (
                                <DomainAndDeleteButtonDiv key={input.id}>
                                    <StyledTextField
                                        disabled={false}
                                        type="text"
                                        variant="outlined"
                                        name="name"
                                        label="Domain Name"
                                        value={input.name}
                                        onChange={(e: any) => handleInputChange(e, input.id)}
                                        errorText={input.error}
                                        data-testid="inputDomainName"
                                    />

                                    <ClearButton data-testid="clearInput" type="button" onClick={() => handleRemoveField(input.id)}>
                                        <DeleteForeverIcon iconColor="red" />
                                    </ClearButton>
                                </DomainAndDeleteButtonDiv>
                            );
                        })}
                    {hasEditPermission && (
                        <>
                            <AddTeamButtonDiv>
                                <StyledAddDomain textVariant="h4" onClick={handleAddAnotherDomain} textAlign="center">
                                    + Add Domain
                                </StyledAddDomain>
                            </AddTeamButtonDiv>
                        </>
                    )}
                    <StyleButtonWrapper>
                        <Button
                            disabled={buttonDisabled}
                            isLoading={(actionFrom === 'add' && addNewDomainLoading) || updateSettingLoading}
                            variant="solid"
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </StyleButtonWrapper>
                </LeftWrapper>

                <NoteBox>
                    <TipHeader>
                        <EventNoteIcon iconColor="#000" size="S" />
                        <StyledTipsTitle>Notes</StyledTipsTitle>
                    </TipHeader>
                    <Text style={{ paddingTop: '10px', fontSize: '14px' }}>
                        <strong>Allowed Domain: </strong>
                        {NoteMessage}
                    </Text>
                </NoteBox>
            </Container>

            <Modal open={isModalOpen} onCloseModal={() => setModalOpen(false)}>
                <StyledModalHeader>
                    <Text textVariant="h2">Confirm</Text>
                </StyledModalHeader>
                <StyledModalContent>
                    <Text textVariant="body1" textWeight="Medium">
                        Are you sure you want to delete the domain?
                    </Text>
                </StyledModalContent>
                <StyledModalActions>
                    <CancelButton
                        isLoading={actionFrom === 'delete' && addNewDomainLoading}
                        onClick={() => handleRemoveField(deleteId, 'existDomain')}
                        variant="outlined"
                    >
                        Yes
                    </CancelButton>

                    <Button onClick={() => setModalOpen(false)} variant="outlined">
                        No
                    </Button>
                </StyledModalActions>
            </Modal>
        </PageContent>
    );
};
