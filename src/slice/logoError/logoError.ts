import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    logoUploadError: ''
};

export const logoErrorSlice = createSlice({
    name: 'logoError',
    initialState,
    reducers: {
        setLogoError(state, { payload }) {
            return {
                ...state,
                logoUploadError: payload
            };
        }
    }
});
