import { StyledProps } from '@common/types';
import { Accordion, Text } from '@medly-components/core';
import styled from 'styled-components';
import { AccordianHeaderProps } from './types';

export const SlackImage = styled.img`
    height: 20px;
    width: 20px;
    margin: 0 5px;
`;

export const IntegrationCardIcon = styled.img`
    height: 70px;
    width: 70px;
    margin: 0 5px;
`;

export const IntegrationAccordian = styled(Accordion)<StyledProps>`
    button[aria-expanded='true'] {
        border-bottom: none;
    }
`;

export const AccordionHeader = styled(Accordion.Header)<AccordianHeaderProps>`
    display: flex;
    align-items: center;
    background-color: unset;
    border: 1.5px solid ${({ theme }) => theme.colors.grey[400]};
`;

export const AccordionContent = styled(Accordion.Content)`
    padding-left: 13rem;
    padding-bottom: 2rem;
    background-color: unset;
    border: 1.5px solid ${({ theme }) => theme.colors.grey[400]};
    border-top: none;

    button {
        margin-top: 1rem;
    }

    > h4:first-child {
        margin-top: -4px;
    }
`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0 10px 0;
    padding-bottom: 1rem;
`;

export const Header = styled(Text)`
    margin-top: 1rem;
`;

export const SlackText = styled(Text)`
    margin-bottom: 0.5rem;
`;

export const BulletsHeader = styled(Text)`
    margin: 1rem 0;
`;

export const BulletsWrapper = styled.ul`
    padding-left: 4rem;
    margin-top: -10px;
`;

export const Bullets = styled.li``;

export const SlackLogo = styled.img`
    width: 50px;
    margin: 0 40px 0 40px;
`;
