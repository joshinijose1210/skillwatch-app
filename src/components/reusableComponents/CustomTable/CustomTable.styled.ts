import { Table, Text } from '@medly-components/core';
import styled from 'styled-components';

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;

    ul li button span {
        color: #666;
    }

    ul li button:hover span {
        color: #333;
    }
`;

export const PaginationDetails = styled(Text)`
    font-size: 1.2rem;
    line-height: 2rem;
    color: #333;
`;

export const StyledTable = styled(Table)<{ columns: any }>`
    margin-top: 2rem;
    overflow: ${({ columns }) => (columns[0]?.title === 'Reportee Name' ? 'visible' : 'auto')};
    td {
        padding: ${({ columns }) => (columns[0]?.title === 'Reportee Name' ? '0 1.6rem' : '1.2rem 1.6rem')};
        overflow: ${({ columns }) => (columns[0]?.title === 'Reportee Name' ? 'visible' : 'hidden')};
    }

    td span {
        color: ${({ theme }) => theme.contentColor};
    }

    th span {
        text-transform: capitalize;
        font-weight: 600 !important;
        color: ${({ theme }) => theme.pageTitleColor};
        line-height: 1.15 !important;
        letter-spacing: 0 !important;
    }
`;
export const StyledDiv = styled.div``;
