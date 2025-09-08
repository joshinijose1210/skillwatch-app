import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './types';

export const initialState: FilterState = {
    dateRange: {
        startDate: null,
        endDate: null
    },
    feedbackType: -99
};

export const feedbackFilterSlice = createSlice({
    name: 'feedbackFilter',
    initialState,
    reducers: {
        updateFeedbackFilter(state, { payload }: PayloadAction<Partial<FilterState>>) {
            return {
                ...state,
                ...payload
            };
        },
        resetFilters() {
            return initialState;
        }
    }
});
