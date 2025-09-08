import { Text } from '@medly-components/core';
import styled from 'styled-components';

export const StyledTitleText = styled(Text).attrs({
    textWeight: 'Medium'
})`
    margin-top: 1rem;
    font-size: ${({ theme }) => theme.contentFontSize};
    color: ${({ theme }) => theme.contentColor};
`;
