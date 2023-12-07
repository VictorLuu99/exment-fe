import DataTable, { IHeader } from '../../../components/data-table';
import { INft } from '../../../stores/nft/type';
import { formatFullTimeString } from '../../../utils/date';
import { truncateString } from '../../../utils/string';
import './style.scss';

interface INftTable {
    dataBody: INft[];
}

export const NftTable = ({ dataBody }: INftTable) => {
    const header: IHeader[] = [
        {
            title: 'No.',
            dataIndex: 'index',
        },
        {
            title: 'Image',
            dataIndex: 'collection.image',
            render: (image: string) =>
                image ? (
                    <div className="collection-image">
                        <img src={image} alt="collection-alt" />
                    </div>
                ) : (
                    <div className="collection-image">
                        <img src="/images/default-image.jpeg" alt="default-alt" />
                    </div>
                ),
        },
        {
            title: 'Collection',
            dataIndex: 'collection.collectionName',
            sorterString: true,
        },
        {
            title: 'Address',
            dataIndex: 'collection.address',
            render: (address: string) => (
                <div title={address}>
                    {address ? truncateString({ text: address ?? '', start: 10, end: 5 }) : 'Null'}
                </div>
            ),
        },
        {
            title: 'Token ID',
            dataIndex: 'tokenId',
        },
        {
            title: 'Price',
            dataIndex: 'collection.price',
            sorterNumber: true,
        },
        {
            title: 'Category',
            dataIndex: 'collection.mstCollectionCategory.name',
            sorterString: true,
        },
        {
            title: 'Buyer',
            dataIndex: 'owner.username',
            sorterString: true,
        },
        {
            title: 'Seller',
            dataIndex: 'collection.user.username',
            sorterString: true,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            sorterString: true,
            render: (createdAt: string) => <div title={createdAt}>{formatFullTimeString(createdAt)}</div>,
        },
    ];

    return <DataTable header={header} dataBody={dataBody} />;
};

export default NftTable;
