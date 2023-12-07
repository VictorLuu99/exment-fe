import { EActionStatus, IGetAllDataQuery } from '../type';

export interface ICategory {
    id: number;
    name: string;
}

export interface ICategoryState extends IGetAllDataQuery {
    status: EActionStatus;
    caterogyList: ICategory[];
}
