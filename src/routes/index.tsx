import { CopyOutlined, HomeOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons';
import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import Loading from '../elements/loading';
import PageAccount from '../pages/account';
import PageCollectionDetail from '../pages/collection-detail';
// import AccountManagementPage from '../pages/admin/account-management';
// import CollectionManagementPage from '../pages/admin/collection-management';
// import DashboardPage from '../pages/admin/dashboard-page';
import PageCompany from '../pages/company';
import Home from '../pages/home';
import PageNotFound from '../pages/not-found';
import PagePrivacy from '../pages/privacy-policy';
import PageTos from '../pages/term-of-service';
import routeNames from './names';
import ProtectedRoute from './protected-route';

const enum AdminComponentsEnum {
    Dashboard = 'Dashboard',
    AccountManagement = 'AccountManagement',
    CollectionManagement = 'CollectionManagement',
    NftManagement = 'NftManagement',
}

const AdminComponents = {
    [AdminComponentsEnum.Dashboard]: lazy(
        () =>
            new Promise(resolve => {
                setTimeout(() => resolve(import('../pages/admin/dashboard-page') as any), 1000);
            }),
    ),
    [AdminComponentsEnum.AccountManagement]: lazy(
        () =>
            new Promise(resolve => {
                setTimeout(() => resolve(import('../pages/admin/account-management') as any), 1000);
            }),
    ),
    [AdminComponentsEnum.CollectionManagement]: lazy(
        () =>
            new Promise(resolve => {
                setTimeout(() => resolve(import('../pages/admin/collection-management') as any), 1000);
            }),
    ),
    [AdminComponentsEnum.NftManagement]: lazy(
        () =>
            new Promise(resolve => {
                setTimeout(() => resolve(import('../pages/admin/nft/nft-management') as any), 1000);
            }),
    ),
};

const LazyComponent = ({ component, ...props }: { component: AdminComponentsEnum }) => {
    const View = AdminComponents[component] || AdminComponents['Dashboard'];
    return (
        <Suspense fallback={<Loading />}>
            <View {...props} />
        </Suspense>
    );
};

export const routes = [
    { path: routeNames.home, element: <Home /> },
    { path: routeNames.company, element: <PageCompany /> },
    { path: routeNames.tos, element: <PageTos /> },
    { path: routeNames.privacy, element: <PagePrivacy /> },
    { path: routeNames.account, element: <PageAccount /> },
    { path: routeNames.collectionDetail, element: <PageCollectionDetail /> },
    {
        path: routeNames.adminDashboard,
        element: (
            <ProtectedRoute
                component={() => <LazyComponent component={AdminComponentsEnum.Dashboard} />}
                pageName="Home"
                arrayPages={[
                    {
                        link: routeNames.adminDashboard,
                        name: 'Home',
                        icon: <HomeOutlined />,
                    },
                ]}
            />
        ),
    },
    {
        path: routeNames.accountManagement,
        element: (
            <ProtectedRoute
                component={() => <LazyComponent component={AdminComponentsEnum.AccountManagement} />}
                pageName="Account Management"
                arrayPages={[
                    {
                        link: routeNames.adminDashboard,
                        name: 'Home',
                        icon: <HomeOutlined />,
                    },
                    {
                        link: routeNames.accountManagement,
                        name: 'Account Management',
                        icon: <UserOutlined />,
                    },
                ]}
            />
        ),
    },
    {
        path: routeNames.collectionManagement,
        element: (
            <ProtectedRoute
                component={() => <LazyComponent component={AdminComponentsEnum.CollectionManagement} />}
                pageName="Collection Management"
                arrayPages={[
                    {
                        link: routeNames.adminDashboard,
                        name: 'Home',
                        icon: <HomeOutlined />,
                    },
                    {
                        link: routeNames.collectionManagement,
                        name: 'Collection Management',
                        icon: <ProjectOutlined />,
                    },
                ]}
            />
        ),
    },
    {
        path: routeNames.nftManagement,
        element: (
            <ProtectedRoute
                component={() => <LazyComponent component={AdminComponentsEnum.NftManagement} />}
                pageName="Nft Management"
                arrayPages={[
                    {
                        link: routeNames.adminDashboard,
                        name: 'Home',
                        icon: <HomeOutlined />,
                    },
                    {
                        link: routeNames.nftManagement,
                        name: 'Nft Management',
                        icon: <CopyOutlined />,
                    },
                ]}
            />
        ),
    },
    { path: '*', element: <PageNotFound /> },
];

const Routes = () => useRoutes(routes);

export default Routes;
