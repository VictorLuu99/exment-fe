import { FC, useEffect } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';
import { useSelector, useDispatch } from 'react-redux';

import RMessage from '../../elements/message';
import { RootState } from '../../stores';
import { hideWrongNetwork, showWrongNetwork } from '../../stores/message/slice';
import { useTranslation } from 'react-i18next';

const ConnectorErrorMessage: FC<{}> = () => {
    const { t } = useTranslation();
    const { error } = useWeb3React();
    const { visibleWrongNetwork } = useSelector((state: RootState) => state.messageGlobal);
    const dispatch = useDispatch();

    useEffect(() => {
        if ((!error && !visibleWrongNetwork) || (error && visibleWrongNetwork)) return;

        if (!error && visibleWrongNetwork) {
            dispatch(hideWrongNetwork());
            return;
        }

        if (error instanceof NoEthereumProviderError) {
            // RMessage.error(t('header.installMetamask'));
            return;
        }

        if (error instanceof UnsupportedChainIdError) {
            dispatch(showWrongNetwork());
            return;
        }

        if (error instanceof UserRejectedRequestError) {
            // RMessage.error(t('header.declinedAction'));
            return;
        }

        // RMessage.error('An unknown error occurred');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return null;
};

export default ConnectorErrorMessage;
