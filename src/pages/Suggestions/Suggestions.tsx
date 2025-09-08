import { PageContent } from '@components';
import { CustomTable } from '@components/reusableComponents/CustomTable/CustomTable';
import ListHeader from '@components/reusableComponents/ListHeader';
import { Tabs, Button } from '@medly-components/core';
import { CallMadeIcon, CallReceivedIcon } from '@medly-components/icons';
import DOMPurify from 'dompurify';
import { SubmittedCols, ReceivedCols } from './columns';
import {
    StyledTableWrapper,
    StyledTabs,
    StyledModalContentFlex,
    SuggestionLayer,
    SuggestionDescriptionLayer,
    StyledHeading,
    StyledText,
    StyledHTMLText,
    StyledPopup,
    FilterContainer,
    ProgressFilterWrapper,
    ProgressAndCommentWrapper,
    SuggestionCommentContainer,
    ProgressWrapper,
    CommentWrapper
} from './Suggestions.style';
import { useSuggestion } from './useSuggestion';
import { StyledModalTitle, StyledSingleSelect, SuggestionProgressId } from '@common';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';
import { StyledModalHeader, StyledModalContent, StyledModalActions } from '@common';
import { RichTextEditor } from '@components/reusableComponents/RichTextEditor'; // Adjust path as needed

export const Suggestions = () => {
    const {
        modalState,
        suggestedDate,
        suggestedBy,
        suggestionText,
        isReceivedAllowed,
        openModal,
        closeModal,
        addSuggestionPage,
        handleTabChange,
        suggestionsData,
        totalSuggestionsDataCount,
        handlePageChange,
        page,
        activeTab,
        suggestionsDataIsLoading,
        handleSortChange,
        tagsList,
        handleDropdownChange,
        progressStatus,
        handleProgressSubmission,
        progressLoading,
        suggestionReceivedFilter,
        suggestionFilterOptions,
        handleSuggestionReceievedDropdownChange,
        suggestionPendingCount,
        suggestionComment,
        handlesuggestionCommentChange,
        comments,
        removeHtmlTags
    } = useSuggestion();

    const MIN_COMMENT_LENGTH = 10;
    const MAX_COMMENT_LENGTH = 100;

    const rawSuggestionComment = removeHtmlTags(suggestionComment).trim();

    const isSaveDisabled =
        !progressStatus ||
        (progressStatus === SuggestionProgressId.Deferred && !rawSuggestionComment) ||
        (rawSuggestionComment.length > 0 && rawSuggestionComment.length < MIN_COMMENT_LENGTH) ||
        rawSuggestionComment.length > MAX_COMMENT_LENGTH;

    return (
        <PageContent>
            <ListHeader title="Suggestions" actionButtonLabel="Add Suggestion" actionButtonClick={addSuggestionPage} />

            <StyledPopup open={modalState} onCloseModal={closeModal}>
                <StyledModalHeader>
                    <StyledModalTitle textVariant="h2">{`Suggestion`}</StyledModalTitle>
                </StyledModalHeader>
                <StyledModalContent>
                    <StyledModalContentFlex>
                        <SuggestionLayer>
                            <StyledHeading textWeight="Medium">
                                Date: <StyledText>{suggestedDate}</StyledText>
                            </StyledHeading>
                        </SuggestionLayer>
                        <SuggestionLayer>
                            <StyledHeading textVariant="h4" textWeight="Medium">
                                Suggested By: <StyledText>{suggestedBy}</StyledText>
                            </StyledHeading>
                        </SuggestionLayer>
                        <SuggestionDescriptionLayer>
                            <StyledHeading textVariant="h4" textWeight="Medium">
                                Suggestion:
                            </StyledHeading>
                            <StyledHTMLText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(suggestionText) }} />
                        </SuggestionDescriptionLayer>
                        {activeTab === 'receivedSuggestion' && (
                            <ProgressAndCommentWrapper>
                                <ProgressWrapper>
                                    <StyledSingleSelect
                                        options={tagsList}
                                        variant="outlined"
                                        placeholder="Select Progress"
                                        size="M"
                                        label="Progress"
                                        value={progressStatus}
                                        isSearchable
                                        minWidth="100%"
                                        onChange={val => val && handleDropdownChange(val)}
                                        data-testid="progress"
                                    />
                                    <TooltipDropdown
                                        dataIds={[`progress-input`]}
                                        values={
                                            progressStatus && tagsList.length
                                                ? tagsList.filter((item: OptionsType) => progressStatus === item.value)
                                                : []
                                        }
                                    />
                                </ProgressWrapper>
                                <CommentWrapper>
                                    <RichTextEditor
                                        fullWidth
                                        editor="suggestion-comment"
                                        input={suggestionComment}
                                        placeholder="Add comment here..."
                                        setInput={handlesuggestionCommentChange}
                                        height={100}
                                        minLength={MIN_COMMENT_LENGTH}
                                        maxLength={MAX_COMMENT_LENGTH}
                                        marginBottom={2}
                                    />
                                </CommentWrapper>
                            </ProgressAndCommentWrapper>
                        )}
                        {comments.length > 0 && (
                            <SuggestionDescriptionLayer>
                                {comments.map(c => (
                                    <SuggestionCommentContainer key={c.id}>
                                        <StyledHeading textVariant="h4" textWeight="Medium">
                                            Comment: <StyledText>{c.date}</StyledText>
                                        </StyledHeading>
                                        <StyledHTMLText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(c.comment) }} />
                                    </SuggestionCommentContainer>
                                ))}
                            </SuggestionDescriptionLayer>
                        )}
                    </StyledModalContentFlex>
                </StyledModalContent>
                {activeTab === 'receivedSuggestion' && (
                    <StyledModalActions>
                        <Button isLoading={progressLoading} disabled={isSaveDisabled} onClick={handleProgressSubmission}>
                            Save
                        </Button>
                    </StyledModalActions>
                )}
            </StyledPopup>
            <FilterContainer>
                <ProgressFilterWrapper>
                    <StyledSingleSelect
                        options={suggestionFilterOptions}
                        variant="outlined"
                        placeholder="Select Progress"
                        data-testid="progressDropdown"
                        label={'Progress'}
                        onChange={e => handleSuggestionReceievedDropdownChange(e)}
                        value={suggestionReceivedFilter.progressId}
                        size="M"
                        minWidth="25rem"
                    />
                </ProgressFilterWrapper>
            </FilterContainer>
            <StyledTabs aria-label="Closed style tabs" tabSize="M" variant="outlined" onChange={id => handleTabChange(id)}>
                <Tabs.Tab
                    active={activeTab === 'submittedSuggestion'}
                    id="submittedSuggestion"
                    label="Submitted"
                    helperText="Submitted"
                    icon={CallMadeIcon}
                    data-testid="submitted"
                />
                <Tabs.Tab
                    active={activeTab === 'receivedSuggestion'}
                    id="receivedSuggestion"
                    label="Received"
                    helperText="Received"
                    icon={CallReceivedIcon}
                    count={suggestionPendingCount}
                    hide={!isReceivedAllowed}
                    data-testid="received"
                />
            </StyledTabs>
            <StyledTableWrapper>
                <CustomTable
                    data={suggestionsData}
                    tableKey={activeTab}
                    columns={activeTab === 'submittedSuggestion' ? SubmittedCols : ReceivedCols}
                    isLoading={suggestionsDataIsLoading}
                    activePage={page || 1}
                    count={totalSuggestionsDataCount || 0}
                    handlePageChange={handlePageChange}
                    setSortOrder={handleSortChange}
                />
            </StyledTableWrapper>
        </PageContent>
    );
};
