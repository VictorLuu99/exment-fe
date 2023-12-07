import './style.scss';

interface IBanner {
    imgUrl?: string | null;
    className?: string;
}

const Banner = ({ imgUrl, className = '' }: IBanner) => {
    return (
        <div className={`banner__wrapper ${className}`}>
            <img src={imgUrl ? imgUrl : '/images/default-image.jpeg'} alt="banner-alt" />
        </div>
    );
};

export default Banner;
