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
import { draftCollectionRequest } from '../../../stores/collection/slice';
import { hideModalEditCollection } from '../../../stores/modal/slice';
import { EActionStatus } from '../../../stores/type';
import { getSlugFromName } from '../../../utils/get-slug';
import CustomUploadFile from '../modal-create-collection/upload-file';
import { COLLECTION_STATUS } from '../../../constants/collection';
import type { UploadFile } from 'antd/es/upload/interface';
import { ICreateCollectionForm } from '../modal-create-collection';

const { useForm, useWatch } = Form;

const { Option } = Select;

const ModalEditCollection = () => {
    const [form] = useForm<ICreateCollectionForm>();

    const collectionName = useWatch('collectionName', form);

    const [image, setImage] = useState<RcFile>();
    const [bannerImage, setBannerImage] = useState<RcFile>();
    const [draftImage, setDrafImage] = useState<UploadFile>();
    const [drafBannerImage, setDrafBannerImage] = useState<UploadFile>();

    const handleClose = () => {
        dispatch(hideModalEditCollection());
    };

    const { t } = useTranslation();

    const { openModalEditCollection, dataCollectionForm } = useSelector((state: RootState) => state.modalConnectGlobal);
    const { isDrafting } = useSelector((state: RootState) => state.collection);
    const [formIsPending, setFormPending] = useState<boolean>(isDrafting === EActionStatus.Pending);

    const { caterogyList } = useSelector((state: RootState) => state.category);

    const dispatch = useDispatch();

    const handleCreateCollection = async (values: ICreateCollectionForm, status?: COLLECTION_STATUS) => {
        setFormPending(true);
        console.log('values: ', values);

        let presignedUrls,
            valueImg = values.image,
            valueBannerImg = values.bannerImage;
        if (image) {
            presignedUrls = await serviceS3.getPresignedUrls([
                {
                    file: image,
                    prefixName: `${collectionName} collection banner`,
                },
            ]);
            await serviceS3.uploadFile(image, presignedUrls[0]);
            valueImg = presignedUrls[0].split('?')[0];
        }
        if (bannerImage) {
            presignedUrls = await serviceS3.getPresignedUrls([
                {
                    file: bannerImage,
                    prefixName: `${collectionName} collection banner`,
                },
            ]);
            await serviceS3.uploadFile(bannerImage, presignedUrls[0]);
            valueBannerImg = presignedUrls[0].split('?')[0];
        }
        const data = {
            ...values,
            price: String(values.price),
            Symbol: values.symbol.toUpperCase(),
            image: valueImg,
            bannerImage: valueBannerImg,
            status,
        };
        if (dataCollectionForm?.id) {
            dispatch(
                draftCollectionRequest({
                    collectionId: dataCollectionForm?.id,
                    data: data,
                }),
            );
        }
    };

    const onFinish = async (values: ICreateCollectionForm) => {
        await handleCreateCollection(values, COLLECTION_STATUS.PENDING);
    };

    const handleEditDraft = async () => {
        await handleCreateCollection(form.getFieldsValue(), COLLECTION_STATUS.DRAFT);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const { openNotification, contextHolder } = useNotification();

    useEffect(() => {
        console.log('openModalEditCollection: ', openModalEditCollection);
        console.log('dataCollectionForm: ', dataCollectionForm);
        if (dataCollectionForm) {
            resetForm();
        }
        // eslint-disable-next-line
    }, [dataCollectionForm, openModalEditCollection]);

    useEffect(() => {
        form.setFieldValue('slug', getSlugFromName(collectionName));
    }, [collectionName, form]);

    const resetForm = () => {
        form.setFieldValue('collectionName', dataCollectionForm?.collectionName);
        form.setFieldValue('image', dataCollectionForm?.image);
        form.setFieldValue('bannerImage', dataCollectionForm?.bannerImage);
        form.setFieldValue('categoryId', dataCollectionForm?.mstCollectionCategory?.id);
        form.setFieldValue('price', dataCollectionForm?.price ? Number(dataCollectionForm?.price) : 0);
        form.setFieldValue('slug', dataCollectionForm?.slug);
        form.setFieldValue('symbol', dataCollectionForm?.symbol);
        form.setFieldValue('description', dataCollectionForm?.description);
        setDrafImage({
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: dataCollectionForm?.image || undefined,
        });
        setDrafBannerImage({
            uid: '-2',
            name: 'bannerImage.png',
            status: 'done',
            url: dataCollectionForm?.bannerImage || undefined,
        });
        setFormPending(false);
    };

    useEffect(() => {
        if (isDrafting === EActionStatus.Succeeded) {
            dispatch(hideModalEditCollection());
            openNotification({
                message: 'Edit collection successfully!',
                placement: 'bottomRight',
                type: 'success',
            });
        }
        if (isDrafting === EActionStatus.Failed) {
            resetForm();
            openNotification({
                message: 'Edit collection failed!',
                placement: 'bottomRight',
                type: 'error',
            });
        }
        // eslint-disable-next-line
    }, [isDrafting]);

    useEffect(() => {
        form.setFieldValue('image', image);
        // eslint-disable-next-line
    }, [image]);

    useEffect(() => {
        form.setFieldValue('bannerImage', bannerImage);
        // eslint-disable-next-line
    }, [bannerImage]);

    return (
        <Modal
            open={openModalEditCollection}
            // className={style.modalPolicy}
            onCancel={handleClose}
            // confirmLoading={false}
            title={t('collection.editCollectionTitle')}
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
                    <CustomUploadFile setFile={setImage} file={image} dataFile={draftImage} />
                </Form.Item>

                <Form.Item
                    label="Banner Image"
                    name="bannerImage"
                    rules={[{ required: true, message: 'Banner image can not be empty' }]}
                >
                    <CustomUploadFile setFile={setBannerImage} file={bannerImage} dataFile={drafBannerImage} />
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
                        onClick={handleEditDraft}
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

export default ModalEditCollection;
