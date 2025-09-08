import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
    reviewCycle: string;
}
export const initialState: FilterState = {
    reviewCycle: ''
};

export const analyticsReviewCycleFilterSlice = createSlice({
    name: 'AnalyticsReviewCycleFilter',
    initialState,
    reducers: {
        analyticsFilter(state, { payload }: PayloadAction<string>) {
            return {
                ...state,
                reviewCycle: payload
            };
        },
        analyticsResetReviewFilter() {
            return initialState;
        }
    }
});
