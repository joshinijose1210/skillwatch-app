import { StyledAccordionHead, StyledAccordionContent, StyledAccordion } from '../ReviewTimeline.styled';
import { useReviewTips } from './useReviewTips';
import { TipsList } from './TipsList';
import { ReviewCycleTipsProps } from './types';
import { StyledAccordionTitle } from '@common';

export const ReviewCycleTips = ({ timelineData }: ReviewCycleTipsProps) => {
    const {
        data: { tipsData, activePhase, handleToggle }
    } = useReviewTips(timelineData);
    return (
        <div style={{ width: '50%' }}>
            {tipsData.map((item, index) => (
                <StyledAccordion onChange={() => handleToggle(item.phase)} active={activePhase === item.phase} key={index}>
                    <StyledAccordionHead>
                        <StyledAccordionTitle textWeight="Medium">Tips for {item.title}</StyledAccordionTitle>
                    </StyledAccordionHead>
                    <StyledAccordionContent active={activePhase === item.phase}>
                        <TipsList title={item.sections[0] || ''} listContents={item.generalGuidelines} />
                        <TipsList title={item.sections[1] || ''} listContents={item.related} />
                    </StyledAccordionContent>
                </StyledAccordion>
            ))}
        </div>
    );
};
