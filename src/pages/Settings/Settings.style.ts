import { StyledToggleWrapper } from '@common';
import { Text, TextField } from '@medly-components/core';
import { TipContainer } from '@pages/FeedbackForm/FeedbackForm.styled';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    column-gap: 5rem;
`;

export const LeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 40%;
`;

export const TipHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const DomainAndDeleteButtonDiv = styled.div`
    display: flex;
    column-gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
`;

export const StyledTextField = styled(TextField)<{ marginBottom?: boolean }>`
    margin-bottom: ${({ marginBottom }) => marginBottom && '3rem'};
    max-height: 45px;
    width: calc(100% - 5rem);
    div > div > input {
        font-size: 13px;
        line-height: 1.9rem;
        &::placeholder {
            font-size: 13px;
            color: transparent;
        }
    }
    div > div > label {
        line-height: 2.1rem;
        color: #666 !important;
    }

    span {
        position: absolute;
        top: 42px;
    }
`;

export const StyledAddDomain = styled(Text)`
    color: ${({ theme }) => theme.colors.blue[500]};
    cursor: pointer;
    display: inline-block;
    :hover {
        text-decoration: underline;
    }
`;
export const StyleButtonWrapper = styled.div`
    display: flex;
    align-self: flex-end;
    padding-right: 5rem;
`;

export const NoteBox = styled(TipContainer)`
    max-width: 100%;
    margin-left: 7rem;
    height: fit-content;
`;

export const StyledText = styled(Text)<{ hasTopMargin?: boolean }>`
    margin-top: ${({ hasTopMargin }) => (hasTopMargin === false ? 0 : '5rem')};
    margin-bottom: 2rem;
    font-weight: 600;
`;

export const ToggleWrapper = styled(StyledToggleWrapper)`
    width: 100%;
    max-width: calc(100% - 5rem);
    div {
        display: flex;
        justify-content: space-between;
        margin-right: 0;
        div:has(input[type='checkbox']) {
            min-width: 42px;
        }
    }
`;

export const GeneralSettingsContainer = styled(Container)`
    flex-direction: row;
    margin-top: 3.5rem;
    margin-bottom: 3rem;
`;
