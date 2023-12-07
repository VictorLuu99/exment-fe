import { NFT_STATUS } from '../../constants/nft';
import { ICollection } from '../collection/type';
import { EActionStatus } from '../type';
import { IUser } from '../user/type';

export interface INft {
    id: number;
    collectionId: number;
    chainId: number;
    ownerId: number;
    tokenId?: number;
    tokenUri?: string;
    status: NFT_STATUS;
    createdAt: string;
    updatedAt: string;
    collection: ICollection;
    owner: IUser;
}

export interface INftState {
    status: EActionStatus;
    nftList: INft[];
    page: number;
    limit: number;
    errorMessage?: string;
}

export interface IGetAllNftQuery {
    page: number;
    limit: number;
    keyword?: string;
    collectionIds?: number[];
    buyerIds?: number[];
    sellerIds?: number[];
    status?: NFT_STATUS;
    startDate?: string;
    endDate?: string;
}
