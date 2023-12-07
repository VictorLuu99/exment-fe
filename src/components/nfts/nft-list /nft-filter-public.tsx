import { Col, DatePicker, Form, Row, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLLECTION_STATUS } from '../../../constants/collection';
import { NFT_STATUS } from '../../../constants/nft';
import RButton from '../../../elements/button';
import { RootState } from '../../../stores';
import { getAllCollectionsRequest, resetCollectionFetchStatus } from '../../../stores/collection/slice';
import { getAllNftRequest } from '../../../stores/nft/slice';
import './style.scss';

export interface INftFilterForm {
    collectionIds: number[];
    buyerIds: number[];
    sellerIds: number[];
    timeCreated: any[];
}

export interface INftFilterPublic {
    sellerId?: number;
    buyerId?: number;
}

const { useForm } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

export const NftFilterPublic = ({ sellerId, buyerId }: INftFilterPublic) => {
    // list collections
    const dispatch = useDispatch();
    const {
        page: collectionPage,
        limit: collectionLimit,
        collectionList,
    } = useSelector((state: RootState) => state.collection);
    const { page: nftPage, limit: nftLimit } = useSelector((state: RootState) => state.nft);

    useEffect(() => {
        dispatch(
            getAllCollectionsRequest({
                page: collectionPage,
                limit: collectionLimit,
                collectionStatus: [COLLECTION_STATUS.ACTIVE],
            }),
        );

        return () => {
            dispatch(resetCollectionFetchStatus());
        };
        // eslint-disable-next-line
    }, []);

    const onFinish = (values: INftFilterForm) => {
        const { collectionIds, timeCreated } = values;
        let query: any = {
            collectionIds,
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
                sellerIds: sellerId ? [sellerId] : [],
                buyerIds: buyerId ? [buyerId] : [],
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
        // labelCol: {
        //     xs: { span: 24 },
        //     sm: { span: 4 },
        // },
        // wrapperCol: {
        //     xs: { span: 24 },
        //     sm: { span: 16 },
        // },
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
            <Row gutter={24} justify={'center'}>
                <Col span={8}>
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
                <Col span={8} style={{ display: 'flex', gap: '20px' }}>
                    <Form.Item label="Range time" name="timeCreated">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <RButton
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
                        </RButton>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default NftFilterPublic;
