import { Text } from '@medly-components/core';
import { ArrowForwardIosIcon } from '@medly-components/icons';
import { FC } from 'react';
import { StyledNavEl } from '../Sidenav.styled';
import { ArrowIcon, NavAccordionWrapper, RightSection } from './NavAccordion.styled';
import { NavAccordionProps } from './types';

export const NavAccordion: FC<NavAccordionProps> = ({ title, icon, content, handleAccordionClick, activeAccordion }) => {
    const active: boolean = activeAccordion === title;

    return (
        <NavAccordionWrapper accordionOpen={active}>
            <StyledNavEl onClick={() => handleAccordionClick(title)}>
                {icon}
                <RightSection>
                    <Text textWeight={active ? 'Medium' : 'Regular'}>{title}</Text>
                    <ArrowIcon accordionOpen={active}>
                        <ArrowForwardIosIcon />
                    </ArrowIcon>
                </RightSection>
            </StyledNavEl>
            {active && content}
        </NavAccordionWrapper>
    );
};
