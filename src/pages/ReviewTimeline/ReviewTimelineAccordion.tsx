import TimelineIcon from '@components/reusableComponents/TimelineIcon';
import { FC } from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { StyledAccordion, StyledAccordionContent, StyledAccordionHead, TimelineContentWrapper } from './ReviewTimeline.styled';
import { ItemStatus, ReviewTimelineAccordionProp } from './types';

const ReviewTimelineAccordion: FC<ReviewTimelineAccordionProp> = ({ header, contentList = [] }) => {
    let accordionState: ItemStatus = 'active';
    const linkStatesList = contentList.map(({ state }) => state);
    if (linkStatesList.some(state => state === 'ongoing')) accordionState = 'ongoing';
    else if (linkStatesList.every(state => state === 'complete')) accordionState = 'complete';

    return (
        <VerticalTimelineElement
            id="sub-item"
            icon={<TimelineIcon state={accordionState} isSubTask={true} />}
            iconStyle={{ boxShadow: 'none', width: '30px', height: '30px', top: '5px', left: '5px' }}
            contentStyle={{ boxShadow: 'none', padding: '0' }}
        >
            <StyledAccordion>
                <StyledAccordionHead>{header}</StyledAccordionHead>
                <StyledAccordionContent>
                    {contentList.length > 0 &&
                        contentList.map(({ state, component }, i) => (
                            <VerticalTimelineElement
                                key={`${state}_${i}`}
                                id="sub-item"
                                icon={<TimelineIcon state={state} isSubTask={true} isAccordionTask={true} />}
                                iconStyle={{ boxShadow: 'none', width: '30px', height: '30px', top: '7px', left: '5px' }}
                                contentStyle={{ boxShadow: 'none', padding: '0', background: 'none', marginLeft: '40px' }}
                            >
                                <TimelineContentWrapper>{component}</TimelineContentWrapper>
                            </VerticalTimelineElement>
                        ))}
                </StyledAccordionContent>
            </StyledAccordion>
        </VerticalTimelineElement>
    );
};

export default ReviewTimelineAccordion;
