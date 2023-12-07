import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';

export const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const delayTime = 3000;
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
export const timeOut = async (fn: any) => {
    await fn();
    await sleep(delayTime);
    await timeOut(fn);
};

export const convertWeiToEther = async (wei: number) => {
    return ethers.utils.formatEther(wei);
};
export const parseEther = async (number: string) => {
    return ethers.utils.parseEther(number);
};
