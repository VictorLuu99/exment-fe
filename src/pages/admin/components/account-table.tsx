import { CheckCircleTwoTone, EyeTwoTone } from '@ant-design/icons';
import { Space, Tag } from 'antd';
import DataTable, { IHeader } from '../../../components/data-table';
import { UserStatusEnum } from '../../../constants/user';
import ConfirmModal from '../../../elements/modals/ConfirmModal';
import { IUser } from '../../../stores/user/type';
import { truncateString } from '../../../utils/string';

interface IAccountTable {
    dataBody: IUser[];
    onApproveAccount: (userId: number) => void;
}

const userStatusColors = {
    [UserStatusEnum.unverified]: 'blue',
    [UserStatusEnum.verified]: 'yellow',
    [UserStatusEnum.active]: 'green',
};

export const AccountTable = ({ dataBody, onApproveAccount }: IAccountTable) => {
    const header: IHeader[] = [
        {
            title: 'No.',
            dataIndex: 'index',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            sorterString: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorterString: true,
        },
        {
            title: 'Wallet Address',
            dataIndex: 'walletAddress',
            sorterString: true,
            render: (walletAddress: string) => (
                <div title={walletAddress}>{truncateString({ text: walletAddress ?? '', start: 10, end: 5 })}</div>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'role.role',
            sorterString: true,
        },
        {
            title: 'Status',
            dataIndex: 'userStatus.status',
            render: (status: UserStatusEnum) => {
                return <Tag color={userStatusColors[status]}>{status}</Tag>;
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (item: IUser) => (
                <Space size="middle">
                    <EyeTwoTone
                        key={item.id}
                        title="View account"
                        style={{ cursor: 'pointer' }}
                        twoToneColor="#1700e7"
                        onClick={() => console.log('edit')}
                    />
                    {item.userStatus.status !== UserStatusEnum.active && (
                        <ConfirmModal
                            content={`Approve account: ${item.walletAddress}?`}
                            type={'success'}
                            handleConfirm={() => onApproveAccount(item.id)}
                        >
                            <CheckCircleTwoTone
                                key={item.id}
                                title="Approve account"
                                style={{ cursor: 'pointer' }}
                                twoToneColor="#17ce0e"
                            />
                        </ConfirmModal>
                    )}
                </Space>
            ),
        },
    ];

    return <DataTable header={header} dataBody={dataBody} />;
};

export default AccountTable;
