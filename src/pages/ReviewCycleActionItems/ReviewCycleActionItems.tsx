import { Loader, PageContent } from '@components';
import { ListHeaderDiv, StyledBox } from '@components/reusableComponents/DashboardFeedbackOverview/DashboardFeedbackOverview.styled';
import ListHeader from '@components/reusableComponents/ListHeader';
import { Button, Modal, Text } from '@medly-components/core';
import { DeleteForeverIcon, LabelImportantIcon } from '@medly-components/icons';
import { CancelButton } from '@pages/CheckInWithManager/CheckInWithManagerForm/CheckInWithManagerForm.styled';
import { ChartContainer } from '@pages/Dashboard/Dashboard.styled';
import { StyledModalHeader, StyledModalContent, StyledModalActions, StyledModalTitle } from '@common';

import {
    ActionItemAndDeleteButtonDiv,
    ActionItemsWrapper,
    AddActionItemButtonDiv,
    ClearButton,
    DateWithCrossBox,
    InfoBox,
    InfoContainerBox,
    LabelAndName,
    NoClearButton,
    ReviewDataWrapper,
    StyledAddActionItem,
    StyledChart,
    StyledDatePicker,
    StyledHeading,
    StyledLabel,
    StyledLabelValue,
    StyledTextField,
    SubmitButtonDiv
} from './ReviewCycleActionItems.styled';
import { useReviewCycleActionItems } from './useReviewCycleActionItems';
import { Kra, KrasContainer } from '@pages/SelfReview/PerformanceGuidelines/PerformanceGuidelines.styled';
import { KRAWeightedScore } from './types';
import MetricsTable from '@components/MetricsTable';
import { useLocation } from 'react-router-dom';
import {
    ActionItem,
    ActionItemsDiv,
    NoActionItemDiv,
    StyledText
} from '@components/reusableComponents/DashboardActionItems/DashboardActionItems.styled';
import { format } from 'date-fns';
import { StyledRatingCardText } from '@components/reusableComponents/RatingsHeader/RatingsHeader.styled';
export const ReviewCycleActionItems = () => {
    const {
        handleAddActionItem,
        handleOnChange,
        handleRemoveField,
        handleDateChange,
        inputFields,
        handleSubmit,
        openModal,
        handleNo,
        handleYes,
        employee,
        isLoading,
        isDisabled,
        isSubmitLoading,
        handleSaveAsDraft,
        clickedOnBack,
        actionItems,
        isLoadingActionItems,
        handleBack,
        openBackModal,
        shouldShowBackModal,
        kras,
        groupedKpis,
        reviewDataRatings,
        checkInData,
        currentCheckInRating,
        chartData,
        finalScore,
        loadingCycles,
        isCheckInReviewSummaryPage,
        weightedScoreLable,
        latestManagerData,
        employeeDetails
    } = useReviewCycleActionItems();
    const path = useLocation().pathname;

    if (isLoading || loadingCycles) {
        return <Loader />;
    }

    return (
        <PageContent>
            <ListHeader title={'Review Summary'} />
            {employee && !path.includes('self-review') && (
                <ChartContainer>
                    <StyledChart>
                        <ReviewDataWrapper>
                            <LabelAndName
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    alignItems: 'space-between'
                                }}
                            >
                                <InfoContainerBox>
                                    <InfoBox>
                                        <StyledLabel>Employee :</StyledLabel>
                                        <StyledLabelValue>
                                            {employee.firstName} {employee.lastName} ({employee.employeeId})
                                        </StyledLabelValue>
                                    </InfoBox>
                                    <InfoBox>
                                        <StyledLabel className="team-info">Team :</StyledLabel>
                                        <StyledLabelValue>{employee.teamName}</StyledLabelValue>
                                    </InfoBox>
                                </InfoContainerBox>
                                <InfoContainerBox>
                                    <InfoBox>
                                        <StyledLabel>Department :</StyledLabel>
                                        <StyledLabelValue>{employee.departmentName}</StyledLabelValue>
                                    </InfoBox>
                                    <InfoBox>
                                        <StyledLabel className="designation-info">Designation :</StyledLabel>
                                        <StyledLabelValue>{employee.designationName}</StyledLabelValue>
                                    </InfoBox>
                                </InfoContainerBox>
                                <InfoContainerBox>
                                    <InfoBox>
                                        <StyledLabel>Manager 1 :</StyledLabel>
                                        <StyledLabelValue>
                                            {employee.firstManagerFirstName} {employee.firstManagerLastName} (
                                            {employee.firstManagerEmployeeId})
                                        </StyledLabelValue>
                                    </InfoBox>

                                    <InfoBox>
                                        <StyledLabel>Manager 2 :</StyledLabel>
                                        <StyledLabelValue>
                                            {employee.secondManagerFirstName
                                                ? `${employee.secondManagerFirstName} ${employee.secondManagerLastName} (${employee.secondManagerEmployeeId})`
                                                : '-'}
                                        </StyledLabelValue>
                                    </InfoBox>
                                </InfoContainerBox>
                            </LabelAndName>
                        </ReviewDataWrapper>
                    </StyledChart>

                    {/* might be needed later 
                        <StyledChart>
                            <HeadContainer>
                                <TileTitle textVariant="h4">Ratings</TileTitle>
                            </HeadContainer>
                            <ChartWrapper>
                                <LineChartContainer>
                                    <LineChart ratingBy={'Self'} rating={chartData?.avgSelfReviewRating} />
                                    <LineChart ratingBy={'Manager 1'} rating={chartData?.avgFirstManagerRating} />
                                    <LineChart ratingBy={'Manager 2'} rating={chartData?.avgSecondManagerReviewRating} />
                                </LineChartContainer>
                                {checkInData && checkInData.length > 0 && (
                                    <PieChart
                                        margin={20}
                                        enableArcLabels={false}
                                        enableArcLinkLabels={false}
                                        isInteractive={false}
                                        title={
                                            <>
                                                <StyledRating>
                                                    {currentCheckInRating === 0 ? 0 : String(currentCheckInRating.toFixed(1))}
                                                </StyledRating>
                                                <br />
                                                <span>Check-In</span>
                                            </>
                                        }
                                        data={checkInData}
                                    />
                                )}
                            </ChartWrapper>
                            <InfoSection>
                                {RatingChartData.map((node, index) => (
                                    <ColorScheme key={index}>
                                        <Color bgColor={node.color} />
                                        <TypeText>{node.label}</TypeText>
                                    </ColorScheme>
                                ))}
                            </InfoSection>
                        </StyledChart> */}
                </ChartContainer>
            )}
            <Text style={{ marginTop: '1rem' }} textVariant="h4" textWeight="Medium">
                {weightedScoreLable ? weightedScoreLable : 'Weighted Score'}
            </Text>
            <KrasContainer style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                {kras?.map(
                    (kra: KRAWeightedScore, index: number) =>
                        kra && (
                            <Kra key={index}>
                                <Text textVariant="h2" textWeight="Strong">
                                    {kra.weightedRating}
                                </Text>
                                <StyledRatingCardText textWeight="Medium">{kra.kraName}</StyledRatingCardText>
                                <StyledRatingCardText>{kra.kraWeightage}</StyledRatingCardText>
                            </Kra>
                        )
                )}
                {finalScore && (
                    <Kra>
                        <Text textVariant="h2" textWeight="Strong">
                            {finalScore.finalScore}
                        </Text>
                        <StyledRatingCardText>{finalScore.finalScoreLabel}</StyledRatingCardText>
                        <StyledRatingCardText>{finalScore.finalScoreString}</StyledRatingCardText>
                    </Kra>
                )}
            </KrasContainer>
            <MetricsTable reviewDataRatings={reviewDataRatings} latestManagerData={latestManagerData} employeeDetails={employeeDetails} />

            {!path.includes('review-summary') && (
                <>
                    {' '}
                    <StyledBox>
                        <ListHeaderDiv style={{ paddingLeft: 0 }}>
                            <ListHeader title="Goals" />
                        </ListHeaderDiv>
                        <ActionItemsWrapper>
                            {inputFields &&
                                inputFields.length > 0 &&
                                inputFields.map((inputField: any, index: number) => (
                                    <ActionItemAndDeleteButtonDiv key={inputField.actionItemId}>
                                        <StyledTextField
                                            placeholder="Type goal here..."
                                            size="M"
                                            variant="outlined"
                                            data-testid={`action-input-${index}`}
                                            label="Goal"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                handleOnChange(e, inputField.actionItemId)
                                            }
                                            errorText={inputField.actionItemError}
                                            value={inputField.actionItem}
                                        />
                                        <DateWithCrossBox>
                                            <StyledDatePicker
                                                label="Deadline"
                                                placeholder="Select Date"
                                                displayFormat="dd-MM-yyyy"
                                                value={inputField.targetDate !== '' ? new Date(inputField.targetDate) : null}
                                                onChange={(value: Date | null) => handleDateChange(value, inputField.actionItemId)}
                                                size="M"
                                                minSelectableDate={new Date()}
                                                data-testid={`date-btn-${index}`}
                                                autoComplete="off"
                                                variant="outlined"
                                                popoverPlacement="bottom-end"
                                            />
                                            {index ? (
                                                <ClearButton
                                                    data-testid={`clear-btn-${index}`}
                                                    type="button"
                                                    onClick={() => handleRemoveField(inputField.actionItemId)}
                                                >
                                                    <DeleteForeverIcon iconColor="red" />
                                                </ClearButton>
                                            ) : (
                                                <NoClearButton
                                                    disabled={true}
                                                    type="button"
                                                    onClick={() => handleRemoveField(inputField.actionItemId)}
                                                >
                                                    <DeleteForeverIcon iconColor="red" />
                                                </NoClearButton>
                                            )}
                                        </DateWithCrossBox>
                                    </ActionItemAndDeleteButtonDiv>
                                ))}
                        </ActionItemsWrapper>
                        {inputFields.length < 10 && (
                            <AddActionItemButtonDiv>
                                <StyledAddActionItem
                                    data-testid="add-btn"
                                    textVariant="h4"
                                    textWeight="Regular"
                                    onClick={handleAddActionItem}
                                    textAlign="center"
                                >
                                    + Add goal
                                </StyledAddActionItem>
                            </AddActionItemButtonDiv>
                        )}
                    </StyledBox>
                    <SubmitButtonDiv>
                        <Button data-testid="back-btn" variant="outlined" onClick={shouldShowBackModal ? openBackModal : handleBack}>
                            Back
                        </Button>
                        <Button
                            data-testid="draft-btn"
                            variant="outlined"
                            disabled={isDisabled}
                            onClick={handleSaveAsDraft}
                            isLoading={isSubmitLoading && !openModal}
                        >
                            Save as Draft
                        </Button>
                        <Button data-testid="save-btn" disabled={isDisabled} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </SubmitButtonDiv>
                    <Modal open={openModal} onCloseModal={handleNo}>
                        <StyledModalHeader>
                            <StyledModalTitle textVariant="h2">Confirm</StyledModalTitle>
                        </StyledModalHeader>
                        <StyledModalContent>
                            <StyledLabel>
                                {clickedOnBack
                                    ? 'Are you sure you wish to go back? Any unsaved changes will be lost.'
                                    : 'Are you sure you wish to submit? Once submitted, the review can not be edited.'}
                            </StyledLabel>
                        </StyledModalContent>
                        <StyledModalActions>
                            <CancelButton
                                data-testid="modal-yes"
                                variant="outlined"
                                onClick={clickedOnBack ? handleBack : handleYes}
                                isLoading={isSubmitLoading}
                            >
                                Yes
                            </CancelButton>
                            <Button data-testid="modal-no" onClick={handleNo} variant="outlined">
                                No
                            </Button>
                        </StyledModalActions>
                    </Modal>
                </>
            )}
            {isCheckInReviewSummaryPage &&
                (isLoadingActionItems ? (
                    <Loader />
                ) : (
                    actionItems &&
                    actionItems[0] &&
                    actionItems[0].actionItem && (
                        <StyledBox>
                            <ListHeaderDiv style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <StyledHeading>Goals</StyledHeading>
                                <StyledHeading>Deadline</StyledHeading>
                            </ListHeaderDiv>
                            {actionItems[0].actionItem.length > 0 ? (
                                <ActionItemsDiv style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    {actionItems[0].actionItem.map((obj: any, index: number) => {
                                        return (
                                            <ActionItem key={index}>
                                                <StyledText textVariant="body1">
                                                    <LabelImportantIcon />
                                                    {obj.actionItem}
                                                </StyledText>
                                                <StyledText textVariant="body1">
                                                    {format(new Date(obj.targetDate), 'dd/MM/yyyy')}
                                                </StyledText>
                                            </ActionItem>
                                        );
                                    })}
                                </ActionItemsDiv>
                            ) : (
                                <NoActionItemDiv>
                                    <Text>No Goals found for the current Review Cycle</Text>
                                </NoActionItemDiv>
                            )}
                        </StyledBox>
                    )
                ))}
        </PageContent>
    );
};
