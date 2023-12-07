import { Row, Spin } from 'antd';

const Loading = () => {
    return (
        <Row align={'middle'} justify={'center'} style={{ height: '100vh' }}>
            <Spin tip="Loading..." />
        </Row>
    );
};

export default Loading;
