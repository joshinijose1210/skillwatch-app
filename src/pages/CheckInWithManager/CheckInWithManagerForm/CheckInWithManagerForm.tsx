import { StyledModalHeader, StyledModalContent, StyledModalActions, StyledModalTitle } from '@common';
import { Loader, PageContent, ReviewAccordion } from '@components';

import ListHeader from '@components/reusableComponents/ListHeader';
import ReviewContentEditor from '@components/reusableComponents/ReviewContentEditor';
import { routeConstants } from '@constants';
import { reviewRatingOptions } from '@constants/data';
import { Button, Modal, Text } from '@medly-components/core';
import { CachedIcon } from '@medly-components/icons';

import TimelineIcon from '@components/reusableComponents/TimelineIcon';
import { FlexBoxColumn } from '@pages/FeedbackForm/FeedbackForm.styled';
import { ReviewToDiv, StyledReviewLabel } from '@pages/ManagerReview/ManagerReviewForm/ManagerReviewForm.styled';
import DOMPurify from 'dompurify';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import {
    CancelButton,
    EditorContainer,
    ErrorDiv,
    FlexRow,
    KPIElement,
    KPIWrapper,
    KpiDescriptionContainer,
    KpiNavigtionButton,
    NavigationContainer,
    ReviewInputContainer
} from './CheckInWithManagerForm.styled';
import { useCheckInWithManagerForm } from './useCheckInWithManagerForm';
import { defaultTheme } from '@theme';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { ContentWrapper, TimelineContentWrapper } from '@pages/ReviewTimeline/ReviewTimeline.styled';
import 'react-vertical-timeline-component/style.min.css';

export const CheckInWithManagerForm: FC = () => {
    const {
        action,
        kpiDataSorted,
        isLoading,
        reviewCycleInfo,
        isSubmitting,
        handleInputChange,
        handleSend,
        openModal,
        handleCancel,
        toggleModal,
        clickedOnCancel,
        isSubmitDisabled,
        navigateToTeamFeedback,
        isDraftDisabled,
        proceed,
        // actionItems,
        // isLoadingActionItems,
        feedbackModal,
        prompt,
        path,
        firstName,
        lastName,
        reviewToEmployeeId,
        firstManagerFirstName,
        firstManagerLastName,
        firstManagerEmployeeId,
        secondManagerFirstName,
        secondManagerLastName,
        secondManagerEmployeeId,
        groupedKpis,
        activeKpi,
        activeKpiIndex,
        handleSelectKpi,
        hanldeKpiChange,
        isPrevDisabled,
        isNextDisabled,
        isActiveKpi,
        showSuccessMessage,
        autoSaveLoading,
        handleGetKpiReviewStatus,
        handleNavigation,
        handlePreviousGoalsNavigation,
        handleRetry,
        loadingPopup
    } = useCheckInWithManagerForm();
    const kpi = kpiDataSorted[activeKpiIndex];

    if (isLoading) return <Loader />;
    else if (!isLoading && !action)
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

    return (
        <PageContent>
            <ListHeader
                title={
                    <>
                        {action}{' '}
                        {path.includes(routeConstants.myCheckInWithManager)
                            ? 'My Check-in with Manager'
                            : path.includes(routeConstants.checkInWithTeamMember)
                            ? 'Check-in with Team Member'
                            : 'Check-in with Manager'}
                        {}
                    </>
                }
                secondButtonLabel="View Team's Feedback"
                actionButtonLabel="View Previous Goals"
                secondButtonVariant="outlined"
                actionButtonVariant="outlined"
                actionButtonClick={handlePreviousGoalsNavigation}
                secondButtonClick={handleNavigation}
                moduleTitle="Check-in with Team Members"
            />

            <FlexBoxColumn>
                <StyledReviewLabel>
                    Review Cycle: <Text textVariant="body1">{reviewCycleInfo.name}</Text>
                </StyledReviewLabel>
                <ReviewToDiv>
                    {path.includes(routeConstants.myCheckInWithManager) ? (
                        <FlexBoxColumn>
                            <StyledReviewLabel>
                                Manager 1:{' '}
                                <Text textVariant="body1">
                                    {firstManagerFirstName} {firstManagerLastName} ({firstManagerEmployeeId})
                                </Text>
                            </StyledReviewLabel>
                            {secondManagerFirstName && (
                                <StyledReviewLabel>
                                    Manager 2:{' '}
                                    <Text textVariant="body1">
                                        {secondManagerFirstName} {secondManagerLastName} ({secondManagerEmployeeId})
                                    </Text>
                                </StyledReviewLabel>
                            )}
                        </FlexBoxColumn>
                    ) : path.includes(routeConstants.checkInWithTeamMember) ? (
                        <FlexBoxColumn>
                            <StyledReviewLabel>
                                Team Member:{' '}
                                <Text textVariant="body1">
                                    {firstName} {lastName} ({reviewToEmployeeId})
                                </Text>
                            </StyledReviewLabel>
                        </FlexBoxColumn>
                    ) : (
                        <FlexBoxColumn>
                            <StyledReviewLabel>
                                Manager 1:{' '}
                                <Text textVariant="body1">
                                    {firstManagerFirstName} {firstManagerLastName} ({firstManagerEmployeeId})
                                </Text>
                            </StyledReviewLabel>
                            {secondManagerFirstName && (
                                <StyledReviewLabel>
                                    Manager 2:{' '}
                                    <Text textVariant="body1">
                                        {secondManagerFirstName} {secondManagerLastName} ({secondManagerEmployeeId})
                                    </Text>
                                </StyledReviewLabel>
                            )}
                            <StyledReviewLabel>
                                Team Member:{' '}
                                <Text textVariant="body1">
                                    {firstName} {lastName} ({reviewToEmployeeId})
                                </Text>
                            </StyledReviewLabel>
                        </FlexBoxColumn>
                    )}
                </ReviewToDiv>
            </FlexBoxColumn>
            {reviewCycleInfo.reviewCycleId ? (
                <ContentWrapper isSticky={true} style={{ marginTop: '4rem' }}>
                    <div style={{ width: '50%' }}>
                        <VerticalTimeline layout="1-column" lineColor={defaultTheme.colors.blue[200]}>
                            {Object.entries(groupedKpis).map(([k, v]: [string, string[]], index) => (
                                <div key={index}>
                                    {k !== 'undefined' && (
                                        <VerticalTimelineElement
                                            icon={<TimelineIcon state={'active'} number={index + 1} />}
                                            iconStyle={{ boxShadow: 'none' }}
                                            contentStyle={{ boxShadow: 'none', padding: '0' }}
                                        >
                                            <TimelineContentWrapper>
                                                <Text textVariant="h4">{k}</Text>
                                            </TimelineContentWrapper>
                                        </VerticalTimelineElement>
                                    )}
                                    {v?.map((kpi: string) => (
                                        <VerticalTimelineElement
                                            icon={<TimelineIcon state={handleGetKpiReviewStatus(kpi)} isSubTask={true} />}
                                            iconStyle={{ boxShadow: 'none', width: '30px', height: '30px', top: '-16px', left: '5px' }}
                                            contentStyle={{ boxShadow: 'none', padding: '0', top: '-20px', height: '20px' }}
                                            key={kpi}
                                        >
                                            <TimelineContentWrapper
                                                onClick={() => handleSelectKpi(kpi)}
                                                style={{
                                                    cursor: 'pointer',
                                                    color: isActiveKpi(kpi) ? defaultTheme.colors.blue[500] : 'inherit'
                                                }}
                                            >
                                                <Text
                                                    style={{ fontSize: '14px' }}
                                                    textVariant="body2"
                                                    textWeight={isActiveKpi(kpi) ? 'Strong' : 'Regular'}
                                                >
                                                    {kpi}
                                                </Text>
                                            </TimelineContentWrapper>
                                        </VerticalTimelineElement>
                                    ))}
                                </div>
                            ))}
                        </VerticalTimeline>
                    </div>
                    {activeKpi && (
                        <KPIWrapper>
                            <ReviewInputContainer>
                                <Text textVariant="h4" textWeight="Regular">
                                    {kpiDataSorted[activeKpiIndex]?.title}
                                </Text>
                                <KpiDescriptionContainer
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(kpiDataSorted[activeKpiIndex]?.description) }}
                                />
                                <KPIElement>
                                    <ReviewAccordion type="self" response={kpi.response} rating={parseInt(kpi?.rating)} />
                                </KPIElement>
                                {kpi?.manager1Rating && (
                                    <KPIElement>
                                        <ReviewAccordion
                                            type="manager1"
                                            response={kpi?.manager1Response || ''}
                                            rating={parseInt(kpi.manager1Rating)}
                                        />
                                    </KPIElement>
                                )}
                                {kpi?.manager2Rating && (
                                    <KPIElement>
                                        <ReviewAccordion
                                            type="manager2"
                                            response={kpi?.manager2Response || ''}
                                            rating={parseInt(kpi.manager2Rating)}
                                        />
                                    </KPIElement>
                                )}
                                {action === 'View' && kpi?.checkInRating ? (
                                    <KPIElement>
                                        <ReviewAccordion
                                            type="checkin"
                                            response={kpi?.checkInResponse || ''}
                                            rating={parseInt(kpi.checkInRating)}
                                        />
                                    </KPIElement>
                                ) : (
                                    <EditorContainer key={kpiDataSorted[activeKpiIndex]?.id}>
                                        <ReviewContentEditor
                                            id={kpiDataSorted[activeKpiIndex]?.id}
                                            action={action}
                                            richTextValue={kpiDataSorted[activeKpiIndex]?.checkInResponse || ''}
                                            richTextError={kpiDataSorted[activeKpiIndex]?.responseError}
                                            ratingOptions={reviewRatingOptions}
                                            rating={kpiDataSorted[activeKpiIndex]?.checkInRating}
                                            ratingError={kpiDataSorted[activeKpiIndex]?.ratingError}
                                            handleInputChange={handleInputChange}
                                            ratingLabel="Check-in rating"
                                            ratingPlaceholder="Please choose a rating"
                                            useBlur
                                            reviewPlaceholder="Check-in response (Optional)"
                                            isOptional={true}
                                        />
                                    </EditorContainer>
                                )}
                            </ReviewInputContainer>
                            <NavigationContainer>
                                <FlexRow gap={16}>
                                    <KpiNavigtionButton disabled={isPrevDisabled} onClick={() => hanldeKpiChange('prev')}>
                                        {'<'}&nbsp;Previous
                                    </KpiNavigtionButton>
                                    <KpiNavigtionButton disabled={isNextDisabled} onClick={() => hanldeKpiChange('next')}>
                                        Next&nbsp;{'>'}
                                    </KpiNavigtionButton>
                                </FlexRow>

                                {(autoSaveLoading || showSuccessMessage) && (
                                    <FlexRow gap={4}>
                                        <CachedIcon color={defaultTheme.colors.grey[500]} />
                                        <Text textVariant="body2" textColor={defaultTheme.colors.grey[500]}>
                                            {autoSaveLoading && 'Saving...'}
                                            {!autoSaveLoading && showSuccessMessage && 'Saved to SkillWatch'}
                                        </Text>
                                    </FlexRow>
                                )}
                            </NavigationContainer>
                            {action !== 'View' && (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignContent: 'flex-start',
                                        justifyContent: 'flex-end',
                                        marginTop: '2rem'
                                    }}
                                >
                                    <Button data-testid="submitBtn" disabled={isSubmitDisabled} isLoading={proceed} onClick={handleSend}>
                                        Submit and Proceed to Goals
                                    </Button>
                                </div>
                            )}
                        </KPIWrapper>
                    )}
                </ContentWrapper>
            ) : (
                <ErrorDiv>
                    <Text textVariant="h3">{reviewCycleInfo.message}</Text>
                </ErrorDiv>
            )}

            <Modal open={openModal} onCloseModal={() => toggleModal('')}>
                <StyledModalHeader>
                    <StyledModalTitle textVariant="h2">{loadingPopup ? `Auto-save in progress` : `Confirm`}</StyledModalTitle>
                </StyledModalHeader>
                <StyledModalContent>
                    <StyledReviewLabel>
                        {clickedOnCancel
                            ? 'Are you sure you wish to cancel?'
                            : loadingPopup
                            ? 'Please wait for auto-save to complete to prevent data loss and view feedback.'
                            : action !== 'View' && feedbackModal && prompt && 'Any unsaved changes will be lost.'}
                    </StyledReviewLabel>
                </StyledModalContent>
                <StyledModalActions>
                    {!loadingPopup && (
                        <CancelButton
                            isLoading={isSubmitting}
                            variant="outlined"
                            data-testid="modal-yes"
                            onClick={
                                clickedOnCancel
                                    ? handleCancel
                                    : action !== 'View' && feedbackModal && prompt
                                    ? navigateToTeamFeedback
                                    : () => {
                                          return;
                                      }
                            }
                        >
                            Yes
                        </CancelButton>
                    )}
                    <Button
                        data-testid="modal-no"
                        isLoading={autoSaveLoading}
                        onClick={() => (loadingPopup ? handleRetry() : toggleModal(''))}
                        variant="outlined"
                    >
                        {loadingPopup ? 'Retry' : 'No'}
                    </Button>
                </StyledModalActions>
            </Modal>
        </PageContent>
    );
};
