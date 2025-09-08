import { createSlice } from '@reduxjs/toolkit';
import { ReceivedFeedbackState } from './types';

export const initialState: ReceivedFeedbackState = {
    activeFeedbackType: -1,
    activeFromEmployees: []
};

export const receivedFeedbackSlice = createSlice({
    name: 'receivedFeedback',
    initialState,
    reducers: {
        updateReceivedFeedbackFilter(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        resetReceivedFeedbackFilter() {
            return initialState;
        }
    }
});
