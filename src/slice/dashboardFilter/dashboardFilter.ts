import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
    reviewCycle: string;
}
export const initialState: FilterState = {
    reviewCycle: ''
};

export const dashboardReviewCycleFilterSlice = createSlice({
    name: 'DashboardReviewCycleFilter',
    initialState,
    reducers: {
        dashboardFilter(state, { payload }: PayloadAction<string>) {
            return {
                ...state,
                reviewCycle: payload
            };
        },
        dashboardResetReviewCycleFilter() {
            return initialState;
        }
    }
});
