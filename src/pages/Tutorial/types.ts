export interface TutorialItem {
    videoId: string;
    cardLabel: string;
    cardDescription: string;
    category: string;
    cardTag: string[];
    thumbnail: string;
}

export interface FlexBoxRowProps {
    gap?: string;
}

export interface TagChipProps {
    textColor?: string;
}
