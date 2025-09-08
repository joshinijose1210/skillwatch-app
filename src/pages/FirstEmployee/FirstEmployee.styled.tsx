import styled from 'styled-components';

export const StyledLottie = styled.div`
    width: 100%;
    margin-top: 5rem;

    div {
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

export const StyledFlexDiv = styled.div`
    display: flex;
    column-gap: 1rem;
`;
