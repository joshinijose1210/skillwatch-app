import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';
import { TableColumnConfig } from '@medly-components/core';
import { IReqFBInitialState } from '@slice/reqFeedbackFilter/types';

export interface MyFeedbackProps {
    action?: string;
}

export type TabType = 'index' | 'submitted' | 'received' | 'inbox' | 'sent';

export interface Tag {
    feedbackType: string;
    feedbackTypeId: number;
}

export type TagsList = OptionsType[];

export interface CustomTableData {
    data: unknown[];
    count: number;
    isLoading: boolean;
    handleSort: (order: string) => void;
    columns: TableColumnConfig[];
}

export interface RequestFeedbackFiltersProps {
    activeTab: TabType;
    dataIds: string[];
    ReqOrFromToolTipValues: OptionsType[];
    FeedbackToToolTipValues: OptionsType[];
    employeeList: () => OptionsType[];
    handleDropdownChange: (name: string, value: unknown) => void;
    reqFeedbackFilter: IReqFBInitialState;
}

export interface MyFeedbackFiltersProps {
    dataIds: string[];
    employeeList: () => OptionsType[];
    myFeedbackTooltipValues: OptionsType[];
    handleDropdownChange: (name: string, value: unknown) => void;
    selectedEmployees: unknown[];
    tagsList: TagsList;
    activeTab: TabType;
    selectedFeedbackType: number;
}
