import { FC } from 'react';
import classNames from 'classnames';
import style from './style.module.scss';

interface Props {
    className?: string;
}

const LoaderSpin: FC<Props> = props => {
    const { className } = props;
    const classes = classNames([style.loaderSpin, className]);

    return <span className={classes} />;
};

export default LoaderSpin;
