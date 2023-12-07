import { AppstoreAddOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Roles } from '../../../constants/user';
import Avatar from '../../../elements/avatar';
import Banner from '../../../elements/banner';
import RButton from '../../../elements/button';
import Loading from '../../../elements/loading';
import SocialButton from '../../../elements/social-button';
import PageNotFound from '../../../pages/not-found';
import { RootState } from '../../../stores';
import { useAppDispatch } from '../../../stores/hooks';
import { EActionStatus } from '../../../stores/type';
import { getUserByWalletAddressRequest, resetAccountDetail } from '../../../stores/user/slice';
import './style.scss';
import { showModalCreateCollection } from '../../../stores/modal/slice';
import { getAllCategoriesRequest } from '../../../stores/collection-category/slice';
import AssetTabs from './asset-tabs';
import CollectionList from '../../collection/collection-list';

const AccountDetail = () => {
    const { walletAddress } = useParams();
    const dispatch = useAppDispatch();

    const { userDetail, status } = useSelector((state: RootState) => state.user);
    const { user } = useSelector((state: RootState) => state.auth);
    const { page, limit, caterogyList } = useSelector((state: RootState) => state.category);

    useEffect(() => {
        if (walletAddress) {
            dispatch(
                getUserByWalletAddressRequest({
                    walletAddress,
                }),
            );
        }

        return () => {
            dispatch(resetAccountDetail());
        };
    }, [dispatch, walletAddress]);

    const handleCreateCollection = () => {
        if (caterogyList.length === 0)
            dispatch(
                getAllCategoriesRequest({
                    page,
                    limit,
                }),
            );
        dispatch(showModalCreateCollection());
    };

    if (status === EActionStatus.Pending) return <Loading />;

    if (status === EActionStatus.Failed) return <PageNotFound />;

    return (
        <div className="account-detail">
            <div className="account-detail__header">
                <Banner className="account-detail__banner" imgUrl={userDetail?.banner} />
                <Avatar className="account-detail__avatar" type="circle" imgUrl={userDetail?.avatar} />
            </div>
            <div className="account-detail__body">
                <div className="account-detail__title">user's information</div>
                <table className="account-detail__table">
                    <tbody>
                        <tr>
                            <th>Username:</th>
                            <td>
                                <div className="name-social-group">
                                    <div className="name-social-group__name">{userDetail?.username}</div>
                                    <div className="name-social-group__social">
                                        <SocialButton
                                            iconImg="/images/etherscan.png"
                                            url={`${process.env.REACT_APP_BLOCK_EXPLORER_URL}/address/${userDetail?.walletAddress}`}
                                            target="_blank"
                                            title="View on Etherscan"
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{userDetail?.email || ''}</td>
                        </tr>
                        <tr>
                            <th>Role:</th>
                            <td>{userDetail?.role.role || ''}</td>
                        </tr>
                        {user?.role === Roles.seller &&
                            user?.walletAddress === userDetail?.walletAddress.toLowerCase() && (
                                <tr>
                                    <th>Action:</th>
                                    <td>
                                        <RButton
                                            icon={<AppstoreAddOutlined style={{ fontSize: '20px' }} />}
                                            type="primary"
                                            onClick={handleCreateCollection}
                                        >
                                            Create Collection
                                        </RButton>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
                <AssetTabs role={userDetail?.role.role} walletAddress={walletAddress} ownerId={userDetail?.id} />
            </div>
        </div>
    );
};
export default AccountDetail;
