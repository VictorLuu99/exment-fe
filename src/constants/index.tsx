export const NETWORKS = {
    Mainnet: {
        chainId: 1,
        hexaChainId: '0x1',
        name: 'Etherium mainnet',
        rpcUrls: [process.env.REACT_APP_RPC ?? ''],
        nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
        blockExplorerUrl: process.env.REACT_APP_BLOCK_EXPLORER_URL ?? '',
    },

    Goerli: {
        chainId: 5,
        hexaChainId: '0x5',
        name: 'Goerli test network',
        rpcUrls: [process.env.REACT_APP_RPC ?? ''],
        nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
        blockExplorerUrl: process.env.REACT_APP_BLOCK_EXPLORER_URL ?? '',
    },
};
export declare enum ChainId {
    MAINNET = 1,
    GOERLI = 5,
}

export const StatusCheck404 = [500, 422, 404];
