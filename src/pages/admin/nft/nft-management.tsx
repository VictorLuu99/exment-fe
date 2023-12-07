import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NFT_STATUS } from '../../../constants/nft';
import { useNotification } from '../../../hooks/use-notification';
import { RootState } from '../../../stores';
import { getAllNftRequest, resetError } from '../../../stores/nft/slice';
import NftTable from '../components/nft-table';
import NftFilter from './nft-filter';

const NftManagementPage = () => {
    const dispatch = useDispatch();
    const { page, limit, nftList, errorMessage } = useSelector((state: RootState) => state.nft);

    useEffect(() => {
        dispatch(
            getAllNftRequest({
                page,
                limit,
                status: NFT_STATUS.ACTIVE,
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

    const { openNotification, contextHolder } = useNotification();

    return (
        <>
            {contextHolder}
            <NftFilter />
            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '10px' }}>
                Total nfts: {nftList?.length || 0}
            </div>
            <NftTable dataBody={nftList} />;
        </>
    );
};

export default NftManagementPage;
