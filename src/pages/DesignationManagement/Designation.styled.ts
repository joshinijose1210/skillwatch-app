import { SingleSelect, Text } from '@medly-components/core';
import styled from 'styled-components';

export const StyledSingleSelect = styled(SingleSelect)`
    max-height: 45px;
    max-width: 30rem;
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

    #team-options {
        max-height: 11rem;
        ${Text.Style} {
            font-size: 1.3rem;
        }
    }
`;
