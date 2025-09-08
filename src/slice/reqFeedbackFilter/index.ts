import { reqFeedbackFilterSlice } from './reqFeedbackFilter';

export default reqFeedbackFilterSlice.reducer;
export const { updateReqFBFilter, resetReqFBFilter } = reqFeedbackFilterSlice.actions;
export { initialState as reqFBInitialState } from './reqFeedbackFilter';
