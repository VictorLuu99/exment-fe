import { ICategory } from '../stores/collection-category/type';
import { IGetAllDataQuery } from '../stores/type';
import { get } from './fetcher';
import { IGetAllDataReponse } from './reponse.type';

const servieCategory = {
    getAllCollectionCategories: async ({ page, limit }: IGetAllDataQuery) => {
        const response = await get<IGetAllDataReponse<ICategory>>('/mst-collection-categories', {
            page,
            limit,
        });

        return response.content;
    },
};

export default servieCategory;
