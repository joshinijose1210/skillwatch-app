import { StyledAccordionTitle } from '@common';
import { StyledAccordion, StyledAccordionContent, StyledAccordionHead } from '@pages/ReviewTimeline/ReviewTimeline.styled';
import { useReviewAccordion } from './useReviewAccordion';
import { ReviewAccordionProps } from './types';
import { KpiDescriptionContainer } from '@pages/CheckInWithManager/CheckInWithManagerForm/CheckInWithManagerForm.styled';
import DOMPurify from 'dompurify';
import { StyledTitleText } from './ReviewAccordion.styled';

export const ReviewAccordion = ({ type, rating, response }: ReviewAccordionProps) => {
    const { getAccordionTitle, active, toggleAccordion } = useReviewAccordion(type);

    return (
        <StyledAccordion active={active} onChange={toggleAccordion}>
            <StyledAccordionHead>
                <StyledAccordionTitle textWeight="Medium">{getAccordionTitle(type, rating)}</StyledAccordionTitle>
            </StyledAccordionHead>
            <StyledAccordionContent active={active}>
                <StyledTitleText>Review:</StyledTitleText>
                <KpiDescriptionContainer
                    dangerouslySetInnerHTML={{ __html: response ? DOMPurify.sanitize(response) : 'Review response not provided' }}
                />
            </StyledAccordionContent>
        </StyledAccordion>
    );
};
