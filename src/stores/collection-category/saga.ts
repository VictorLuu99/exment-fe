import { put, takeLeading } from 'redux-saga/effects';
import serviceCategory from '../../services/category';
import { IGetAllDataReponse } from '../../services/reponse.type';
import { IAction, IGetAllDataQuery } from '../type';
import { getAllCategoriesFailed, getAllCategoriesRequest, getAllCategoriesSuccess } from './slice';
import { ICategory } from './type';

function* getAllCategoriesWorker(action: IAction<IGetAllDataQuery>) {
    try {
        const { page, limit } = action.payload;

        const allCategoriesRes: IGetAllDataReponse<ICategory> = yield serviceCategory.getAllCollectionCategories({
            page,
            limit,
        });

        if (allCategoriesRes) {
            yield put({
                type: getAllCategoriesSuccess.toString(),
                payload: {
                    items: allCategoriesRes.items,
                    meta: allCategoriesRes.meta,
                },
            });
        }
    } catch (error: any) {
        // console.log(error);
        yield put({ type: getAllCategoriesFailed.toString() });
    }
}

function* collectionWatcher() {
    yield takeLeading(getAllCategoriesRequest.toString(), getAllCategoriesWorker);
}

export default collectionWatcher;
