import { put, takeLeading } from 'redux-saga/effects';
import serviceNft from '../../services/nft';
import { IGetAllDataReponse } from '../../services/reponse.type';
import { IAction } from '../type';
import { getAllNftFailed, getAllNftRequest, getAllNftSuccess } from './slice';
import { IGetAllNftQuery, INft } from './type';

function* getAllNftsWorker(action: IAction<IGetAllNftQuery>) {
    try {
        const { page, limit, keyword, status, buyerIds, sellerIds, startDate, endDate, collectionIds } = action.payload;

        const allNftsRes: IGetAllDataReponse<INft> = yield serviceNft.getAllNfts({
            page,
            limit,
            keyword,
            status,
            buyerIds,
            sellerIds,
            startDate,
            endDate,
            collectionIds,
        });

        if (allNftsRes) {
            yield put({
                type: getAllNftSuccess.toString(),
                payload: {
                    items: allNftsRes.items,
                    meta: allNftsRes.meta,
                },
            });
        }
    } catch (error: any) {
        yield put({
            type: getAllNftFailed.toString(),
            payload: {
                errorMessage: error.message,
            },
        });
    }
}

function* nftWatcher() {
    yield takeLeading(getAllNftRequest.toString(), getAllNftsWorker);
}

export default nftWatcher;
