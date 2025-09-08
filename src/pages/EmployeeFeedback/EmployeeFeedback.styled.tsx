import { DateRangePicker } from '@medly-components/core';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const StyledDateRangePicker = styled(DateRangePicker)`
    max-width: 25rem;
    max-height: 45px;
    margin-left: 1rem;
    div {
        padding: 0.25rem;
    }
    label {
        line-height: 1.9rem;
        color: #666 !important;
    }
    input {
        font-size: 1.3rem;
        &::placeholder {
            color: transparent;
        }
    }

    svg path {
        fill: #666;
    }
`;

export const DatePickerDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    svg:nth-child(2) {
        position: absolute;
        right: 1.2rem;
        z-index: 1;

        :hover {
            cursor: pointer;
        }
    }

    svg:nth-child(2) > path {
        :hover {
            fill: red;
        }
    }
`;

export const FilterContainer = styled.div`
    display: flex;
    align-items: center;
`;
