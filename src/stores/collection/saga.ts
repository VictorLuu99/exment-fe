import { put, takeLeading } from 'redux-saga/effects';
import serviceCollection from '../../services/collection';
import { IGetAllDataReponse } from '../../services/reponse.type';
import { IAction } from '../type';
import {
    createCollectionFailed,
    createCollectionRequest,
    createCollectionSuccess,
    editCollectionFailed,
    editCollectionRequest,
    editCollectionSuccess,
    getAllCollectionsFailed,
    getAllCollectionsRequest,
    getAllCollectionsSuccess,
    getCollectionBySlugFailed,
    getCollectionBySlugRequest,
    getCollectionBySlugSuccess,
    draftCollectionRequest,
    draftCollectionSuccess,
    draftCollectionFailed,
} from './slice';
import { CreateCollectionInput, EditCollectionInput, ICollection, IGetAllCollectionQuery } from './type';

function* getAllCollectionsWorker(action: IAction<IGetAllCollectionQuery>) {
    try {
        const { page, limit, keyword, walletAddress, collectionStatus } = action.payload;

        const allCollectionsRes: IGetAllDataReponse<ICollection> = yield serviceCollection.getAllCollections({
            page,
            limit,
            keyword,
            walletAddress,
            collectionStatus,
        });

        if (allCollectionsRes) {
            yield put({
                type: getAllCollectionsSuccess.toString(),
                payload: {
                    items: allCollectionsRes.items,
                    meta: allCollectionsRes.meta,
                },
            });
        }
    } catch (error: any) {
        // console.log(error);
        yield put({ type: getAllCollectionsFailed.toString() });
    }
}

function* getCollectionBySlugWorker(action: IAction<{ slug: string }>) {
    try {
        const { slug } = action.payload;

        const collectionRes: ICollection = yield serviceCollection.getCollectionBySlug({
            slug,
        });

        if (collectionRes) {
            yield put({
                type: getCollectionBySlugSuccess.toString(),
                payload: {
                    collection: collectionRes,
                },
            });
        }
    } catch (error: any) {
        // console.log(error);
        yield put({ type: getCollectionBySlugFailed.toString() });
    }
}

function* createCollectionWorker(action: IAction<CreateCollectionInput>) {
    try {
        const { collectionName, image, bannerImage, price, description, slug, symbol, categoryId, status } =
            action.payload;

        const createCollectionResponse: ICollection = yield serviceCollection.createCollection({
            collectionName,
            image,
            bannerImage,
            price,
            description,
            slug,
            symbol,
            categoryId,
            status,
        });

        if (createCollectionResponse) {
            yield put({ type: createCollectionSuccess.toString(), payload: createCollectionResponse });
        }
    } catch (error: any) {
        // console.log(error);
        yield put({ type: createCollectionFailed.toString() });
    }
}

function* editCollectionWorker(
    action: IAction<{
        collectionId: number;
        data: EditCollectionInput;
    }>,
) {
    try {
        const { collectionId, data } = action.payload;

        const collection: ICollection = yield serviceCollection.editCollection(collectionId, data);

        if (collection) {
            yield put({
                type: editCollectionSuccess.toString(),
                payload: {
                    collection,
                },
            });
        }
    } catch (error: any) {
        // console.log(error);
        yield put({ type: editCollectionFailed.toString() });
    }
}

function* draftCollectionWorker(
    action: IAction<{
        collectionId: number;
        data: CreateCollectionInput;
    }>,
) {
    try {
        const { collectionId, data } = action.payload;

        const draftCollectionResponse: ICollection = yield serviceCollection.draftCollection(collectionId, data);

        if (draftCollectionResponse) {
            yield put({ type: draftCollectionSuccess.toString(), payload: draftCollectionResponse });
        }
    } catch (error: any) {
        // console.log(error);
        yield put({ type: draftCollectionFailed.toString() });
    }
}

function* collectionWatcher() {
    yield takeLeading(getAllCollectionsRequest.toString(), getAllCollectionsWorker);
    yield takeLeading(getCollectionBySlugRequest.toString(), getCollectionBySlugWorker);
    yield takeLeading(createCollectionRequest.toString(), createCollectionWorker);
    yield takeLeading(editCollectionRequest.toString(), editCollectionWorker);
    yield takeLeading(draftCollectionRequest.toString(), draftCollectionWorker);
}

export default collectionWatcher;
