import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import {
    editCollectionRequest,
    getAllCollectionsRequest,
    resetCollectionFetchStatus,
} from '../../stores/collection/slice';
import CollectionTable from './components/collection-table';
import { COLLECTION_STATUS } from '../../constants/collection';
import { EActionStatus } from '../../stores/type';
import { useNotification } from '../../hooks/use-notification';

const CollectionManagementPage = () => {
    const dispatch = useDispatch();
    const { page, limit, collectionList, isEditing } = useSelector((state: RootState) => state.collection);

    useEffect(() => {
        dispatch(
            getAllCollectionsRequest({
                page,
                limit,
                collectionStatus: [
                    COLLECTION_STATUS.ACTIVE,
                    COLLECTION_STATUS.APPROVED,
                    COLLECTION_STATUS.DEACTIVE,
                    COLLECTION_STATUS.PENDING,
                    COLLECTION_STATUS.REJECTED,
                ],
            }),
        );
        return () => {
            dispatch(resetCollectionFetchStatus());
        };
        // eslint-disable-next-line
    }, []);

    const handleApproveCollection = (collectionId: number) => {
        dispatch(
            editCollectionRequest({
                collectionId,
                data: {
                    status: COLLECTION_STATUS.APPROVED,
                },
            }),
        );
    };

    const { openNotification, contextHolder } = useNotification();

    useEffect(() => {
        if (isEditing === EActionStatus.Succeeded) {
            openNotification({
                message: 'Approve collection successfully!',
                placement: 'bottomRight',
                type: 'success',
            });
        }
        if (isEditing === EActionStatus.Failed) {
            openNotification({
                message: 'Approve collection failed!',
                placement: 'bottomRight',
                type: 'error',
            });
        }
        // eslint-disable-next-line
    }, [isEditing]);

    return (
        <>
            {contextHolder}
            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '10px' }}>
                Total collections: {collectionList?.length || 0}
            </div>
            <CollectionTable dataBody={collectionList} onApproveCollection={handleApproveCollection} />;
        </>
    );
};

export default CollectionManagementPage;
