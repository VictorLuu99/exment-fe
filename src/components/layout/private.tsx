import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import ContainerWrapper from './container-wrapper';
import Header from './header';
import style from './style.module.scss';

interface IProps {
    children: ReactElement;
}

const LayoutPrivate = ({ children }: IProps) => {
    const auth = useSelector((state: RootState) => state.auth);

    return (
        <ContainerWrapper>
            <main className={style.defaultLayout}>
                <Header />
                {auth.isAuthenticated ? children : null}
            </main>
        </ContainerWrapper>
    );
};

export default LayoutPrivate;
