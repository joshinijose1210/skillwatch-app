import { userSlice } from './user';
export const { addUser, removeUser, syncUser } = userSlice.actions;
export default userSlice.reducer;
export * from './types';
