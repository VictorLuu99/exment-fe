import { ethers, providers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NETWORKS } from '../constants';

const SUPPORTED_CHAIN_IDS = process.env.REACT_APP_SUPPORTED_CHAIN
    ? process.env.REACT_APP_SUPPORTED_CHAIN?.split(',').map(chain => Number(chain))
    : [NETWORKS.Goerli.chainId];

export const injected = new InjectedConnector({
    supportedChainIds: SUPPORTED_CHAIN_IDS,
});

export const signWallet = async (library: any, message: string): Promise<string> => {
    if (!library) throw new Error('Invalid library');

    const signer = library.getSigner();
    const address = await signer.getAddress();
    // metamask return obj `signature.result`, walletconnect return signature as string
    const signature = await library.provider.send('personal_sign', [
        ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message)),
        address.toLowerCase(),
    ]);
    return signature?.result || signature;
};

export const getProvider = async () => {
    const provider = await injected.getProvider();
    return new providers.Web3Provider(provider);
};

export const getSigner = async () => {
    const provider = await getProvider();
    return provider.getSigner();
};

export const signMessage = async (message: string) => {
    const signer = await getSigner();
    const signature = await signer.signMessage(message);
    return signature;
};

export const getContractInstance = async (abi: any, contractAddress: string) => {
    const provider = await getProvider();

    return new ethers.Contract(contractAddress, abi, provider);
};
