import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NFT_STATUS } from '../../../constants/nft';
import { useNotification } from '../../../hooks/use-notification';
import { RootState } from '../../../stores';
import { getAllNftRequest, resetError } from '../../../stores/nft/slice';
import { EActionStatus } from '../../../stores/type';
import { formatFullTimeString } from '../../../utils/date';
import { formatMoney } from '../../../utils/number';
import { truncateString } from '../../../utils/string';
import NftFilterPublic from './nft-filter-public';
import './style.scss';

interface INftList {
    sellerId?: number;
    buyerId?: number;
}

const NftList = ({ sellerId, buyerId }: INftList) => {
    const { openNotification, contextHolder } = useNotification();
    const { page, limit, nftList, errorMessage, status } = useSelector((state: RootState) => state.nft);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getAllNftRequest({
                page,
                limit,
                status: NFT_STATUS.ACTIVE,
                sellerIds: sellerId ? [sellerId] : [],
                buyerIds: buyerId ? [buyerId] : [],
            }),
        );
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (errorMessage) {
            openNotification({
                message: 'Get all nfts failed!',
                placement: 'bottomRight',
                type: 'error',
                description: errorMessage,
            });
            dispatch(resetError());
        }
        // eslint-disable-next-line
    }, [errorMessage]);

    return (
        <div className="nft-list__wrapper" style={{ padding: '1rem 0' }}>
            {contextHolder}
            <NftFilterPublic sellerId={sellerId} buyerId={buyerId} />
            <table className="nft__table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Image</th>
                        <th>Collection</th>
                        <th>Address</th>
                        <th>Token ID</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Buyer</th>
                        <th>Seller</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {status === EActionStatus.Pending && (
                        <tr className="notfound">
                            <td colSpan={10}>Loading...</td>
                        </tr>
                    )}
                    {!nftList ||
                        (nftList.length === 0 && (
                            <tr className="notfound">
                                <td colSpan={10}>No data</td>
                            </tr>
                        ))}
                    {nftList &&
                        nftList.length > 0 &&
                        nftList.map((nft, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {
                                        <div className="nft__image">
                                            {nft.collection.image ? (
                                                <img src={nft.collection.image} alt="default-alt" />
                                            ) : (
                                                <img src="/images/default-image.jpeg" alt="default-alt" />
                                            )}
                                        </div>
                                    }
                                </td>
                                <td>{nft.collection.collectionName}</td>
                                <td>
                                    <div title={nft.collection.address}>
                                        {nft.collection.address
                                            ? truncateString({ text: nft.collection.address ?? '', start: 4, end: 5 })
                                            : 'Null'}
                                    </div>
                                </td>
                                <td>{nft.tokenId}</td>
                                <td>{formatMoney(nft.collection.price)}</td>
                                <td>{nft.collection.mstCollectionCategory.name}</td>
                                <td>{nft.owner.username}</td>
                                <td>{nft.collection.user.username}</td>
                                <td>
                                    <div title={nft.createdAt}>{formatFullTimeString(nft.createdAt)}</div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default NftList;
