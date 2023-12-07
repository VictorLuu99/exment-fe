import { EActionStatus } from './../type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateAccountInput, IUser, IUserState } from './type';
import { IMeta } from '../../services/reponse.type';

const initialState: IUserState = {
    status: EActionStatus.Idle,
    userList: [],
    page: 1,
    limit: 1000,
    userDetail: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createAccountRequest: (state: IUserState, _: PayloadAction<CreateAccountInput>) => {
            state.status = EActionStatus.Pending;
        },
        createAccountSuccess: (state: IUserState) => {
            state.status = EActionStatus.Succeeded;
        },
        createAccountFailed: (state: IUserState) => {
            state.status = EActionStatus.Failed;
        },
        getAllUsersRequest: (state: IUserState, _: PayloadAction<{ page: number; limit: number }>) => {
            state.status = EActionStatus.Pending;
        },
        getAllUsersSuccess: (state: IUserState, action: PayloadAction<{ items: IUser[]; meta: IMeta }>) => {
            state.status = EActionStatus.Succeeded;
            state.userList = action.payload.items;
            state.page = action.payload.meta.currentPage;
            state.limit = action.payload.meta.itemsPerPage;
        },
        getAllUsersFailed: (state: IUserState, action: PayloadAction<{ errorCode: string }>) => {
            state.status = EActionStatus.Failed;
        },
        approveUserRequest: (state: IUserState, _: PayloadAction<number>) => {
            state.status = EActionStatus.Pending;
        },
        approveUserSuccess: (state: IUserState, action: PayloadAction<{ user: IUser }>) => {
            state.status = EActionStatus.Succeeded;
            const user = action.payload.user;
            state.userList = state.userList.map(u => {
                if (u.id !== user.id) return u;
                return user;
            });
        },
        approveUserFailed: (state: IUserState, action: PayloadAction<{ errorCode: string }>) => {
            state.status = EActionStatus.Failed;
        },
        getUserByWalletAddressRequest: (state: IUserState, _: PayloadAction<{ walletAddress: string }>) => {
            state.status = EActionStatus.Pending;
        },
        getUserByWalletAddressSuccess: (
            state: IUserState,
            action: PayloadAction<{
                user: IUser;
            }>,
        ) => {
            state.status = EActionStatus.Succeeded;
            state.userDetail = action.payload.user;
        },
        getUserByWalletAddressFailed: (state: IUserState, _: PayloadAction<string>) => {
            state.status = EActionStatus.Failed;
        },
        resetAccountDetail: (state: IUserState) => {
            state.userDetail = null;
        },
    },
});

export const {
    createAccountRequest,
    createAccountSuccess,
    createAccountFailed,
    getAllUsersRequest,
    getAllUsersSuccess,
    getAllUsersFailed,
    approveUserRequest,
    approveUserSuccess,
    approveUserFailed,
    getUserByWalletAddressRequest,
    getUserByWalletAddressSuccess,
    getUserByWalletAddressFailed,
    resetAccountDetail,
} = userSlice.actions;

export default userSlice.reducer;
