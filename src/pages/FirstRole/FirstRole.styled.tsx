import styled from 'styled-components';

export const LottieAndDivWrapper = styled.div`
    margin-top: 10rem;
    display: flex;
    align-items: center;
    column-gap: 10rem;
    @media (max-width: 900px) {
        display: flex;
        flex-direction: column;
    }
`;

export const StyledLottie = styled.div`
    width: 70%;
    margin-top: 2rem;
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
