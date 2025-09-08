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
export const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
`;
export const StyledBox = styled.div`
    width: 100%;
    height: 80vh;
    column-gap: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LeftContainer = styled.div`
    width: 18%;
`;
export const RightContainer = styled.div`
    max-width: 350px;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    #medly-textField-input {
        line-height: 1.5rem;
    }
`;
export const StyleHeading = styled(Text)`
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.grey[900]};
`;

export const StyleSubHeading = styled(Text)`
    text-align: center;
    color: ${({ theme }) => theme.colors.grey[700]};
`;

export const ButtonContainer = styled('div')``;
