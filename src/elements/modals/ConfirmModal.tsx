import { Modal } from 'antd';

const ConfirmModal = (props: any) => {
    const { content, type, title, handleConfirm } = props;

    const config = {
        title: title ? title : undefined,
        content: content ? content : undefined,
        okText: 'OK',
        cancelText: 'Cancel',
        onOk() {
            handleConfirm ? handleConfirm() : console.log();
        },
        oncanplay() {
            console.log('hahaa');
        },
    };

    const confirm = () => {
        switch (type) {
            case 'confirm':
                Modal.confirm(config);
                break;
            case 'info':
                Modal.info(config);
                break;
            case 'error':
                Modal.error(config);
                break;
            case 'success':
                Modal.success(config);
                break;
            default:
                Modal.warning(config);
        }
    };

    return <div onClick={confirm}>{props.children}</div>;
};

export default ConfirmModal;
