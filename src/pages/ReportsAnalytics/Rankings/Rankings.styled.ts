import { Badge } from '@components/reusableComponents/Badge/Badge';
import { Box, Text } from '@medly-components/core';
import styled from 'styled-components';

export const StyledBox = styled.div`
    background-color: #fafafa;
    border-radius: 8px;
    width: calc(30% - 1rem);
    padding: 0 3rem 3rem 3rem;
    display: flex;
    flex-direction: column;
    min-height: 37rem;
    max-height: calc(100vh - 45rem);
    overflow-y: auto;
    position: relative;

    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

export const TitleHeader = styled.div`
    position: sticky;
    background-color: #fafafa;
    padding-top: 3rem;
    padding-bottom: 2rem;
    top: 0;
`;

export const RankingDetail = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const RankingDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    ${Box.Style} {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0;
        ${Text.Style} {
            font-size: 1.4rem;
            &.employeeId {
                font-size: 1.2rem;
            }
        }
    }
`;

export const StyledBadge = styled(Badge)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 0.5rem;
    border-radius: 0.3rem;
    svg {
        width: 1.4rem;
        height: 1.4rem;
    }
    ${Text.Style} {
        font-size: 1.6rem;
    }
`;
