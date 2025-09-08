import { defaultTheme } from '@theme';
import { CategoriesType, GraphColorSchemeType, IStatusColors, ReviewGraphKeys } from './types';

export const graphColorScheme: GraphColorSchemeType = {
    Positive: defaultTheme.customColors.positiveGraphColor,
    Improvement: defaultTheme.customColors.unacceptable,
    Appreciation: defaultTheme.customColors.appreciationGraphColor
};

export const dataCategories: CategoriesType[] = ['Positive', 'Improvement', 'Appreciation'];

export const statusColors: IStatusColors = {
    completedColor: defaultTheme.customColors.completedColor,
    inProgressColor: defaultTheme.customColors.inProgressColor,
    pendingColor: defaultTheme.customColors.pendingColor
};

export const statusCategories: string[] = ['completed', 'inProgress', 'pending'];

export const reviewStatusGraphData = [
    { reviewStatus: 'Self', completed: 0, inProgress: 0, pending: 0 },
    { reviewStatus: 'Manager1', completed: 0, inProgress: 0, pending: 0 },
    { reviewStatus: 'Manager2', completed: 0, inProgress: 0, pending: 0 },
    { reviewStatus: 'Check-In', completed: 0, inProgress: 0, pending: 0 }
];

export const reviewGraphKeys: ReviewGraphKeys = {
    self: 'Self',
    manager1: 'Manager 1',
    manager2: 'Manager 2',
    checkIn: 'Check-In'
};
