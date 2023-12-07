import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICollection } from '../collection/type';
import { ModalState } from './type';

const initialState: ModalState = {
    openModalConnect: false,
    openModalPolicy: false,
    openModalRegisterAccount: false,
    openModalNotActiveAccount: false,
    openModalCreateCollection: false,
    openModalEditCollection: false,
    dataCollectionForm: null,
    openModalOrderCollection: false,
};

const modalSlice = createSlice({
    name: 'modalConnectGlobal',
    initialState,
    reducers: {
        showModalConnect: (state: ModalState) => {
            state.openModalConnect = true;
        },
        hideModalConnect: (state: ModalState) => {
            state.openModalConnect = false;
        },
        showModalPolicy: (state: ModalState) => {
            state.openModalPolicy = true;
        },
        hideModalPolicy: (state: ModalState) => {
            state.openModalPolicy = false;
        },
        showModalRegisterAccount: (state: ModalState) => {
            state.openModalRegisterAccount = true;
        },
        hideModalRegisterAccount: (state: ModalState) => {
            state.openModalRegisterAccount = false;
        },
        showModalNotActiveAccount: (state: ModalState) => {
            state.openModalNotActiveAccount = true;
        },
        hideModalNotActiveAccount: (state: ModalState) => {
            state.openModalNotActiveAccount = false;
        },
        showModalCreateCollection: (state: ModalState) => {
            state.openModalCreateCollection = true;
        },
        hideModalCreateCollection: (state: ModalState) => {
            state.openModalCreateCollection = false;
        },
        showModalEditCollection: (state: ModalState, action: PayloadAction<ICollection>) => {
            state.openModalEditCollection = true;
            state.dataCollectionForm = action.payload;
        },
        hideModalEditCollection: (state: ModalState) => {
            state.openModalEditCollection = false;
        },
        showModalOrderCollection: (state: ModalState) => {
            state.openModalOrderCollection = true;
        },
        hideModalOrderCollection: (state: ModalState) => {
            state.openModalOrderCollection = false;
        },
    },
});

export const {
    showModalConnect,
    hideModalConnect,
    showModalPolicy,
    hideModalPolicy,
    showModalRegisterAccount,
    hideModalRegisterAccount,
    showModalNotActiveAccount,
    hideModalNotActiveAccount,
    showModalCreateCollection,
    hideModalCreateCollection,
    showModalEditCollection,
    hideModalEditCollection,
    showModalOrderCollection,
    hideModalOrderCollection,
} = modalSlice.actions;

export default modalSlice.reducer;
