import { useWeb3React } from '@web3-react/core';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import LoaderSpin from '../../elements/loader/spin';
import { injected } from '../../services/connectors';
import { RootState } from '../../stores';
import { hideModalConnect, showModalPolicy } from '../../stores/modal/slice';
import { EActionStatus } from '../../stores/type';
import style from './style.module.scss';

const ModalConnectWallet = () => {
    const { t } = useTranslation();
    const { account, activate, library } = useWeb3React();
    const modalConnectGlobal = useSelector((state: RootState) => state.modalConnectGlobal);

    const auth = useSelector((state: RootState) => state.auth);
    const { openModalConnect } = modalConnectGlobal;
    const dispatch = useDispatch();

    const [isPending, setPending] = useState<boolean>(false);
    const [isActivatingConnector, setActivatingConnector] = useState<boolean>(false);
    const isLoading = auth.status === EActionStatus.Pending || isPending || isActivatingConnector;

    const handleClose = () => {
        dispatch(hideModalConnect());
    };

    const handleConnect = async () => {
        try {
            setPending(false);
            setActivatingConnector(false);
            dispatch(hideModalConnect());
            if (true) dispatch(showModalPolicy());
        } catch (error) {
            setPending(false);
            setActivatingConnector(false);
        }
    };

    const handleConnectMetamask = async () => {
        try {
            const { ethereum } = window as any;

            if (ethereum?.isMetaMask) {
                if (account && library) {
                    handleConnect();
                    return;
                }
                setActivatingConnector(true);
                await activate(injected);

                return;
            }

            window.open('https://metamask.io/download.html');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isActivatingConnector && account && library) {
            handleConnect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActivatingConnector, account, library]);

    const isSuccess = auth.status === EActionStatus.Succeeded;
    return (
        <Modal
            open={openModalConnect}
            centered
            footer={null}
            onCancel={handleClose}
            className={style.modalSignIn}
            closeIcon={<img src="/images/icon-close.svg" alt=""></img>}
        >
            <div className={style.connectTitle}>{t('header.connectWallet')}</div>
            {isLoading && !isSuccess && (
                <div className={style.boxMetaLoading}>
                    <LoaderSpin className={style.loaderSpin} />
                    <span className={style.textInit}>{t('header.initializing')}</span>
                </div>
            )}
            {!isSuccess ? (
                <div className={style.textContainer} onClick={handleConnectMetamask}>
                    <img src="/images/icon-metamask.svg" alt="Metamask" />
                    <span className={style.textMetamask}>MetaMask</span>
                </div>
            ) : (
                <></>
            )}
        </Modal>
    );
};

export default ModalConnectWallet;
