import styled from 'styled-components';

import bulbOff from '@constants/images/icons/lightbulb_on.png';
import { Box, Input, Text } from '@medly-components/core';

export const StyledContainer = styled.div`
    display: flex;
`;

export const BulbImg = styled.div`
    background-image: url(${bulbOff});
    background-position: center;
    background-size: contain;
    width: 2.8rem;
    height: 2.8rem;
    background-repeat: no-repeat;
    margin-left: 0.5rem;
`;

export const TipHeaderText = styled(Box)`
    color: black;
    padding: 0;
    background-color: transparent;
`;

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    column-gap: 5rem;
    row-gap: 4rem;
`;

export const FormInput = styled.div`
    display: flex;
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    #medly-textField-input-wrapper {
        width: 25rem;
    }
    div {
        transition: 100ms ease-out;
        &:hover {
            box-shadow: 0.1px 0.2rem 0.8rem rgba(96, 120, 144, 0.2);
        }
    }
`;

export const ErrorContainer = styled.div`
    margin-top: 1rem;
    grid-area: 4/1;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    width: 79%;
    justify-content: flex-end;
`;

export const StyledTextField = styled(Input)`
    max-height: 45px;
    width: 10rem;
`;

export const StyledText = styled(Text)`
    font-size: ${({ theme }) => theme.contentFontSize};
    color: ${({ theme }) => theme.contentColor};
`;
