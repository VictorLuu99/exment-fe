import { useDispatch, useSelector } from 'react-redux';
import RButton from '../../elements/button';
import style from './style.module.scss';
import { showModalConnect, showModalPolicy } from '../../stores/modal/slice';
import { truncateString } from '../../utils/string';
import { RootState } from '../../stores';
import { Space } from 'antd';
import { useEffect } from 'react';
import { fetchWalletBalance } from '../../stores/auth/slice';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import serviceEthers from '../../services/ethers';
import { formatNumber } from '../../utils/number';
import LoaderSpin from '../../elements/loader/spin';
import { EActionStatus } from '../../stores/type';

interface Props {
    onShowModalOverview?: () => void;
}

const ButtonConnectWallet = (props: Props) => {
    const { t } = useTranslation();
    const { chainId, account } = useWeb3React();
    const { onShowModalOverview } = props;
    const dispatch = useDispatch();
    const { isAuthenticated, user, walletBalance, status } = useSelector((state: RootState) => state.auth);

    const handleOpenModalConnectWallet = () => {
        console.log(account);
        if (!account) {
            dispatch(showModalConnect());
        } else {
            dispatch(showModalPolicy());
        }
    };

    const handleOpenModalOverview = () => {
        onShowModalOverview && onShowModalOverview();
    };

    useEffect(() => {
        if (!user?.walletAddress || !isAuthenticated || !chainId) return;
        dispatch(fetchWalletBalance({ walletAddress: user.walletAddress }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.walletAddress, isAuthenticated, chainId]);

    return (
        <div className={style.btnConnectWallet}>
            {isAuthenticated ? (
                <Space className={style.walletInfo} onClick={handleOpenModalOverview}>
                    {status === EActionStatus.Pending || !chainId || walletBalance === null ? (
                        <LoaderSpin />
                    ) : (
                        <span className={style.walletBalance}>
                            {walletBalance &&
                                formatNumber(serviceEthers.truncateBalance({ balance: walletBalance.balanceOrigin }), {
                                    maximumFractionDigits: 4,
                                })}
                            <span className={style.coinText}>ETH</span>
                        </span>
                    )}
                    <span>{truncateString({ text: user?.walletAddress ?? '', start: 5, end: 3 })}</span>
                    <img src="/images/icon-more.svg" alt="" />
                    <img src="/images/icon-metamask.svg" alt="Metamask" width={28} height={28} />
                </Space>
            ) : (
                <RButton type="primary" onClick={handleOpenModalConnectWallet}>
                    {t('header.connectWallet')}
                </RButton>
            )}
        </div>
    );
};

export default ButtonConnectWallet;
