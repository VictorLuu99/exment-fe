import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Roles } from '../constants/user';
import LayoutAdmin from '../pages/admin/layout';
import { RootState } from '../stores';

export interface IBreakCrumbPage {
    link: string;
    name: string;
    icon: ReactElement;
}

export interface IProtectedRoute {
    component: any;
    pageName: string;
    arrayPages: IBreakCrumbPage[];
}

const ProtectedRoute = ({ component: Component, pageName, arrayPages, ...rest }: IProtectedRoute) => {
    const { user } = useSelector((state: RootState) => state.auth);
    if (user?.role === Roles.admin) {
        return (
            <LayoutAdmin pageName={pageName} arrayPages={arrayPages}>
                <Component {...rest} />
            </LayoutAdmin>
        );
    }

    return <Navigate to={'/notfound'} replace />;
};
export default ProtectedRoute;
