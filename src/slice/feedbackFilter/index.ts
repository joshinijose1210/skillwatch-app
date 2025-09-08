import { feedbackFilterSlice } from './feedbackFilter';
export const { updateFeedbackFilter, resetFilters } = feedbackFilterSlice.actions;
export default feedbackFilterSlice.reducer;
export * from './types';
