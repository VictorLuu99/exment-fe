import { Table } from 'antd';
import { accessDeepKeyObject } from '../../utils/access-deep-key-object';

export interface IHeader {
    title: string;
    dataIndex: string;
    sorterNumber?: boolean;
    sorterString?: boolean;
    render?: any;
}

interface IDataTable<T> {
    header: IHeader[];
    dataBody: T[];
}

const DataTable = <T extends object>({ header, dataBody }: IDataTable<T>) => {
    const columns = header.map(item => {
        const colItem: any = {};
        colItem.title = item.title;
        colItem.dataIndex = item.dataIndex;
        if (item.sorterNumber) {
            colItem.sorter = {
                compare: (a: any, b: any) => a[colItem.dataIndex] - b[colItem.dataIndex],
                multiple: colItem.multipleSort ? colItem.multipleSort : null,
            };
        }
        if (item.sorterString) {
            colItem.sorter = {
                compare: (a: any, b: any) => a[colItem.dataIndex].localeCompare(b[colItem.dataIndex]),
                multiple: colItem.multipleSort ? colItem.multipleSort : null,
            };
        }
        if (item.render) {
            colItem.render = item.render;
        }
        return colItem;
    });

    const data = dataBody?.map((item: any, index: number) => {
        const rowItem: any = {};
        rowItem.key = index;
        rowItem.index = index + 1;
        columns.forEach(col => {
            const dataIndex = col.dataIndex;
            if (dataIndex !== 'index' && dataIndex !== 'action') {
                if (dataIndex.includes('.')) {
                    rowItem[dataIndex] = accessDeepKeyObject(item, dataIndex);
                } else {
                    rowItem[dataIndex] = item[dataIndex];
                }
            }
            if (dataIndex === 'action') {
                rowItem[dataIndex] = item;
            }
        });
        return rowItem;
    });

    return <Table columns={columns} dataSource={data} />;
};

export default DataTable;
