import { ScreenWidthWrapper, StyledAccordionTitle, StyledTipsTitle } from '@common';
import { Loader, PageContent } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import TextDescription from '@components/reusableComponents/TextDescription';
import { Box, Button } from '@medly-components/core';
import { FC, memo } from 'react';
import {
    StyledButtonWrapper,
    FlexBoxRow,
    StyledAccordion,
    StyledAccordionHead,
    StyledAccordionContent,
    StyledHeading,
    StyledFeedbackFormTextArea,
    StyledText
} from './RequestedFeedbackForm.style';
import { useRequestedFeedbackForm } from './useRequestedFeedbackForm';
import * as Styled from '../../FeedbackForm/FeedbackForm.styled';
import GetDescription from '@pages/FeedbackForm/GetDescription';
import { TipHeader } from '@pages/FeedbackForm/FeedbackTipsDesc.styles';
import { AccordionInputFieldProps, FeedbackFormContainerProps, FeedbackSectionProps } from './types';
import { ThreeSixtyFeedbackRichTextEditor } from '@components/reusableComponents/RichTextEditor/360FeedbackRichtextEditor';

export const AccordionInputFields = memo(
    ({
        feedbackTypeOptions,
        handleAccordinToggle,
        activeAccordion,
        feedbackErrors,
        action,
        handleChange,
        getInputValue
    }: AccordionInputFieldProps) => {
        return (
            <>
                {feedbackTypeOptions.map((item, index) =>
                    //  in view feedback, show only the feedbacks that are submitted
                    action === 'View' ? (
                        getInputValue(item.feedbackTypeId).length > 0 && (
                            <StyledAccordion
                                key={index}
                                onChange={() => handleAccordinToggle(item.value)}
                                active={activeAccordion === item.value || false}
                            >
                                <StyledAccordionHead
                                    action={action}
                                    active={activeAccordion === item.value}
                                    hasError={feedbackErrors[item.feedbackTypeId].length > 0}
                                    feedbackTag={item.feedbackTypeId}
                                >
                                    <StyledAccordionTitle textWeight="Medium">{item.label}</StyledAccordionTitle>
                                </StyledAccordionHead>
                                <StyledAccordionContent active={activeAccordion === item.value}>
                                    <TextDescription
                                        disabled
                                        feedback={getInputValue(item.feedbackTypeId)}
                                        placeholder={'Feedback Shared'}
                                    />
                                </StyledAccordionContent>
                            </StyledAccordion>
                        )
                    ) : (
                        <StyledAccordion
                            key={index}
                            onChange={() => handleAccordinToggle(item.value)}
                            active={activeAccordion === item.value || false}
                        >
                            <StyledAccordionHead
                                action={action}
                                active={activeAccordion === item.value}
                                hasError={feedbackErrors[item.feedbackTypeId].length > 0}
                                feedbackTag={item.feedbackTypeId}
                            >
                                <TipHeader textWeight="Medium">{item.label}</TipHeader>
                            </StyledAccordionHead>
                            <StyledAccordionContent active={activeAccordion === item.value}>
                                <ThreeSixtyFeedbackRichTextEditor
                                    dataTestId={`${item.value}`}
                                    key={item.feedbackTypeId}
                                    useBlur={true}
                                    editor={'feedback'}
                                    input={getInputValue(item.feedbackTypeId)}
                                    marginBottom={1}
                                    // this is not for all, only if atleast one feedback is correctly added, rest become optional - handled in hook
                                    isOptional
                                    setInput={e => handleChange(e, item.feedbackTypeId)}
                                    placeholder="Write feedback here..."
                                />
                            </StyledAccordionContent>
                        </StyledAccordion>
                    )
                )}
            </>
        );
    }
);

AccordionInputFields.displayName = 'AccordionInputFields';

const FeedbackFormContainer = memo(({ handleAccordinToggle, activeAccordion }: FeedbackFormContainerProps) => {
    const {
        feedbackTypeOptions,
        isLoading,
        getInputValue,
        feedbackErrors,
        handleSend,
        buttonLoader,
        action,
        handleChange,
        isAddBtnDisabled
    } = useRequestedFeedbackForm();
    console.log(feedbackErrors, isAddBtnDisabled);
    return (
        <>
            <AccordionInputFields
                handleAccordinToggle={handleAccordinToggle}
                action={action}
                feedbackErrors={feedbackErrors}
                getInputValue={getInputValue}
                activeAccordion={activeAccordion}
                handleChange={handleChange}
                feedbackTypeOptions={feedbackTypeOptions}
            />
            {action !== 'View' && (
                <StyledButtonWrapper>
                    <Button
                        isLoading={buttonLoader === 1 && isLoading}
                        variant="outlined"
                        onClick={() => handleSend('Draft')}
                        disabled={isAddBtnDisabled}
                        data-testid="draftBtn"
                    >
                        Save as Draft
                    </Button>
                    <Button
                        data-testid="sendBtn"
                        disabled={isAddBtnDisabled}
                        onClick={() => handleSend('Save')}
                        isLoading={isLoading}
                        variant="solid"
                    >
                        Send
                    </Button>
                </StyledButtonWrapper>
            )}
        </>
    );
});

FeedbackFormContainer.displayName = 'FeedbackFormContainer';

export const FeedbackTipsSection = memo(({ feedbackTagNumber, feedbackTagText, action }: FeedbackSectionProps) => {
    return action === 'View' ? (
        <></>
    ) : (
        <ScreenWidthWrapper className="tips-division">
            <Styled.TipContainer feedbackTag={feedbackTagNumber}>
                <Styled.TipHeaderText>
                    <StyledTipsTitle>Tips</StyledTipsTitle>
                    <Styled.BulbImg />
                </Styled.TipHeaderText>
                <GetDescription feedbackTag={feedbackTagText} />
            </Styled.TipContainer>
        </ScreenWidthWrapper>
    );
});

FeedbackTipsSection.displayName = 'FeedbackTipsSection';

export const RequestedFeedbackForm: FC = () => {
    const {
        feedbackTagText,
        action,
        activeAccordion,
        handleAccordinToggle,
        feedbackAbout,
        feedbackDescription,
        feedbackFrom,
        actionItem,
        feedbackTagNumber,
        isLoading
    } = useRequestedFeedbackForm();

    return (
        <PageContent>
            <ListHeader
                title={
                    action == 'View' ? 'View Submitted Feedback' : action == 'Edit' ? 'Edit Requested Feedback' : 'Add Requested Feedback'
                }
            />
            <FlexBoxRow>
                <ScreenWidthWrapper className="form-division" action={action}>
                    {isLoading ? (
                        <Box style={{ alignItems: 'center', justifyContent: 'center', height: '30rem' }}>
                            <Loader />
                        </Box>
                    ) : (
                        <>
                            <Box style={{ flexDirection: 'column', padding: 0 }}>
                                <StyledHeading textVariant="h4" textWeight="Medium">
                                    Feedback Request From:
                                </StyledHeading>
                                <StyledText>{feedbackFrom}</StyledText>

                                <StyledHeading hasMarginTop textVariant="h4" textWeight="Medium">
                                    Feedback About:
                                </StyledHeading>
                                <StyledText>{feedbackAbout}</StyledText>

                                <StyledHeading hasMarginTop textVariant="h4" textWeight="Medium">
                                    Context:
                                </StyledHeading>
                                <StyledFeedbackFormTextArea
                                    feedbackData={feedbackDescription}
                                    dangerouslySetInnerHTML={{ __html: feedbackDescription }}
                                />
                                {actionItem && (
                                    <>
                                        <StyledHeading textVariant="h4" textWeight="Medium">
                                            Goal:
                                        </StyledHeading>
                                        <StyledFeedbackFormTextArea
                                            feedbackData={actionItem}
                                            dangerouslySetInnerHTML={{ __html: actionItem }}
                                        />
                                    </>
                                )}
                            </Box>
                            <FeedbackFormContainer activeAccordion={activeAccordion} handleAccordinToggle={handleAccordinToggle} />
                        </>
                    )}
                </ScreenWidthWrapper>
                <FeedbackTipsSection feedbackTagText={feedbackTagText} action={action} feedbackTagNumber={feedbackTagNumber} />
            </FlexBoxRow>
        </PageContent>
    );
};
