import { ScreenWidthWrapper, StyledTipsTitle, StyledToggle } from '@common';
import { PageContent, RichTextEditor } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import { Button } from '@medly-components/core';
import { SendIcon } from '@medly-components/icons';
import { FC } from 'react';
import { StyledButtonWrapper } from './SuggestionForm.style';
import { useSuggestionForm } from './useSuggestionForm';
import * as Styled from './SuggestionForm.styled';
import GetDescription from '@pages/Suggestions/SuggestionForm/GetDescription';

export const SuggestionForm: FC = () => {
    const {
        state,
        suggestionData,
        isLoading,
        handleSend,
        handleChange,
        buttonLoader,
        isDraftDisabled,
        status,
        handleToggleClick,
        settingData
    } = useSuggestionForm();

    return (
        <PageContent>
            <ListHeader title={state?.action ? `${state.action} Suggestion` : 'Add Suggestion'} />
            {settingData && settingData?.isAnonymousSuggestionAllowed && (
                <Styled.ToggleWrapper>
                    <StyledToggle
                        label="Prefer to submit suggestions anonymously?"
                        onClick={handleToggleClick}
                        checked={status}
                        data-testid="anonymous-toggle"
                    />
                </Styled.ToggleWrapper>
            )}
            <Styled.StyledContainer>
                <ScreenWidthWrapper className="form-division">
                    <RichTextEditor
                        editor={'feedback'}
                        input={suggestionData}
                        setInput={handleChange}
                        placeholder="Got a suggestion to improve our workplace, culture, or processes? Share it here!"
                        label=""
                    />
                    <StyledButtonWrapper>
                        <Button
                            isLoading={buttonLoader === 1 && isLoading}
                            variant="outlined"
                            onClick={() => handleSend('Draft')}
                            disabled={isDraftDisabled}
                        >
                            Save as Draft
                        </Button>
                        <Button
                            isLoading={buttonLoader === 2 && isLoading}
                            disabled={isDraftDisabled}
                            onClick={() => handleSend('Save')}
                            variant="solid"
                        >
                            <SendIcon size="S" />
                            Send
                        </Button>
                    </StyledButtonWrapper>
                </ScreenWidthWrapper>
                <ScreenWidthWrapper className="tips-division">
                    <Styled.TipContainer>
                        <Styled.TipHeaderText>
                            <StyledTipsTitle textVariant="h3">Tips</StyledTipsTitle>
                            <Styled.BulbImg />
                        </Styled.TipHeaderText>
                        <GetDescription />
                    </Styled.TipContainer>
                </ScreenWidthWrapper>
            </Styled.StyledContainer>
        </PageContent>
    );
};
