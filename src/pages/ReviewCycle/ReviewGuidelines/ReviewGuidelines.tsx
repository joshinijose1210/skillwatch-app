import { useState } from 'react';
import { StyledAccordionHead, StyledAccordionContent, StyledAccordion } from '../../ReviewTimeline/ReviewTimeline.styled';
import { GuidelinesList } from './GuidelineList';
import { reviewGuidelines } from './reviewGuidelinesData';
import { StyledAccordionTitle } from '@common';

export const ReviewGuidelines = () => {
    const [activeGuideline, setActiveGuideline] = useState(0);

    const handleGuidelineExpand = (index: number) => {
        setActiveGuideline(index);
    };

    return (
        <div style={{ width: '50%', marginTop: '6.5rem' }}>
            {reviewGuidelines.map((item, index) => (
                <StyledAccordion active={index === activeGuideline} key={index} onChange={() => handleGuidelineExpand(index)}>
                    <StyledAccordionHead>
                        <StyledAccordionTitle textWeight="Medium">{item.title}</StyledAccordionTitle>
                    </StyledAccordionHead>
                    <StyledAccordionContent active={index === activeGuideline}>
                        <GuidelinesList listContents={item.tips} />
                    </StyledAccordionContent>
                </StyledAccordion>
            ))}
        </div>
    );
};
