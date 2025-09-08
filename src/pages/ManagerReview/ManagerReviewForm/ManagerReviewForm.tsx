// The commented out code is to be used later for checking with the unit test changes that would be required.

import { Loader, PageContent } from '@components';
// import Grid from '@components/layout/Grid';
import ListHeader from '@components/reusableComponents/ListHeader';
import { defaultTheme } from '@theme/index';
import { ReviewContentEditor } from '@components/reusableComponents/ReviewContentEditor/ReviewContentEditor';
import { routeConstants } from '@constants';
import { reviewRatingOptions } from '@constants/data';
import { Button, Modal, Text } from '@medly-components/core';
import { FlexBoxColumn } from '@pages/FeedbackForm/FeedbackForm.styled';
import DOMPurify from 'dompurify';
import { FC, FormEvent } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Navigate } from 'react-router-dom';
import {
    // AccordionContent,
    // AccordionHeader,
    // ButtonSection,
    CancelButton,
    KPIWrapper,
    // KpiAccordion,
    KpiDescriptionContainer,
    ReviewToDiv,
    MessageContainer,
    ReviewInputContainer,
    EditorContainer,
    NavigationContainer,
    KpiNavigtionButton,
    FlexRow,
    StyledReviewLabel
} from './ManagerReviewForm.styled';
import { StyledModalHeader, StyledModalContent, StyledModalActions, StyledModalTitle } from '@common';
import { CachedIcon } from '@medly-components/icons';
import { useManagerReviewForm } from './useManagerReviewForm';
import { ContentWrapper, TimelineContentWrapper } from '@pages/ReviewTimeline/ReviewTimeline.styled';
import TimelineIcon from '@components/reusableComponents/TimelineIcon';

export const ManagerReviewForm: FC = () => {
    const {
        kpiDataSorted,
        action,
        isLoading,
        isSubmitting,
        handleInputChange,
        handleSend,
        openModal,
        handleCancel,
        toggleModal,
        isSubmitDisabled,
        // isDraftDisabled,
        autoSaveLoading,
        showSuccessMessage,
        clickedOnCancel,
        navigateToTeamFeedback,
        feedbackModal,
        prompt,
        firstName,
        lastName,
        reviewToEmployeeId,
        path,
        managerFirstName,
        managerLastName,
        reviewFromEmployeeId,
        managerResponse,
        // navigateTo,
        reviewCycle,
        // isMakingChanges,
        groupedKpis,
        handleSelectKpi,
        isActiveKpi,
        isPrevDisabled,
        isNextDisabled,
        activeKpi,
        activeKpiIndex,
        hanldeKpiChange,
        handleGetKpiReviewStatus,
        handleNavigation,
        handleRetry,
        loadingPopup
    } = useManagerReviewForm();

    if (isLoading) return <Loader />;
    if (!isLoading && !action)
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
                title={`${action} ${path.includes(routeConstants.myManagerReview) ? 'My Manager Review' : 'Review for Team Member'}`}
                actionButtonLabel="View Team's Feedback"
                actionButtonVariant="flat"
                actionButtonClick={handleNavigation}
                moduleTitle="Manager Review"
            />
            <FlexBoxColumn>
                <StyledReviewLabel>
                    Review Cycle: <Text>{reviewCycle}</Text>
                </StyledReviewLabel>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <ReviewToDiv>
                        {path.includes(routeConstants.myManagerReview) ? (
                            <StyledReviewLabel>
                                Manager:{' '}
                                <Text textVariant="body1">
                                    {managerFirstName} {managerLastName} ({reviewFromEmployeeId})
                                </Text>
                            </StyledReviewLabel>
                        ) : (
                            <StyledReviewLabel>
                                Team Member:{' '}
                                <Text textVariant="body1">
                                    {firstName} {lastName} ({reviewToEmployeeId})
                                </Text>
                            </StyledReviewLabel>
                        )}
                    </ReviewToDiv>
                </div>
            </FlexBoxColumn>

            <ReviewToDiv />

            {kpiDataSorted.length === 0 && (
                <MessageContainer>
                    <Text textVariant="body1">No KPI added for the employee</Text>
                </MessageContainer>
            )}

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
                                        <TimelineContentWrapper onClick={() => handleSelectKpi(kpi)} style={{ cursor: 'pointer' }}>
                                            <Text
                                                textVariant="body2"
                                                style={{ fontSize: '14px' }}
                                                textWeight={isActiveKpi(kpi) ? 'Strong' : 'Regular'}
                                                textColor={isActiveKpi(kpi) ? defaultTheme.colors.blue[500] : defaultTheme.colors.grey[700]}
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

                            <EditorContainer key={kpiDataSorted[activeKpiIndex]?.id}>
                                <ReviewContentEditor
                                    id={kpiDataSorted[activeKpiIndex]?.id}
                                    action={action}
                                    richTextValue={kpiDataSorted[activeKpiIndex]?.response}
                                    richTextError={kpiDataSorted[activeKpiIndex]?.responseError}
                                    ratingOptions={reviewRatingOptions}
                                    rating={kpiDataSorted[activeKpiIndex]?.rating}
                                    ratingError={kpiDataSorted[activeKpiIndex]?.ratingError}
                                    handleInputChange={handleInputChange}
                                    ratingLabel="Manager Rating"
                                    reviewPlaceholder={managerResponse ? 'Manager Response' : 'Manager Response (Optional)'}
                                    isOptional={!managerResponse}
                                    ratingPlaceholder="Please choose a rating"
                                    useBlur
                                />
                            </EditorContainer>
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
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                                <Button data-testid="submitBtn" disabled={isSubmitDisabled} onClick={() => toggleModal('View')}>
                                    Submit
                                </Button>
                            </div>
                        )}
                    </KPIWrapper>
                )}
            </ContentWrapper>
            {/* <KPIWrapper>
                {kpiDataSorted.map((kpi, index) => (
                    <KpiAccordion key={kpi.id} defaultActive={index === 0} hasError={kpi.ratingError !== '' || kpi.responseError !== ''}>
                        <AccordionHeader>
                            <Text textVariant="body1">{kpi.title}</Text>
                        </AccordionHeader>
                        <AccordionContent>
                            <Grid row={true} expanded marginBottom={1}>
                                <Grid column={true} md={6} direction="column-direction" marginTop={1}>
                                    <StyledReviewLabel>
                                        Description:{' '}
                                    </StyledReviewLabel>
                                    <KpiDescriptionContainer dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(kpi.description) }} />
                                </Grid>
                                <Grid column={true} md={6} marginTop={1} direction="column-direction" justify="center" alignItems="center">
                                    <ReviewContentEditor
                                        id={kpi.id}
                                        action={action}
                                        richTextValue={kpi.response}
                                        richTextError={kpi.responseError}
                                        ratingOptions={reviewRatingOptions}
                                        rating={kpi.rating}
                                        ratingError={kpi.ratingError}
                                        handleInputChange={handleInputChange}
                                        ratingLabel="Manager Rating"
                                        ratingPlaceholder="Please choose a rating"
                                        reviewPlaceholder={managerResponse ? 'Manager Response' : 'Manager Response (Optional)'}
                                        isOptional={!managerResponse}
                                        useBlur
                                    />
                                </Grid>
                            </Grid>
                        </AccordionContent>
                    </KpiAccordion>
                ))}
                {action !== 'View' && (
                    <ButtonSection>
                        <CancelButton
                            data-testid="cancelBtn"
                            variant="outlined"
                            color="red"
                            onClick={() => (kpiDataSorted.length > 0 ? toggleModal('cancel') : navigateTo(-1))}
                        >
                            Cancel
                        </CancelButton>
                        {kpiDataSorted.length !== 0 && (
                            <>
                                <Button
                                    variant="outlined"
                                    disabled={isDraftDisabled || isMakingChanges}
                                    isLoading={isSubmitting && !openModal}
                                    onClick={e => handleSend(e, true)}
                                    data-testId="draftBtn"
                                >
                                    Save as Draft
                                </Button>
                                <Button disabled={isSubmitDisabled} onClick={() => toggleModal('')} data-testId="submitBtn">
                                    Submit
                                </Button>
                            </>
                        )}
                    </ButtonSection>
                )}
            </KPIWrapper> */}

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
                            : action !== 'View' && feedbackModal && prompt
                            ? 'Any unsaved changes will be lost.'
                            : 'Are you sure you wish to submit? Once submitted, the review can not be edited.'}
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
                                    : (e: FormEvent) => handleSend(e, false)
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
