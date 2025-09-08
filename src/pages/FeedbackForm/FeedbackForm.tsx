import { ScreenWidthWrapper, StyledTipsTitle } from '@common';
import { PageContent, RichTextEditor, SelectEmployee, SelectFeedbackTag } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import { Button } from '@medly-components/core';
import { SendIcon } from '@medly-components/icons';
import 'quill/dist/quill.snow.css';
import * as Styled from './FeedbackForm.styled';
import GetDescription from './GetDescription';
import { useFeedbackForm } from './useFeedbackForm';

export const FeedbackForm: React.FC = () => {
    const {
        state,
        selectedEmployee,
        isLoading,
        handleSelectEmployee,
        feedbackTag,
        handleDropdownChange,
        feedbackData,
        handleSend,
        feedbackTagText,
        buttonLoader,
        handleChange,
        isDraftDisabled
    } = useFeedbackForm();

    return (
        <PageContent>
            <ListHeader title={state?.action ? `${state.action} Feedback` : 'Add Feedback'} />
            <Styled.StyledContainer>
                <ScreenWidthWrapper className="form-division">
                    <SelectEmployee disabled={state && state.action == 'View'} value={selectedEmployee} onChange={handleSelectEmployee} />
                    <SelectFeedbackTag
                        disabled={state && state.action == 'View'}
                        feedbackTagValue={feedbackTag}
                        setFeedbackTagValue={handleDropdownChange}
                    />
                    <RichTextEditor
                        disabled={state && state.action === 'View'}
                        editor={'feedback'}
                        input={feedbackData}
                        setInput={handleChange}
                        feedbackTag={feedbackTag}
                    />
                    <Styled.FlexBoxColumn>
                        {((state && state.action === 'Add') || state.action === 'Edit') && (
                            <Styled.SendButtonBox>
                                <Button
                                    data-testid="saveAsDraftButton"
                                    isLoading={buttonLoader === 1 && isLoading}
                                    variant="outlined"
                                    onClick={() => handleSend('Draft')}
                                    disabled={isDraftDisabled}
                                >
                                    Save as Draft
                                </Button>
                                <Button
                                    variant="solid"
                                    data-testid="sendButton"
                                    isLoading={buttonLoader === 2 && isLoading}
                                    onClick={() => handleSend('Save')}
                                    disabled={isDraftDisabled}
                                >
                                    <SendIcon size="S" />
                                    Send
                                </Button>
                            </Styled.SendButtonBox>
                        )}
                    </Styled.FlexBoxColumn>
                </ScreenWidthWrapper>
                <ScreenWidthWrapper className="tips-division">
                    {Boolean(feedbackTagText) && state && state.action !== 'View' && (
                        <Styled.TipContainer feedbackTag={feedbackTag}>
                            <Styled.TipHeaderText>
                                <StyledTipsTitle>Tips</StyledTipsTitle>
                                <Styled.BulbImg />
                            </Styled.TipHeaderText>
                            <GetDescription feedbackTag={feedbackTagText || ''} />
                        </Styled.TipContainer>
                    )}
                </ScreenWidthWrapper>
            </Styled.StyledContainer>
        </PageContent>
    );
};
