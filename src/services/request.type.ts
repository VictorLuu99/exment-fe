export interface ApiResponse<T = {}> {
    success: boolean;
    code?: string | number;
    content?: T;
    message?: string;
}

export type DataResponse<Data = null, Error = any> = [Data, Error];
