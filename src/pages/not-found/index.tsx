import style from './style.module.scss';

const PageNotFound = () => {
    return (
        <div className={style.notFound}>
            <div className={style.text}>404</div>
            <div>The page you’re looking for cannot be found.</div>
        </div>
    );
};

export default PageNotFound;
