import { CopyOutlined, DashboardOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import routeNames from '../../../routes/names';
import { RootState } from '../../../stores';
import { toggleAdminSidebar } from '../../../stores/app/slice';
import './style.scss';

const { Item } = Menu;

const Sidebar = () => {
    const { isOpenAdminSidebar } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();

    const redirect = ({ key }: { key: string }) => {
        navigate(key);
    };

    const toggle = () => {
        dispatch(toggleAdminSidebar(!isOpenAdminSidebar));
    };

    return (
        <Layout.Sider width={240} collapsible collapsed={isOpenAdminSidebar} onCollapse={toggle} className="sidebar">
            <Menu onClick={redirect} mode={'inline'} theme="light" selectedKeys={[location.pathname]}>
                <Menu.ItemGroup>
                    <Item key={routeNames.adminDashboard} icon={<DashboardOutlined />}>
                        Dashboard
                    </Item>
                    <Item key={routeNames.accountManagement} icon={<UserOutlined />}>
                        Account
                    </Item>
                    <Item key={routeNames.collectionManagement} icon={<ProjectOutlined />}>
                        Collection
                    </Item>
                    <Item key={routeNames.nftManagement} icon={<CopyOutlined />}>
                        Nft
                    </Item>
                </Menu.ItemGroup>
            </Menu>
        </Layout.Sider>
    );
};

export default Sidebar;
