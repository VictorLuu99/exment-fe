import { IGetAllNftQuery, INft } from '../stores/nft/type';
import { get, post } from './fetcher';
import { IGetAllDataReponse } from './reponse.type';

const serviceNft = {
    buyNft: async (collectionId: number, signature: string) => {
        const response = await post<INft>(`/nfts/buy-nft`, {
            collectionId,
            signature,
        });

        return response.content;
    },
    getAllNfts: async ({
        page,
        limit,
        keyword,
        status,
        startDate,
        endDate,
        buyerIds,
        sellerIds,
        collectionIds,
    }: IGetAllNftQuery) => {
        const response = await get<IGetAllDataReponse<INft>>('/nfts', {
            page,
            limit,
            keyword,
            status,
            buyerIds,
            sellerIds,
            startDate,
            endDate,
            collectionIds,
        });

        return response.content;
    },
};

export default serviceNft;
