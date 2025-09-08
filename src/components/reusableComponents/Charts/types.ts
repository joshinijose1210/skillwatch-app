import { ReactNode } from 'react';

export interface LineChartProps {
    rating: number;
    ratingBy?: string;
}

export interface BarChartProps {
    rating: number;
}

export type DataChunk = {
    id: string;
    label: string;
    value: number;
    color: string;
};

export type PieChartPropTypes = {
    data: DataChunk[];
    title: ReactNode;
    noData?: boolean;
    padAngle?: number;
    enableArcLabels?: boolean;
    enableArcLinkLabels?: boolean;
    margin?: number;
    isInteractive?: boolean;
};
