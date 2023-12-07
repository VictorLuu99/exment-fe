import { injected } from './connectors';

import { utils, BigNumber, ethers } from 'ethers';
import { WalletBalance } from '../stores/auth/type';

const toNumberFromBigNumber = (value: BigNumber, decimal = 18) => {
    const res = utils.formatUnits(value, decimal).toString();
    return Number(res);
};

const truncateBalance = ({
    balance,
    isRound = true,
    lengthDecimal = 6,
}: {
    balance: string | number;
    isRound?: boolean;
    lengthDecimal?: number;
}): string => {
    if(!balance) return '';
    const balanceStr = balance.toString();
    if (balanceStr.indexOf('.') === -1) return balanceStr;
    if (isRound) {
        const num = parseFloat(balanceStr);
        const trailingZeroNumber = Number(num.toFixed(lengthDecimal));
        return `${trailingZeroNumber}`;
    }
    const decimal = balanceStr.split('.');
    decimal[1] = decimal[1].substring(0, lengthDecimal);
    return decimal.join('.');
};

const getWalletBalance = async (walletAddress: string, chainId?: number): Promise<WalletBalance> => {
    if (!walletAddress) {
        return {
            balance: 0,
            balanceOrigin: '0',
        };
    }

    const injectedProvider = await injected.getProvider();
    const provider = new ethers.providers.Web3Provider(injectedProvider, 'any');

    const balanceBN = await provider.getBalance(walletAddress);
    const balance = toNumberFromBigNumber(balanceBN);
    const balanceOrigin = utils.formatEther(balanceBN);

    return {
        balance,
        balanceOrigin,
    };
};


const serviceEthers = {
    toNumberFromBigNumber,
    truncateBalance,
    getWalletBalance,
};

export default serviceEthers;
