export type AccordionType = 'self' | 'manager1' | 'manager2' | 'checkin';

export interface ReviewAccordionProps {
    rating: number;
    type: AccordionType;
    response: string;
}
