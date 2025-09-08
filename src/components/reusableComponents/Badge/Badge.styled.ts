import styled from 'styled-components';
import { Props } from './types';

export const BadgeWrapper = styled.div<Props>`
    background-color: ${({ bgColor }) => bgColor ?? '#fff'};
    border-radius: ${({ borderRadius }) => borderRadius ?? '0.2rem'};
    padding: ${({ pd }) => pd ?? '0.5rem 1rem'};
`;
