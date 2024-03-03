import { useState, useEffect } from 'react';
import { useBoundStore } from 'store';

/* This hook prevents rehydration error that occurs while using zustand
 The rehydration error occurs when mounting the react component and the 
 server html markup differs from the client rendered page
 The useState and useEffect ensures the component is remounted after hydration
 For more read: https://dev.to/abdulsamad/how-to-use-zustands-persist-middleware-in-nextjs-4lb5
*/
export const useAppSelector = <T, F>(
    store: (callback: (state: T) => unknown) => unknown,
    callback: (state: T) => F
) => {
    const result = store(callback) as F;
    const [data, setData] = useState<F>();

    useEffect(() => {
        setData(result);
    }, [result]);

    return data;
};

export const useAppStore = () =>
    useAppSelector(useBoundStore, (state) => state);
