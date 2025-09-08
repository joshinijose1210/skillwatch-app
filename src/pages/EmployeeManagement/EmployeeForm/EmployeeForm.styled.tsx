import { StyledToggleWrapper } from '@common';
import { Box, DatePicker, Text, TextField, Toggle } from '@medly-components/core';
import styled from 'styled-components';
import { StyledSingleSelect as ParentStyledSingleSelect } from '@common';
export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: auto;
`;

export const FormLayer = styled.div`
    display: grid;
    width: auto;
    max-width: max-content;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    ${Toggle.Style} {
        label {
            font-size: 14px;
            font-weight: 500;
        }
    }
`;

export const FormInput = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    max-width: fit-content;
    #medly-textField-input-wrapper {
        width: 25rem;
    }
`;
export const StyleContactInput = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    #medly-textField-input-wrapper {
        width: 25rem;
    }
`;
export const StyledErrorText = styled.span`
    position: absolute;
    top: 43px;
    color: #d73a43;
    font-size: 1.2rem;
    line-height: 1.6rem;
    margin: 0.5rem 1.6rem 0;
`;

export const StyledText = styled(Text)`
    margin-bottom: 2rem;
`;

export const StyledButton = styled.div`
    margin: auto;
    margin-top: 1rem;
    padding-right: 2rem;
    padding-left: 2rem;
    button {
        width: 13rem;
    }
`;

export const ErrorText = styled(Text)`
    margin: auto;
`;

export const StyledTextField = styled(TextField)`
    max-height: 45px;
    min-width: 30rem;
    margin: 0;
    div > div > input {
        font-size: 13px;
        line-height: 1.9rem;
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

export const StyledSingleSelect = styled(ParentStyledSingleSelect)`
    max-height: 45px;
    max-width: 30rem;

    div > div > input {
        line-height: 1.9rem;
        &::placeholder {
            color: transparent;
        }
    }
    ul {
        min-width: 100%;
        width: fit-content;
        max-height: 35rem;
        top: 4.6rem;
        ${Text.Style} {
            font-size: 1.3rem;
        }
    }

    div > div > label {
        line-height: 2.1rem;
        color: #666 !important;
    }
    #team-helper-text,
    #role-helper-text,
    #designation-helper-text,
    #manager1-helper-text,
    #manager2-helper-text,
    #department-helper-text {
        position: absolute;
        top: 4.2rem;
    }
`;

export const StyledButtonWrapper = styled('div')`
    display: flex;
    grid-column: 2;
    width: 100%;
    justify-content: flex-end;
`;

export const Wrapper = styled(Box)`
    padding: 0;
    margin: 0;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
`;
export const StyledTipsText = styled(Text)`
    font-size: ${({ theme }) => theme.tipsFontSize.content};
    color: ${({ theme }) => theme.tipsColor.content};
`;
export const Container = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

export const StyledDatePicker = styled(DatePicker)`
    max-height: 45px;
    width: 30rem;
    flex-direction: inherit;
    margin: 0;
    input {
        font-size: 13px;
        &::placeholder {
            font-size: 13px;
            color: transparent;
        }
    }
`;

export const ToggleWrapper = styled(StyledToggleWrapper)<{ colSpan: number }>`
    width: 30rem;
    grid-column: span ${({ colSpan }) => colSpan};
    div {
        display: flex;
        justify-content: space-between;
        margin-right: 0;
    }
`;
