import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../services/connectors";
import { useDispatch } from "react-redux";
import { signOut } from "../stores/auth/slice";

function useInactiveConnectorListener(suppress = false) {
    const { active, error, activate } = useWeb3React();
    const dispatch = useDispatch();

    useEffect(() => {
        const { ethereum } = window as any;
        if (ethereum) {
            ethereum._metamask.isUnlocked().then((res: boolean) => {
                if (!res) {
                    dispatch(signOut());
                }
            });
        }
        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleConnect = () => {
                activate(injected);
            };
            const handleChainChanged = (_: string | number) => {
                activate(injected);
            };
            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length > 0) {
                    activate(injected);
                }
            };
            const handleNetworkChanged = (_: string | number) => {
                activate(injected);
            };

            ethereum.on("connect", handleConnect);
            ethereum.on("chainChanged", handleChainChanged);
            ethereum.on("accountsChanged", handleAccountsChanged);
            ethereum.on("networkChanged", handleNetworkChanged);

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener("connect", handleConnect);
                    ethereum.removeListener("chainChanged", handleChainChanged);
                    ethereum.removeListener(
                        "accountsChanged",
                        handleAccountsChanged
                    );
                    ethereum.removeListener(
                        "networkChanged",
                        handleNetworkChanged
                    );
                }
            };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, error, suppress, activate]);
}

export default useInactiveConnectorListener;
