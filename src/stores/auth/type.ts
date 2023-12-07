import { EActionStatus } from '../type';

export interface IUserInfoPublic {
    id: number;
    walletAddress: string;
    username: string;
    email: string;
    role: string;
}

export interface IAuthState {
    status: EActionStatus;
    user: IUserInfoPublic | null;
    isAuthenticated: boolean;
    walletBalance: WalletBalance | null;
    signedMessageToLogin: string;
    signedMessageErrorCode: string;
}

export interface ISignInAction {
    walletAddress: string;
    signature: string;
}

export interface ChangeAccountWalletAction {
    walletAddress: string;
}

export interface ChangeAccountWalletSuccessAction {
    walletAddress: string;
}

export interface WalletBalance {
    balance: number;
    balanceOrigin: string;
}

export interface IGetSignedMessageAction {
    signedMessage: string;
    errorCode: string;
}
