import { receivedFeedbackSlice } from './receivedFeedback';
export const { updateReceivedFeedbackFilter, resetReceivedFeedbackFilter } = receivedFeedbackSlice.actions;
export default receivedFeedbackSlice.reducer;
export * from './types';
