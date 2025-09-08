import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReqFBInitialState } from './types';

export const initialState: IReqFBInitialState = {
    feedbackTo: [],
    reqOrFrom: [],
    status: 'All'
};

export const reqFeedbackFilterSlice = createSlice({
    name: 'reviewCycleFilter',
    initialState,
    reducers: {
        updateReqFBFilter(state, { payload }: PayloadAction<IReqFBInitialState>) {
            return {
                ...state,
                ...payload
            };
        },
        resetReqFBFilter() {
            return initialState;
        }
    }
});
