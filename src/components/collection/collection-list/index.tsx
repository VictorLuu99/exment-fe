import { EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    ALL_STATUS_ARRAY,
    COLLECTION_STATUS,
    COLLECTION_STATUS_COLOR,
    COLLECTION_STATUS_TO_TEXT,
} from '../../../constants/collection';
import { Roles } from '../../../constants/user';
import RButton from '../../../elements/button';
import useDebounce from '../../../hooks/use-debounce';
import { RootState } from '../../../stores';
import { getAllCollectionsRequest } from '../../../stores/collection/slice';
import { EActionStatus } from '../../../stores/type';
import CollectionItem from './collection-item';
import CollectionSearch from './collection-search';
import './style.scss';
import { truncateString } from '../../../utils/string';
import { formatMoney } from '../../../utils/number';
import { showModalEditCollection } from '../../../stores/modal/slice';
import { getAllCategoriesRequest } from '../../../stores/collection-category/slice';

interface ICollectionList {
    walletAddress?: string;
}

const CollectionList = ({ walletAddress }: ICollectionList) => {
    const [keyword, setKeyword] = useState<string>('');

    const searchDebouceValue = useDebounce(keyword, 300);

    const dispatch = useDispatch();
    const { page, limit, collectionList, status } = useSelector((state: RootState) => state.collection);
    const {
        page: categoryPage,
        limit: categoryLimit,
        caterogyList,
    } = useSelector((state: RootState) => state.category);

    const { user } = useSelector((state: RootState) => state.auth);

    const navigate = useNavigate();

    const showDetailCollection = (slug: string) => {
        navigate(`/collection/${slug}`);
    };

    const isOwnerAccountPage = (): boolean => {
        return user?.role === Roles.seller && user?.walletAddress.toLowerCase() === walletAddress?.toLowerCase();
    };

    const handleDeactivateCollection = () => {};

    const handleEditCollection = (collection: any) => {
        if (caterogyList.length === 0)
            dispatch(
                getAllCategoriesRequest({
                    page: categoryPage,
                    limit: categoryLimit,
                }),
            );
        dispatch(showModalEditCollection(collection));
    };

    useEffect(() => {
        dispatch(
            getAllCollectionsRequest({
                page,
                limit,
                walletAddress,
                collectionStatus: isOwnerAccountPage() ? ALL_STATUS_ARRAY : [COLLECTION_STATUS.ACTIVE],
            }),
        );
        // eslint-disable-next-line
    }, [dispatch, page, limit]);

    useEffect(() => {
        dispatch(
            getAllCollectionsRequest({
                page,
                limit,
                keyword: searchDebouceValue?.trim(),
                walletAddress,
                collectionStatus: isOwnerAccountPage() ? ALL_STATUS_ARRAY : [COLLECTION_STATUS.ACTIVE],
            }),
        );
        // eslint-disable-next-line
    }, [dispatch, page, limit, searchDebouceValue]);

    return (
        <div className="collection__wrapper" style={{ padding: `1rem ${isOwnerAccountPage() ? 0 : '2rem'}` }}>
            <CollectionSearch keyword={keyword} onChangeKeyword={setKeyword} />
            <table className={`collection__table ${isOwnerAccountPage() ? 'collection__table__owner' : ''}`}>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>collection</th>
                        <th>price</th>
                        <th>total sold</th>
                        <th>category</th>
                        {!isOwnerAccountPage() && <th>owner</th>}
                        {isOwnerAccountPage() && (
                            <>
                                <th>status</th>
                                <th>action</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {status === EActionStatus.Pending && (
                        <tr className="notfound">
                            <td colSpan={isOwnerAccountPage() ? 8 : 6}>Loading...</td>
                        </tr>
                    )}
                    {!collectionList ||
                        (collectionList.length === 0 && (
                            <tr className="notfound">
                                <td colSpan={isOwnerAccountPage() ? 8 : 6}>No data</td>
                            </tr>
                        ))}
                    {collectionList &&
                        collectionList.length > 0 &&
                        collectionList.map((collection, index) => (
                            <tr
                                key={index}
                                onClick={() =>
                                    collection.status === COLLECTION_STATUS.DRAFT
                                        ? null
                                        : showDetailCollection(collection.slug || '')
                                }
                            >
                                <td>{index + 1}</td>
                                <td>
                                    <CollectionItem
                                        collectionName={collection.collectionName}
                                        image={collection.image}
                                        status={collection.status}
                                    />
                                </td>
                                <td title={formatMoney(collection.price)}>
                                    {truncateString({ text: formatMoney(collection.price), start: 15, end: 0 })}
                                </td>
                                <td>{collection.totalSold || 0}</td>
                                <td>{collection.mstCollectionCategory?.name || ''}</td>
                                {!isOwnerAccountPage() && <td>{collection.user?.username || ''}</td>}
                                {isOwnerAccountPage() && (
                                    <>
                                        <td>
                                            <Tag color={COLLECTION_STATUS_COLOR[collection.status]}>
                                                {COLLECTION_STATUS_TO_TEXT[collection.status]}
                                            </Tag>
                                        </td>
                                        <td>
                                            {collection.status === COLLECTION_STATUS.ACTIVE && (
                                                <RButton
                                                    icon={<MinusCircleOutlined style={{ fontSize: '20px' }} />}
                                                    type="default"
                                                    danger
                                                    onClick={handleDeactivateCollection}
                                                >
                                                    Deactive
                                                </RButton>
                                            )}

                                            {collection.status === COLLECTION_STATUS.DRAFT && (
                                                <RButton
                                                    icon={<EditOutlined style={{ fontSize: '20px' }} />}
                                                    type="default"
                                                    onClick={() => handleEditCollection(collection)}
                                                >
                                                    Edit
                                                </RButton>
                                            )}
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default CollectionList;
