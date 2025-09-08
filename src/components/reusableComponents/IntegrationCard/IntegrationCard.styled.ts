import { Card } from '@medly-components/core';
import styled from 'styled-components';

export const CardContainer = styled(Card)`
    width: 28rem;
    height: fit-content;
    display: flex;
    flex: 0 0 25%;
    justify-content: flex-start;
    position: relative;
    transition: box-shadow 0.3s;
    border-radius: 1rem;
    /* this component is probably not being used anywhere, might be removed later */
    border: 0.1rem solid ${({ theme }) => theme.colors.yellow[400]};
    background: ${({ theme }) => theme.colors.white};
    :hover {
        box-shadow: 0 0 1.1rem rgba(33, 33, 33, 0.4);
    }
`;

export const StyledLogoSection = styled('div')`
    background-color: ${({ theme }) => theme.colors.white};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem 0;
`;

export const ComingSoonCard = styled(Card)`
    position: absolute;
    backdrop-filter: blur(0.5rem);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.25s;

    > * {
        transform: translateY(2rem);
        transition: transform 0.25s;
    }

    :hover {
        opacity: 1;
    }

    :hover > * {
        transform: translateY(0);
    }
`;

export const ContentSection = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    padding: 2rem 1rem 0 1rem;
    /* this component is probably not being used anywhere, might be removed later */
    background-color: ${({ theme }) => theme.colors.blue['400']};
`;

export const FooterSection = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    width: 100%;
    /* this component is probably not being used anywhere, might be removed later */
    background-color: ${({ theme }) => theme.colors.blue['400']};
`;
