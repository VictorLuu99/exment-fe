import { useRef, useEffect } from 'react';

function usePrevious(arg: any): any {
    const ref = useRef();

    useEffect(() => {
        ref.current = arg;
    }, [ arg ])

    return ref.current
}

export default usePrevious;
