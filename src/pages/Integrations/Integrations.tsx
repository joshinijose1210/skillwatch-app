import { PageContent } from '@components/layout';
import { ListHeader } from '@components/reusableComponents/ListHeader/ListHeader';
import slack from '@constants/images/logos/slack.png';
import { Button, Modal, Text } from '@medly-components/core';
import { SlackImage } from '@pages/Configuration/Configuration.styled';
import { CancelButton } from '@pages/SelfReview/SelfReviewForm/SelfReviewForm.styled';
import { FC, memo } from 'react';
import * as Styled from './Integrations.styled';
import { useIntegration } from './useIntegration';
import { Loader } from '@components';
import { StyledModalHeader, StyledModalContent, StyledModalActions, StyledModalTitle } from '@common';

export const Integrations: FC = memo(() => {
    const { handleButtonClick, isLoading, isConnected, slackLogoutLoading, isModalOpen, onCloseModal, confirmRemoveSlack, actionToShow } =
        useIntegration();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <PageContent>
            <ListHeader title="Integrations" />
            <Styled.IntegrationAccordian defaultActive={true}>
                <Styled.AccordionHeader>
                    <Styled.SlackLogo src={slack} alt="slack-image" />
                    <Styled.HeaderWrapper>
                        <Styled.Header textVariant="h3" textWeight="Medium">
                            Slack
                        </Styled.Header>
                        <Styled.SlackText textVariant="h4" textWeight="Regular">
                            Get Instant Feedback Alerts on Slack with Our integration! Stay on Top of Performance Reviews and Enhance Team
                            Collaboration
                        </Styled.SlackText>
                    </Styled.HeaderWrapper>
                </Styled.AccordionHeader>
                <Styled.AccordionContent>
                    <Styled.BulletsHeader textVariant="h4" textWeight="Regular">
                        Features:
                    </Styled.BulletsHeader>
                    <Styled.BulletsWrapper>
                        <Styled.Bullets>
                            <Text textVariant="h4" textWeight="Regular">
                                Send Feedback, receive feedback and request for feedback from your team members
                            </Text>
                        </Styled.Bullets>
                        <Styled.Bullets>
                            <Text textVariant="h4" textWeight="Regular">
                                You will be notified and reminded about the timeline of performance review cycles
                            </Text>
                        </Styled.Bullets>
                        <Styled.Bullets>
                            <Text textVariant="h4" textWeight="Regular">
                                You will be reminded about your goals and deadline to achieve it
                            </Text>
                        </Styled.Bullets>
                        <Styled.Bullets>
                            <Text textVariant="h4" textWeight="Regular">
                                Connect a channel in which you would like to receive all your employee appreciation
                            </Text>
                        </Styled.Bullets>
                    </Styled.BulletsWrapper>
                    <Styled.BulletsHeader textVariant="h4" textWeight="Regular">
                        Slack commands to be used:
                    </Styled.BulletsHeader>
                    <Styled.BulletsWrapper>
                        <Styled.Bullets>
                            <Text textVariant="h4" textWeight="Regular">
                                /add-feedback
                            </Text>
                        </Styled.Bullets>
                        <Styled.Bullets>
                            <Text textVariant="h4" textWeight="Regular">
                                /edit-feedback
                            </Text>
                        </Styled.Bullets>
                        <Styled.Bullets>
                            <Text textVariant="h4" textWeight="Regular">
                                /request-feedback
                            </Text>
                        </Styled.Bullets>
                    </Styled.BulletsWrapper>
                    <Button
                        variant="outlined"
                        onClick={handleButtonClick}
                        isLoading={slackLogoutLoading}
                        disabled={actionToShow === 'View'}
                    >
                        <SlackImage src={slack} alt="slack-image" />
                        {isConnected ? 'Disconnect' : 'Connect Slack'}
                    </Button>
                </Styled.AccordionContent>
            </Styled.IntegrationAccordian>
            <Modal open={isModalOpen} onCloseModal={onCloseModal}>
                <StyledModalHeader>
                    <StyledModalTitle textVariant="h2">Confirm</StyledModalTitle>
                </StyledModalHeader>
                <StyledModalContent>
                    <Text textVariant="body1" textWeight="Medium">
                        {'Are you sure you want to disconnect Slack?'}
                    </Text>
                </StyledModalContent>
                <StyledModalActions>
                    <CancelButton isLoading={slackLogoutLoading} onClick={confirmRemoveSlack} variant="outlined">
                        Yes
                    </CancelButton>
                    <Button onClick={onCloseModal} variant="outlined">
                        No
                    </Button>
                </StyledModalActions>
            </Modal>
        </PageContent>
    );
});

Integrations.displayName = 'Integrations';
