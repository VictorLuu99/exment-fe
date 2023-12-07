import { MoneyCollectOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import RButton from '../../../elements/button';
import { RootState } from '../../../stores';
import { hideModalOrderCollection } from '../../../stores/modal/slice';
import { signMessage } from '../../../services/connectors';
import { PREFIX_ORDER_COLLECTION_SIGNED_MESSAGE } from '../../../constants/collection';
import { useState } from 'react';
import { useNotification } from '../../../hooks/use-notification';
import serviceNft from '../../../services/nft';
import { useNavigate } from 'react-router-dom';

const ModalOrderCollection = () => {
    const { openModalOrderCollection } = useSelector((state: RootState) => state.modalConnectGlobal);
    const handleClose = () => {
        dispatch(hideModalOrderCollection());
    };

    const { collectionDetail } = useSelector((state: RootState) => state.collection);
    const { user } = useSelector((state: RootState) => state.auth);

    const [isBuying, setIsBuying] = useState<boolean>(false);

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { openNotification, contextHolder } = useNotification();
    const navigate = useNavigate();

    const handleOrderCollection = async () => {
        if (!collectionDetail) return;
        setIsBuying(true);
        try {
            const signature = await signMessage(
                PREFIX_ORDER_COLLECTION_SIGNED_MESSAGE +
                    collectionDetail.collectionName +
                    '\n' +
                    'Price: ¥ ' +
                    collectionDetail.price,
            );
            if (signature) {
                const buyNft = await serviceNft.buyNft(collectionDetail?.id, signature);
                if (buyNft) {
                    setIsBuying(false);
                    dispatch(hideModalOrderCollection());
                    navigate(`/account/${user?.walletAddress.toLocaleLowerCase()}`);
                    openNotification({
                        message: 'Order collection successfully!',
                        placement: 'bottomRight',
                        type: 'success',
                    });
                }
            }
        } catch (error: any) {
            setIsBuying(false);
            if (error?.code === 'ACTION_REJECTED') {
                openNotification({
                    message: 'Order collection failed!',
                    placement: 'bottomRight',
                    type: 'error',
                    description: 'User denied message signature',
                });
            }
            if (error?.response.data.code === 'NFT_00000') {
                openNotification({
                    message: 'Order collection failed!',
                    placement: 'bottomRight',
                    type: 'error',
                    description: error?.response.data.content,
                });
            }
        }
    };

    return (
        <Modal
            open={openModalOrderCollection}
            // className={style.modalPolicy}
            onCancel={handleClose}
            // confirmLoading={false}
            title={t('collection.checkoutCollectionTitle')}
            footer={null}
        >
            {contextHolder}
            <div className="checkout-detail">
                <table className="collection-detail__table">
                    <tr>
                        <th>Collection Image:</th>
                        <td>
                            <div className="collection-image">
                                <img
                                    width={50}
                                    height={50}
                                    style={{ borderRadius: '100%' }}
                                    src={collectionDetail?.image || '/images/default-image.jpeg'}
                                    alt="collection-alt"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>Collection Name:</th>
                        <td>
                            <div className="name-social-group">
                                <div className="name-social-group__name">
                                    {collectionDetail?.collectionName}{' '}
                                    <img src="/images/quality.png" alt="quality-alt" />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>Price:</th>
                        <td style={{ fontWeight: 700 }}>¥ {collectionDetail?.price || 0}</td>
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
                        <td>{collectionDetail?.user.username}</td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <RButton
                                icon={<MoneyCollectOutlined style={{ fontSize: '20px' }} />}
                                type="primary"
                                onClick={handleOrderCollection}
                                loading={isBuying}
                            >
                                Confirm
                            </RButton>
                        </td>
                    </tr>
                </table>
            </div>
        </Modal>
    );
};

export default ModalOrderCollection;
