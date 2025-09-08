import styled from 'styled-components';

export const PageContent = styled('main')`
    background-color: ${({ theme }) => theme.colors.white};
    overflow-x: hidden;
    padding-bottom: 1.5rem;
    padding-top: 2rem;

    @media (max-width: 1279px) {
        padding-left: 16px;
        padding-right: 16px;
    }

    @media (min-width: 1280px) {
        padding-left: calc(16px + (((100vw - 1280px) / 160) * 16));
        padding-right: calc(16px + (((100vw - 1280px) / 160) * 16));
    }

    @media (min-width: 1440px) {
        padding-left: 24px;
        padding-right: 24px;
    }

    :has(div.form-division) {
        padding-right: 0;
    }
`;

export const Loader = styled('div')`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1;
`;
