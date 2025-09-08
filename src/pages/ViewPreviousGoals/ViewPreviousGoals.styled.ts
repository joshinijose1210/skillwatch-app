import { StyledModal, StyledMultiSelect } from '@common';
import { Button, Tabs, Text } from '@medly-components/core';
import styled from 'styled-components';

export const StyledTabs = styled(Tabs)`
    margin-top: 3rem;
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

    span > ul,
    p,
    ol {
        margin-top: 0;
        margin-bottom: 0;
    }
`;

export const StyledHeading = styled(Text).attrs({ textWeight: 'Medium', textVariant: 'h4' })`
    font-size: ${({ theme }) => theme.contentFontSize};
    color: ${({ theme }) => theme.contentColor};
    span {
        font-weight: 400;
    }
`;

export const StyledHTMLText = styled(Text)`
    p {
        word-wrap: break-word;
        margin-block-start: 0;
        font-size: ${({ theme }) => theme.contentFontSize};
        color: ${({ theme }) => theme.contentColor};
    }
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
