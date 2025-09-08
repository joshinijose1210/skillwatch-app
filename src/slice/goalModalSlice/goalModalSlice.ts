import { ActionItem } from '@pages/ViewPreviousGoals/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: ActionItem = {
    actionItem: '',
    id: -99,
    createdAt: -99,
    targetDate: -99,
    progressId: 1,
    progressName: 'Pending'
};

// redux state for goal data which is shown in modal when clicking on view button in goals table
export const goalModalSlice = createSlice({
    name: 'goalModalSlice',
    initialState,
    reducers: {
        setGoalModal(state, { payload }: PayloadAction<ActionItem>) {
            return {
                ...state,
                ...payload
            };
        },
        closeGoalModal() {
            return initialState;
        }
    }
});
