import { put, takeLeading } from 'redux-saga/effects';
import { IGetAllDataReponse, IUserRegisterReponse } from '../../services/reponse.type';
import serviceUser from '../../services/user';
import { IAction, IGetAllDataQuery } from '../type';
import {
    approveUserFailed,
    approveUserRequest,
    approveUserSuccess,
    createAccountFailed,
    createAccountRequest,
    createAccountSuccess,
    getAllUsersFailed,
    getAllUsersRequest,
    getAllUsersSuccess,
    getUserByWalletAddressFailed,
    getUserByWalletAddressRequest,
    getUserByWalletAddressSuccess,
} from './slice';
import { CreateAccountInput, IUser } from './type';

function* createAccountWorker(action: IAction<CreateAccountInput>) {
    try {
        const { walletAddress, username, email, signature, roleName } = action.payload;

        const createAccountResponse: IUserRegisterReponse = yield serviceUser.register({
            walletAddress,
            username,
            email,
            signature,
            roleName,
        });

        if (createAccountResponse) {
            yield put({ type: createAccountSuccess.toString() });
        }
    } catch (error: any) {
        // console.log(error);
        yield put({ type: createAccountFailed.toString() });
    }
}

function* getAllUsersWorker(action: IAction<IGetAllDataQuery>) {
    try {
        const { page, limit } = action.payload;

        const allUsersRes: IGetAllDataReponse<IUser> = yield serviceUser.getAllUsers({
            page,
            limit,
        });

        if (allUsersRes) {
            yield put({
                type: getAllUsersSuccess.toString(),
                payload: {
                    items: allUsersRes.items,
                    meta: allUsersRes.meta,
                },
            });
        }
    } catch (error: any) {
        // console.log(error);
        yield put({ type: getAllUsersFailed.toString() });
    }
}

function* approveUserWorker(action: IAction<number>) {
    try {
        const userId = action.payload;

        const user: IUser = yield serviceUser.approveUser(userId);

        if (user) {
            yield put({
                type: approveUserSuccess.toString(),
                payload: {
                    user,
                },
            });
        }
    } catch (error: any) {
        // console.log(error);
        yield put({ type: approveUserFailed.toString() });
    }
}

function* getUserByWalletAddressWorker(action: IAction<{ walletAddress: string }>) {
    try {
        const { walletAddress } = action.payload;

        const userRes: IUser = yield serviceUser.getUserByWalletAddress({
            walletAddress,
        });

        if (userRes) {
            yield put({
                type: getUserByWalletAddressSuccess.toString(),
                payload: {
                    user: userRes,
                },
            });
        }
    } catch (error: any) {
        // console.log(error);
        yield put({ type: getUserByWalletAddressFailed.toString() });
    }
}

function* userWatcher() {
    yield takeLeading(createAccountRequest.toString(), createAccountWorker);
    yield takeLeading(getAllUsersRequest.toString(), getAllUsersWorker);
    yield takeLeading(approveUserRequest.toString(), approveUserWorker);
    yield takeLeading(getUserByWalletAddressRequest.toString(), getUserByWalletAddressWorker);
}

export default userWatcher;
