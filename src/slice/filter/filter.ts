import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, Partial } from './types';

export const initialState: FilterState = {
    designationName: [],
    departmentName: [],
    teamName: [],
    roleName: [],
    search: ''
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateFilter(state, { payload }: PayloadAction<Partial<FilterState>>) {
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
