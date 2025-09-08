import { Text } from '@medly-components/core';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 50vw;
    margin-left: auto;
    margin-right: auto;
`;

export const StyledLogo = styled.div`
    position: absolute;
    left: 2rem;
    top: 2rem;
    height: 10rem;
    width: 20rem;
`;

export const StyledImage = styled.img`
    width: 40rem;
`;

export const FlexBoxRow = styled.div`
    display: flex;
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

export const StyledText = styled(Text)`
    color: #6e7171;
`;
