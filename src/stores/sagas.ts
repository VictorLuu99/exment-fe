import { all } from 'redux-saga/effects';
import authWatcher from './auth/saga';
import collectionWatcher from './collection/saga';
import userWatcher from './user/saga';
import categoryWatcher from './collection-category/saga';
import nftWatcher from './nft/saga';

export default function* rootSaga() {
    yield all([authWatcher(), userWatcher(), collectionWatcher(), categoryWatcher(), nftWatcher()]);
}
