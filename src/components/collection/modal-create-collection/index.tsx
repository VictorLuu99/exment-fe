import { Form, Input, InputNumber, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { RcFile } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import RButton from '../../../elements/button';
import { useNotification } from '../../../hooks/use-notification';
import serviceS3 from '../../../services/s3';
import { RootState } from '../../../stores';
import { createCollectionRequest } from '../../../stores/collection/slice';
import { hideModalCreateCollection } from '../../../stores/modal/slice';
import { EActionStatus } from '../../../stores/type';
import { getSlugFromName } from '../../../utils/get-slug';
import CustomUploadFile from './upload-file';
import { COLLECTION_STATUS } from '../../../constants/collection';

const { useForm, useWatch } = Form;

const { Option } = Select;

export interface ICreateCollectionForm {
    collectionName: string;
    image: string;
    bannerImage: string;
    categoryId: number;
    price: string;
    slug: string;
    symbol: string;
    description?: string;
}

const ModalCreateCollection = () => {
    const [form] = useForm<ICreateCollectionForm>();

    const collectionName = useWatch('collectionName', form);

    const [image, setImage] = useState<RcFile>();
    const [bannerImage, setBannerImage] = useState<RcFile>();

    const handleClose = () => {
        dispatch(hideModalCreateCollection());
    };

    const { t } = useTranslation();

    const { openModalCreateCollection } = useSelector((state: RootState) => state.modalConnectGlobal);
    const { isCreating } = useSelector((state: RootState) => state.collection);
    const [formIsPending, setFormPending] = useState<boolean>(isCreating === EActionStatus.Pending);

    const { caterogyList } = useSelector((state: RootState) => state.category);

    const dispatch = useDispatch();

    const handleCreateCollection = async (values: ICreateCollectionForm, status?: COLLECTION_STATUS) => {
        if (!image || !bannerImage) {
            return;
        }
        setFormPending(true);
        const presignedUrls = await serviceS3.getPresignedUrls([
            {
                file: image,
                prefixName: `${collectionName} collection image`,
            },
            {
                file: bannerImage,
                prefixName: `${collectionName} collection banner`,
            },
        ]);
        await Promise.all([
            serviceS3.uploadFile(image, presignedUrls[0]),
            serviceS3.uploadFile(bannerImage, presignedUrls[1]),
        ]);
        const data = {
            ...values,
            price: String(values.price),
            Symbol: values.symbol.toUpperCase(),
            image: presignedUrls[0].split('?')[0],
            bannerImage: presignedUrls[1].split('?')[0],
            status,
        };
        dispatch(createCollectionRequest(data));
    };

    const onFinish = async (values: ICreateCollectionForm) => {
        await handleCreateCollection(values);
    };

    const handleCreateDraft = async () => {
        await handleCreateCollection(form.getFieldsValue(), COLLECTION_STATUS.DRAFT);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const { openNotification, contextHolder } = useNotification();

    const resetForm = () => {
        form.resetFields();
        setFormPending(false);
        setImage(undefined);
        setBannerImage(undefined);
    };

    useEffect(() => {
        form.setFieldValue('slug', getSlugFromName(collectionName));
    }, [collectionName, form]);

    useEffect(() => {
        if (isCreating === EActionStatus.Succeeded) {
            resetForm();
            dispatch(hideModalCreateCollection());
            openNotification({
                message: 'Create collection successfully!',
                placement: 'bottomRight',
                type: 'success',
            });
        }
        if (isCreating === EActionStatus.Failed) {
            resetForm();
            openNotification({
                message: 'Create collection failed!',
                placement: 'bottomRight',
                type: 'error',
            });
        }
        // eslint-disable-next-line
    }, [isCreating]);

    useEffect(() => {
        form.setFieldValue('image', image);
        form.setFieldValue('bannerImage', bannerImage);
        // eslint-disable-next-line
    }, [image, bannerImage]);

    return (
        <Modal
            open={openModalCreateCollection}
            // className={style.modalPolicy}
            onCancel={handleClose}
            // confirmLoading={false}
            title={t('collection.createCollectionTitle')}
            footer={null}
            width={800}
        >
            {contextHolder}
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{ marginTop: '20px' }}
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="collectionName"
                    rules={[{ required: true, message: 'Collection name cannot be empty' }]}
                >
                    <Input placeholder="Mutant Ape Yacht Club" />
                </Form.Item>
                <Form.Item label="Slug" name="slug" rules={[{ required: true, message: 'Slug can not be empty' }]}>
                    <Input
                        disabled={true}
                        // placeholder="Mutant Ape Yacht Club"
                    />
                </Form.Item>
                <Form.Item
                    name="categoryId"
                    label="Category"
                    rules={[{ required: true, message: 'Category can not be empty' }]}
                >
                    <Select placeholder="Select collection category" allowClear>
                        {caterogyList &&
                            caterogyList.map(category => (
                                <Option key={category.id} value={category.id}>
                                    {category.name}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Collection price is greater than 0' },
                        {
                            type: 'number',
                            message: 'Collection price is greater than 0',
                            min: 0,
                        },
                    ]}
                >
                    <InputNumber placeholder="100000" style={{ width: '50%' }} addonAfter={<div>¥</div>} />
                </Form.Item>
                <Form.Item
                    label="Symbol"
                    name="symbol"
                    rules={[{ required: true, message: 'Symbol can not be empty' }]}
                >
                    <Input placeholder="MAYC" style={{ width: '50%' }} />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <TextArea
                        showCount
                        maxLength={500}
                        placeholder="The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only..."
                    />
                </Form.Item>

                <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Image can not be empty' }]}>
                    <CustomUploadFile setFile={setImage} file={image} />
                </Form.Item>

                <Form.Item
                    label="Banner Image"
                    name="bannerImage"
                    rules={[{ required: true, message: 'Banner image can not be empty' }]}
                >
                    <CustomUploadFile setFile={setBannerImage} file={bannerImage} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4 }}>
                    <RButton
                        style={{ display: 'inline-block', marginRight: '8px' }}
                        name="save"
                        loading={formIsPending}
                        type="primary"
                        htmlType="submit"
                        disabled={formIsPending}
                        value={'1'}
                        formAction="hello"
                    >
                        Save
                    </RButton>
                    <RButton
                        style={{ display: 'inline-block' }}
                        loading={formIsPending}
                        type="default"
                        htmlType="button"
                        disabled={formIsPending}
                        onClick={handleCreateDraft}
                    >
                        Save as draft
                    </RButton>
                    {/* <RButton type="dashed" style={{ display: 'inline-block' }} onClick={onReset}>
                        Reset
                    </RButton> */}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCreateCollection;
