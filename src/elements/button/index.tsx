import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';
import './style.scss';

const RButton = (props: ButtonProps) => {
    const { className, ...restProps } = props;
    const classes = classNames(className, 'r-button');

    return <Button className={classes} {...restProps} />;
};

export default RButton;
