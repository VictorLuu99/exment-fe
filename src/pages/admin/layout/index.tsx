import { Layout } from 'antd';
import Header from './header';
import Sidebar from './sidebar';

import Content from './content';
import { IBreakCrumbPage } from '../../../routes/protected-route';
import { ReactElement } from 'react';

export interface ILayoutAdmin {
    pageName: string;
    arrayPages: IBreakCrumbPage[];
    children: ReactElement;
}

const LayoutAdmin = (props: ILayoutAdmin) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header />
            <Layout style={{ marginTop: '64px' }}>
                <Sidebar />
                <Content {...props} />
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
