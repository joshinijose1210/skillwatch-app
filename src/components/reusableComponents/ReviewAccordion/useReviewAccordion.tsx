import { reviewRatingOptionsChip } from '@constants/data';
import { AccordionType } from './types';
import { useState } from 'react';

export const useReviewAccordion = (type: AccordionType) => {
    const [active, setActive] = useState(type === 'checkin');
    const titles: Record<AccordionType, string> = {
        self: 'Self Rating: ',
        manager1: 'Manager 1 Rating: ',
        manager2: 'Manager 2 Rating: ',
        checkin: 'Check-In Rating: '
    };

    const toggleAccordion = () => setActive(prev => !prev);

    const getAccordionTitle = (type: AccordionType, rating: number) =>
        `${titles[type]} ${rating} - ${reviewRatingOptionsChip[rating - 1].label}`;

    return { getAccordionTitle, active, toggleAccordion };
};
