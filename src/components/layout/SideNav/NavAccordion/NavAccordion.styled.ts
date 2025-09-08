import { SvgIcon } from '@medly-components/icons';
import styled from 'styled-components';

export const NavAccordionWrapper = styled.li<{ accordionOpen?: boolean }>`
    & > li:first-child {
        background-color: ${({ theme, accordionOpen }) => accordionOpen && theme.colors.grey[50]};
    }
    position: relative;
`;

export const RightSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ArrowIcon = styled.div<{ accordionOpen?: boolean; active?: boolean }>`
    display: flex;
    align-items: center;
    position: absolute;
    right: 15px;
    transform: ${({ accordionOpen }) => (accordionOpen ? 'rotateZ(90deg)' : 'rotateZ(0deg)')};
    transition: transform 0.3s ease;
    ${SvgIcon} {
        padding: 0;
        width: 10px;
    }
`;
