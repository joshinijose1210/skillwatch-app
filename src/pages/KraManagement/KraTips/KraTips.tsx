import { useState } from 'react';
import { StyledAccordionHead, StyledAccordionContent, StyledAccordion } from '../../ReviewTimeline/ReviewTimeline.styled';
import { KraTipsList } from './KraTipsList';
import { kraTips } from './KraTipsData';
import { StyledAccordionTitle } from '@common';

export const KraTips = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div style={{ width: '50%' }}>
            {kraTips.map((item, index) => (
                <StyledAccordion active={index === activeIndex} key={index} onChange={() => setActiveIndex(index)}>
                    <StyledAccordionHead>
                        <StyledAccordionTitle textWeight="Medium">{item.title}</StyledAccordionTitle>
                    </StyledAccordionHead>
                    <StyledAccordionContent active={index === activeIndex}>
                        <KraTipsList focus={item.focus} tips={item.tips} whyItMatters={item.whyItMatters} />
                    </StyledAccordionContent>
                </StyledAccordion>
            ))}
        </div>
    );
};
