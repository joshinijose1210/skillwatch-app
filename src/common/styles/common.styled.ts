import { StyledProps } from '@common/types';
import { Modal, MultiSelect, SearchBox, SingleSelect, Table, Tabs, Text, TextField, ToastContainer, Toggle } from '@medly-components/core';
import styled from 'styled-components';

export const ManagementWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
`;

export const Action = styled.a`
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export const StyledTable = styled(Table)`
    thead,
    tfoot {
        z-index: 1;
    }
`;

export const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1.5rem;
    cursor: pointer;
`;
export const ViewFeedbackDiv = styled.div`
    word-wrap: break-word;
    margin: 2rem;
    margin-bottom: 0;

    ${Modal.Header.Style} {
        padding-bottom: 0;
    }
`;

export const FeedbackModalHeader = styled.div`
    display: flex;
    align-items: center;
    column-gap: 3rem;
`;

export const ColumnActionText = styled(Text)`
    color: ${({ theme }) => theme.colors.blue[500]} !important;
    cursor: pointer;
`;

export const InlineText = styled(Text)`
    display: inline;
`;

export const BorderBottomDiv = styled.div`
    margin-top: 1rem;
    border-bottom: 1px solid gray;
`;

export const ScreenWidthWrapper = styled.div<{ action?: string }>`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    &.form-division {
        width: calc(50% - 20px);
    }

    &.tips-division {
        width: 50%;
    }
`;

export const StyledToastContainer = styled(ToastContainer)`
    div:nth-child(1) {
        max-width: 100%;
        span {
            padding-top: 2px;
            min-width: max-content;
        }
    }
`;

export const StyledLink = styled(Text)`
    color: ${({ theme }) => theme.colors.blue[400]};
    text-decoration: underline;
`;

export const StyledTextField = styled(TextField)<{ marginBottom?: boolean }>`
    margin-bottom: ${({ marginBottom }) => marginBottom && '3rem'};
    max-height: 45px;
    max-width: 25rem;
    div > div > input {
        line-height: 1.9rem;
        &::placeholder {
            color: transparent;
        }
    }
    div > div > label {
        line-height: 2.1rem;
        color: #666 !important;
    }

    span {
        position: absolute;
        top: 45px;
    }
`;

export const StyledSingleSelect = styled(SingleSelect)`
    max-height: 45px;
    &.no-max-height {
        max-height: unset;
        margin: 0.8rem 0;
    }
    max-width: 25rem;
    margin: 0;
    font-size: 13px;
    &.h-40 {
        max-height: 40px;
        height: 40px !important;
    }

    div > div > input {
        line-height: 1.9rem;
        font-size: 13px;
        &::placeholder {
            font-size: 13px;
            color: transparent;
        }
    }

    div > div > label {
        line-height: 2.1rem;
        color: #666 !important;
    }
    > ul {
        min-width: 100%;
        width: fit-content;
        max-height: 35rem;
        ${Text.Style} {
            font-size: 13px;
        }
    }
`;

export const StyledMultiSelect = styled(MultiSelect)`
    max-height: 45px;
    max-width: 25rem;
    font-size: 13px;
    margin: 0;
    div > div > input {
        line-height: 1.9rem;
        font-size: 13px;
        font-size: 1.3rem;
        &::placeholder {
            font-size: 13px;
            color: transparent;
        }
    }

    div > div > label {
        font-size: 13px;
        line-height: 2.1rem;
        color: #666 !important;
    }
    > :last-child {
        min-width: 100%;
        width: fit-content;
        ${Text.Style} {
            font-size: 13px;
        }
        > ul {
            max-height: 30rem;
        }
    }
`;

export const StyledSearchBox = styled(SearchBox)`
    max-width: 25rem;
    font-size: 13px;
    max-height: 45px;
    &.h-40 {
        height: 40px !important;
    }
    input {
        line-height: 1.9rem;
        font-size: 13px;
        color: #333;
    }

    input::placeholder {
        font-size: 13px;
        color: #666;
    }
`;

export const FromText = styled(Text)`
    font-weight: 600;
    opacity: 0.5;
    display: inline;
    letter-spacing: normal;
`;

export const LogoWrapper = styled.div`
    margin: 0 auto;
    width: min(100% - 150px, 1440px);
`;

export const Logo = styled.a`
    svg {
        width: 180px;
        height: unset;
    }
`;

export const StyledEmptyText = styled(Text)`
    color: ${({ theme }) => theme.colors.grey[500]};
`;

export const StyledModal = styled(Modal)`
    #medly-modal-popup {
        min-height: unset;
        overflow: visible;
    }

    #medly-modal-inner-container {
        width: 100%;
        overflow: visible;
    }

    #medly-modal-inner-container #medly-modal-content {
        overflow: visible;
    }

    #medly-modal-actions {
        z-index: 1;
    }
`;

export const StyledText = styled(Text).attrs({
    textVariant: 'h3'
})`
    font-size: 2.4rem;
    font-weight: 400;
`;

export const StyledTipsTitle = styled(Text).attrs({
    textVariant: 'h3',
    textWeight: 'Strong'
})`
    font-size: ${({ theme }) => theme.tipsFontSize.title};
    color: ${({ theme }) => theme.tipsColor.title};
`;

export const StyledAccordionTitle = styled(Text)`
    padding: 1rem;
    font-size: ${({ theme }) => theme.tipsFontSize.accordionTitle};
    color: ${({ theme }) => theme.contentColor};
`;

export const StyledModalHeader = styled(Modal.Header)<StyledProps>``;

export const StyledModalContent = styled(Modal.Content)<StyledProps>``;

export const StyledModalActions = styled(Modal.Actions)<StyledProps>``;

export const StyledModalTitle = styled(Text)`
    color: ${({ theme }) => theme.pageTitleColor};
    font-size: ${({ theme }) => theme.modalFontSize.title};
`;

export const ParentStyledTabs = styled(Tabs)`
    button div div span:nth-of-type(1) {
        font-size: ${({ theme }) => theme.tabTitleFontSize} !important;
    }
`;

export const StyledToggleWrapper = styled.div`
    * {
        font-size: ${({ theme }) => theme.toggleLabelFontSize};
    }
`;

export const StyledToggle = styled(Toggle).attrs({
    labelWeight: 'Regular',
    labelVariant: 'h4',
    labelPosition: 'left',
    size: 'S'
})``;

export const StyledVideoModal = styled(Modal).attrs({
    shouldCloseOnOutsideClick: true
})`
    display: flex;
    flex-direction: column;
    padding: 0;
`;
