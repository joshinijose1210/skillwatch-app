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
    justify-content: center;
    align-items: center;
`;

export const LeftContainer = styled.div`
    width: 35%;
`;
export const RightContainer = styled.div`
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 5rem 3rem;
    background-color: ${({ theme }) => theme.colors.grey[200]};
    border-radius: 3rem;
`;

export const StyleContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    #medly-textField-input {
        line-height: 1.5rem;
    }
`;
