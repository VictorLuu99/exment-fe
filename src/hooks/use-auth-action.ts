import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores';
import { showModalConnect } from '../stores/modal/slice';

const useAuthAction = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const handleAuthAction = () => {
        if (!isAuthenticated) {
            dispatch(showModalConnect());
            return false;
        }

        return true;
    };
    return { handleAuthAction } as const;
};

export default useAuthAction;
