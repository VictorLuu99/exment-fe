import { COLLECTION_STATUS } from '../../constants/collection';
import { EActionStatus } from '../type';
import { IUser } from '../user/type';

export interface ICollectionCategory {
    id: number;
    name: string;
}

export interface ICollection {
    id: number;
    collectionName: string;
    image: string | null;
    bannerImage: string | null;
    status: COLLECTION_STATUS;
    address: string;
    totalSold: number;
    price: string;
    description: string;
    slug: string;
    mstCollectionCategory: ICollectionCategory;
    user: IUser;
    createdAt: string;
    symbol: string;
}

export interface IGetAllCollectionQuery {
    page: number;
    limit: number;
    keyword?: string;
    walletAddress?: string;
    collectionStatus?: COLLECTION_STATUS[];
}

export interface ICollectionState extends IGetAllCollectionQuery {
    status: EActionStatus;
    isCreating: EActionStatus;
    isEditing: EActionStatus;
    collectionList: ICollection[];
    collectionDetail: ICollection | null;
    isDrafting: EActionStatus;
}

export interface CreateCollectionInput {
    collectionName: string;
    image: string;
    bannerImage: string;
    categoryId: number;
    price: string;
    slug: string;
    symbol: string;
    description?: string;
    status?: COLLECTION_STATUS;
}

export interface EditCollectionInput {
    status: string;
}
