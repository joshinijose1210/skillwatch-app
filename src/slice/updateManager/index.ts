import { updateManagerSlice } from './updateManager';
export const { updateManagerList, setManagerList } = updateManagerSlice.actions;
export default updateManagerSlice.reducer;
export * from './types';
