import { MultiSelectProps } from '@medly-components/core/dist/es/types';

export interface SelectTeamprops {
    values: never[];
    onChange: MultiSelectProps['onChange'];
    disabled?: boolean;
}

export type DataType = {
    id: number;
    teamName: string;
};
