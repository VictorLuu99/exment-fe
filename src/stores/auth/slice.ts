import { EActionStatus } from './../type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import serviceUser from '../../services/user';
import {
    ChangeAccountWalletAction,
    ChangeAccountWalletSuccessAction,
    IAuthState,
    ISignInAction,
    IUserInfoPublic,
    WalletBalance,
} from './type';

const initialState: IAuthState = {
    status: EActionStatus.Idle,
    user: serviceUser.getInfoStorage(),
    isAuthenticated: !!serviceUser.getInfoStorage(),
    walletBalance: null,
    signedMessageToLogin: '',
    signedMessageErrorCode: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeAccountWallet: (state: IAuthState, _: PayloadAction<ChangeAccountWalletAction>) => {
            state.status = EActionStatus.Pending;
        },
        // changeAccountWalletSuccess: (state: IAuthState, action: PayloadAction<ChangeAccountWalletSuccessAction>) => {
        //     state.status = EActionStatus.Succeeded;
        //     state.user = action.payload;
        // },
        fetchWalletBalance: (state: IAuthState, _: PayloadAction<{ walletAddress: string }>) => {
            state.status = EActionStatus.Idle;
        },
        fetchWalletBalanceSuccess: (state: IAuthState, action: PayloadAction<WalletBalance>) => {
            state.status = EActionStatus.Succeeded;
            state.walletBalance = action.payload;
        },
        signIn: (state: IAuthState, _: PayloadAction<ISignInAction>) => {
            state.status = EActionStatus.Pending;
        },
        signInSuccess: (state: IAuthState, action: PayloadAction<IUserInfoPublic>) => {
            state.status = EActionStatus.Succeeded;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.signedMessageToLogin = '';
            state.signedMessageErrorCode = '';
        },
        signInFail: (state: IAuthState) => {
            state.status = EActionStatus.Failed;
            state.isAuthenticated = false;
        },
        signOut: (state: IAuthState) => {
            state.status = EActionStatus.Idle;
        },
        signOutSuccess: (state: IAuthState) => {
            state.isAuthenticated = false;
            state.user = null;
            state.walletBalance = null;
        },
        getSignedMessageToLogin: (state: IAuthState, _: PayloadAction<{ walletAddress: string }>) => {
            state.status = EActionStatus.Idle;
        },
        getSignedMessageToLoginSuccess: (state: IAuthState, action: PayloadAction<{ signedMessage: string }>) => {
            state.status = EActionStatus.Succeeded;
            state.signedMessageToLogin = action.payload.signedMessage;
        },
        getSignedMessageToLoginFailed: (state: IAuthState, action: PayloadAction<{ errorCode: string }>) => {
            state.status = EActionStatus.Failed;
            state.signedMessageErrorCode = action.payload.errorCode;
        },
        clearSignedMessageToLogin: (state: IAuthState) => {
            state.signedMessageToLogin = '';
            state.signedMessageErrorCode = '';
        },
    },
});

export const {
    signIn,
    signInSuccess,
    signInFail,
    signOut,
    signOutSuccess,
    changeAccountWallet,
    // changeAccountWalletSuccess,
    fetchWalletBalance,
    fetchWalletBalanceSuccess,
    getSignedMessageToLogin,
    getSignedMessageToLoginSuccess,
    getSignedMessageToLoginFailed,
    clearSignedMessageToLogin,
} = authSlice.actions;

export default authSlice.reducer;
