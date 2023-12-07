import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './type';

const initialState: AppState = {
    isOpenAdminSidebar: false,
};

const appSlice = createSlice({
    name: 'appStateGlobal',
    initialState,
    reducers: {
        toggleAdminSidebar: (state: AppState, action: PayloadAction<boolean>) => {
            state.isOpenAdminSidebar = action.payload;
        },
    },
});

export const { toggleAdminSidebar } = appSlice.actions;

export default appSlice.reducer;
