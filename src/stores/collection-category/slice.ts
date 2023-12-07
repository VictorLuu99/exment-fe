import { EActionStatus, IGetAllDataQuery } from './../type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, ICategoryState } from './type';
import { IMeta } from '../../services/reponse.type';

const initialState: ICategoryState = {
    status: EActionStatus.Idle,
    caterogyList: [],
    page: 1,
    limit: 100,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getAllCategoriesRequest: (state: ICategoryState, _: PayloadAction<IGetAllDataQuery>) => {
            state.status = EActionStatus.Pending;
        },
        getAllCategoriesSuccess: (
            state: ICategoryState,
            action: PayloadAction<{ items: ICategory[]; meta: IMeta }>,
        ) => {
            state.status = EActionStatus.Succeeded;
            state.caterogyList = action.payload.items;
            state.page = action.payload.meta.currentPage;
            state.limit = action.payload.meta.itemsPerPage;
        },
        getAllCategoriesFailed: (state: ICategoryState, _: PayloadAction<{ errorCode: string }>) => {
            state.status = EActionStatus.Failed;
        },
    },
});

export const { getAllCategoriesRequest, getAllCategoriesSuccess, getAllCategoriesFailed } = categorySlice.actions;

export default categorySlice.reducer;
