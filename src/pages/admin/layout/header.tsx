import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Layout, Row, Space, Tooltip, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmModal from '../../../elements/modals/ConfirmModal';
import routeNames from '../../../routes/names';
import { RootState } from '../../../stores';
import { signOut } from '../../../stores/auth/slice';
import './style.scss';
const { Text } = Typography;

function Header() {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(signOut());
        navigate('/');
    };
    return (
        <Layout.Header className="header">
            <Row align={'middle'}>
                <Space>
                    <Link to={routeNames.adminDashboard}>
                        <img src={'/images/logo.png'} width="120" height="auto" alt="Elvie App" />
                    </Link>
                </Space>
                <div style={{ flex: 1 }} />
                <Row align={'middle'}>
                    <Avatar size={32} src={`/images/admin-icon.svg`} />
                    <Text style={{ color: 'rgba(255, 255, 255, .6)', margin: '0 16px' }}>{user?.username}</Text>
                    <ConfirmModal content={'Logout?'} type={'confirm'} handleConfirm={handleLogout}>
                        <Tooltip title="Logout">
                            <LogoutOutlined style={{ color: 'rgba(255, 0, 0, .6)', cursor: 'pointer' }} />
                        </Tooltip>
                    </ConfirmModal>
                </Row>
            </Row>
        </Layout.Header>
    );
}

export default Header;
