import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateManagerDetails, UpdateManagerState } from './types';

export const initialState: UpdateManagerState = {
    managerUpdateDataList: []
};

export const updateManagerSlice = createSlice({
    name: 'updateManager',
    initialState,
    reducers: {
        setManagerList(state, { payload }: PayloadAction<UpdateManagerDetails[]>) {
            state.managerUpdateDataList = payload;
        },
        updateManagerList(state, { payload }: PayloadAction<UpdateManagerDetails>) {
            const { employeeId, newManagerId } = payload;
            const userIndex = state.managerUpdateDataList.findIndex(data => data.employeeId === employeeId);
            if (userIndex !== -1) {
                state.managerUpdateDataList[userIndex].newManagerId = newManagerId;
            }
        }
    }
});
