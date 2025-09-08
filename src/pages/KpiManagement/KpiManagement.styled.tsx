import { Button, Text } from '@medly-components/core';
import styled from 'styled-components';
import { StyledMultiSelect as StyledMultiSelectParent, StyledToggleWrapper } from '@common';

export const ToggleWrapper = styled(StyledToggleWrapper)`
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    align-items: center;
`;

export const KpiModalHeader = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const TitleAndTeamWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 2rem;
    margin-bottom: 2rem;
`;

export const SearchBoxDiv = styled.div`
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
`;

export const SampleKpiLinksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    align-items: flex-start;
`;

export const IconAndLinkDiv = styled.div`
    display: flex;
    align-items: center;
`;

export const FlexBoxRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2rem;
`;

export const StyledMultiSelect = styled(StyledMultiSelectParent)`
    max-height: 45px;
    max-width: 22rem;
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

    > :last-child {
        max-height: 35rem;
        ${Text.Style} {
            font-size: 1.3rem;
        }
        > ul {
            max-height: 30rem;
        }
    }
`;

export const HeaderButtonsContainer = styled.div`
    display: flex;
    column-gap: 1rem;
`;

export const ListHeaderButton = styled(Button)<{ variant: string }>``;

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
        & > *:first-child,
        & > *:last-child {
            flex-basis: 100%;
        }
    }
`;

export const ScreenWidthWrapper = styled.div<{ action?: string }>`
    width: 77rem;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;
