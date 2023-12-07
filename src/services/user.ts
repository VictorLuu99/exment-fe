import { Cookies } from 'react-cookie';
import { IUserInfoPublic } from '../stores/auth/type';
import { IGetAllDataQuery } from '../stores/type';
import { CreateAccountInput, IUser } from '../stores/user/type';
import { get, post, put } from './fetcher';
import { IGetAllDataReponse, IUserLoginReponse, IUserRegisterReponse } from './reponse.type';

const cookies = new Cookies();

const USER_INFO_STORAGE_KEY = 'usr_if';
const USER_TOKEN_STORAGE_KEY = 'usr_tk';
const USER_LANGUAGE_STORAGE_KEY = 'usr_lg';
const USER_REFRESH_TOKEN_STORAGE_KEY = 'usr_refresh_token';

const serviceUser = {
    storeInfo: (user: IUserInfoPublic | null) => {
        if (user) {
            cookies.set(USER_INFO_STORAGE_KEY, JSON.stringify(user), { path: '/' });
            return;
        }
        cookies.remove(USER_INFO_STORAGE_KEY, { path: '/' });
    },
    storeAccessToken: (token: string | null) => {
        if (token) {
            cookies.set(USER_TOKEN_STORAGE_KEY, JSON.stringify(token), { path: '/' });
            return;
        }
        cookies.remove(USER_TOKEN_STORAGE_KEY, { path: '/' });
    },
    getInfoStorage: (): IUserInfoPublic | null => {
        const userInfo = cookies.get(USER_INFO_STORAGE_KEY);
        return userInfo ? userInfo : null;
    },
    getAccessTokenStorage: (): string | null => {
        const tokenString = cookies.get(USER_TOKEN_STORAGE_KEY);
        return tokenString ? tokenString : null;
    },
    storeLanguage: (language: string | null) => {
        if (language) {
            cookies.set(USER_LANGUAGE_STORAGE_KEY, JSON.stringify(language), { path: '/' });
            return;
        }
        cookies.remove(USER_LANGUAGE_STORAGE_KEY, { path: '/' });
    },
    getLanguage: () => {
        const language = cookies.get(USER_LANGUAGE_STORAGE_KEY);
        return language ? language : 'en';
    },
    storeRefreshToken: (token: string | null) => {
        if (token) {
            cookies.set(USER_REFRESH_TOKEN_STORAGE_KEY, JSON.stringify(token), { path: '/' });
            return;
        }
        cookies.remove(USER_REFRESH_TOKEN_STORAGE_KEY, { path: '/' });
    },
    getRefreshTokenStorage: (): string | null => {
        const tokenString = cookies.get(USER_REFRESH_TOKEN_STORAGE_KEY);
        return tokenString ? tokenString : null;
    },
    getRefreshToken: async () => {
        const refreshToken = cookies.get(USER_REFRESH_TOKEN_STORAGE_KEY);
        const response = await get<{
            accessToken: string;
        }>('/auths/refresh-token', {
            refreshToken,
        });
        const accessToken = response.content?.accessToken;
        if (accessToken) {
            cookies.set(USER_TOKEN_STORAGE_KEY, JSON.stringify(accessToken), { path: '/' });
        }
        return accessToken;
    },
    getSignedMessageToLogin: async (walletAddress: string) => {
        const response = await get('/auths/get-signed-message', {
            walletAddress,
        });

        const signedMessage = response.content;

        return signedMessage;
    },
    login: async (walletAddress: string, signature: string) => {
        const response = await post<IUserLoginReponse>('/auths/login', {
            walletAddress,
            signature,
        });

        return response.content;
    },
    register: async ({ walletAddress, signature, username, email, roleName }: CreateAccountInput) => {
        const response = await post<IUserRegisterReponse>('/users', {
            walletAddress,
            signature,
            username,
            email,
            roleName,
        });

        return response.content;
    },
    getAllUsers: async ({ page, limit }: IGetAllDataQuery) => {
        const response = await get<IGetAllDataReponse<IUser>>('/users', {
            page,
            limit,
        });

        return response.content;
    },
    approveUser: async (userId: number) => {
        const response = await put<IUser>(`/users/active/${userId}`);

        return response.content;
    },
    getUserByWalletAddress: async ({ walletAddress }: { walletAddress: string }) => {
        const response = await get<IUser>('/users/get-user-by-wallet-address', {
            walletAddress,
        });

        return response.content;
    },
};

export default serviceUser;
