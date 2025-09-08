import { Button } from '@medly-components/core';
import styled from 'styled-components';

export const StyledGoBackButton = styled(Button)`
    all: unset;
    width: fit-content;
    padding: 0;
    span {
        font-size: 1.6rem;
        font-weight: 700;

        :hover {
            text-decoration: underline;
        }
    }
`;

export const FlexStartDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
`;
