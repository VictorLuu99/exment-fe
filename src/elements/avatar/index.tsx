import './style.scss';

interface IAvatar {
    type?: 'square' | 'circle';
    imgUrl?: string | null;
    className?: string;
}

const Avatar = ({ type = 'square', imgUrl, className = '' }: IAvatar) => {
    return (
        <div className={`avatar__wrapper avatar__wrapper--${type} ${className}`}>
            <img src={imgUrl ? imgUrl : '/images/default-image.jpeg'} alt="avatar-alt" />
        </div>
    );
};

export default Avatar;
