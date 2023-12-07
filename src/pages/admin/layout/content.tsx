import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { ReactElement } from 'react';
import { RootState } from '../../../stores';
import { useSelector } from 'react-redux';
import './style.scss';
import { ILayoutAdmin } from '.';

const isLoading = false;

const Content = (props: ILayoutAdmin) => {
    const { isOpenAdminSidebar } = useSelector((state: RootState) => state.app);
    const { pageName, arrayPages } = props;
    return (
        <Layout.Content className="content" style={{ marginLeft: `${isOpenAdminSidebar} ? 80px : 240px` }}>
            <section className="content-header">
                <div className="content-title">
                    <h2>
                        {pageName}
                        {isLoading && <LoadingOutlined />}
                    </h2>
                </div>
                <div className="breadcrumb-wrapper">
                    <Breadcrumb>
                        {arrayPages?.map(page => (
                            <Breadcrumb.Item key={page.name}>
                                <Link className="styled-link" to={page.link}>
                                    {page.icon}
                                    <span style={{ paddingLeft: '8px' }}>{page.name}</span>
                                </Link>
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </div>
            </section>
            <section className="content-container">{props.children}</section>
        </Layout.Content>
    );
};

export default Content;
