import { createSlice } from '@reduxjs/toolkit';
import { FilterState } from './types';

export const initialState: FilterState = {
    moduleName: '',
    selectedKRAs: [],
    selectedDepartments: [],
    selectedTeams: [],
    selectedDesignations: [],
    selectedStatus: 'true,false'
};

export const kpiFilterSlice = createSlice({
    name: 'KPIfilter',
    initialState,
    reducers: {
        updateKPIFilter(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        }
    }
});
