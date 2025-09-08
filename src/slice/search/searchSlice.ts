import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchInterface } from './types';

export const initialState: SearchInterface = {
    searchText: '',
    modulePath: ''
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateSearch(state, { payload }: PayloadAction<SearchInterface>) {
            return {
                ...state,
                ...payload
            };
        }
    }
});
