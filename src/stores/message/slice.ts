import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageState } from "./type";

const initialState: MessageState = {
    visibleWrongNetwork: false,
    visibleInvalidLoggedAddress: false,
    isClosedInvalidLoggedAddress: false,
};

const messageSlice = createSlice({
    name: "messageGlobal",
    initialState,
    reducers: {
        showWrongNetwork: (state: MessageState) => {
            state.visibleWrongNetwork = true;
        },
        hideWrongNetwork: (state: MessageState) => {
            state.visibleWrongNetwork = false;
        },
        toggleInvalidLoggedAddress: (
            state: MessageState,
            action: PayloadAction<boolean>
        ) => {
            state.visibleInvalidLoggedAddress = action.payload;
        },
        hideInvalidLoggedAddress: (state: MessageState) => {
            state.visibleInvalidLoggedAddress = false;
            state.isClosedInvalidLoggedAddress = true;
        },
    },
});

export const {
    showWrongNetwork,
    hideWrongNetwork,
    toggleInvalidLoggedAddress,
    hideInvalidLoggedAddress,
} = messageSlice.actions;

export default messageSlice.reducer;
