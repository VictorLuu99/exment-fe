import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMeta } from '../../services/reponse.type';
import { EActionStatus } from './../type';
import {
    CreateCollectionInput,
    EditCollectionInput,
    ICollection,
    ICollectionState,
    IGetAllCollectionQuery,
} from './type';

const initialState: ICollectionState = {
    status: EActionStatus.Idle,
    isCreating: EActionStatus.Idle,
    isEditing: EActionStatus.Idle,
    collectionList: [],
    page: 1,
    limit: 1000,
    keyword: '',
    collectionDetail: null,
    isDrafting: EActionStatus.Idle,
};

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        getAllCollectionsRequest: (state: ICollectionState, _: PayloadAction<IGetAllCollectionQuery>) => {
            state.status = EActionStatus.Pending;
        },
        getAllCollectionsSuccess: (
            state: ICollectionState,
            action: PayloadAction<{ items: ICollection[]; meta: IMeta }>,
        ) => {
            state.status = EActionStatus.Succeeded;
            state.collectionList = action.payload.items;
            state.page = action.payload.meta.currentPage;
            state.limit = action.payload.meta.itemsPerPage;
        },
        getAllCollectionsFailed: (state: ICollectionState, _: PayloadAction<{ errorCode: string }>) => {
            state.status = EActionStatus.Failed;
        },
        getCollectionBySlugRequest: (state: ICollectionState, _: PayloadAction<{ slug: string }>) => {
            state.status = EActionStatus.Pending;
        },
        getCollectionBySlugSuccess: (
            state: ICollectionState,
            action: PayloadAction<{
                collection: ICollection;
            }>,
        ) => {
            state.status = EActionStatus.Succeeded;
            state.collectionDetail = action.payload.collection;
        },
        getCollectionBySlugFailed: (state: ICollectionState, _: PayloadAction<string>) => {
            state.status = EActionStatus.Failed;
        },
        resetCollectionDetail: (state: ICollectionState) => {
            state.collectionDetail = null;
        },
        createCollectionRequest: (state: ICollectionState, _: PayloadAction<CreateCollectionInput>) => {
            state.isCreating = EActionStatus.Pending;
        },
        createCollectionSuccess: (state: ICollectionState, action: PayloadAction<ICollection>) => {
            state.isCreating = EActionStatus.Succeeded;
            state.collectionList.unshift(action.payload);
        },
        createCollectionFailed: (state: ICollectionState) => {
            state.isCreating = EActionStatus.Failed;
        },
        editCollectionRequest: (
            state: ICollectionState,
            _: PayloadAction<{
                collectionId: number;
                data: EditCollectionInput;
            }>,
        ) => {
            state.isEditing = EActionStatus.Pending;
        },
        editCollectionSuccess: (state: ICollectionState, action: PayloadAction<{ collection: ICollection }>) => {
            state.isEditing = EActionStatus.Succeeded;
            const collection = action.payload.collection;
            state.collectionList = state.collectionList.map(u => {
                if (u.id !== collection.id) return u;
                return collection;
            });
        },
        editCollectionFailed: (state: ICollectionState, action: PayloadAction<{ errorCode: string }>) => {
            state.isEditing = EActionStatus.Failed;
        },
        resetCollectionFetchStatus: (state: ICollectionState) => {
            state.status = EActionStatus.Idle;
            state.isCreating = EActionStatus.Idle;
            state.isEditing = EActionStatus.Idle;
        },
        draftCollectionRequest: (
            state: ICollectionState,
            _: PayloadAction<{ collectionId: number; data: CreateCollectionInput }>,
        ) => {
            state.isDrafting = EActionStatus.Pending;
        },
        draftCollectionSuccess: (state: ICollectionState, action: PayloadAction<ICollection>) => {
            state.isDrafting = EActionStatus.Succeeded;
            const collection = action.payload;

            state.collectionList = state.collectionList.map(u => {
                if (u.id !== collection.id) return u;
                return collection;
            });
        },
        draftCollectionFailed: (state: ICollectionState, _: PayloadAction<{ errorCode: string }>) => {
            state.isDrafting = EActionStatus.Failed;
        },
    },
});

export const {
    getAllCollectionsRequest,
    getAllCollectionsSuccess,
    getAllCollectionsFailed,
    getCollectionBySlugRequest,
    getCollectionBySlugSuccess,
    getCollectionBySlugFailed,
    resetCollectionDetail,
    createCollectionRequest,
    createCollectionSuccess,
    createCollectionFailed,
    editCollectionRequest,
    editCollectionSuccess,
    editCollectionFailed,
    resetCollectionFetchStatus,
    draftCollectionRequest,
    draftCollectionSuccess,
    draftCollectionFailed,
} = collectionSlice.actions;

export default collectionSlice.reducer;
