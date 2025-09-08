import { goalModalSlice } from './goalModalSlice';
export default goalModalSlice.reducer;
export { initialState as goalModalInitialState } from './goalModalSlice';
export const { closeGoalModal, setGoalModal } = goalModalSlice.actions;
