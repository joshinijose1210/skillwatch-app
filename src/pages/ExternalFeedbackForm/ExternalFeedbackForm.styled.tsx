import { Box, Text } from '@medly-components/core';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 100%;
    padding: 2rem 8rem;
`;

export const StyledLogo = styled.div`
    height: auto;
    width: 20rem;
`;

export const StyledHeading = styled(Text)`
    font-size: 1.4rem;
`;

export const FlexBoxRow = styled.div`
    display: flex;
    width: 100%;
    padding: 0;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 2rem;
`;

export const FlexBoxCenterAligned = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const StyledButtonWrapper = styled('div')`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

export const NavigationLink = styled(Text)`
    color: ${({ theme }) => theme.colors.blue[500]};
    cursor: pointer;
`;

export const PageTitle = styled(Text).attrs({
    textWeight: 'Medium',
    textVariant: 'h1'
})`
    margin-bottom: 2rem;
    display: flex;
    font-size: 2rem;
    line-height: 2.75rem;
`;

export const StyledText = styled(Text)`
    font-size: ${({ theme }) => theme.contentFontSize};
    font-weight: 400;
    line-height: 1.9rem;
    font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
`;

export const Row = styled(Box)<{ hasMarginTop?: boolean }>`
    padding: 0;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: ${({ hasMarginTop }) => (hasMarginTop ? '1rem' : 0)};
`;
