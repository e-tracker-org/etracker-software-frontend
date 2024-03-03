import { useEffect, useState } from 'react';

const useMediaQuery = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('load', handleResize);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('load', handleResize);
            window.removeEventListener('resize', handleResize);
        };
    }, [width]);

    return {
        width,
        sm: width > 0 && width <= 546,
        md: width >= 546 && width <= 786,
    };
};

export default useMediaQuery;
