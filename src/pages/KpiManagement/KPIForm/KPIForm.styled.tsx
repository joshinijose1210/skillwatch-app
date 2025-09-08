import { StyledMultiSelect, StyledSingleSelect } from '@common';
import { Box, Button, TextField } from '@medly-components/core';
import styled from 'styled-components';
export const StyledButtonDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`;
export const Container = styled(Box)`
    margin: 0;
    padding: 0;
    flex-direction: row;
    column-gap: 12rem;
    @media (max-width: 1440px) {
        column-gap: 5rem;
    }
`;

export const FormSection = styled.div<{ action?: string }>`
    width: 50%;
    min-width: 77rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const TipsSection = styled.div``;

export const FlexDropDown = styled.div`
    display: flex;
    gap: 2.5rem;
    height: 60px;
    align-items: flex-start;
`;

export const AddTeamBtnWrapper = styled.div`
    margin: 1rem 0 2rem;
`;

export const RedButton = styled(Button)`
    margin-left: auto;
    &:not(:disabled):not(:hover),
    &:not(:disabled):not(:active):hover,
    &:not(:disabled):active:hover {
        color: red;
    }
    &:not(:disabled):not(:hover)::after,
    &:not(:disabled):not(:active):hover::after,
    &:not(:disabled):active:hover::after {
        border-color: red;
    }
`;

export const SingleSelect = styled(StyledSingleSelect)`
    max-height: unset;
    max-width: 24rem !important;
    div > div {
        max-height: 45px;
    }
`;

export const MultiSelect = styled(StyledMultiSelect)`
    max-height: unset;
    max-width: 24rem !important;
    div:first-child > div {
        max-height: 45px;
    }
    &:hover {
        input:not(:focus)::placeholder {
            color: transparent;
        }
    }
`;

export const ClearButton = styled.button`
    all: unset;
    cursor: pointer;
    margin-top: 1rem;
    svg {
        display: block;
    }
    margin-left: -1rem;
`;

export const StyledTextField = styled(TextField)`
    width: 100%;
    max-height: 45px;
    margin: 0;
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
        top: 42px;
    }
`;
export const KRATitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 2.5rem;
    width: auto;
    height: 60px;
    max-width: 100%;
`;
