import { ParentStyledTabs, StyledModal, StyledMultiSelect } from '@common';
import { Button, Text } from '@medly-components/core';
import styled from 'styled-components';

export const StyledTabs = styled(ParentStyledTabs)`
    margin-top: 3rem;
    button {
        width: 21rem;
    }
    div[role='tabpanel'] {
        display: none;
    }

    button[aria-selected='false'] div div span {
        color: #666;
    }

    button[aria-selected='false'] svg path {
        fill: #666;
    }

    button[aria-selected='false'] div div span:nth-of-type(2) {
        color: #666;
        background-color: ${({ theme }) => theme.colors.grey[200]};
    }

    button[aria-selected='false']:hover div div span:nth-of-type(2) {
        background-color: ${({ theme }) => theme.colors.grey[200]};
    }
`;

export const StyledTableWrapper = styled('div')`
    table {
        margin-top: 0;
        border-radius: 0 0.8rem 0.8rem 0.8rem;
    }
`;
export const StyledDiv = styled('div')``;

export const StyledButton = styled(Button)`
    width: fit-content;
`;

export const StyledSelect = styled(StyledMultiSelect)`
    margin-right: 1rem;
`;

export const StyledModalContentFlex = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    #progress-wrapper {
        min-width: 60%;
    }
`;

export const StyledPopup = styled(StyledModal)`
    #medly-modal-popup {
        overflow-y: auto !important;
        width: 103.6rem;
    }
    #medly-modal-inner-container #medly-modal-content {
        padding-bottom: 3rem;
    }
`;

export const SuggestionLayer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SuggestionDescriptionLayer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    span > ul,
    p,
    ol {
        margin-top: 0;
        margin-bottom: 0;
    }
`;

export const StyledHeading = styled(Text)`
    font-size: 1.3rem;
`;

export const StyledText = styled(Text)`
    font-size: 1.3rem;
`;

export const StyledHTMLText = styled(Text)`
    width: 100%;
    p {
        word-wrap: break-word;
        margin-block-start: 0;
        font-size: 1.3rem;
    }
`;

export const SuggestionCommentContainer = styled.div`
    margin-bottom: 0.5rem;
`;

export const FilterContainer = styled.div`
    width: 100%;
    padding: 0;
    display: block;
    position: relative;
`;

export const ProgressFilterWrapper = styled.div`
    position: absolute;
    right: 0;
`;

export const ProgressWrapper = styled.div`
    flex: 0 0 35%;
    min-width: 20rem;
`;

export const CommentWrapper = styled.div`
    flex: 1;
    min-width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .rte-container {
        width: 100%;
        max-width: 50rem;
    }
`;

export const ProgressAndCommentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 1.5rem;
    width: 100%;
    margin-top: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;

        & > ${ProgressWrapper}, & > ${CommentWrapper} {
            flex: 1 1 100%;
            min-width: 100%;
        }
    }
`;
