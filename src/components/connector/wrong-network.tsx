import { Modal } from 'antd';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NETWORKS } from '../../constants';
import RMessage from '../../elements/message';
import { RootState } from '../../stores';
import { signOut } from '../../stores/auth/slice';
import { hideWrongNetwork } from '../../stores/message/slice';
import { hideModalConnect } from '../../stores/modal/slice';
import style from './style.module.scss';

const WrongNetwork: FC<{}> = () => {
    const { t } = useTranslation();
    const messageGlobal = useSelector((state: RootState) => state.messageGlobal);
    const dispatch = useDispatch();
    const { visibleWrongNetwork } = messageGlobal;

    const SUPPORTED_CHAIN_IDS = process.env.REACT_APP_SUPPORTED_CHAIN
        ? process.env.REACT_APP_SUPPORTED_CHAIN?.split(',').map(chain => Number(chain))
        : [NETWORKS.Goerli.chainId];

    const network = Object.values(NETWORKS).find(network => network.chainId === SUPPORTED_CHAIN_IDS[0]);
    const chainIdHex = network?.hexaChainId ?? NETWORKS.Goerli.hexaChainId;

    const handleClose = () => {
        dispatch(hideWrongNetwork());
        dispatch(signOut());
    };

    const addNetwork = async () => {
        try {
            await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainName: network?.name,
                        chainId: network?.hexaChainId,
                        nativeCurrency: network?.nativeCurrency,
                        rpcUrls: network?.rpcUrls ?? [],
                        blockExplorerUrls: [network?.blockExplorerUrl ?? ''],
                    },
                ],
            });
            if (visibleWrongNetwork) {
                dispatch(hideWrongNetwork());
                dispatch(signOut());
            }
        } catch (error) {
            if ((error as any).code === 4001) {
                RMessage.error(t('header.declinedAction'));
            }
        }
    };

    const handleSwitchNetwork = async () => {
        if (!window) return;
        try {
            await (window as any).ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        chainId: chainIdHex,
                    },
                ],
            });
            dispatch(hideWrongNetwork());
        } catch (error) {
            if ((error as any).code === 4001) {
                // RMessage.error(t('header.declinedAction'));
                return;
            }

            if ((error as any).code === 4902) {
                addNetwork();
            }
        }
    };

    useEffect(() => {
        if (visibleWrongNetwork) {
            handleSwitchNetwork();
            dispatch(hideModalConnect());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visibleWrongNetwork]);

    return (
        <Modal
            className={style.modalWrongNetwork}
            closeIcon={<img src="/images/icon-close.svg" alt=""></img>}
            centered
            footer={null}
            open={visibleWrongNetwork}
            onCancel={handleClose}
        >
            <div className={style.wrongNetwork}>
                <div className={style.titleNetWork}>{t('header.unsupportedNetwork')}</div>
                <div className={style.iconWrongNetwork}>
                    <img src="/images/icon-wrong-network.svg" alt="" />
                </div>
                <h3 className={style.wrongNetworkMessage}>{t('header.unsupportedNetworkDesc')}</h3>
            </div>
        </Modal>
    );
};

export default WrongNetwork;
