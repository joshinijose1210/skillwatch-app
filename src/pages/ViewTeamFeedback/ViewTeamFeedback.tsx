import { FromText } from '@common';
import { Loader, PageContent } from '@components';
import Grid from '@components/layout/Grid';
import ListHeader from '@components/reusableComponents/ListHeader';
import { Tabs, Text } from '@medly-components/core';
import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import { FC } from 'react';
import { useViewTeamFeedback } from './useViewTeamFeedback';
import { Feedback, FeedbackWrapper, StyledDate, StyledTabs } from './ViewTeamFeedback.styled';

export const ViewTeamFeedback: FC = () => {
    const { isLoading, state, handleBackClick, onChangeHandle, feedbackData } = useViewTeamFeedback();
    return (
        <PageContent>
            <ListHeader
                title={
                    <>
                        Team&apos;s Feedback{' '}
                        <Text style={{ fontSize: '14px' }} textVariant="body1" textWeight="Medium">
                            ({state.reviewCycle})
                        </Text>
                    </>
                }
                actionButtonVariant="flat"
                actionButtonLabel={'Go Back'}
                actionButtonClick={handleBackClick}
                moduleTitle="Manager Review"
            />

            <StyledTabs data-testid="tabs" id="feedback-tabs" variant="outlined" onChange={onChangeHandle}>
                <Tabs.Tab id="positive" label="Positive" count={feedbackData.positiveFeedbackCount}>
                    {isLoading ? (
                        <Loader />
                    ) : feedbackData.totalFeedbacks > 0 ? (
                        feedbackData.feedbacks &&
                        feedbackData.feedbacks.map((feedback, index: number) => (
                            <FeedbackWrapper key={index}>
                                <Text textVariant="body2" textWeight="Medium">
                                    {index + 1}.
                                </Text>
                                <Grid column direction="column-direction" customClasses="team-feedback">
                                    <Feedback dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(feedback.feedback) }} />
                                    <FromText textVariant="h5">
                                        &#8211;{' '}
                                        {feedback.isExternalFeedback
                                            ? feedback.externalFeedbackFromEmailId
                                            : `${feedback.feedbackFromFirstName} ${feedback.feedbackFromLastName} (
                                                ${feedback.feedbackFromEmployeeId})`}
                                    </FromText>
                                    <StyledDate textVariant="h5">{format(new Date(feedback.submitDate), 'dd/MM/yyyy')}</StyledDate>
                                </Grid>
                            </FeedbackWrapper>
                        ))
                    ) : (
                        <Text textVariant="body2" textAlign="center">
                            No feedbacks.
                        </Text>
                    )}
                </Tabs.Tab>
                <Tabs.Tab id="improvement" label="Improvement" count={feedbackData.improvementFeedbackCount}>
                    {isLoading ? (
                        <Loader />
                    ) : feedbackData.totalFeedbacks > 0 ? (
                        feedbackData.feedbacks &&
                        feedbackData.feedbacks.map((feedback, index: number) => (
                            <FeedbackWrapper key={index}>
                                <Text textVariant="body2" textWeight="Medium">
                                    {index + 1}.
                                </Text>
                                <Grid column direction="column-direction" customClasses="team-feedback">
                                    <Feedback dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(feedback.feedback) }} />
                                    <FromText textVariant="h5">
                                        &#8211;{' '}
                                        {feedback.isExternalFeedback
                                            ? feedback.externalFeedbackFromEmailId
                                            : `${feedback.feedbackFromFirstName} ${feedback.feedbackFromLastName} (
                                                ${feedback.feedbackFromEmployeeId})`}
                                    </FromText>
                                    <StyledDate textVariant="h5">{format(new Date(feedback.submitDate), 'dd/MM/yyyy')}</StyledDate>
                                </Grid>
                            </FeedbackWrapper>
                        ))
                    ) : (
                        <Text textVariant="body2" textAlign="center">
                            No feedbacks.
                        </Text>
                    )}
                </Tabs.Tab>
                <Tabs.Tab id="appreciation" label="Appreciation" count={feedbackData.appreciationFeedbackCount}>
                    {isLoading ? (
                        <Loader />
                    ) : feedbackData.totalFeedbacks > 0 ? (
                        feedbackData.feedbacks &&
                        feedbackData.feedbacks.map((feedback, index: number) => (
                            <FeedbackWrapper key={index}>
                                <Text textVariant="body2" textWeight="Medium">
                                    {index + 1}.
                                </Text>
                                <Grid column direction="column-direction" customClasses="team-feedback">
                                    <Feedback dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(feedback?.appreciation || '') }} />
                                    <FromText textVariant="h5">
                                        &#8211;{' '}
                                        {feedback.isExternalFeedback
                                            ? feedback.externalFeedbackFromEmailId
                                            : `${feedback.appreciationFromFirstName} ${feedback.appreciationFromLastName} (
                                                ${feedback.appreciationFromEmployeeId})`}
                                    </FromText>
                                    <StyledDate textVariant="h5">{format(new Date(feedback.submitDate), 'dd/MM/yyyy')}</StyledDate>
                                </Grid>
                            </FeedbackWrapper>
                        ))
                    ) : (
                        <Text textVariant="body2" textAlign="center">
                            No feedbacks.
                        </Text>
                    )}
                </Tabs.Tab>
            </StyledTabs>
        </PageContent>
    );
};
