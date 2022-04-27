/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

export const useBeforeUnload = (value: {
    (): void;
    (arg0: { preventDefault: () => void; returnValue: any }): any;
}) => {
    const handleBeforeunload = (e: {
        preventDefault: () => void;
        returnValue: any;
    }) => {
        let returnValue;
        if (typeof value === 'function') {
            returnValue = value(e);
        } else {
            returnValue = value;
        }
        if (returnValue) {
            e.preventDefault();
            e.returnValue = returnValue;
        }
        return returnValue;
    };

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeunload);
        return () =>
            window.removeEventListener(
                'beforeunload',
                handleBeforeunload,
            );
        // eslint-disable-next-line
    }, []);
};
