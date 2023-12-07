import { CheckCircleTwoTone } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Form, Input, Modal, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_ACCOUNT_SIGNED_MESSAGE, Roles } from '../../../constants/user';
import RButton from '../../../elements/button';
import { signMessage } from '../../../services/connectors';
import { RootState } from '../../../stores';
import { clearSignedMessageToLogin } from '../../../stores/auth/slice';
import { hideModalRegisterAccount } from '../../../stores/modal/slice';
import { EActionStatus } from '../../../stores/type';
import { createAccountRequest } from '../../../stores/user/slice';
import { truncateString } from '../../../utils/string';

const { Option } = Select;

const ModalRegisterAccount = () => {
    const { t } = useTranslation();
    const { account, deactivate } = useWeb3React();

    const { openModalRegisterAccount } = useSelector((state: RootState) => state.modalConnectGlobal);

    const { status } = useSelector((state: RootState) => state.user);

    const formIsPending = status === EActionStatus.Pending;
    const formIsSuccess = status === EActionStatus.Succeeded;

    const dispatch = useDispatch();

    const handleClose = () => {
        deactivate();
        dispatch(hideModalRegisterAccount());
        dispatch(clearSignedMessageToLogin());
    };

    const onRoleChange = () => {};

    // handle register account
    const onFinish = async (values: any) => {
        const { username, email, role } = values;
        if (username && email && role) {
            const signature = await signMessage(CREATE_ACCOUNT_SIGNED_MESSAGE);
            if (signature) {
                dispatch(
                    createAccountRequest({
                        walletAddress: String(account),
                        signature,
                        username,
                        email,
                        roleName: role,
                    }),
                );
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            open={openModalRegisterAccount}
            centered
            // className={style.modalPolicy}
            onCancel={handleClose}
            confirmLoading={false}
            title={t('account.registerTitle')}
            footer={
                formIsSuccess && (
                    <RButton type="primary" htmlType="submit" onClick={handleClose}>
                        OK
                    </RButton>
                )
            }
        >
            {formIsSuccess ? (
                <div>
                    <CheckCircleTwoTone /> Please check your email to receive verify link!
                </div>
            ) : (
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{ marginTop: '20px' }}
                >
                    <Form.Item label="Wallet Address" name="username">
                        {truncateString({ text: account ?? '', start: 15, end: 10 })}
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="leo" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                        ]}
                    >
                        <Input placeholder="leo@gmail.com" />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Please enter your role!' }]}
                    >
                        <Select placeholder="Select role of the user" onChange={onRoleChange} allowClear>
                            <Option value={Roles.buyer}>Buyer</Option>
                            <Option value={Roles.seller}>Seller</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <RButton loading={formIsPending} type="primary" htmlType="submit" disabled={formIsPending}>
                            Submit
                        </RButton>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};

export default ModalRegisterAccount;
