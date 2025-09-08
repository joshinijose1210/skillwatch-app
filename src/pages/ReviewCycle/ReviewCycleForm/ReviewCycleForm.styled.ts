import { Button, DateRangePicker, Text } from '@medly-components/core';
import styled from 'styled-components';
import { PageContent } from '@components';

export const StyledPageContent = styled(PageContent)`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: start;
`;

// sum of paddings of the input field in the date input
export const StyledConfirmButton = styled(Button)`
    margin-right: calc(1.5rem + 0.9375rem);
`;

export const StyledDateRangePicker = styled(DateRangePicker)`
    max-width: 30rem;
    max-height: 45px;
    margin: 2rem 1.5rem;
    div {
        padding: 0.25rem;
    }
    label {
        line-height: 1.9rem;
    }
    input {
        font-size: 13px;
        &::placeholder {
            font-size: 13px;

            opacity: 0;
        }

        &:focus::placeholder {
            font-size: 13px;
            opacity: 1;
        }
    }

    input:not(:placeholder-shown) ~ span {
        opacity: 0 !important;
    }
`;

export const DatePickerDiv = styled.div<{ iconDisabled: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    svg:nth-child(2) {
        position: absolute;
        right: 2rem;
        z-index: 1;

        :hover {
            cursor: ${({ iconDisabled }) => (iconDisabled ? 'not-allowed' : 'pointer')};
        }
    }

    svg:nth-child(2) > path {
        :hover {
            fill: red;
        }
    }
`;

export const StyledText = styled(Text).attrs({
    textVariant: 'h4',
    textWeight: 'Regular'
})`
    font-size: ${({ theme }) => theme.contentFontSize};
    color: ${({ theme }) => theme.contentColor};
`;
