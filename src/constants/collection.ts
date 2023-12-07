import { enumToArray } from '../utils/enum-to-array';

export enum COLLECTION_STATUS {
    ACTIVE = '1',
    DEACTIVE = '2',
    PENDING = '3',
    APPROVED = '4',
    REJECTED = '5',
    DRAFT = '6',
}

export const ALL_STATUS_ARRAY = enumToArray(COLLECTION_STATUS);

export const COLLECTION_STATUS_TO_TEXT: {
    [key in COLLECTION_STATUS]: string;
} = {
    [COLLECTION_STATUS.ACTIVE]: 'Active',
    [COLLECTION_STATUS.DEACTIVE]: 'Deactive',
    [COLLECTION_STATUS.PENDING]: 'Pending',
    [COLLECTION_STATUS.APPROVED]: 'Approved',
    [COLLECTION_STATUS.REJECTED]: 'Rejected',
    [COLLECTION_STATUS.DRAFT]: 'Draft',
};

export const COLLECTION_STATUS_COLOR: {
    [key in COLLECTION_STATUS]: string;
} = {
    [COLLECTION_STATUS.ACTIVE]: 'green',
    [COLLECTION_STATUS.DEACTIVE]: 'red',
    [COLLECTION_STATUS.PENDING]: 'blue',
    [COLLECTION_STATUS.APPROVED]: 'orange',
    [COLLECTION_STATUS.REJECTED]: 'yellow',
    [COLLECTION_STATUS.DRAFT]: 'black',
};

export const PREFIX_ORDER_COLLECTION_SIGNED_MESSAGE = 'Buy Collection: ';
