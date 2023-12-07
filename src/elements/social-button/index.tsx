import { Tooltip } from 'antd';
import './style.scss';

interface ISocialButton {
    iconImg: string;
    url: string;
    target?: string;
    title: string;
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

const SocialButton = ({ iconImg, url, target, title, tooltipPosition = 'top' }: ISocialButton) => {
    return (
        <a className="social-button__link" href={url} target={target || '_self'}>
            <Tooltip placement={tooltipPosition} title={title}>
                <button className="social-button">
                    <div className="social-button__image">
                        <img src={iconImg} alt="icon-img-alt" />
                    </div>
                </button>
            </Tooltip>
        </a>
    );
};

export default SocialButton;
