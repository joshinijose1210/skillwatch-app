import { defaultTheme } from '@theme';
import { CategoriesType, GraphColorSchemeType, IBarGraphData } from './types';

export const graphColorScheme: GraphColorSchemeType = {
    'Full-time employee': defaultTheme.customColors.appreciation,
    Consultants: defaultTheme.customColors.inProgressColor
};

export const dataCategories: CategoriesType[] = ['Full-time employee', 'Consultants'];

export const employeeExperienceGraphData: IBarGraphData[] = [
    { id: '0-1 years', label: '0-1 years', value: 0 },
    { id: '1-3 years', label: '1-3 years', value: 0 },
    { id: '3-7 years', label: '3-7 years', value: 0 },
    { id: '7-10 years', label: '7-10 years', value: 0 },
    { id: '10-15 years', label: '10-15 years', value: 0 },
    { id: '15-20 years', label: '15-20 years', value: 0 },
    { id: '20+ years', label: '20+ years', value: 0 }
];

export const employeeTeamCountGraphData: IBarGraphData[] = [
    { id: 'HR', label: 'HR', value: 0 },
    { id: 'Tech Ops', label: 'Tech Ops', value: 0 },
    { id: 'BA', label: 'BA', value: 0 },
    { id: 'PM', label: 'PM', value: 0 },
    { id: 'UI/UX Designer', label: 'UI/UX Designer', value: 0 },
    { id: 'QA', label: 'QA', value: 0 },
    { id: 'Finance', label: 'Finance', value: 0 },
    { id: 'BE Devs', label: 'BE Devs', value: 0 },
    { id: 'FE Devs', label: 'FE Devs', value: 0 }
];
