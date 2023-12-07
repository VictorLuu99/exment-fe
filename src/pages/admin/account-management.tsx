import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { approveUserRequest, getAllUsersRequest } from '../../stores/user/slice';
import AccountTable from './components/account-table';

const AccountManagementPage = () => {
    const dispatch = useDispatch();
    const { page, limit, userList } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(
            getAllUsersRequest({
                page,
                limit,
            }),
        );
    }, []);

    const handleApproveAccount = (userId: number) => {
        dispatch(approveUserRequest(userId));
    };

    return (
        <>
            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '10px' }}>
                Total users: {userList?.length || 0}
            </div>
            <AccountTable dataBody={userList} onApproveAccount={handleApproveAccount} />;
        </>
    );
};

export default AccountManagementPage;
