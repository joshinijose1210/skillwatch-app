export interface OptionsType {
    value: number | string | undefined;
    label: string;
}

export interface TooltipProps {
    dataIds: string[];
    values: OptionsType[];
}
