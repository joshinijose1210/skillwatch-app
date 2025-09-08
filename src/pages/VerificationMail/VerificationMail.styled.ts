import { Text } from '@medly-components/core';
import styled from 'styled-components';

export const StyledMainHeading = styled(Text)`
    display: flex;
    align-items: center;
    gap: 2rem;

    h2 {
        margin-top: revert;
    }
`;

export const StyledBox = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const MailBoxAnimation = styled.div`
    width: 13%;
`;
export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 5rem;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`;

export const StyleText = styled(Text)`
    color: blue;
    text-decoration: underline;
`;
