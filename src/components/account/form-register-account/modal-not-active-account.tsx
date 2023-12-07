import { useWeb3React } from '@web3-react/core';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import RButton from '../../../elements/button';
import { RootState } from '../../../stores';
import { clearSignedMessageToLogin } from '../../../stores/auth/slice';
import { hideModalNotActiveAccount } from '../../../stores/modal/slice';

const ModalNotActiveAccount = () => {
    const { t } = useTranslation();
    const { deactivate } = useWeb3React();

    const { openModalNotActiveAccount } = useSelector((state: RootState) => state.modalConnectGlobal);

    const dispatch = useDispatch();

    const handleClose = () => {
        deactivate();
        dispatch(hideModalNotActiveAccount());
        dispatch(clearSignedMessageToLogin());
    };

    // handle open popup register

    return (
        <Modal
            open={openModalNotActiveAccount}
            centered
            // className={style.modalPolicy}
            closable={false}
            confirmLoading={false}
            title={t('account.notActive')}
            footer={[
                <RButton type="primary" onClick={handleClose}>
                    OK
                </RButton>,
                // <RButton key="submit" type="primary" onClick={handleGetSignedMessage}>
                //     Accept and sign
                // </RButton>,
            ]}
        >
            Account has not already actived. Please wait for admin active it.
        </Modal>
    );
};

export default ModalNotActiveAccount;
