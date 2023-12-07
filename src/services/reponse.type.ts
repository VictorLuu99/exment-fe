import { IUserInfoPublic } from '../stores/auth/type';

export interface IUserLoginReponse {
    userData: IUserInfoPublic;
    accessToken: string;
    refreshToken: string;
}

export interface IUserRegisterReponse {
    username: string;
    email: string;
    walletAddress: string;
    // verifyEmailToken: string;
    // verifyEmailExpire: string;
    // nonce: string | null;
    // id: number;
    // role: string;
    // status: string;
    // createdAt: string;
    // updatedAt: string;
}

export interface IPresignedUrls {
    uploadUrls: string[];
}

export interface IMeta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface IGetAllDataReponse<T> {
    items: T[];
    meta: IMeta;
}
