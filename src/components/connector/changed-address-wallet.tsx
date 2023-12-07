import { FC, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/index';
import { changeAccountWallet, signOut } from '../../stores/auth/slice';

const ChangedAddressWallet: FC<{}> = () => {
    const { account, library } = useWeb3React();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!account || !library?.provider || !isAuthenticated) return;
        const handleChangeAccount = (accounts: string[]) => {
            if (!accounts[0]) {
                dispatch(signOut());
                return;
            }

            dispatch(changeAccountWallet({ walletAddress: accounts[0] }));
        };

        library.provider.on('accountsChanged', handleChangeAccount);

        return () => {
            library.provider?.removeListener('accountsChanged', handleChangeAccount);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, library?.provider, isAuthenticated]);

    return null;
};

export default ChangedAddressWallet;
