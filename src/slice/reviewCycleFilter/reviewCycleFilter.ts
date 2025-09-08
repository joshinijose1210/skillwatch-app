import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
    reviewCycleList: number[];
}
export const initialState: FilterState = {
    reviewCycleList: []
};

export const reviewCycleFilterSlice = createSlice({
    name: 'reviewCycleFilter',
    initialState,
    reducers: {
        updateReviewCycleFilter(state, { payload }: PayloadAction<FilterState>) {
            return {
                ...state,
                ...payload
            };
        }
    }
});
