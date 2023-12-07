import { AxiosError } from 'axios';
import { delay, put, takeLeading } from 'redux-saga/effects';
import serviceEthers from '../../services/ethers';
import { IUserLoginReponse } from '../../services/reponse.type';
import serviceUser from '../../services/user';
import { IAction } from '../type';
import {
    changeAccountWallet,
    // changeAccountWalletSuccess,
    fetchWalletBalance,
    fetchWalletBalanceSuccess,
    getSignedMessageToLogin,
    getSignedMessageToLoginFailed,
    getSignedMessageToLoginSuccess,
    signIn,
    signInFail,
    signInSuccess,
    signOut,
    signOutSuccess,
} from './slice';
import { ChangeAccountWalletAction, ISignInAction, IUserInfoPublic, WalletBalance } from './type';

// function* changeAccountWalletWorker(action: IAction<ChangeAccountWalletAction>) {
//     const { walletAddress } = action.payload;
//     if (walletAddress) {
//         serviceUser.storeInfo(action.payload);
//         yield delay(500);
//         yield put({ type: changeAccountWalletSuccess.toString(), payload: action.payload });
//         return;
//     }
// }

function* signInWorker(action: IAction<ISignInAction>) {
    try {
        const { walletAddress, signature } = action.payload;
        const loginResponse: IUserLoginReponse = yield serviceUser.login(walletAddress, signature);

        if (loginResponse) {
            const { userData, accessToken, refreshToken } = loginResponse;
            serviceUser.storeInfo(userData);
            serviceUser.storeAccessToken(accessToken);
            serviceUser.storeRefreshToken(refreshToken);

            yield put({ type: signInSuccess.toString(), payload: userData });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: signInFail.toString() });
    }
}

function* signOutWorker() {
    serviceUser.storeInfo(null);
    yield put({ type: signOutSuccess.toString() });
}

function* fetchWalletBalanceWorker(action: IAction<{ walletAddress: string }>) {
    try {
        const balance: WalletBalance = yield serviceEthers.getWalletBalance(action.payload.walletAddress);
        yield put({ type: fetchWalletBalanceSuccess.toString(), payload: balance });
    } catch (error) {
        console.log(error);
    }
}

function* getSignedMessageWorker(action: IAction<{ walletAddress: string }>) {
    try {
        const signedMessage: string = yield serviceUser.getSignedMessageToLogin(action.payload.walletAddress);
        yield put({ type: getSignedMessageToLoginSuccess.toString(), payload: { signedMessage } });
    } catch (error: any) {
        const errorCode = error?.response?.data.code;
        yield put({ type: getSignedMessageToLoginFailed.toString(), payload: { errorCode } });
    }
}

function* authWatcher() {
    yield takeLeading(signIn.toString(), signInWorker);
    yield takeLeading(signOut.toString(), signOutWorker);
    // yield takeLeading(changeAccountWallet.toString(), changeAccountWalletWorker);
    yield takeLeading(fetchWalletBalance.toString(), fetchWalletBalanceWorker);
    yield takeLeading(getSignedMessageToLogin.toString(), getSignedMessageWorker);
}

export default authWatcher;
