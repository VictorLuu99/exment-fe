import { CheckCircleTwoTone, CloseSquareTwoTone, EyeTwoTone } from '@ant-design/icons';
import { Space, Tag } from 'antd';
import DataTable, { IHeader } from '../../../components/data-table';
import { COLLECTION_STATUS, COLLECTION_STATUS_TO_TEXT } from '../../../constants/collection';
import ConfirmModal from '../../../elements/modals/ConfirmModal';
import { ICollection } from '../../../stores/collection/type';
import { truncateString } from '../../../utils/string';
import './style.scss';
import { formatFullTimeString } from '../../../utils/date';

interface ICollectionTable {
    dataBody: ICollection[];
    onApproveCollection: (userId: number) => void;
}

const collectionStatusColors = {
    [COLLECTION_STATUS.ACTIVE]: 'green',
    [COLLECTION_STATUS.APPROVED]: 'blue',
    [COLLECTION_STATUS.DEACTIVE]: 'gray',
    [COLLECTION_STATUS.PENDING]: 'yellow',
    [COLLECTION_STATUS.REJECTED]: 'red',
    [COLLECTION_STATUS.DRAFT]: 'black',
};

export const CollectionTable = ({ dataBody, onApproveCollection }: ICollectionTable) => {
    const header: IHeader[] = [
        {
            title: 'No.',
            dataIndex: 'index',
        },
        {
            title: 'Image',
            dataIndex: 'image',
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
            dataIndex: 'collectionName',
            sorterString: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            render: (address: string) => (
                <div title={address}>
                    {address ? truncateString({ text: address ?? '', start: 10, end: 5 }) : 'Null'}
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorterNumber: true,
        },
        {
            title: 'Total Sold',
            dataIndex: 'totalSold',
            sorterNumber: true,
        },
        {
            title: 'Category',
            dataIndex: 'mstCollectionCategory.name',
            sorterString: true,
        },
        {
            title: 'Owner',
            dataIndex: 'user.username',
            sorterString: true,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            sorterString: true,
            render: (createdAt: string) => <div title={createdAt}>{formatFullTimeString(createdAt)}</div>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorterString: true,
            render: (status: COLLECTION_STATUS) => {
                return <Tag color={collectionStatusColors[status]}>{COLLECTION_STATUS_TO_TEXT[status]}</Tag>;
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (item: ICollection) => (
                <Space size="middle">
                    <EyeTwoTone
                        key={item.id}
                        title="View collection"
                        style={{ cursor: 'pointer' }}
                        twoToneColor="#1700e7"
                        onClick={() => console.log('edit')}
                    />
                    {item.status === COLLECTION_STATUS.PENDING && (
                        <>
                            <ConfirmModal
                                content={`Approve collection: ${item.collectionName}?`}
                                type={'confirm'}
                                handleConfirm={() => onApproveCollection(item.id)}
                            >
                                <CheckCircleTwoTone
                                    key={item.id}
                                    title="Approve collection"
                                    style={{ cursor: 'pointer' }}
                                    twoToneColor="#17ce0e"
                                />
                            </ConfirmModal>
                            <ConfirmModal
                                content={`Reject collection: ${item.collectionName}?`}
                                type={'error'}
                                handleConfirm={() => console.log(item.id)}
                            >
                                <CloseSquareTwoTone
                                    key={item.id}
                                    title="Reject collection"
                                    style={{ cursor: 'pointer' }}
                                    twoToneColor="#f70901"
                                />
                            </ConfirmModal>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return <DataTable header={header} dataBody={dataBody} />;
};

export default CollectionTable;
