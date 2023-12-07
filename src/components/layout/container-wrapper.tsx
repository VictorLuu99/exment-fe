import { FC, ReactNode } from 'react';
import useEagerConnect from '../../hooks/use-connection';
import useInactiveConnectorListener from '../../hooks/use-inactive-connector-listener';
import ModalNotActiveAccount from '../account/form-register-account/modal-not-active-account';
import ModalRegisterAccount from '../account/form-register-account/modal-register-account';
import ModalCreateCollection from '../collection/modal-create-collection';
import ModalEditCollection from '../collection/modal-edit-collection';
import ChangedAddressWallet from '../connector/changed-address-wallet';
import ConnectorErrorMessage from '../connector/error-message';
import ModalConnectWallet from '../connector/modal-connect-wallet';
import ModalPolicy from '../connector/modal-policy';
import WrongNetwork from '../connector/wrong-network';
import ModalOrderCollection from '../collection/modal-order-collection';

interface Props {
    children: ReactNode;
}

const ContainerWrapper: FC<Props> = ({ children }) => {
    const triedEager = useEagerConnect();
    useInactiveConnectorListener(!triedEager);

    return (
        <>
            <ConnectorErrorMessage />
            <WrongNetwork />
            <ModalConnectWallet />
            <ModalPolicy />
            <ModalRegisterAccount />
            <ModalNotActiveAccount />
            <ChangedAddressWallet />
            <ModalCreateCollection />
            <ModalEditCollection />
            <ModalOrderCollection />
            {children}
        </>
    );
};

export default ContainerWrapper;
