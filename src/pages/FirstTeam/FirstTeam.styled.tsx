import { Button, Text } from '@medly-components/core';
import styled from 'styled-components';
import { StyledLottieProps } from './types';

export const LottieAndDivWrapper = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    column-gap: 10rem;
    @media (max-width: 900px) {
        display: flex;
        flex-direction: column;
    }
`;

export const StyledLottie = styled.div<StyledLottieProps>`
    width: ${({ width }) => width || '60%'};
    padding-top: ${({ paddingTop }) => paddingTop || '2rem'};
    margin-bottom: ${({ marginBottom }) => marginBottom || '0'};

    div {
        max-height: 70%;

        svg {
            display: inline-block;

            g {
                g:nth-child(78) {
                    opacity: 0;
                }
            }
        }
    }
`;

export const StyledAddFirstTeamDiv = styled.div`
    width: 100%;
    min-width: 440px;
    display: flex;
    align-items: flex-start;
`;

export const BorderDiv = styled.div`
    padding: 0.5rem;
    border: 2px solid ${({ theme }) => theme.colors.grey[200]};
    width: 100%;
`;

export const DivInsideDiv = styled.div`
    background-color: ${({ theme }) => theme.colors.grey[100]};
    padding: 2rem;
    display: flex;
    flex-direction: column;
    row-gap: 1.7rem;
`;

export const StyledText = styled(Text)``;

export const StyledButton = styled(Button)`
    width: fit-content;
    margin: 2rem 0;
`;

export const StyledSkipDiv = styled.div`
    display: flex;
    justify-content: end;
`;
export const StyledSkip = styled(Button)`
    width: fit-content;
    padding-right: 0;
`;

export const StyledGoBack = styled(Button)`
    width: fit-content;
    padding-left: 0;
`;

export const TextFieldDiv = styled.div`
    width: 50%;
`;

export const TeamAndDeleteButtonDiv = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledAddTeam = styled(Text)<{ isDisabled?: boolean }>`
    color: ${({ theme, isDisabled }) => (isDisabled ? theme.colors.grey[400] : theme.colors.blue[500])};
    cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
    display: inline-block;
    :hover {
        text-decoration: ${({ isDisabled }) => (isDisabled ? 'none' : 'underline')};
    }
`;

export const AddTeamButtonDiv = styled.div``;

export const CancelAndSaveButtonDiv = styled.div`
    display: flex;
    justify-content: end;
`;

export const FlexDiv = styled.div`
    display: flex;
    column-gap: 1rem;
`;
