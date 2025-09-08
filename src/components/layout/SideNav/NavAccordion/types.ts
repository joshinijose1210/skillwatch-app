export interface NavAccordionProps {
    title: string;
    content: React.ReactNode;
    icon: React.ReactNode;
    handleAccordionClick: (name: string) => void;
    activeAccordion: string;
}
