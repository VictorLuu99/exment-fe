import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './app/slice';
import authReducer from './auth/slice';
import messageReducer from './message/slice';
import modalConnectReducer from './modal/slice';
import userReducer from './user/slice';
import collectionReducer from './collection/slice';
import categoryReducer from './collection-category/slice';
import nftReducer from './nft/slice';

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    messageGlobal: messageReducer,
    modalConnectGlobal: modalConnectReducer,
    user: userReducer,
    collection: collectionReducer,
    category: categoryReducer,
    nft: nftReducer,
});

export default rootReducer;
