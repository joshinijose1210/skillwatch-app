import { filterSlice } from './filter';
export const { updateFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
export * from './types';
