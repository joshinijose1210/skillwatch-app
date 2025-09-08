import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SuggestionReceivedFilterState } from './types';

export const SuggestionReceivedFilterInitialState: SuggestionReceivedFilterState = {
    progressId: -99
};

export const suggestionReceivedFilterSlice = createSlice({
    name: 'suggestionReceivedFilter',
    initialState: SuggestionReceivedFilterInitialState,
    reducers: {
        updateSuggestionReceivedFilter(state, { payload }: PayloadAction<SuggestionReceivedFilterState>) {
            return {
                ...state,
                ...payload
            };
        },
        resetSuggestionReceivedFilter() {
            return SuggestionReceivedFilterInitialState;
        }
    }
});
