import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICheckInWithManagerState } from './types';

export const initialState: ICheckInWithManagerState = {
    employees: [],
    filterRatingId: -1,
    reviewStatus: undefined
};

export const checkInSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateCheckInFilters(state, { payload }: PayloadAction<ICheckInWithManagerState>) {
            return {
                ...state,
                ...payload
            };
        },
        resetCheckInFilters() {
            return initialState;
        }
    }
});
