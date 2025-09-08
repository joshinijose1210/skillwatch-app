import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MyFeedbackFilterState } from './types';

export const initialState: MyFeedbackFilterState = {
    // Initialize activeFeedbackType to -99 to indicate no specific selection
    activeFeedbackType: -99,
    activeEmployee: []
};

export const myFeedbackFilterSlice = createSlice({
    name: 'myFeedback',
    initialState,
    reducers: {
        updateMyFeedbackFilter(state, { payload }: PayloadAction<MyFeedbackFilterState>) {
            return {
                ...state,
                ...payload
            };
        },
        resetMyFeedbackFilter() {
            return initialState;
        }
    }
});
