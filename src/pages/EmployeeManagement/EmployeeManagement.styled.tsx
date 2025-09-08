import { StyledSearchBox as StyledSearchBoxParent } from '@common';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    column-gap: 5rem;
`;

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    @media (max-width: 1815px) {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: flex-end;
        & > *:last-child {
            flex-basis: 100%;
        }
    }
`;

export const StyledSearchBox = styled(StyledSearchBoxParent)`
    min-width: 35rem;
    max-width: unset;
    max-height: 45px;

    input {
        color: #333;
    }

    input::placeholder {
        color: #666;
    }
`;
