import { submittedFeedbackSlice } from './submittedFeedback';
export const { updateSubFeedbackFilter, resetSubFeedbackFilter } = submittedFeedbackSlice.actions;
export default submittedFeedbackSlice.reducer;
export * from './types';
