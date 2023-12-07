import {
    CreateCollectionInput,
    EditCollectionInput,
    ICollection,
    IGetAllCollectionQuery,
} from '../stores/collection/type';
import { get, patch, post, put } from './fetcher';
import { IGetAllDataReponse } from './reponse.type';

const serviceCollection = {
    getAllCollections: async ({ page, limit, keyword, walletAddress, collectionStatus }: IGetAllCollectionQuery) => {
        const response = await get<IGetAllDataReponse<ICollection>>('/collection', {
            page,
            limit,
            keyword,
            walletAddress,
            status: collectionStatus,
        });

        return response.content;
    },

    getCollectionBySlug: async ({ slug }: { slug: string }) => {
        const response = await get<ICollection>('/collection/get-collection-by-slug', {
            slug,
        });

        return response.content;
    },

    createCollection: async (createCollectionInput: CreateCollectionInput) => {
        const response = await post<ICollection>('/collection', {
            ...createCollectionInput,
        });

        return response.content;
    },

    editCollection: async (collectionId: number, data: EditCollectionInput) => {
        const response = await patch<ICollection>(`/collection/approve/${collectionId}`, {
            ...data,
        });

        return response.content;
    },

    draftCollection: async (collectionId: number, data: CreateCollectionInput) => {
        const response = await put<ICollection>(`/collection/${collectionId}`, {
            ...data,
        });
        return response.content;
    },
    orderCollection: async (collectionId: number, signature: string) => {
        const response = await post<ICollection>(`/nfts/buy-nft`, {
            collectionId,
            signature,
        });

        return response.content;
    },
};

export default serviceCollection;
