import { ReactElement } from 'react';
import Header from './header';
import style from './style.module.scss';

interface IProps {
    children: ReactElement;
}

const LayoutPublic = ({ children }: IProps) => {
    return (
        <main className={style.defaultLayout}>
            <Header />
            <div className={style.body}>{children}</div>
        </main>
    );
};

export default LayoutPublic;
