import styled from 'styled-components';
import { TextField } from '@medly-components/core';

export const TextFieldWrapper = styled.div`
    width: 100%;

    span {
        margin-top: 3px;
    }
`;

export const StyledTextField = styled(TextField)`
    width: 100%;
    max-height: 45px;
    margin: 0;
    div > div > input {
        line-height: 1.9rem;
        &::placeholder {
            color: transparent;
        }
    }
    div > div > label {
        line-height: 2.1rem;
        color: #666 !important;
    }
    span {
        position: absolute;
        top: 42px;
    }
`;
