import { searchSlice } from './searchSlice';
export const { updateSearch } = searchSlice.actions;
export default searchSlice.reducer;
export * from './types';
