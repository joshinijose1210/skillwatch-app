// The commented out code is to be used later for checking with the unit test changes that would be required.
import { Loader, PageContent } from '@components';
// import Grid from '@components/layout/Grid';
import { defaultTheme } from '@theme/index';
import ListHeader from '@components/reusableComponents/ListHeader';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import ReviewContentEditor from '@components/reusableComponents/ReviewContentEditor';
import { routeConstants } from '@constants';
import { reviewRatingOptions } from '@constants/data';
import { Button, Modal, Text } from '@medly-components/core';
import { CachedIcon } from '@medly-components/icons';
// import { ReviewToDiv } from '@pages/ManagerReview/ManagerReviewForm/ManagerReviewForm.styled';
import DOMPurify from 'dompurify';
import { FC, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import {
    // AccordionContent,
    // AccordionHeader,
    // ButtonSection,
    CancelButton,
    // KpiAccordion,
    KpiDescriptionContainer,
    KPIWrapper,
    MessageContainer,
    ReviewInputContainer,
    EditorContainer,
    NavigationContainer,
    KpiNavigtionButton,
    FlexRow
} from './SelfReviewForm.styled';
import { useSelfReviewForm } from './useSelfReviewForm';
import { ContentWrapper, TimelineContentWrapper } from '@pages/ReviewTimeline/ReviewTimeline.styled';
import TimelineIcon from '@components/reusableComponents/TimelineIcon';
import { StyledModalHeader, StyledModalContent, StyledModalActions, StyledModalTitle } from '@common';

export const SelfReviewForm: FC = () => {
    const {
        action,
        kpiDataSorted,
        isLoading,
        // reviewCycleInfo,
        isSubmitting,
        handleInputChange,
        handleSend,
        openModal,
        handleCancel,
        toggleModal,
        clickedOnCancel,
        isSubmitDisabled,
        autoSaveLoading,
        showSuccessMessage,
        navigateToTeamFeedback,
        // isDraftDisabled,
        // isMakingChanges,
        feedbackModal,
        prompt,
        groupedKpis,
        handleSelectKpi,
        isActiveKpi,
        isPrevDisabled,
        isNextDisabled,
        activeKpi,
        activeKpiIndex,
        hanldeKpiChange,
        handleGetKpiReviewStatus,
        today,
        reviewTimeLineData,
        handleNavigation,
        handleRetry,
        loadingPopup
    } = useSelfReviewForm();

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
            {reviewTimeLineData[0] && reviewTimeLineData[0]?.isSelfReviewActive ? (
                <ListHeader
                    title={`${action} Self Review`}
                    actionButtonLabel="View Team's Feedback"
                    actionButtonVariant="flat"
                    actionButtonClick={handleNavigation}
                    moduleTitle="Self Review"
                />
            ) : (
                <ListHeader title={'KPI Details'} moduleTitle="Self Review" />
            )}

            <ContentWrapper style={{ marginTop: '4rem' }} isSticky={true}>
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

                            {reviewTimeLineData[0] && reviewTimeLineData[0]?.isSelfReviewActive === false ? (
                                <></>
                            ) : (
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
                                        ratingLabel="Self Rating"
                                        reviewPlaceholder="Self Response"
                                        ratingPlaceholder="Please choose a rating"
                                        useBlur
                                    />
                                </EditorContainer>
                            )}
                        </ReviewInputContainer>

                        {/* <KpiAccordion
                            data-testid={`accordion-${activeKpi.id}`}
                            defaultActive={true}
                            key={activeKpi.id}
                            hasError={activeKpi.ratingError !== '' || activeKpi.responseError !== ''}
                        >
                            <AccordionHeader>
                                <Text textVariant="body1">{activeKpi.title}</Text>
                            </AccordionHeader>
                            <AccordionContent>
                                <Grid row={true} expanded marginBottom={1}>
                                    <Grid column={true} md={6} direction="column-direction" marginTop={1}>
                                        <Text textVariant="body1" textWeight="Medium">
                                            Description:{' '}
                                        </Text>
                                        <KpiDescriptionContainer
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(activeKpi.description) }}
                                        />
                                    </Grid>
                                    <Grid
                                        column={true}
                                        md={6}
                                        marginTop={1}
                                        direction="column-direction"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <ReviewContentEditor
                                            id={activeKpi.id}
                                            action={action}
                                            richTextValue={activeKpi.response}
                                            richTextError={activeKpi.responseError}
                                            ratingOptions={reviewRatingOptions}
                                            rating={activeKpi.rating}
                                            ratingError={activeKpi.ratingError}
                                            handleInputChange={handleInputChange}
                                            ratingLabel="Self Rating"
                                            reviewPlaceholder="Self Response"
                                            ratingPlaceholder="Please choose a rating"
                                            useBlur
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionContent>
                        </KpiAccordion> */}

                        {/* {kpiDataSorted.map((kpi, index) => (
                        <KpiAccordion
                            data-testid={`accordion-${index}`}
                            defaultActive={index === 0}
                            key={kpi.id}
                            hasError={kpi.ratingError !== '' || kpi.responseError !== ''}
                        >
                            <AccordionHeader>
                                <Text textVariant="body1">{kpi.title}</Text>
                            </AccordionHeader>
                            <AccordionContent>
                                <Grid row={true} expanded marginBottom={1}>
                                    <Grid column={true} md={6} direction="column-direction" marginTop={1}>
                                        <Text textVariant="body1" textWeight="Medium">
                                            Description:{' '}
                                        </Text>
                                        <KpiDescriptionContainer
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(kpi.description) }}
                                        />
                                    </Grid>
                                    <Grid
                                        column={true}
                                        md={6}
                                        marginTop={1}
                                        direction="column-direction"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <ReviewContentEditor
                                            id={kpi.id}
                                            action={action}
                                            richTextValue={kpi.response}
                                            richTextError={kpi.responseError}
                                            ratingOptions={reviewRatingOptions}
                                            rating={kpi.rating}
                                            ratingError={kpi.ratingError}
                                            handleInputChange={handleInputChange}
                                            ratingLabel="Self Rating"
                                            reviewPlaceholder="Self Response"
                                            ratingPlaceholder="Please choose a rating"
                                            useBlur
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionContent>
                        </KpiAccordion>
                    ))} */}

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
                                {reviewTimeLineData[0] && reviewTimeLineData[0]?.isSelfReviewActive === false ? (
                                    <></>
                                ) : (
                                    <Button data-testid="submitBtn" disabled={isSubmitDisabled} onClick={() => toggleModal('View')}>
                                        Submit
                                    </Button>
                                )}
                            </div>
                        )}
                    </KPIWrapper>
                )}
            </ContentWrapper>

            {/* {action !== 'View' && activeKpi && (
                <ButtonSection style={{ marginTop: '4rem' }}>
                    <CancelButton data-testid="cancelBtn" variant="outlined" color="red" onClick={() => toggleModal('cancel')}>
                        Cancel
                    </CancelButton>
                    {kpiDataSorted?.length > 0 && (
                        <>
                            <Button
                                variant="outlined"
                                disabled={isDraftDisabled || isMakingChanges}
                                isLoading={isSubmitting && !openModal}
                                onClick={e => handleSend(e, true)}
                                data-testid="draftBtn"
                            >
                                Save as Draft
                            </Button>
                            <Button data-testid="submitBtn" disabled={isSubmitDisabled} onClick={() => toggleModal('View')}>
                                Submit
                            </Button>
                        </>
                    )}
                </ButtonSection>
            )} */}

            {/* <ReviewToDiv>
                <Text textVariant="body1" textWeight="Medium">
                    Review Cycle: <Text textVariant="body1">{reviewCycleInfo.name}</Text>
                </Text>
            </ReviewToDiv> */}

            {kpiDataSorted.length === 0 && (
                <MessageContainer>
                    <Text textVariant="body1">No KPI added for the employee</Text>
                </MessageContainer>
            )}

            <Modal open={openModal} disabled onCloseModal={() => toggleModal('')}>
                <StyledModalHeader>
                    <StyledModalTitle textVariant="h2">{loadingPopup ? `Auto-save in progress` : `Confirm`}</StyledModalTitle>
                </StyledModalHeader>
                <StyledModalContent>
                    <Text textVariant="body1" textWeight="Medium">
                        {clickedOnCancel
                            ? 'Are you sure you wish to cancel?'
                            : loadingPopup
                            ? 'Please wait for auto-save to complete to prevent data loss and view feedback.'
                            : action !== 'View' && feedbackModal && prompt
                            ? 'Any unsaved changes will be lost.'
                            : 'Are you sure you wish to submit? Once submitted, the review can not be edited.'}
                    </Text>
                </StyledModalContent>
                <StyledModalActions>
                    <CancelButton
                        data-testid="modal-yes"
                        isLoading={isSubmitting}
                        variant="outlined"
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
                    <Button data-testid="modal-no" onClick={() => toggleModal('')} variant="outlined">
                        No
                    </Button>
                </StyledModalActions>
            </Modal>
        </PageContent>
    );
};
