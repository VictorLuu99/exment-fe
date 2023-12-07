import { ShoppingCartOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../../../elements/avatar';
import Banner from '../../../elements/banner';
import RButton from '../../../elements/button';
import Loading from '../../../elements/loading';
import SocialButton from '../../../elements/social-button';
import PageNotFound from '../../../pages/not-found';
import { RootState } from '../../../stores';
import { getCollectionBySlugRequest, resetCollectionDetail } from '../../../stores/collection/slice';
import { useAppDispatch } from '../../../stores/hooks';
import { EActionStatus } from '../../../stores/type';
import { truncateString } from '../../../utils/string';
import './style.scss';
import { Roles } from '../../../constants/user';
import { showModalOrderCollection } from '../../../stores/modal/slice';

export const CollectionDetail = () => {
    const { slug } = useParams();
    const dispatch = useAppDispatch();

    const { collectionDetail, status } = useSelector((state: RootState) => state.collection);
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (slug) {
            dispatch(
                getCollectionBySlugRequest({
                    slug,
                }),
            );
        }

        return () => {
            dispatch(resetCollectionDetail());
        };
    }, [dispatch, slug]);

    const handleOrderCollection = () => {
        dispatch(showModalOrderCollection());
    };

    if (status === EActionStatus.Pending) return <Loading />;

    if (status === EActionStatus.Failed) return <PageNotFound />;

    return (
        <div className="collection-detail">
            <div className="collection-detail__header">
                <Banner className="collection-detail__banner" imgUrl={collectionDetail?.bannerImage} />
                <Avatar className="collection-detail__avatar" type="square" imgUrl={collectionDetail?.image} />
            </div>
            <div className="collection-detail__body">
                <table className="collection-detail__table">
                    <tr>
                        <th>Collection Name:</th>
                        <td>
                            <div className="name-social-group">
                                <div className="name-social-group__name">
                                    {collectionDetail?.collectionName}{' '}
                                    <img src="/images/quality.png" alt="quality-alt" />
                                </div>
                                <div className="name-social-group__social">
                                    <SocialButton
                                        iconImg="/images/etherscan.png"
                                        url={`${process.env.REACT_APP_BLOCK_EXPLORER_URL}/address/${collectionDetail?.address}`}
                                        target="_blank"
                                        title="View on Etherscan"
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>Price:</th>
                        <td>¥ {collectionDetail?.price || 0}</td>
                    </tr>
                    <tr>
                        <th>Total Sold:</th>
                        <td>{collectionDetail?.totalSold || 0}</td>
                    </tr>
                    <tr>
                        <th>Category:</th>
                        <td>{collectionDetail?.mstCollectionCategory?.name || ''}</td>
                    </tr>
                    <tr>
                        <th>Owner:</th>
                        <td>
                            <Link to={`/account/${collectionDetail?.user.walletAddress}`} className="owner__name">
                                {collectionDetail?.user.username}
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <th>Description:</th>
                        <td>{truncateString({ text: collectionDetail?.description || '', start: 300, end: 0 })}</td>
                    </tr>
                </table>
                {user?.role === Roles.buyer && (
                    <div className="collection-detail__body__order-button">
                        <RButton
                            icon={<ShoppingCartOutlined style={{ fontSize: '20px' }} />}
                            type="primary"
                            onClick={handleOrderCollection}
                        >
                            Order
                        </RButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectionDetail;
