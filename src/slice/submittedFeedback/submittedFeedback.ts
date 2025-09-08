import { createSlice } from '@reduxjs/toolkit';
import { SubmittedFeedbackState } from './types';

export const initialState: SubmittedFeedbackState = {
    activeFeedbackType: -99,
    activeEmployee: []
};

export const submittedFeedbackSlice = createSlice({
    name: 'submittedFeedback',
    initialState,
    reducers: {
        updateSubFeedbackFilter(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        resetSubFeedbackFilter() {
            return initialState;
        }
    }
});
