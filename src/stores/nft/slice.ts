import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMeta } from '../../services/reponse.type';
import { EActionStatus } from './../type';
import { IGetAllNftQuery, INft, INftState } from './type';

const initialState: INftState = {
    status: EActionStatus.Idle,
    nftList: [],
    page: 1,
    limit: 1000,
    errorMessage: undefined,
};

const nftSlice = createSlice({
    name: 'nft',
    initialState,
    reducers: {
        getAllNftRequest: (state: INftState, _: PayloadAction<IGetAllNftQuery>) => {
            state.status = EActionStatus.Pending;
        },
        getAllNftSuccess: (state: INftState, action: PayloadAction<{ items: INft[]; meta: IMeta }>) => {
            state.status = EActionStatus.Succeeded;
            state.nftList = action.payload.items;
            state.page = action.payload.meta.currentPage;
            state.limit = action.payload.meta.itemsPerPage;
        },
        getAllNftFailed: (state: INftState, action: PayloadAction<{ errorMessage: string }>) => {
            state.status = EActionStatus.Failed;
            state.errorMessage = action.payload.errorMessage;
        },
        resetError: (state: INftState) => {
            state.errorMessage = undefined;
        },
    },
});

export const { getAllNftRequest, getAllNftSuccess, getAllNftFailed, resetError } = nftSlice.actions;

export default nftSlice.reducer;
