import { useWeb3React } from '@web3-react/core';
import { Modal } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import RButton from '../../elements/button';
import { signMessage } from '../../services/connectors';
import { RootState } from '../../stores';
import { getSignedMessageToLogin, signIn } from '../../stores/auth/slice';
import { hideModalPolicy, showModalNotActiveAccount, showModalRegisterAccount } from '../../stores/modal/slice';
import style from './style.module.scss';
import { ErrorCode } from './type';

const ModalPolicy = () => {
    const { t } = useTranslation();
    const { account, deactivate } = useWeb3React();
    const modalConnectGlobal = useSelector((state: RootState) => state.modalConnectGlobal);

    const auth = useSelector((state: RootState) => state.auth);
    const { openModalPolicy } = modalConnectGlobal;
    const dispatch = useDispatch();

    const [isPending, setPending] = useState<boolean>(false);
    // const [isActivatingConnector, setActivatingConnector] = useState<boolean>(false);

    const handleClose = () => {
        deactivate();
        dispatch(hideModalPolicy());
    };

    // handle login
    const { signedMessageToLogin, signedMessageErrorCode } = auth;

    useEffect(() => {
        if (!account) return;
        const handleLogin = async () => {
            const signature = await signMessage(signedMessageToLogin);
            if (signature) {
                dispatch(hideModalPolicy());
                dispatch(signIn({ walletAddress: account, signature }));
            }
        };
        if (signedMessageToLogin) {
            handleLogin();
        }
        // eslint-disable-next-line
    }, [signedMessageToLogin]);

    // handle open popup register
    useEffect(() => {
        if (signedMessageErrorCode && signedMessageErrorCode === ErrorCode.USER_NOT_FOUND) {
            dispatch(hideModalPolicy());
            dispatch(showModalRegisterAccount());
        }
        // eslint-disable-next-line
    }, [signedMessageErrorCode]);

    // handle open modal to notify account is not activated
    // handle open popup register
    useEffect(() => {
        if (signedMessageErrorCode && signedMessageErrorCode === ErrorCode.USER_NOT_ACTIVE) {
            dispatch(hideModalPolicy());
            dispatch(showModalNotActiveAccount());
        }
        // eslint-disable-next-line
    }, [signedMessageErrorCode]);

    const handleGetSignedMessage = () => {
        if (!account) return;
        if (!isPending) {
            setPending(true);
        }

        dispatch(
            getSignedMessageToLogin({
                walletAddress: account,
            }),
        );
    };

    return (
        <Modal
            open={openModalPolicy}
            centered
            className={style.modalPolicy}
            closable={false}
            confirmLoading={false}
            title={t('header.welcomExment')}
            footer={[
                <RButton key="back" onClick={handleClose}>
                    Cancel
                </RButton>,
                <RButton key="submit" type="primary" onClick={handleGetSignedMessage}>
                    Accept and sign
                </RButton>,
            ]}
        >
            {/* <div className={style.policyTitle}>{t('header.welcomExment')}</div> */}
            <div className={style.frameImg}>
                <img width={300} height={80} src="/images/logo.png" alt="" />
            </div>
            <p className={style.textContainerPolicy}>
                {t('header.contentPolicy')}{' '}
                <a target="_blank" href="/tos" className={style.textHighlight}>
                    {t('header.termsOfService')}
                </a>{' '}
                {t('header.and')}{' '}
                <a target="_blank" href="/privacy" className={style.textHighlight}>
                    {t('header.privacyPolicy')}
                </a>
                .
            </p>
        </Modal>
    );
};

export default ModalPolicy;
