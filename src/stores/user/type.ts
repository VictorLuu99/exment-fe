import { Roles, UserStatusEnum } from '../../constants/user';
import { EActionStatus, IGetAllDataQuery } from '../type';

export interface IUserState extends IGetAllDataQuery {
    status: EActionStatus;
    userList: IUser[];
    userDetail: IUser | null;
}

export interface CreateAccountInput {
    email: string;
    username: string;
    walletAddress: string;
    signature: string;
    roleName: Roles;
}

export interface UserRole {
    role: Roles;
    description: string;
}
export interface UserStatus {
    status: UserStatusEnum;
    description: string;
}

export interface IUser {
    id: number;
    avatar?: string;
    banner?: string;
    username: string;
    email: string;
    walletAddress: string;
    role: UserRole;
    userStatus: UserStatus;
    createdAt: string;
    updatedAt: string;
}
