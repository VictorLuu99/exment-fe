import React from 'react';
// import { message } from 'antd';
import { notification } from 'antd-notifications-messages';
import './style.module.scss';

const RMessage = {
    error: (content: React.ReactNode) => {
        return notification({
            type: 'error',
            message: <span style={{ color: '#ff511a', fontSize: '15px', fontWeight: 400 }}>{content}</span>,
            position: 'topCenter',
            icon: <img src="/images/icon-error.svg" alt="" style={{ marginRight: '5px' }} />,
            className: 'notification-close',
            style: {
                backgroundColor: 'rgba(255, 81, 26, 0.1)',
                border: '1px solid #FF511A',
                borderRadius: '10px',
                fontWeight: '400',
                marginTop: '60px',
                minWidth: '100%',
                minHeight: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: 'unset'
            },
        });
    },
};

export default RMessage;
