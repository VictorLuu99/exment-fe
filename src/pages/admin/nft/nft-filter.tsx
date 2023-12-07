import { Button, Col, DatePicker, Form, Row, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLLECTION_STATUS } from '../../../constants/collection';
import { NFT_STATUS } from '../../../constants/nft';
import { Roles } from '../../../constants/user';
import { RootState } from '../../../stores';
import { getAllCollectionsRequest, resetCollectionFetchStatus } from '../../../stores/collection/slice';
import { getAllNftRequest } from '../../../stores/nft/slice';
import { getAllUsersRequest } from '../../../stores/user/slice';
import './style.scss';

export interface INftFilterForm {
    collectionIds: number[];
    buyerIds: number[];
    sellerIds: number[];
    timeCreated: any[];
}

const { useForm } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

export const NftFilter = () => {
    // list collections
    const dispatch = useDispatch();
    const {
        page: collectionPage,
        limit: collectionLimit,
        collectionList,
    } = useSelector((state: RootState) => state.collection);
    const { page: nftPage, limit: nftLimit } = useSelector((state: RootState) => state.nft);
    const { page: userPage, limit: userLimit, userList } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(
            getAllCollectionsRequest({
                page: collectionPage,
                limit: collectionLimit,
                collectionStatus: [
                    COLLECTION_STATUS.ACTIVE,
                    // COLLECTION_STATUS.APPROVED,
                    // COLLECTION_STATUS.DEACTIVE,
                    // COLLECTION_STATUS.PENDING,
                    // COLLECTION_STATUS.REJECTED,
                ],
            }),
        );

        dispatch(
            getAllUsersRequest({
                page: userPage,
                limit: userLimit,
            }),
        );

        return () => {
            dispatch(resetCollectionFetchStatus());
        };
        // eslint-disable-next-line
    }, []);

    // const buyerList = useMemo(() => userList.filter(user => user.role.role === Roles.buyer), [userList]);
    const buyerList = userList.filter(user => user.role.role === Roles.buyer);
    const sellerList = useMemo(() => userList.filter(user => user.role.role === Roles.seller), [userList]);

    const onFinish = (values: INftFilterForm) => {
        const { collectionIds, buyerIds, sellerIds, timeCreated } = values;
        let query: any = {
            collectionIds,
            buyerIds,
            sellerIds,
        };

        if (timeCreated) {
            query = {
                ...query,
                startDate: timeCreated[0].format('YYYY-MM-DD'),
                endDate: timeCreated[1].format('YYYY-MM-DD'),
            };
        }

        dispatch(
            getAllNftRequest({
                page: nftPage,
                limit: nftLimit,
                status: NFT_STATUS.ACTIVE,
                ...query,
            }),
        );
    };

    const handleFilterCollection = (inputValue: string, option: any) => {
        const keyword = inputValue.toLowerCase().trim();
        return option.children.props.children[1].toLowerCase().includes(keyword);
    };

    const onFinishFailed = () => {};

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const [form] = useForm<INftFilterForm>();
    return (
        <Form
            name="basic"
            {...formItemLayout}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
            labelAlign={'left'}
        >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label="Collection" name="collectionIds">
                        <Select mode="multiple" optionFilterProp="children" filterOption={handleFilterCollection}>
                            {collectionList?.map(collection => (
                                <Option value={collection.id} key={collection.id}>
                                    <div className="filter-item-custom">
                                        <img src={collection.image || '/images/default-image.jpeg'} alt="item-alt" />
                                        {collection.collectionName}
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Range time" name="timeCreated">
                        <RangePicker />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label="Buyer" name="buyerIds">
                        <Select mode="multiple" optionFilterProp="children">
                            {buyerList?.map(user => (
                                <Option value={user.id} key={user.id}>
                                    {user.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Seller" name="sellerIds">
                        <Select mode="multiple" optionFilterProp="children">
                            {sellerList?.map(user => (
                                <Option value={user.id} key={user.id}>
                                    {user.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item wrapperCol={{ offset: 2 }}>
                <Button
                    style={{ display: 'inline-block', marginRight: '8px' }}
                    name="save"
                    // loading={formIsPending}
                    type="primary"
                    htmlType="submit"
                    // disabled={formIsPending}
                    value={'1'}
                    formAction="hello"
                >
                    Search
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NftFilter;
