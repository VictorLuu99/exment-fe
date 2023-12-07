import { RcFile } from 'antd/es/upload';
import { get, put } from './fetcher';
import { IPresignedUrls } from './reponse.type';
import { getSlugFromName } from '../utils/get-slug';
import axios from 'axios';

export const getFileImageName = (imgFile: RcFile, prefixName: string) => {
    const { type } = imgFile;
    const name = getSlugFromName(prefixName) + '-' + new Date().getTime();
    const extension = type.split('/')[1];
    return `${name}.${extension}`;
};

const serviceS3 = {
    getPresignedUrls: async (fileConfigs: { file: RcFile; prefixName: string }[]) => {
        const fileNames = fileConfigs.map(fileConfig => getFileImageName(fileConfig.file, fileConfig.prefixName));

        const response = await get<IPresignedUrls>('/s3', {
            fileNames,
        });

        return response.content?.uploadUrls as string[];
    },

    uploadFile: async (file: RcFile, uploadUrl: string) => {
        const headers = {
            'Content-Type': file.type,
        };

        const axiosInstance = axios.create();
        const response = await axiosInstance.request({
            method: 'PUT',
            data: file,
            url: uploadUrl,
            headers,
        });

        return response.data;
    },
};

export default serviceS3;
